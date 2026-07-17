/**
 * Studio di fattibilità strategica — Nuovo magazzino e laboratorio logistico (TMWE)
 * Deck in stile consulenziale generato con PptxGenJS.
 *
 * NB: il logo/monogramma in alto a destra è un segnaposto discreto ("ITS ACADEMY").
 *     Sostituire il monogramma e il nome con il logo e la denominazione reali della scuola.
 */
const PptxGenJS = require("./dist/pptxgen.cjs");

const prs = new PptxGenJS();
prs.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
prs.layout = "WIDE";
prs.author = "Raju Ferrisi";
prs.company = "ITS Academy";
prs.title = "Studio di fattibilità — Nuovo polo logistico TMWE";

/* ---------- Design system ---------- */
const BG    = "F8F7F4"; // bianco sporco (off-white)
const INK   = "1C2A32"; // near-black headline
const BODY  = "525C64"; // grigio testo
const MUTE  = "8C949B"; // grigio chiaro etichette
const GREEN = "1E6B57"; // verde primario (mobilità sostenibile)
const GREEND= "134A3C"; // verde scuro
const GREENL= "DBE7E1"; // verde tenue (pannelli)
const GOLD  = "B0812E"; // accento caldo
const GOLDL = "EFE6D2"; // accento caldo tenue
const LINE  = "E4E1D9"; // divisori
const WHITE = "FFFFFF";
const CARD  = "FFFFFF";

const SERIF = "Georgia";
const SANS  = "Arial";

const W = 13.333, H = 7.5;
const MX = 0.7;                 // margine sinistro
const CW = W - MX * 2;          // larghezza contenuto

/* ---------- Elementi ricorrenti ---------- */
function bg(slide) { slide.background = { color: BG }; }

// Logo + nome scuola: sempre in alto a destra, identico su tutte le slide.
function brand(slide) {
  const lx = 12.55, ly = 0.30, ls = 0.42;
  slide.addShape("roundRect", { x: lx, y: ly, w: ls, h: ls, rectRadius: 0.06, fill: { color: GREEN }, line: { type: "none" } });
  // motivo "rete/nodi"
  slide.addShape("line", { x: lx + 0.11, y: ly + 0.30, w: 0.20, h: -0.18, line: { color: WHITE, width: 1.25 } });
  slide.addShape("oval", { x: lx + 0.065, y: ly + 0.255, w: 0.09, h: 0.09, fill: { color: WHITE }, line: { type: "none" } });
  slide.addShape("oval", { x: lx + 0.265, y: ly + 0.075, w: 0.09, h: 0.09, fill: { color: GOLD }, line: { type: "none" } });
  slide.addText(
    [
      { text: "ITS ACADEMY", options: { fontFace: SANS, bold: true, fontSize: 9.5, color: INK, charSpacing: 1.5, breakLine: true } },
      { text: "Mobilità Sostenibile", options: { fontFace: SANS, fontSize: 7.5, color: MUTE, breakLine: false } },
    ],
    { x: 10.0, y: 0.28, w: 2.42, h: 0.46, align: "right", valign: "middle", lineSpacingMultiple: 1.0 }
  );
}

// Intestazione slide di contenuto
function head(slide, kicker, title, opts = {}) {
  slide.addText(kicker.toUpperCase(), {
    x: MX, y: 0.52, w: 8.6, h: 0.26, fontFace: SANS, bold: true, fontSize: 10.5,
    color: GREEN, charSpacing: 2.4, align: "left", valign: "middle",
  });
  slide.addText(title, {
    x: MX, y: 0.82, w: opts.tw || 10.8, h: opts.th || 0.9, fontFace: SERIF, fontSize: opts.fs || 27,
    color: INK, align: "left", valign: "top", lineSpacingMultiple: 1.02,
  });
  slide.addShape("line", { x: MX, y: 0.78, w: 0.52, h: 0, line: { color: GOLD, width: 2.25 } });
}

// Footer + numero pagina
function foot(slide, n) {
  slide.addShape("line", { x: MX, y: 7.02, w: CW, h: 0, line: { color: LINE, width: 1 } });
  slide.addText("Studio di fattibilità · Nuovo magazzino e laboratorio logistico · TMWE", {
    x: MX, y: 7.08, w: 9, h: 0.28, fontFace: SANS, fontSize: 7.5, color: MUTE, align: "left", valign: "middle",
  });
  slide.addText(`${String(n).padStart(2, "0")} / 19`, {
    x: W - MX - 2, y: 7.08, w: 2, h: 0.28, fontFace: SANS, fontSize: 7.5, color: MUTE, align: "right", valign: "middle",
  });
}

// Barra "messaggio chiave" (chiude ogni sezione con un take-away memorabile)
function keyMsg(slide, text, y = 6.34) {
  slide.addShape("roundRect", { x: MX, y, w: CW, h: 0.5, rectRadius: 0.05, fill: { color: GREENL }, line: { type: "none" } });
  slide.addShape("rect", { x: MX, y, w: 0.07, h: 0.5, fill: { color: GREEN }, line: { type: "none" } });
  slide.addText(
    [
      { text: "MESSAGGIO CHIAVE   ", options: { fontFace: SANS, bold: true, fontSize: 8.5, color: GREEN, charSpacing: 1.5 } },
      { text: text, options: { fontFace: SANS, fontSize: 11.5, color: GREEND } },
    ],
    { x: MX + 0.28, y, w: CW - 0.5, h: 0.5, align: "left", valign: "middle", lineSpacingMultiple: 0.98 }
  );
}

// Card contenitore
function card(slide, x, y, w, h, o = {}) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: o.r || 0.08,
    fill: { color: o.fill || CARD }, line: { color: o.line || LINE, width: o.lw || 1 },
    shadow: o.shadow === false ? undefined : { type: "outer", color: "D9D5CC", blur: 7, offset: 2, angle: 90, opacity: 0.45 },
  });
}

// Stat compatta (numero grande + label)
function stat(slide, x, y, w, num, label, o = {}) {
  slide.addText(num, {
    x, y, w, h: o.nh || 0.6, fontFace: SERIF, fontSize: o.fs || 34, bold: false,
    color: o.color || GREEN, align: o.align || "left", valign: "bottom",
  });
  slide.addText(label.toUpperCase(), {
    x, y: y + (o.nh || 0.6) + 0.02, w, h: 0.5, fontFace: SANS, fontSize: o.ls || 9,
    color: o.lc || BODY, align: o.align || "left", valign: "top", charSpacing: 0.6, lineSpacingMultiple: 0.98,
  });
}

// Opzioni grafico comuni (sfondo bianco per massima leggibilità)
function chartBase(extra = {}) {
  return Object.assign({
    chartColors: [GREEN, GOLD, "7FA99B", "C9B27E", "9AA3AA"],
    showLegend: false, showTitle: false,
    chartArea: { fill: { color: WHITE } }, plotArea: { fill: { color: WHITE } },
    catAxisLabelColor: BODY, catAxisLabelFontFace: SANS, catAxisLabelFontSize: 10,
    valAxisLabelColor: MUTE, valAxisLabelFontFace: SANS, valAxisLabelFontSize: 9,
    catAxisLineShow: false, valAxisLineShow: false,
    valGridLine: { style: "none" }, catGridLine: { style: "none" },
    dataLabelFontFace: SANS, dataLabelColor: INK, dataLabelFontBold: true,
  }, extra);
}

