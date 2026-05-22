/* ============================================================================
 * Spanish Flashcards — word list
 * ----------------------------------------------------------------------------
 * Each entry:
 *   image      — path to the image (relative to index.html)
 *   answer     — canonical Spanish answer including the article ("el" / "la")
 *   english    — English translation including "the" (nouns) or "to" (verbs)
 *   category   — used for filtering in Study mode
 *   alternates — optional array of additional accepted Spanish answers.
 *                Useful for regional variants (e.g. "el refrigerador" vs
 *                "la nevera"). Always spell alternates correctly, with their
 *                proper accent marks — when "Enforce Accents" is on the matcher
 *                requires users to type accents correctly for any form that
 *                carries them.
 *
 * ADDING A NEW WORD
 *   1. Drop a square image (SVG, PNG, or JPG) into images/
 *   2. Add a new { ... } entry to the array below
 *   3. Refresh the page. Done.
 *
 * ROUND LENGTH
 *   Each round samples ROUND_SIZE words from this list (default 20). Words you
 *   miss get higher weight in the next round's sampling. To change round size,
 *   edit `const ROUND_SIZE = 20;` near the top of the <script> in index.html.
 * ========================================================================== */

const WORDS = [

  // --- Cutlery, dishes & cleaning ---
  { image: "images/trastes.jpg",    answer: "los trastes",    english: "the dishes",     category: "Cutlery & Dishes" },
  { image: "images/bandeja.jpg",    answer: "la bandeja",     english: "the tray",       category: "Cutlery & Dishes" },
  { image: "images/jabon.jpg",      answer: "el jabón",       english: "the soap",       category: "Cutlery & Dishes" },
  { image: "images/cuchillo.jpg",   answer: "el cuchillo",    english: "the knife",      category: "Cutlery & Dishes" },
  { image: "images/tenedor.jpg",    answer: "el tenedor",     english: "the fork",       category: "Cutlery & Dishes" },
  { image: "images/cuchara.jpg",    answer: "la cuchara",     english: "the spoon",      category: "Cutlery & Dishes" },
  { image: "images/plato.jpg",      answer: "el plato",       english: "the plate",      category: "Cutlery & Dishes" },
  { image: "images/vaso.jpg",       answer: "el vaso",        english: "the glass",      category: "Cutlery & Dishes" },
  { image: "images/taza.jpg",       answer: "la taza",        english: "the cup",        category: "Cutlery & Dishes" },

    // --- Cookware ---
  { image: "images/tapa.jpg",      answer: "la tapa",       english: "the lid",       category: "Object",
    alternates: ["la tapadera"] },

  // --- Cookware ---
  { image: "images/sarten.jpg",     answer: "la sartén",      english: "the frying pan", category: "Cookware" },
  { image: "images/olla.jpg",       answer: "la olla",        english: "the pot",        category: "Cookware" },

  // --- Appliances ---
  { image: "images/horno.jpg",      answer: "el horno",       english: "the oven",       category: "Appliances" },
  { image: "images/nevera.jpg",     answer: "la nevera",      english: "the fridge",     category: "Appliances",
    alternates: ["el refrigerador", "el frigorífico"] },
  { image: "images/microondas.jpg", answer: "el microondas",  english: "the microwave",  category: "Appliances" },
  { image: "images/estufa.jpg",     answer: "la estufa",      english: "the stove",      category: "Appliances",
    alternates: ["la cocina"] },
  { image: "images/fregadero.jpg",  answer: "el fregadero",   english: "the sink",       category: "Appliances" },
  { image: "images/batidora.jpg",   answer: "la batidora",    english: "the blender",    category: "Appliances",
    alternates: ["la licuadora"] },

  // --- Furniture ---
  { image: "images/mesa.jpg",       answer: "la mesa",        english: "the table",      category: "Furniture" },
  { image: "images/silla.jpg",      answer: "la silla",       english: "the chair",      category: "Furniture" },

  // --- Food ---
  { image: "images/pan.jpg",        answer: "el pan",         english: "the bread",      category: "Food" },
  { image: "images/queso.jpg",      answer: "el queso",       english: "the cheese",     category: "Food" },
  { image: "images/manzana.jpg",    answer: "la manzana",     english: "the apple",      category: "Food" },
  { image: "images/huevo.jpg",      answer: "el huevo",       english: "the egg",        category: "Food" },
  { image: "images/ajo.jpg",        answer: "el ajo",         english: "the garlic",     category: "Food" },
  { image: "images/almendra.jpg",   answer: "la almendra",    english: "the almond",     category: "Food" },
  { image: "images/yema.jpg",       answer: "la yema",        english: "the yolk",       category: "Food" },
  { image: "images/cascara-de-huevo.jpg", answer: "la cáscara de huevo", english: "the eggshell", category: "Food" },
  { image: "images/harina.jpg",     answer: "la harina",      english: "the flour",      category: "Food" },
  { image: "images/mantequilla.jpg",answer: "la mantequilla", english: "the butter",     category: "Food" },
  { image: "images/tarta.jpg",      answer: "la tarta",       english: "the cake",       category: "Food",
    alternates: ["el pastel"] },
  { image: "images/champiñon.jpg",  answer: "el champiñón",   english: "the mushroom",   category: "Food",
    alternates: ["el hongo"] },
  { image: "images/cebolla.jpg",    answer: "la cebolla",     english: "the onion",      category: "Food",  alternates: ["las cebollas"] },
  { image: "images/chorizo.jpg",    answer: "el chorizo",     english: "the chorizo",    category: "Food" },
  { image: "images/jamon.jpg",      answer: "el jamón",       english: "the ham",        category: "Food" },
  { image: "images/oliva.jpg",      answer: "la oliva",       english: "the olive",      category: "Food",
    alternates: ["la aceituna", "las olivas"] },
  { image: "images/patata.jpg",     answer: "la patata",      english: "the potato",     category: "Food",
    alternates: ["la papa", "las papas", "las patatas"] },

  // --- Pantry & drink ---
  { image: "images/leche.jpg",      answer: "la leche",       english: "the milk",       category: "Pantry" },
  { image: "images/sal.jpg",        answer: "la sal",         english: "the salt",       category: "Pantry" },
  { image: "images/azucar.jpg",     answer: "el azúcar",      english: "the sugar",      category: "Pantry" },
  { image: "images/cafe.jpg",       answer: "el café",        english: "the coffee",     category: "Pantry" },
  { image: "images/aceite.jpg",     answer: "el aceite",      english: "the oil",        category: "Pantry" },
  { image: "images/aceite-de-oliva.jpg", answer: "el aceite de oliva", english: "the olive oil", category: "Pantry" },
  { image: "images/vinagre.jpg",    answer: "el vinagre",     english: "the vinegar",    category: "Pantry" },
  { image: "images/botella.jpg",    answer: "la botella",     english: "the bottle",     category: "Pantry" },

  // --- Actions ---
  { image: "images/batir.gif",      answer: "batir",          english: "to beat",        category: "Actions" },
  { image: "images/mezclar.gif",    answer: "mezclar",        english: "to mix",         category: "Actions" },
  { image: "images/hervir.gif",     answer: "hervir",         english: "to boil",        category: "Actions" },
  { image: "images/cortar.gif",     answer: "cortar",         english: "to cut",         category: "Actions" },

];
