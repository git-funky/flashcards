/* ============================================================================
 * Spanish Flashcards — word list
 * ----------------------------------------------------------------------------
 * Each entry:
 *   image      — path to the image (relative to index.html)
 *   answer     — canonical answer including the article ("el" / "la")
 *   alternates — optional array of additional accepted answers (also with
 *                article). Useful for regional variants (e.g. "el refrigerador"
 *                vs "la nevera"). Accents are NOT required here — the matcher
 *                strips them before comparing — but keep the canonical answer
 *                spelled correctly because that's what's shown when wrong.
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
  { image: "images/trastes.jpg",    answer: "los trastes" },
  { image: "images/cuchillo.jpg",  answer: "el cuchillo" },
  { image: "images/tenedor.jpg",   answer: "el tenedor" },
  { image: "images/cuchara.jpg",   answer: "la cuchara" },
  { image: "images/plato.jpg",     answer: "el plato" },
  { image: "images/vaso.jpg",      answer: "el vaso" },
  { image: "images/taza.jpg",      answer: "la taza" },

  // --- Cookware ---
  { image: "images/sarten.jpg",    answer: "la sartén" },
  { image: "images/olla.jpg",      answer: "la olla" },

  // --- Appliances ---
  { image: "images/horno.jpg",     answer: "el horno" },
  { image: "images/nevera.jpg",    answer: "la nevera",
    alternates: ["el refrigerador", "el frigorífico"] },
  { image: "images/microondas.jpg",answer: "el microondas" },
  { image: "images/estufa.jpg",    answer: "la estufa",
    alternates: ["la cocina"] },
  { image: "images/fregadero.jpg", answer: "el fregadero" },

  // --- Furniture ---
  { image: "images/mesa.jpg",      answer: "la mesa" },
  { image: "images/silla.jpg",     answer: "la silla" },

  // --- Food ---
  { image: "images/pan.jpg",       answer: "el pan" },
  { image: "images/queso.jpg",     answer: "el queso" },
  { image: "images/manzana.jpg",   answer: "la manzana" },
  { image: "images/huevo.jpg",     answer: "el huevo" },
  { image: "images/ajo.jpg",       answer: "el ajo" },
  { image: "images/yema.jpg",       answer: "la yema" },  
  { image: "images/harina.jpg",    answer: "la harina" },
  { image: "images/mantequilla.jpg", answer: "la mantequilla"},
  { image: "images/tarta.jpg",    answer: "la tarta",
    alternates: ["el pastel"] },
  { image: "images/champiñon.jpg",    answer: "el champiñon",
    alternates: ["el hongo"] },
  { image: "images/batidora.jpg",    answer: "la batidora",
    alternates: ["la licuadora"] },
  { image: "images/cebolla.jpg",     answer: "la cebolla" },
  { image: "images/chorizo.jpg",     answer: "el chorizo" },
  { image: "images/jamon.jpg",       answer: "el jamón" },
  { image: "images/oliva.jpg",       answer: "la oliva",
    alternates: ["la aceituna"] },
  { image: "images/patata.jpg",      answer: "la patata",
    alternates: ["la papa"] },
  

  // --- Drink & pantry ---
  { image: "images/leche.jpg",     answer: "la leche" },
  { image: "images/sal.jpg",       answer: "la sal" },
  { image: "images/azucar.jpg",    answer: "el azúcar" },
  { image: "images/cafe.jpg",      answer: "el café" },
  { image: "images/aceite.jpg",    answer: "el aceite" },
  { image: "images/aceite-de-oliva.jpg", answer: "el aceite de oliva" },
  { image: "images/vinagre.jpg",   answer: "el vinagre" },
  { image: "images/botella.jpg",   answer: "la botella" },

  // --- Actions ---
  { image: "images/batir.gif",     answer: "batir" },
  { image: "images/mezclar.gif",   answer: "mezclar" },
  { image: "images/hervir.gif",   answer: "hervir" },
  { image: "images/cortar.gif",   answer: "cortar" },

];