/* =====================================================================
   SLIDE 1 — COPERTINA
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s);
  brand(s);

  // barra verticale accento + grande numero tenue
  s.addShape("rect", { x: MX, y: 1.7, w: 0.09, h: 3.35, fill: { color: GREEN }, line: { type: "none" } });
  s.addText("01", { x: 9.7, y: 1.2, w: 3.2, h: 3.2, fontFace: SERIF, fontSize: 200, color: "EDEAE2", align: "right", valign: "middle" });

  s.addText("STUDIO DI FATTIBILITÀ STRATEGICA", {
    x: MX + 0.32, y: 1.72, w: 9, h: 0.3, fontFace: SANS, bold: true, fontSize: 12.5, color: GREEN, charSpacing: 3,
  });
  s.addText("Dove aprire il prossimo\npolo logistico di TMWE", {
    x: MX + 0.3, y: 2.18, w: 9.4, h: 1.9, fontFace: SERIF, fontSize: 46, color: INK, lineSpacingMultiple: 1.02,
  });
  s.addText(
    "Localizzazione di un nuovo magazzino e laboratorio per diversificare la rete oltre la Lombardia e recuperare margine sull'ultimo miglio.",
    { x: MX + 0.32, y: 4.15, w: 8.7, h: 0.9, fontFace: SANS, fontSize: 14, color: BODY, lineSpacingMultiple: 1.25 }
  );

  // riga credenziali
  s.addShape("line", { x: MX + 0.32, y: 5.5, w: 10.2, h: 0, line: { color: LINE, width: 1 } });
  const cred = [
    ["Corsista", "Raju Ferrisi"],
    ["Tutor aziendale", "Imane Smouni"],
    ["Anno formativo", "2025 / 2026"],
    ["Percorso", "Logistica intermodale e sostenibile"],
  ];
  cred.forEach((c, i) => {
    const x = MX + 0.32 + i * 2.62;
    s.addText(c[0].toUpperCase(), { x, y: 5.66, w: 2.5, h: 0.24, fontFace: SANS, bold: true, fontSize: 8, color: MUTE, charSpacing: 1.2 });
    s.addText(c[1], { x, y: 5.9, w: 2.5, h: 0.5, fontFace: SANS, fontSize: 11.5, color: INK, lineSpacingMultiple: 0.95 });
  });
})();

/* =====================================================================
   SLIDE 2 — LA SFIDA STRATEGICA (hook)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "Il punto di partenza", "Un'azienda che cresce, ma poggia su un solo bacino");

  s.addText(
    "TMWE ha più che triplicato il fatturato in tre anni. La sua forza operativa — la concentrazione su Milano — è però anche la sua fragilità strategica.",
    { x: MX, y: 1.78, w: 6.0, h: 1.1, fontFace: SANS, fontSize: 13.5, color: BODY, lineSpacingMultiple: 1.3 }
  );

  // tre fatti chiave in colonna
  const facts = [
    ["×3,2", "Fatturato 2020 → 2023", "da €2,33 a €7,48 milioni", GREEN],
    ["96,4%", "Operazioni su vettori terzi", "DHL, FedEx e UPS come fornitori", GOLD],
    ["77,6%", "Ritiri nazionali dalla Lombardia", "domanda concentrata su un'unica area", GREEN],
  ];
  facts.forEach((f, i) => {
    const y = 3.05 + i * 1.08;
    s.addText(f[0], { x: MX, y: y, w: 1.85, h: 0.9, fontFace: SERIF, fontSize: 40, color: f[3], align: "left", valign: "middle" });
    s.addText(f[1], { x: MX + 2.0, y: y + 0.06, w: 4.2, h: 0.36, fontFace: SANS, bold: true, fontSize: 13, color: INK });
    s.addText(f[2], { x: MX + 2.0, y: y + 0.44, w: 4.2, h: 0.36, fontFace: SANS, fontSize: 10.5, color: MUTE });
    if (i < 2) s.addShape("line", { x: MX, y: y + 1.0, w: 6.1, h: 0, line: { color: LINE, width: 1 } });
  });

  // pannello domanda (destra)
  card(s, 7.35, 1.78, 5.28, 4.35, { fill: INK, line: INK });
  s.addText("LA DOMANDA DELLO STUDIO", { x: 7.75, y: 2.2, w: 4.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: "9BC7B8", charSpacing: 2 });
  s.addText("Dove conviene aprire il secondo polo logistico?", {
    x: 7.75, y: 2.55, w: 4.5, h: 1.5, fontFace: SERIF, fontSize: 25, color: WHITE, lineSpacingMultiple: 1.05,
  });
  s.addShape("line", { x: 7.75, y: 4.15, w: 4.48, h: 0, line: { color: "3A4E58", width: 1 } });
  s.addText(
    "Una scelta da fondare sui dati — non sulle intuizioni — attraverso l'analisi dell'intera rete di ritiri e un metodo di selezione trasparente.",
    { x: 7.75, y: 4.3, w: 4.5, h: 1.5, fontFace: SANS, fontSize: 12.5, color: "CFE0DA", lineSpacingMultiple: 1.35 }
  );

  keyMsg(s, "Diversificare fuori dalla Lombardia è la leva per ridurre il rischio e liberare nuovo margine.");
  foot(s, 2);
})();

/* =====================================================================
   SLIDE 3 — TMWE IN SINTESI
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "01 · L'azienda", "TMWE: freight forwarder internazionale, modello asset-light");

  s.addText(
    "Nata nel 1999 e operativa dal 2005, Transport Management Worldwide Express opera come spedizioniere internazionale in un network globale, mantenendo il controllo commerciale del cliente senza possedere gli asset di trasporto.",
    { x: MX, y: 1.75, w: 11.6, h: 0.8, fontFace: SANS, fontSize: 12.5, color: BODY, lineSpacingMultiple: 1.3 }
  );

  const items = [
    ["1999", "Anno di fondazione", "operatività dal 2005 (Milano)"],
    ["7.000+", "Affiliate nel network", "in oltre 190 Paesi"],
    ["82.766", "Spedizioni analizzate", "database consolidato su 17 variabili"],
    ["16,4%", "Margine lordo di intermediazione", "modello multi-vettore ad alta rotazione"],
  ];
  items.forEach((it, i) => {
    const x = MX + i * 2.98;
    card(s, x, 2.72, 2.78, 1.7);
    stat(s, x + 0.28, 2.95, 2.3, it[0], it[1], { fs: 30, nh: 0.55, ls: 9, lc: INK });
    s.addText(it[2], { x: x + 0.28, y: 3.96, w: 2.3, h: 0.4, fontFace: SANS, fontSize: 8.5, color: MUTE, lineSpacingMultiple: 0.95 });
  });

  // motto + valori
  card(s, MX, 4.7, 7.1, 1.5, { fill: GOLDL, line: "E4D6B4" });
  s.addText("«We go far and keep close to you»", { x: MX + 0.35, y: 4.9, w: 6.5, h: 0.5, fontFace: SERIF, italic: true, fontSize: 19, color: GOLD });
  s.addText("Copertura globale e prossimità al cliente: il posizionamento sintetizzato dal motto aziendale.", {
    x: MX + 0.35, y: 5.5, w: 6.4, h: 0.6, fontFace: SANS, fontSize: 11, color: "8A6E2E", lineSpacingMultiple: 1.2,
  });

  const vals = [["Affidabilità", "OTD fino al 79,8% sui nodi presidiati"], ["Flessibilità", "arbitraggio tariffe multi-vettore"], ["Prossimità", "referente diretto e gestione su misura"]];
  vals.forEach((v, i) => {
    const y = 4.7 + i * 0.51;
    s.addShape("oval", { x: 8.1, y: y + 0.14, w: 0.12, h: 0.12, fill: { color: GREEN }, line: { type: "none" } });
    s.addText([{ text: v[0] + "  ", options: { bold: true, color: INK } }, { text: v[1], options: { color: BODY } }],
      { x: 8.35, y: y, w: 4.3, h: 0.5, fontFace: SANS, fontSize: 10.5, valign: "middle", lineSpacingMultiple: 0.95 });
  });

  foot(s, 3);
})();

/* =====================================================================
   SLIDE 4 — MODELLO MULTI-CARRIER (doughnut)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "01 · Il modello operativo", "Multi-carrier: arbitrare i grandi network, controllare il cliente");

  card(s, MX, 1.9, 5.6, 4.2);
  s.addChart(prs.ChartType.doughnut, [{
    name: "Mix vettori",
    labels: ["DHL Express", "FedEx", "UPS", "Marchio proprio", "Flotta interna"],
    values: [64.3, 11.3, 10.8, 9.7, 3.8],
  }], chartBase({
    x: MX + 0.15, y: 2.05, w: 5.3, h: 3.9,
    holeSize: 58, showLegend: true, legendPos: "b", legendColor: BODY, legendFontFace: SANS, legendFontSize: 10,
    showValue: true, dataLabelPosition: "bestFit", dataLabelFormatCode: '0.0"%"', dataLabelColor: WHITE, dataLabelFontSize: 9,
    chartColors: [GREEN, GOLD, "7FA99B", "BEA063", "AEB5BB"],
  }));

  // lettura a destra
  s.addText("Il 96,4% dei trasporti è affidato a network terzi.", {
    x: 6.7, y: 2.05, w: 5.9, h: 0.7, fontFace: SERIF, fontSize: 20, color: INK, lineSpacingMultiple: 1.05,
  });
  s.addText(
    "L'assetto asset-light consente di scegliere, per ogni spedizione, il vettore migliore per direttrice, urgenza e fascia di peso — mantenendo il controllo commerciale del cliente.",
    { x: 6.7, y: 2.95, w: 5.9, h: 1.0, fontFace: SANS, fontSize: 12, color: BODY, lineSpacingMultiple: 1.3 }
  );

  const rows = [
    ["DHL Express Domestic", "39.224 spedizioni · servizio più utilizzato"],
    ["Express 9:00 / 12:00", "7.564 spedizioni time-definite premium"],
    ["Spedizioni assicurate", "12,6% dei volumi · valore medio €2.419"],
  ];
  rows.forEach((r, i) => {
    const y = 4.15 + i * 0.62;
    s.addShape("rect", { x: 6.7, y: y + 0.05, w: 0.05, h: 0.44, fill: { color: GOLD }, line: { type: "none" } });
    s.addText([{ text: r[0] + "\n", options: { bold: true, fontSize: 11.5, color: INK } }, { text: r[1], options: { fontSize: 10, color: MUTE } }],
      { x: 6.9, y: y, w: 5.7, h: 0.58, fontFace: SANS, valign: "middle", lineSpacingMultiple: 0.98 });
  });

  keyMsg(s, "La forza è la flessibilità; il limite è la dipendenza quasi totale dai vettori terzi.");
  foot(s, 4);
})();

/* =====================================================================
   SLIDE 5 — CRESCITA & BASE DATI
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "01 · Traguardi & metodo", "Una crescita solida, analizzata con rigore data-driven");

  // sinistra: crescita fatturato
  card(s, MX, 1.9, 5.9, 4.2);
  s.addText("FATTURATO (€ MILIONI)", { x: MX + 0.3, y: 2.08, w: 5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.5 });
  s.addChart(prs.ChartType.bar, [{ name: "Fatturato", labels: ["2020", "2023"], values: [2.33, 7.48] }],
    chartBase({
      x: MX + 0.15, y: 2.5, w: 3.4, h: 3.35, barDir: "col", barGapWidthPct: 90,
      chartColors: ["BFCFC9", GREEN],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '€0.00', dataLabelFontSize: 11, dataLabelColor: INK,
      valAxisHidden: true, valAxisMaxVal: 9, catAxisLabelFontSize: 11,
    }));
  s.addText("+221%", { x: MX + 3.55, y: 2.7, w: 2.2, h: 0.7, fontFace: SERIF, fontSize: 34, color: GREEN, align: "center" });
  s.addText("in un triennio", { x: MX + 3.55, y: 3.42, w: 2.2, h: 0.3, fontFace: SANS, fontSize: 10.5, color: MUTE, align: "center" });
  s.addShape("line", { x: MX + 3.7, y: 3.95, w: 1.9, h: 0, line: { color: LINE, width: 1 } });
  s.addText([{ text: "16,4%\n", options: { fontFace: SERIF, fontSize: 22, color: GOLD } }, { text: "margine lordo di rete", options: { fontFace: SANS, fontSize: 9.5, color: MUTE } }],
    { x: MX + 3.55, y: 4.15, w: 2.2, h: 1.2, align: "center", valign: "top", lineSpacingMultiple: 0.9 });

  // destra: base dati / metodo
  card(s, 6.75, 1.9, 5.88, 4.2, { fill: INK, line: INK });
  s.addText("LA BASE DELL'ANALISI", { x: 7.1, y: 2.12, w: 5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: "9BC7B8", charSpacing: 2 });
  s.addText("Da gestione esperienziale a decisione data-driven", {
    x: 7.1, y: 2.42, w: 5.2, h: 0.9, fontFace: SERIF, fontSize: 20, color: WHITE, lineSpacingMultiple: 1.03,
  });
  const db = [["82.766", "record normalizzati"], ["17", "variabili operative ed economiche"], ["420", "città ricondotte a nomi univoci"], ["222", "incoerenze città/regione corrette"]];
  db.forEach((d, i) => {
    const x = 7.1 + (i % 2) * 2.75, y = 3.55 + Math.floor(i / 2) * 1.12;
    s.addText(d[0], { x, y, w: 2.6, h: 0.5, fontFace: SERIF, fontSize: 27, color: "9BC7B8", valign: "bottom" });
    s.addText(d[1], { x, y: y + 0.5, w: 2.6, h: 0.5, fontFace: SANS, fontSize: 9.5, color: "CFE0DA", lineSpacingMultiple: 0.95 });
  });

  keyMsg(s, "Ogni raccomandazione poggia su un database consolidato e normalizzato, non su stime.");
  foot(s, 5);
})();

/* =====================================================================
   SLIDE 6 — RITIRI ESTERI
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "03 · Ritiri dall'estero", "Il flusso internazionale è sottile, selettivo e presidiabile");

  s.addText([{ text: "1.122 ritiri esteri  ", options: { bold: true, color: INK } }, { text: "(1,36% del totale) · 5 nazioni concentrano il 94,8% del flusso", options: { color: BODY } }],
    { x: MX, y: 1.72, w: 11.6, h: 0.35, fontFace: SANS, fontSize: 12.5 });

  card(s, MX, 2.2, 6.5, 3.9);
  s.addChart(prs.ChartType.bar, [{ name: "Ritiri", labels: ["Germania", "Francia", "Spagna", "Stati Uniti", "Singapore"], values: [427, 263, 160, 107, 107] }],
    chartBase({
      x: MX + 0.1, y: 2.35, w: 6.25, h: 3.6, barDir: "bar", barGapWidthPct: 55,
      chartColors: [GREEN, "5E8B7C", "8DA99F", "B7C7C0", "B7C7C0"],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 10, dataLabelColor: INK,
      valAxisHidden: true, catAxisLabelFontSize: 11, barGrouping: "clustered",
    }));

  // corridoio Germania → Bologna
  card(s, 7.4, 2.2, 5.23, 3.9, { fill: GREENL, line: "C7DAD2" });
  s.addText("38,1%", { x: 7.75, y: 2.4, w: 4.5, h: 0.7, fontFace: SERIF, fontSize: 40, color: GREEN });
  s.addText("del flusso estero arriva dalla Germania — il corridoio a maggior valore.", {
    x: 7.75, y: 3.15, w: 4.55, h: 0.8, fontFace: SANS, bold: true, fontSize: 13, color: GREEND, lineSpacingMultiple: 1.2,
  });
  s.addShape("line", { x: 7.75, y: 4.05, w: 4.5, h: 0, line: { color: "C7DAD2", width: 1 } });
  s.addText(
    "Il valico del Brennero ha in Bologna il terminale naturale del corridoio TEN-T Scandinavo-Mediterraneo: una sede sull'asse A1/Brennero riceve il 38% dell'estero senza rotture di carico.",
    { x: 7.75, y: 4.2, w: 4.55, h: 1.7, fontFace: SANS, fontSize: 11.5, color: GREEND, lineSpacingMultiple: 1.3 }
  );

  keyMsg(s, "I volumi esteri non impongono un hub oltreconfine, ma premiano una sede sull'asse del Brennero.");
  foot(s, 6);
})();

/* =====================================================================
   SLIDE 7 — GEOGRAFIA ITALIA
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "04 · Analisi geografica", "La domanda nazionale vive sulla dorsale padana");

  s.addText([{ text: "81.644 ritiri nazionali  ", options: { bold: true, color: INK } }, { text: "(98,6% del totale). La dorsale Lombardia–Emilia concentra l'87,0% dei volumi.", options: { color: BODY } }],
    { x: MX, y: 1.72, w: 11.6, h: 0.35, fontFace: SANS, fontSize: 12.5 });

  card(s, MX, 2.2, 6.3, 3.9);
  s.addChart(prs.ChartType.bar, [{ name: "Ritiri", labels: ["Nord Italia", "Centro Italia", "Sud e Isole"], values: [73512, 5698, 2434] }],
    chartBase({
      x: MX + 0.1, y: 2.4, w: 6.05, h: 3.5, barDir: "bar", barGapWidthPct: 60,
      chartColors: [GREEN, "9AB0A8", "C3CBC7"],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 11, dataLabelColor: INK, dataLabelFormatCode: "#,##0",
      valAxisHidden: true, catAxisLabelFontSize: 11.5,
    }));

  const q = [["90,0%", "Nord Italia", "231 ritiri per città attiva", GREEN], ["7,0%", "Centro Italia", "presidio leggero, flussi sottili", GOLD], ["3,0%", "Sud e Isole", "domanda distribuita su 4 poli", BODY]];
  q.forEach((r, i) => {
    const y = 2.35 + i * 1.2;
    s.addText(r[0], { x: 7.35, y, w: 1.6, h: 0.7, fontFace: SERIF, fontSize: 30, color: r[3], valign: "middle" });
    s.addText(r[1], { x: 9.05, y: y + 0.06, w: 3.6, h: 0.4, fontFace: SANS, bold: true, fontSize: 13, color: INK });
    s.addText(r[2], { x: 9.05, y: y + 0.44, w: 3.6, h: 0.4, fontFace: SANS, fontSize: 10, color: MUTE });
    if (i < 2) s.addShape("line", { x: 7.35, y: y + 1.08, w: 5.28, h: 0, line: { color: LINE, width: 1 } });
  });

  keyMsg(s, "Fuori dalla Lombardia, l'Emilia-Romagna è la prima regione: 7.700 ritiri, il naturale secondo polo.");
  foot(s, 7);
})();

/* =====================================================================
   SLIDE 8 — CITTÀ SOPRA SOGLIA
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "05 · Densità operativa", "Solo tre nodi superano la soglia di sostenibilità");

  s.addText("Soglia critica: 10 ritiri/giorno rendono economicamente sensata una presenza fisica dedicata.", {
    x: MX, y: 1.72, w: 11.6, h: 0.35, fontFace: SANS, fontSize: 12.5, color: BODY,
  });

  // barre orizzontali "manuali" per controllare soglia
  const data = [["Milano", 199.7, "63.361 Lombardia"], ["Origgio (VA)", 40.9, "satellite di Milano"], ["Bologna", 30.1, "unico extra-Lombardia"], ["Roma", 11.4, ""], ["Firenze", 7.1, ""], ["Napoli", 2.8, ""]];
  const cx = MX, cy = 2.35, cwid = 8.6, rowH = 0.62, maxV = 205;
  const barMax = cwid - 2.2;
  data.forEach((d, i) => {
    const y = cy + i * rowH;
    const isTop3 = i < 3;
    s.addText(d[0], { x: cx, y, w: 1.9, h: rowH - 0.14, fontFace: SANS, bold: isTop3, fontSize: 11, color: isTop3 ? INK : MUTE, valign: "middle", align: "right" });
    const bw = Math.max(0.06, (d[1] / maxV) * barMax);
    s.addShape("roundRect", { x: cx + 2.05, y: y + 0.09, w: bw, h: 0.28, rectRadius: 0.03, fill: { color: isTop3 ? GREEN : "C7CDC9" }, line: { type: "none" } });
    s.addText(`${d[1].toString().replace(".", ",")} /gg`, { x: cx + 2.15 + bw, y: y + 0.02, w: 1.6, h: 0.42, fontFace: SANS, bold: true, fontSize: 10, color: isTop3 ? GREEN : MUTE, valign: "middle" });
  });
  // linea soglia 10/gg
  const thX = cx + 2.05 + (10 / maxV) * barMax;
  s.addShape("line", { x: thX, y: cy - 0.05, w: 0, h: rowH * 6 + 0.05, line: { color: GOLD, width: 1.25, dashType: "dash" } });
  s.addText("SOGLIA 10/GG", { x: thX - 0.55, y: cy + rowH * 6 + 0.02, w: 1.6, h: 0.25, fontFace: SANS, bold: true, fontSize: 7.5, color: GOLD, charSpacing: 1 });

  // pannello destra
  card(s, 11.05, 2.35, 1.58, rowH * 6 - 0.1, { fill: INK, line: INK });
  s.addText("3", { x: 11.05, y: 2.75, w: 1.58, h: 1.0, fontFace: SERIF, fontSize: 64, color: WHITE, align: "center" });
  s.addText("nodi\nsopra soglia", { x: 11.05, y: 3.85, w: 1.58, h: 0.7, fontFace: SANS, fontSize: 10, color: "CFE0DA", align: "center", lineSpacingMultiple: 0.95 });
  s.addText("gli altri poli restano sotto i 4/gg", { x: 11.05, y: 4.7, w: 1.58, h: 0.9, fontFace: SANS, fontSize: 8.5, color: "9BC7B8", align: "center", lineSpacingMultiple: 1.1 });

  keyMsg(s, "Milano e Origgio sono in Lombardia: Bologna è l'unico candidato che supera la soglia altrove.");
  foot(s, 8);
})();

/* =====================================================================
   SLIDE 9 — MERCATO RESIDUO (deciding)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "07 · Il dato che decide", "Escludendo la Lombardia, non esiste una seconda opzione");

  s.addText("Vincolo aziendale: la Lombardia è esclusa perché già pienamente presidiata. Il mercato residuo vale 18.283 ritiri/anno.", {
    x: MX, y: 1.72, w: 11.6, h: 0.35, fontFace: SANS, fontSize: 12.5, color: BODY,
  });

  // Bologna grande vs alternative
  card(s, MX, 2.25, 4.1, 3.9, { fill: GREEN, line: GREEN });
  s.addText("BOLOGNA", { x: MX, y: 2.55, w: 4.1, h: 0.35, fontFace: SANS, bold: true, fontSize: 13, color: "BFE0D6", charSpacing: 3, align: "center" });
  s.addText("41,1%", { x: MX, y: 2.95, w: 4.1, h: 1.3, fontFace: SERIF, fontSize: 76, color: WHITE, align: "center" });
  s.addText("del mercato extra-Lombardia\nconcentrato in un solo nodo", { x: MX, y: 4.35, w: 4.1, h: 0.8, fontFace: SANS, fontSize: 12, color: "DCEDE7", align: "center", lineSpacingMultiple: 1.2 });
  s.addShape("line", { x: MX + 0.5, y: 5.3, w: 3.1, h: 0, line: { color: "4C8A78", width: 1 } });
  s.addText("7.520 ritiri/anno · €357 mila di ricavi già attivi", { x: MX, y: 5.42, w: 4.1, h: 0.6, fontFace: SANS, fontSize: 10.5, color: "BFE0D6", align: "center", lineSpacingMultiple: 1.15 });

  // confronto con alternative
  card(s, 5.05, 2.25, 4.05, 3.9);
  s.addText("LE SUCCESSIVE ALTERNATIVE", { x: 5.35, y: 2.5, w: 3.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.5 });
  const alt = [["Roma", 2861], ["Firenze", 1768], ["Napoli", 701], ["Genova", 657], ["Padova", 447]];
  const amax = 3000, aBarMax = 2.0;
  alt.forEach((a, i) => {
    const y = 2.95 + i * 0.6;
    s.addText(a[0], { x: 5.35, y, w: 1.1, h: 0.4, fontFace: SANS, fontSize: 10.5, color: INK, valign: "middle" });
    const bw = Math.max(0.05, (a[1] / amax) * aBarMax);
    s.addShape("roundRect", { x: 6.45, y: y + 0.06, w: bw, h: 0.26, rectRadius: 0.03, fill: { color: "C7CDC9" }, line: { type: "none" } });
    s.addText(a[1].toLocaleString("it-IT"), { x: 6.5 + bw, y: y - 0.02, w: 1.2, h: 0.42, fontFace: SANS, fontSize: 9.5, color: MUTE, valign: "middle" });
  });

  // distacco 2.6x
  card(s, 9.05, 2.25, 3.58, 3.9, { fill: GOLDL, line: "E4D6B4" });
  s.addText("2,6×", { x: 9.05, y: 2.7, w: 3.58, h: 1.0, fontFace: SERIF, fontSize: 62, color: GOLD, align: "center" });
  s.addText("il distacco tra Bologna\ne la prima alternativa (Roma)", { x: 9.25, y: 3.75, w: 3.2, h: 0.7, fontFace: SANS, bold: true, fontSize: 12.5, color: "8A6E2E", align: "center", lineSpacingMultiple: 1.15 });
  s.addShape("line", { x: 9.55, y: 4.6, w: 2.6, h: 0, line: { color: "E4D6B4", width: 1 } });
  s.addText("pari a +19 ritiri/giorno di differenza: nei dati non c'è una seconda scelta comparabile.", { x: 9.25, y: 4.75, w: 3.2, h: 1.2, fontFace: SANS, fontSize: 11, color: "8A6E2E", align: "center", lineSpacingMultiple: 1.3 });

  keyMsg(s, "Bologna vale da sola quanto le nove città successive messe insieme: la partita è decisa dai numeri.");
  foot(s, 9);
})();

/* =====================================================================
   SLIDE 10 — METODO DI SELEZIONE (process)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "08 · Studio di fattibilità", "Un metodo in tre fasi, dalla domanda alla verifica economica");

  const steps = [
    ["01", "Screening per massa critica", "Soglia minima ~12.000 ritiri/anno, raggiungibile solo oltre 25-30 ritiri/giorno nel bacino di 50 km.", "Bologna è l'unica candidata extra-lombarda a superarla."],
    ["02", "Valutazione multicriterio", "Sei dimensioni pesate: volume, baricentricità, accessibilità, intermodalità, costo immobiliare, manodopera.", "Bologna prevale su 4 criteri su 6."],
    ["03", "Verifica economico-finanziaria", "Modello di costi, driver di margine e scenari di ritorno sulla prima classificata.", "Payback tra 1,0 e 3,9 anni secondo lo scenario."],
  ];
  const cwid = 3.78, gap = 0.28, y0 = 2.15, ch = 3.35;
  steps.forEach((st, i) => {
    const x = MX + i * (cwid + gap);
    card(s, x, y0, cwid, ch);
    s.addShape("oval", { x: x + 0.32, y: y0 + 0.32, w: 0.66, h: 0.66, fill: { color: GREEN }, line: { type: "none" } });
    s.addText(st[0], { x: x + 0.32, y: y0 + 0.32, w: 0.66, h: 0.66, fontFace: SERIF, fontSize: 20, color: WHITE, align: "center", valign: "middle" });
    s.addText(st[1], { x: x + 0.32, y: y0 + 1.15, w: cwid - 0.64, h: 0.7, fontFace: SERIF, fontSize: 16.5, color: INK, lineSpacingMultiple: 1.02 });
    s.addText(st[2], { x: x + 0.32, y: y0 + 1.82, w: cwid - 0.64, h: 1.05, fontFace: SANS, fontSize: 10.5, color: BODY, lineSpacingMultiple: 1.25 });
    s.addShape("line", { x: x + 0.32, y: y0 + 2.82, w: cwid - 0.64, h: 0, line: { color: LINE, width: 1 } });
    s.addText([{ text: "→ ", options: { color: GOLD, bold: true } }, { text: st[3], options: { color: GREEND, bold: true } }],
      { x: x + 0.32, y: y0 + 2.88, w: cwid - 0.64, h: 0.42, fontFace: SANS, fontSize: 9.5, valign: "middle", lineSpacingMultiple: 0.95 });
    if (i < 2) s.addText("›", { x: x + cwid - 0.02, y: y0 + ch / 2 - 0.3, w: 0.3, h: 0.6, fontFace: SANS, bold: true, fontSize: 26, color: GOLD, align: "center", valign: "middle" });
  });

  keyMsg(s, "L'esclusione della Lombardia non è arbitraria: è economicamente fondata su un nodo già saturo ed efficiente.");
  foot(s, 10);
})();

/* =====================================================================
   SLIDE 11 — VALUTAZIONE MULTICRITERIO
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "08.3 · Valutazione multicriterio", "Bologna domina il punteggio ponderato");

  card(s, MX, 2.2, 7.0, 3.95);
  s.addChart(prs.ChartType.bar, [{ name: "Punteggio", labels: ["Bologna", "Padova/Verona", "Torino", "Napoli", "Roma"], values: [8.93, 6.73, 6.45, 6.28, 6.18] }],
    chartBase({
      x: MX + 0.1, y: 2.35, w: 6.75, h: 3.65, barDir: "bar", barGapWidthPct: 55,
      chartColors: [GREEN, "AEBDB7", "AEBDB7", "AEBDB7", "AEBDB7"],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 11, dataLabelColor: INK, dataLabelFormatCode: "0.00",
      valAxisHidden: true, valAxisMaxVal: 10, catAxisLabelFontSize: 11,
    }));

  // criteri pesati
  card(s, 7.85, 2.2, 4.78, 3.95, { fill: "F4F2EC", line: LINE });
  s.addText("CRITERI E PESI", { x: 8.15, y: 2.42, w: 4, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.5 });
  const crit = [["Volume ritiri bacino", "30%"], ["Baricentricità di rete", "15%"], ["Accessibilità autostradale", "15%"], ["Intermodalità ferro/aereo", "15%"], ["Costo immobiliare", "15%"], ["Manodopera logistica", "10%"]];
  crit.forEach((c, i) => {
    const y = 2.8 + i * 0.5;
    s.addText(c[0], { x: 8.15, y, w: 3.4, h: 0.42, fontFace: SANS, fontSize: 10.5, color: INK, valign: "middle" });
    s.addText(c[1], { x: 11.55, y, w: 0.85, h: 0.42, fontFace: SANS, bold: true, fontSize: 10.5, color: GREEN, align: "right", valign: "middle" });
    if (i < 5) s.addShape("line", { x: 8.15, y: y + 0.46, w: 4.25, h: 0, line: { color: "E4E1D9", width: 0.75 } });
  });

  keyMsg(s, "Bologna prevale su 4 criteri su 6 e non è mai ultima: un profilo senza punti deboli decisivi.");
  foot(s, 11);
})();

/* =====================================================================
   SLIDE 12 — PERCHÉ BOLOGNA (4 evidenze)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "08.4 · Perché Bologna", "Quattro evidenze convergenti verso la stessa scelta");

  const ev = [
    ["Domanda", "41,1% dei ritiri extra-Lombardia · €357 mila di ricavi già attivi · 28,3% di spedizioni assicurate (€2.413 di valore medio) che chiedono servizi di laboratorio."],
    ["Geografia", "Il 97% dei ritiri nazionali entro 4 ore di guida. Firenze a 105 km, Padova 120, Verona 140, Milano 215, Genova 295, Roma 380."],
    ["Infrastrutture", "Nodo A1/A13/A14 · Interporto da 4,2 mln mq (€1,5 mld di fatturato, 6.700 addetti) · terminal ferroviario +115.000 mq con fondi PNRR · AV a 1h04 da Milano."],
    ["Economia", "3ª provincia italiana per valore aggiunto pro capite (€45.125) · consumi 2024 +2,7% · ecosistema logistico con i principali player nazionali."],
  ];
  const cwid = 5.85, chh = 1.95, gx = 0.28, gy = 0.24, x0 = MX, y0 = 2.05;
  ev.forEach((e, i) => {
    const x = x0 + (i % 2) * (cwid + gx), y = y0 + Math.floor(i / 2) * (chh + gy);
    card(s, x, y, cwid, chh);
    s.addShape("rect", { x, y: y + 0.18, w: 0.07, h: chh - 0.36, fill: { color: i % 2 ? GOLD : GREEN }, line: { type: "none" } });
    s.addText(e[0], { x: x + 0.35, y: y + 0.22, w: cwid - 0.7, h: 0.45, fontFace: SERIF, fontSize: 19, color: INK });
    s.addText(e[1], { x: x + 0.35, y: y + 0.72, w: cwid - 0.65, h: chh - 0.9, fontFace: SANS, fontSize: 11, color: BODY, lineSpacingMultiple: 1.28 });
  });

  keyMsg(s, "Domanda, posizione, infrastrutture ed economia convergono: Bologna soddisfa in pieno tutte le condizioni.");
  foot(s, 12);
})();

/* =====================================================================
   SLIDE 13 — BARICENTRICITÀ (distance map)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "08.4 · Baricentricità", "Bologna al centro della domanda nazionale");

  card(s, MX, 1.95, 7.4, 4.15, { fill: "FFFFFF" });
  const cX = MX + 3.7, cY = 4.0; // centro Bologna
  const cities = [
    ["Milano", 215, -0.80, -0.60, "L"],
    ["Genova", 295, -1.00, -0.10, "L"],
    ["Verona", 140, -0.05, -1.00, "U"],
    ["Padova", 120, 0.62, -0.80, "R"],
    ["Firenze", 105, 0.12, 1.00, "D"],
    ["Roma", 380, 0.42, 0.92, "R"],
  ];
  const scale = 0.0052; // in/km
  // cerchi guida
  [150, 300].forEach((r) => s.addShape("oval", { x: cX - r * scale, y: cY - r * scale, w: r * scale * 2, h: r * scale * 2, fill: { type: "none" }, line: { color: "ECE9E1", width: 1, dashType: "dash" } }));
  cities.forEach((c) => {
    const len = Math.hypot(c[2], c[3]);
    const ux = c[2] / len, uy = c[3] / len, rad = c[1] * scale;
    const ex = cX + ux * rad, ey = cY + uy * rad;
    s.addShape("line", { x: cX, y: cY, w: ex - cX, h: ey - cY, line: { color: "C7D3CE", width: 1.25 } });
    s.addShape("oval", { x: ex - 0.05, y: ey - 0.05, w: 0.1, h: 0.1, fill: { color: GREEN }, line: { color: WHITE, width: 1 } });
    let lx, ly, lw, al; const lh = 0.46;
    if (c[4] === "L") { lw = 1.4; al = "right"; lx = ex - 0.16 - lw; ly = ey - lh / 2; }
    else if (c[4] === "R") { lw = 1.4; al = "left"; lx = ex + 0.16; ly = ey - lh / 2; }
    else if (c[4] === "D") { lw = 1.5; al = "center"; lx = ex - lw / 2; ly = ey + 0.12; }
    else { lw = 1.5; al = "center"; lx = ex - lw / 2; ly = ey - 0.12 - lh; }
    s.addText([
      { text: c[0], options: { bold: true, color: INK, fontSize: 10, breakLine: true } },
      { text: c[1] + " km", options: { color: MUTE, fontSize: 8.5 } },
    ], { x: lx, y: ly, w: lw, h: lh, fontFace: SANS, align: al, valign: "middle", lineSpacingMultiple: 0.98 });
  });
  // centro
  s.addShape("oval", { x: cX - 0.13, y: cY - 0.13, w: 0.26, h: 0.26, fill: { color: GOLD }, line: { color: WHITE, width: 1.5 } });
  s.addText("BOLOGNA", { x: cX - 0.9, y: cY + 0.17, w: 1.8, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: GOLD, align: "center", charSpacing: 1, fill: { color: "FFFFFF" } });

  // lettura destra
  s.addText("Un baricentro,\nnon una periferia.", { x: 8.5, y: 2.1, w: 4.1, h: 1.0, fontFace: SERIF, fontSize: 24, color: INK, lineSpacingMultiple: 1.02 });
  s.addText(
    "Da Bologna la rete extra-lombarda è raggiungibile in giornata: Firenze è servibile senza costi fissi locali, il Centro si serve senza doverlo presidiare.",
    { x: 8.5, y: 3.35, w: 4.1, h: 1.4, fontFace: SANS, fontSize: 12, color: BODY, lineSpacingMultiple: 1.32 }
  );
  s.addText([{ text: "97%\n", options: { fontFace: SERIF, fontSize: 34, color: GREEN } }, { text: "dei ritiri nazionali entro 4 ore di guida", options: { fontFace: SANS, fontSize: 11, color: MUTE } }],
    { x: 8.5, y: 4.85, w: 4.1, h: 1.1, lineSpacingMultiple: 0.95 });

  keyMsg(s, "La posizione trasforma un'unica sede in un presidio capace di coprire quasi tutta la rete.");
  foot(s, 13);
})();

/* =====================================================================
   SLIDE 14 — ANALISI COMPETITIVA
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "09 · Analisi competitiva", "Non competere sul commodity, ma sui servizi a valore");

  s.addText("Nel bacino bolognese operano sei player da centinaia di milioni a oltre un miliardo di euro: un mercato profondo, con manodopera specializzata.", {
    x: MX, y: 1.72, w: 11.6, h: 0.55, fontFace: SANS, fontSize: 12, color: BODY, lineSpacingMultiple: 1.25,
  });

  // players (bar scaled) sinistra
  card(s, MX, 2.35, 5.7, 3.8);
  s.addText("FATTURATO 2024 (€ MLD)", { x: MX + 0.3, y: 2.52, w: 5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.5 });
  const players = [["DHL Express", 1.42], ["BRT", 1.37], ["Fercam", 0.706], ["DSV", 0.662], ["Italtrans", 0.375], ["Arco Sped.", 0.355]];
  const pmax = 1.5, pbarMax = 3.0;
  players.forEach((p, i) => {
    const y = 2.95 + i * 0.5;
    s.addText(p[0], { x: MX + 0.3, y, w: 1.55, h: 0.4, fontFace: SANS, fontSize: 9.5, color: INK, valign: "middle" });
    const bw = Math.max(0.05, (p[1] / pmax) * pbarMax);
    s.addShape("roundRect", { x: MX + 1.9, y: y + 0.07, w: bw, h: 0.25, rectRadius: 0.03, fill: { color: i < 2 ? "9AA3AA" : "C7CDC9" }, line: { type: "none" } });
    s.addText("€" + p[1].toFixed(2).replace(".", ",") + " mld", { x: MX + 1.95 + bw, y: y - 0.02, w: 1.4, h: 0.44, fontFace: SANS, fontSize: 8.5, color: MUTE, valign: "middle" });
  });

  // TMWE differenziazione destra
  card(s, 6.65, 2.35, 5.98, 3.8, { fill: INK, line: INK });
  s.addText("IL POSIZIONAMENTO DI TMWE", { x: 7.0, y: 2.55, w: 5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "9BC7B8", charSpacing: 1.8 });
  s.addText("Tre leve di differenziazione", { x: 7.0, y: 2.85, w: 5.3, h: 0.45, fontFace: SERIF, fontSize: 19, color: WHITE });
  const levers = [["Time-critical & su misura", "consegne 9:00/12:00 e urgenze dove i grandi network offrono prodotti standard."], ["Prossimità relazionale", "un referente diretto contro i canali massivi e impersonali."], ["Laboratorio logistico", "lavorazioni, controlli qualità e kitting a valore aggiunto per le PMI."]];
  levers.forEach((l, i) => {
    const y = 3.45 + i * 0.82;
    s.addText((i + 1).toString(), { x: 7.0, y, w: 0.4, h: 0.4, fontFace: SERIF, fontSize: 18, color: GOLD });
    s.addText([{ text: l[0] + "  ", options: { bold: true, color: WHITE } }, { text: l[1], options: { color: "CFE0DA" } }],
      { x: 7.45, y: y - 0.02, w: 4.95, h: 0.78, fontFace: SANS, fontSize: 10.5, valign: "top", lineSpacingMultiple: 1.15 });
  });

  keyMsg(s, "L'obiettivo non è sottrarre quote agli incumbent, ma internalizzare i 7.520 ritiri già captive nel bacino.");
  foot(s, 14);
})();

/* =====================================================================
   SLIDE 15 — MODELLO ECONOMICO
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "10 · Analisi economica", "Il motore del progetto è il differenziale di costo per ritiro");

  // driver centrale: 43.67 -> 27.20
  card(s, MX, 1.95, 7.2, 2.05, { fill: GREENL, line: "C7DAD2" });
  s.addText("€43,67", { x: MX + 0.4, y: 2.15, w: 1.9, h: 0.9, fontFace: SERIF, fontSize: 36, color: BODY, align: "center", valign: "middle" });
  s.addText("costo medio\nvettore oggi", { x: MX + 0.4, y: 3.05, w: 1.9, h: 0.7, fontFace: SANS, fontSize: 9, color: MUTE, align: "center", lineSpacingMultiple: 0.95 });
  s.addText("→", { x: MX + 2.35, y: 2.35, w: 0.8, h: 0.9, fontFace: SANS, fontSize: 30, color: GOLD, align: "center", valign: "middle" });
  s.addText("€27,20", { x: MX + 3.1, y: 2.15, w: 1.9, h: 0.9, fontFace: SERIF, fontSize: 36, color: GREEN, align: "center", valign: "middle" });
  s.addText("costo pieno\nnavetta interna", { x: MX + 3.1, y: 3.05, w: 1.9, h: 0.7, fontFace: SANS, fontSize: 9, color: MUTE, align: "center", lineSpacingMultiple: 0.95 });
  s.addShape("line", { x: MX + 5.15, y: 2.2, w: 0, h: 1.5, line: { color: "C7DAD2", width: 1 } });
  s.addText([{ text: "+€16,5\n", options: { fontFace: SERIF, fontSize: 30, color: GREEND } }, { text: "di margine liberato\nper ogni ritiro internalizzato", options: { fontFace: SANS, fontSize: 9.5, color: GREEND } }],
    { x: MX + 5.3, y: 2.25, w: 1.75, h: 1.5, align: "center", valign: "middle", lineSpacingMultiple: 1.05 });

  // struttura costi (destra)
  card(s, 8.05, 1.95, 4.58, 4.2);
  s.addText("STRUTTURA COSTI A REGIME", { x: 8.35, y: 2.15, w: 4, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.5 });
  const costs = [["Personale (4,0 FTE)", "€158.000", 158], ["Costi fissi di struttura", "€51.400", 51.4], ["Navetta dedicata", "€30.000", 30]];
  costs.forEach((c, i) => {
    const y = 2.55 + i * 0.66;
    s.addText(c[0], { x: 8.35, y, w: 2.8, h: 0.32, fontFace: SANS, fontSize: 10.5, color: INK });
    s.addText(c[1], { x: 11.0, y, w: 1.4, h: 0.32, fontFace: SANS, bold: true, fontSize: 10.5, color: INK, align: "right" });
    const bw = (c[2] / 158) * 4.0;
    s.addShape("roundRect", { x: 8.35, y: y + 0.34, w: bw, h: 0.12, rectRadius: 0.02, fill: { color: [GREEN, "7FA99B", GOLD][i] }, line: { type: "none" } });
  });
  s.addShape("line", { x: 8.35, y: 4.75, w: 4.05, h: 0, line: { color: LINE, width: 1 } });
  s.addText("Totale costi operativi", { x: 8.35, y: 4.85, w: 2.8, h: 0.4, fontFace: SANS, bold: true, fontSize: 12, color: INK, valign: "middle" });
  s.addText("€239.400", { x: 10.6, y: 4.85, w: 1.8, h: 0.4, fontFace: SERIF, fontSize: 18, color: GREEN, align: "right", valign: "middle" });
  s.addText("Sede 350 mq · 250 giorni/anno · navetta su 2 run", { x: 8.35, y: 5.4, w: 4.1, h: 0.5, fontFace: SANS, italic: true, fontSize: 9, color: MUTE, lineSpacingMultiple: 1.1 });

  // sotto driver: nota controintuitiva
  card(s, MX, 4.2, 7.2, 1.95, { fill: "F4F2EC", line: LINE });
  s.addText("L'effetto controintuitivo", { x: MX + 0.35, y: 4.4, w: 6.5, h: 0.4, fontFace: SERIF, fontSize: 16, color: INK });
  s.addText(
    "Il beneficio nasce dal differenziale tra costo vettore e costo interno, non dal ricavo di trasporto. Perciò la compressione dei margini commerciali rende l'internalizzazione ancora più conveniente: il valore si sposta dal ricavo al controllo del costo.",
    { x: MX + 0.35, y: 4.85, w: 6.55, h: 1.2, fontFace: SANS, fontSize: 11, color: BODY, lineSpacingMultiple: 1.28 }
  );

  foot(s, 15);
})();

/* =====================================================================
   SLIDE 16 — SCENARI DI RITORNO
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "10.5 · Scenari di ritorno", "Un investimento di €78 mila che rientra in 1,5 anni");

  card(s, MX, 2.15, 6.6, 3.95);
  s.addText("BENEFICIO NETTO ANNUO (€)", { x: MX + 0.3, y: 2.32, w: 5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.5 });
  s.addChart(prs.ChartType.bar, [{ name: "Beneficio netto", labels: ["Prudenziale", "Realistico", "Espansivo"], values: [20100, 52900, 78100] }],
    chartBase({
      x: MX + 0.1, y: 2.7, w: 6.35, h: 3.3, barDir: "col", barGapWidthPct: 75,
      chartColors: ["AEBDB7", GREEN, GREEND],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 11, dataLabelColor: INK, dataLabelFormatCode: '#,##0"€"',
      valAxisHidden: true, valAxisMaxVal: 92000, catAxisLabelFontSize: 11,
    }));

  // metriche destra
  const box = [
    ["Payback period", "3,9 / 1,5 / 1,0", "anni (prud./real./espans.)", GREEN],
    ["ROI a 5 anni", "+29% / +239% / +401%", "ritorno cumulato", GOLD],
    ["Investimento iniziale", "€78.000", "scaffali, laboratorio, IT, mezzo", INK],
    ["Break-even operativo", "11.800", "movimenti/anno · già coperti", GREEN],
  ];
  box.forEach((b, i) => {
    const y = 2.15 + i * 1.0;
    card(s, 7.5, y, 5.13, 0.86);
    s.addText(b[0].toUpperCase(), { x: 7.75, y: y + 0.12, w: 2.6, h: 0.6, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1, valign: "middle", lineSpacingMultiple: 0.95 });
    s.addText(b[1], { x: 9.6, y: y + 0.08, w: 2.85, h: 0.44, fontFace: SERIF, fontSize: 17, color: b[3], align: "right", valign: "middle" });
    s.addText(b[2], { x: 9.6, y: y + 0.5, w: 2.85, h: 0.3, fontFace: SANS, fontSize: 8.5, color: MUTE, align: "right" });
  });

  keyMsg(s, "Il progetto resta in payback anche nello scenario prudenziale: il rischio è basso, l'upside significativo.");
  foot(s, 16);
})();

/* =====================================================================
   SLIDE 17 — PRIMA vs DOPO (KPI)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "10.4 · KPI obiettivo", "Prima vs Dopo: cosa cambia con il presidio diretto");

  const kpis = [
    ["Costo per ritiro (bacino BO)", "€43,67", "€27,20", "−37,7%", true],
    ["Lead time medio (TT reale)", "3,08 gg", "2,20 gg", "−0,88 gg", true],
    ["Puntualità OTD", "79,8%", "≥ 90%", "+10,2 p.p.", false],
    ["Saturazione navetta", "—", "≥ 80%", "12+/15 per run", false],
  ];
  const y0 = 2.15, rh = 1.02;
  // intestazioni colonne
  s.addText("PRIMA", { x: 6.35, y: 1.82, w: 2.0, h: 0.28, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, align: "center", charSpacing: 1.5 });
  s.addText("DOPO", { x: 8.5, y: 1.82, w: 2.0, h: 0.28, fontFace: SANS, bold: true, fontSize: 9.5, color: GREEN, align: "center", charSpacing: 1.5 });
  s.addText("DELTA", { x: 10.65, y: 1.82, w: 1.98, h: 0.28, fontFace: SANS, bold: true, fontSize: 9.5, color: GOLD, align: "center", charSpacing: 1.5 });

  kpis.forEach((k, i) => {
    const y = y0 + i * rh;
    card(s, MX, y, CW, rh - 0.16);
    s.addText(k[0], { x: MX + 0.35, y, w: 5.4, h: rh - 0.16, fontFace: SANS, bold: true, fontSize: 12.5, color: INK, valign: "middle" });
    s.addText(k[1], { x: 6.35, y, w: 2.0, h: rh - 0.16, fontFace: SERIF, fontSize: 21, color: MUTE, align: "center", valign: "middle" });
    s.addText("→", { x: 8.15, y, w: 0.4, h: rh - 0.16, fontFace: SANS, fontSize: 15, color: LINE === LINE ? "C7CDC9" : GOLD, align: "center", valign: "middle" });
    s.addText(k[2], { x: 8.5, y, w: 2.0, h: rh - 0.16, fontFace: SERIF, fontSize: 24, color: GREEN, align: "center", valign: "middle" });
    s.addShape("roundRect", { x: 10.7, y: y + (rh - 0.16) / 2 - 0.22, w: 1.9, h: 0.44, rectRadius: 0.06, fill: { color: k[4] ? GREENL : GOLDL }, line: { type: "none" } });
    s.addText(k[3], { x: 10.7, y: y + (rh - 0.16) / 2 - 0.22, w: 1.9, h: 0.44, fontFace: SANS, bold: true, fontSize: 12, color: k[4] ? GREEND : "8A6E2E", align: "center", valign: "middle" });
  });

  keyMsg(s, "Meno costo, meno tempo, più puntualità: il presidio diretto migliora ogni indicatore chiave.");
  foot(s, 17);
})();

/* =====================================================================
   SLIDE 18 — L'IMMOBILE SANT'AGATA (layout)
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);
  head(s, "11 · Il caso studio", "Sant'Agata Bolognese: l'immobile che verifica il modello");

  // dati immobile a sinistra
  const facts = [["350 mq", "piano terra + ufficio e area cortiliva"], ["€1.600/mese", "€54,9/mq/anno · −15/25% vs mercato"], ["~28 km", "da Bologna · baricentrico A1/A13/A14"], ["240", "posti pallet · ~15.000 movimenti/anno"]];
  facts.forEach((f, i) => {
    const y = 2.0 + i * 1.02;
    s.addText(f[0], { x: MX, y, w: 2.6, h: 0.55, fontFace: SERIF, fontSize: 26, color: GREEN, valign: "middle" });
    s.addText(f[1], { x: MX, y: y + 0.52, w: 4.3, h: 0.4, fontFace: SANS, fontSize: 10, color: MUTE, lineSpacingMultiple: 0.95 });
    if (i < 3) s.addShape("line", { x: MX, y: y + 0.94, w: 4.3, h: 0, line: { color: LINE, width: 1 } });
  });

  // planimetria concettuale a destra
  const px = 5.35, py = 2.0, pw = 7.28, ph = 3.85;
  card(s, px, py, pw, ph, { fill: "FBFAF7" });
  s.addText("PLANIMETRIA CONCETTUALE · 6 ZONE FUNZIONALI", { x: px + 0.25, y: py + 0.12, w: pw - 0.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.2 });
  // zone proporzionali (mq): stoccaggio 110, laboratorio 68, baie 56, packing 55, ricezione 32, ufficio 26
  const zones = [
    ["Stoccaggio a scaffale", "110 mq · 240 pallet", 0.25, 0.5, 3.05, 1.55, GREEN, WHITE],
    ["Laboratorio tecnico", "68 mq · 4 postazioni", 3.4, 0.5, 2.15, 1.55, GOLD, WHITE],
    ["Baie interne", "56 mq", 5.75, 0.5, 1.28, 1.55, "7FA99B", WHITE],
    ["Ricezione / QC", "32 mq", 0.25, 2.2, 1.9, 1.1, "DBE7E1", GREEND],
    ["Packing & spedizione", "55 mq", 2.3, 2.2, 2.55, 1.1, "E9E4D6", "8A6E2E"],
    ["Ufficio", "26 mq", 5.0, 2.2, 2.03, 1.1, "EDEAE2", BODY],
  ];
  zones.forEach((z) => {
    const zx = px + 0.25 + z[2], zy = py + 0.5 + z[3];
    s.addShape("roundRect", { x: zx, y: zy, w: z[4], h: z[5], rectRadius: 0.04, fill: { color: z[6] }, line: { color: WHITE, width: 1.5 } });
    s.addText([{ text: z[0] + "\n", options: { bold: true, fontSize: 10.5 } }, { text: z[1], options: { fontSize: 8.5 } }],
      { x: zx, y: zy, w: z[4], h: z[5], fontFace: SANS, color: z[7], align: "center", valign: "middle", lineSpacingMultiple: 1.05 });
  });

  keyMsg(s, "Un modulo replicabile a costo d'ingresso minimo: l'affitto pesa solo l'8% dei costi operativi.");
  foot(s, 18);
})();

/* =====================================================================
   SLIDE 19 — CONCLUSIONI & AZIONI
   ===================================================================== */
