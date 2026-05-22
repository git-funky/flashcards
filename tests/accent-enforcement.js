/**
 * Spanish Flashcards -- unit tests
 *
 * Run with:  node test.js
 *
 * No dependencies -- plain Node.js. Tests the three core functions that
 * power the answer-matching logic, with a focus on the "Enforce Accents"
 * toggle.
 */

'use strict';

// -- Copy the exact functions from index.html ---------------------------------
// (keeping them in sync is the only maintenance burden; they're ~10 lines each)
//
// normalize() in index.html uses a literal Unicode combining-mark range for
// broad browser compatibility. Here we use \p{M} with the /u flag, which is
// equivalent in Node.js and avoids encoding issues in this file.

function normalize(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeStrict(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeIsCorrect(accentEnabled) {
  return function isCorrect(card, userInput) {
    const u_loose = normalize(userInput);
    if (!u_loose) return false;

    const candidates = [card.answer, ...(card.alternates || [])];

    if (!accentEnabled) {
      return candidates.map(normalize).includes(u_loose);
    }

    // Accent-enforced path (mirrors index.html exactly):
    // 1. Find candidates that are the same word (accent-insensitive).
    const wordMatches = candidates.filter(c => normalize(c) === u_loose);
    if (wordMatches.length === 0) return false;

    // 2. If any matching candidate carries accent marks, the user must
    //    reproduce them. This prevents a bare alternate (e.g. "el jamon")
    //    from letting the user bypass enforcement when an accented form exists.
    const accentedMatches = wordMatches.filter(c => normalize(c) !== normalizeStrict(c));
    const pool = accentedMatches.length > 0 ? accentedMatches : wordMatches;
    return pool.some(c => normalizeStrict(c) === normalizeStrict(userInput));
  };
}

// -- Tiny test harness --------------------------------------------------------

let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
  if (actual === expected) {
    console.log(`  ✓  ${description}`);
    passed++;
  } else {
    console.error(`  ✗  ${description}`);
    console.error(`       expected: ${expected}`);
    console.error(`       received: ${actual}`);
    failed++;
  }
}

function section(title) {
  console.log(`\n── ${title} ──`);
}

// -- Tests --------------------------------------------------------------------

section("normalize() -- accent-insensitive");
assert("strips acute accent",            normalize("café"),     "cafe");
assert("strips tilde",                   normalize("niño"),     "nino");
assert("strips multiple accents",        normalize("canción"), "cancion");
assert("lowercases",                     normalize("LECHE"),         "leche");
assert("collapses extra whitespace",     normalize("el  pan"),       "el pan");
assert("trims leading/trailing spaces",  normalize("  sal "),        "sal");
assert("handles empty string",           normalize(""),              "");
assert("handles null",                   normalize(null),            "");

section("normalizeStrict() -- accent-sensitive");
assert("preserves acute accent",  normalizeStrict("café"),     "café");
assert("preserves tilde",         normalizeStrict("niño"),     "niño");
assert("preserves all accents",   normalizeStrict("canción"), "canción");
assert("still lowercases",        normalizeStrict("LECHE"),         "leche");
assert("still collapses spaces",  normalizeStrict("el  pan"),       "el pan");
assert("handles empty string",    normalizeStrict(""),              "");
assert("handles null",            normalizeStrict(null),            "");

section("isCorrect() -- accents OFF");
{
  const isCorrect = makeIsCorrect(false);

  const cancion = { answer: "la canción" };
  assert("exact match accepted",                isCorrect(cancion, "la canción"), true);
  assert("missing accent accepted",             isCorrect(cancion, "la cancion"),      true);
  assert("wrong word rejected",                 isCorrect(cancion, "la mesa"),         false);
  assert("empty input rejected",                isCorrect(cancion, ""),                false);
  assert("whitespace-only rejected",            isCorrect(cancion, "   "),             false);
  assert("extra spaces accepted",               isCorrect(cancion, " la cancion "),    true);
  assert("case difference accepted",            isCorrect(cancion, "La Canción"), true);

  const huevo = { answer: "el huevo", alternates: ["los huevos"] };
  assert("alternate answer accepted",           isCorrect(huevo, "los huevos"), true);
  assert("wrong answer rejected",               isCorrect(huevo, "el pollo"),   false);

  const mesa = { answer: "la mesa" };
  assert("wrong article rejected",              isCorrect(mesa, "el mesa"),  false);
  assert("correct article accepted",            isCorrect(mesa, "la mesa"),  true);
}

section("isCorrect() -- accents ON");
{
  const isCorrect = makeIsCorrect(true);

  const cancion = { answer: "la canción" };
  assert("exact match with accent accepted",    isCorrect(cancion, "la canción"), true);
  assert("missing accent rejected",             isCorrect(cancion, "la cancion"),      false);
  assert("wrong word rejected",                 isCorrect(cancion, "la mesa"),         false);
  assert("empty input rejected",                isCorrect(cancion, ""),                false);
  assert("case difference still accepted",      isCorrect(cancion, "La Canción"), true);

  const jardin = { answer: "el jardín" };
  assert("correct accent on i accepted",        isCorrect(jardin, "el jardín"), true);
  assert("missing accent on i rejected",        isCorrect(jardin, "el jardin"),      false);

  // Core enforcement: a bare alternate cannot bypass accent enforcement when
  // a same-word candidate with accents exists.
  const jamon = { answer: "el jamón", alternates: ["el jamon"] };
  assert("bare alternate does NOT bypass enforcement", isCorrect(jamon, "el jamon"),      false);
  assert("canonical answer with accent accepted",      isCorrect(jamon, "el jamón"), true);

  // Realistic alternates from data/words.js:
  //   "la nevera" / "el refrigerador" (no accent) / "el frigorífico" (has accent)
  const nevera = { answer: "la nevera",
                   alternates: ["el refrigerador", "el frigorífico"] };
  assert("'la nevera' canonical accepted",              isCorrect(nevera, "la nevera"),           true);
  assert("'el refrigerador' (no accent) accepted",      isCorrect(nevera, "el refrigerador"),     true);
  assert("'el frigorífico' with accent accepted",  isCorrect(nevera, "el frigorífico"), true);
  assert("'el frigorifico' without accent rejected",    isCorrect(nevera, "el frigorifico"),      false);

  const leche = { answer: "la leche" };
  assert("unaccented word accepted",               isCorrect(leche, "la leche"), true);
  assert("unaccented word: wrong answer rejected", isCorrect(leche, "el leche"), false);
}


section("Plural alternates -- accents ON");
{
  const isCorrect = makeIsCorrect(true);

  // --- la patata: no accent in any form, all plurals accepted freely ---
  const patata = { answer: "la patata",
                   alternates: ["la papa", "las papas", "las patatas"] };
  assert("patata: canonical singular accepted",        isCorrect(patata, "la patata"),   true);
  assert("patata: 'las patatas' accepted",             isCorrect(patata, "las patatas"), true);
  assert("patata: 'la papa' accepted",                 isCorrect(patata, "la papa"),     true);
  assert("patata: 'las papas' accepted",               isCorrect(patata, "las papas"),   true);
  assert("patata: wrong word rejected",                isCorrect(patata, "el pan"),       false);

  // --- el jamon: singular has accent; plural drops it (common Spanish pattern) ---
  const jamon = { answer: "el jamon_accented", alternates: ["los jamones"] };
  // override answer with the proper accented form
  jamon.answer = "el jamón";   // el jamón
  assert("jamon: singular with accent accepted",       isCorrect(jamon, "el jamón"),   true);
  assert("jamon: singular missing accent rejected",    isCorrect(jamon, "el jamon"),         false);
  assert("jamon: plural 'los jamones' (no accent) accepted", isCorrect(jamon, "los jamones"), true);
  assert("jamon: wrong word rejected",                 isCorrect(jamon, "el queso"),          false);

  // --- el champiñon: accented singular; plural loses accent; alternate 'el hongo' has no accent ---
  const champi = { answer: "el champiñón",   // el champiñón
                   alternates: ["los champiñones", "el hongo", "los hongos"] };
  assert("champiñon: singular with accents accepted",  isCorrect(champi, "el champiñón"),  true);
  assert("champiñon: singular missing accent rejected",isCorrect(champi, "el champinon"),             false);
  assert("champiñon: plural 'los champiñones' accepted",isCorrect(champi, "los champiñones"),   true);
  assert("champiñon: 'el hongo' alternate accepted",   isCorrect(champi, "el hongo"),                true);
  assert("champiñon: 'los hongos' plural accepted",    isCorrect(champi, "los hongos"),              true);
  assert("champiñon: wrong word rejected",             isCorrect(champi, "la seta"),                  false);
}

section("Accent toggle -- same card, both modes");
{
  const isCorrectOff = makeIsCorrect(false);
  const isCorrectOn  = makeIsCorrect(true);

  // Words with accents: accepted either way OFF, strict ON.
  // Words without accents: both modes behave identically.
  const words = [
    { answer: "el café" },
    { answer: "la cebolla" },
    { answer: "el jamón" },
    { answer: "la canción" },
    { answer: "el azúcar" },
  ];

  for (const card of words) {
    const stripped = normalize(card.answer);
    const strict   = normalizeStrict(card.answer);
    const hasAccent = stripped !== strict;
    const label = card.answer;

    if (hasAccent) {
      assert(`OFF -- "${label}" accepts correct spelling`,  isCorrectOff(card, card.answer), true);
      assert(`OFF -- "${label}" accepts stripped spelling`, isCorrectOff(card, stripped),    true);
      assert(`ON  -- "${label}" accepts correct spelling`,  isCorrectOn(card, card.answer),  true);
      assert(`ON  -- "${label}" rejects stripped spelling`, isCorrectOn(card, stripped),     false);
    } else {
      assert(`OFF -- "${label}" accepts answer (no accent)`, isCorrectOff(card, card.answer), true);
      assert(`ON  -- "${label}" accepts answer (no accent)`, isCorrectOn(card, card.answer),  true);
    }
  }
}

// -- Summary ------------------------------------------------------------------

console.log(`\n${"─".repeat(40)}`);
console.log(`${passed + failed} tests: ${passed} passed, ${failed} failed`);
console.log("─".repeat(40));
process.exitCode = failed > 0 ? 1 : 0;
