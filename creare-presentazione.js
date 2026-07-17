const PptxGenJS = require("./dist/pptxgen.cjs");

// Crea una nuova presentazione
const prs = new PptxGenJS();

// Imposta le proprietà della presentazione
prs.defineLayout({ name: "LAYOUT1", width: 10, height: 7.5 });
prs.layout = "LAYOUT1";

// ============ SLIDE 1: TITOLO ============
let slide1 = prs.addSlide();
slide1.background = { color: "366092" }; // Sfondo blu

slide1.addText("Il Mio Progetto Scolastico", {
  x: 0.5,
  y: 2.5,
  w: 9,
  h: 1.5,
  fontSize: 54,
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide1.addText("Creato con PptxGenJS", {
  x: 0.5,
  y: 4.2,
  w: 9,
  h: 0.8,
  fontSize: 28,
  color: "CCCCCC",
  align: "center"
});

// ============ SLIDE 2: CONTENUTO ============
let slide2 = prs.addSlide();
slide2.background = { color: "FFFFFF" };

slide2.addText("Contenuto della Presentazione", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 40,
  bold: true,
  color: "366092"
});

// Aggiungi un elenco puntato
let bulletPoints = [
  "Primo argomento importante",
  "Secondo argomento interessante",
  "Terzo argomento rilevante",
  "Quarto argomento da approfondire"
];

slide2.addText(bulletPoints, {
  x: 1,
  y: 1.5,
  w: 8,
  h: 4.5,
  fontSize: 24,
  bullet: true,
  color: "000000"
});

// ============ SLIDE 3: TABELLA ============
let slide3 = prs.addSlide();
slide3.background = { color: "FFFFFF" };

slide3.addText("Esempio di Tabella", {
  x: 0.5,
  y: 0.5,
  w: 9,
  h: 0.8,
  fontSize: 40,
  bold: true,
  color: "366092"
});

let tableData = [
  [
    { text: "Colonna 1", bold: true, color: "FFFFFF", fill: "366092" },
    { text: "Colonna 2", bold: true, color: "FFFFFF", fill: "366092" },
    { text: "Colonna 3", bold: true, color: "FFFFFF", fill: "366092" }
  ],
  [
    { text: "Dato 1" },
    { text: "Dato 2" },
    { text: "Dato 3" }
  ],
  [
    { text: "Dato 4" },
    { text: "Dato 5" },
    { text: "Dato 6" }
  ]
];

slide3.addTable(tableData, {
  x: 1,
  y: 1.5,
  w: 8,
  h: 4.5,
  border: { pt: 1, color: "CCCCCC" },
  align: "center"
});

// ============ SALVA LA PRESENTAZIONE ============
prs.writeFile({ fileName: "presentazione.pptx" });
console.log("✅ Presentazione creata: presentazione.pptx");