(() => {
  const s = prs.addSlide();
  bg(s); brand(s);

  // pannello raccomandazione (sinistra, scuro)
  card(s, MX, 0.55, 5.35, 6.35, { fill: INK, line: INK });
  s.addText("RACCOMANDAZIONE", { x: MX + 0.4, y: 0.9, w: 4.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10.5, color: "9BC7B8", charSpacing: 2.5 });
  s.addText("Aprire il nuovo polo nel bacino di Bologna, a Sant'Agata Bolognese, entro il Q4.", {
    x: MX + 0.4, y: 1.25, w: 4.6, h: 1.6, fontFace: SERIF, fontSize: 25, color: WHITE, lineSpacingMultiple: 1.05,
  });
  s.addShape("line", { x: MX + 0.4, y: 3.0, w: 4.55, h: 0, line: { color: "3A4E58", width: 1 } });
  const three = [["41,1%", "della domanda extra-lombarda, con distacco 2,6× sulla seconda alternativa"], ["+€16,5", "di margine per ritiro internalizzato, su 7.520 ritiri/anno già contrattualizzati"], ["1,5 anni", "di payback nello scenario centrale (3,9 anche in quello prudenziale)"]];
  three.forEach((t, i) => {
    const y = 3.2 + i * 1.12;
    s.addText(t[0], { x: MX + 0.4, y, w: 1.7, h: 0.5, fontFace: SERIF, fontSize: 27, color: "9BC7B8", valign: "middle" });
    s.addText(t[1], { x: MX + 0.4, y: y + 0.5, w: 4.55, h: 0.6, fontFace: SANS, fontSize: 10.5, color: "CFE0DA", lineSpacingMultiple: 1.2 });
  });

  // destra: benefici + azioni 90 giorni
  s.addText("CONCLUSIONI", { x: 6.5, y: 0.62, w: 6, h: 0.28, fontFace: SANS, bold: true, fontSize: 10.5, color: GREEN, charSpacing: 2.4 });
  s.addText("Una scelta obbligata dai numeri", { x: 6.5, y: 0.9, w: 6.1, h: 0.6, fontFace: SERIF, fontSize: 24, color: INK });

  // benefici (3 chip)
  const ben = [["Economici", "beneficio netto €20-78k/anno · costo per ritiro −37,7%"], ["Logistici", "lead time 3,08 → 2,20 gg · OTD oltre il 90%"], ["Strategici", "de-risking della concentrazione lombarda (oggi 77,6%)"]];
  ben.forEach((b, i) => {
    const y = 1.65 + i * 0.72;
    s.addShape("rect", { x: 6.5, y: y + 0.05, w: 0.06, h: 0.55, fill: { color: GREEN }, line: { type: "none" } });
    s.addText([{ text: b[0] + "   ", options: { bold: true, color: INK, fontSize: 12 } }, { text: b[1], options: { color: BODY, fontSize: 11 } }],
      { x: 6.72, y, w: 5.9, h: 0.65, fontFace: SANS, valign: "middle", lineSpacingMultiple: 1.05 });
  });

  card(s, 6.5, 3.95, 6.13, 2.35, { fill: GREENL, line: "C7DAD2" });
  s.addText("AZIONI CONSIGLIATE · PRIMI 90 GIORNI", { x: 6.8, y: 4.12, w: 5.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: GREEND, charSpacing: 1.5 });
  const act = ["Firmare la locazione (recesso a 12 mesi, compartecipazione efficientamento).", "Ordinare scaffali, laboratorio e allestimento mezzo; attivare il WMS in cloud.", "Selezionare l'organico dal bacino Interporto; avviare la formazione qualità.", "Migrare in navetta i primi 1.500 ritiri e fissare la review KPI trimestrale."];
  act.forEach((a, i) => {
    const y = 4.5 + i * 0.44;
    s.addText((i + 1).toString(), { x: 6.8, y, w: 0.32, h: 0.4, fontFace: SERIF, fontSize: 14, color: GREEN, valign: "middle" });
    s.addText(a, { x: 7.2, y, w: 5.3, h: 0.42, fontFace: SANS, fontSize: 10, color: GREEND, valign: "middle", lineSpacingMultiple: 0.95 });
  });

  foot(s, 19);
})();

/* ---------- Salvataggio ---------- */
prs.writeFile({ fileName: "Studio-Fattibilita-TMWE-Bologna.pptx" }).then((fn) => {
  console.log("Creato:", fn);
});
