/**
 * Studio di fattibilità strategica — Nuovo magazzino e laboratorio logistico (TMWE)
 * MOBILITA ITS ACADEMY — A.F. 2025/2026
 *
 * Versione 2: usa il logo reale della scuola e i grafici/figure originali del PDF,
 * con testo più esteso nelle slide. Le figure sono estratte da ./assets-tmwe/.
 */
const PptxGenJS = require("./dist/pptxgen.cjs");
const path = require("path");
const A = (f) => path.join(__dirname, "assets-tmwe", f);

const prs = new PptxGenJS();
prs.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
prs.layout = "WIDE";
prs.author = "Raju Ferrisi";
prs.company = "MOBILITA ITS ACADEMY";
prs.title = "Studio di fattibilità — Nuovo polo logistico TMWE";

/* ---------- Design system (navy/blu, coerente con i grafici e il logo) ---------- */
const BG = "F8F7F4";     // bianco sporco
const INK = "16255C";    // navy profondo (titoli)
const NAVY = "1E3A7B";   // primario
const BLUE = "1E7DC2";   // secondario (in linea con i grafici)
const BLUEL = "DEE8F3";  // pannelli azzurri
const AMBER = "D8901A";  // accento caldo (dal logo)
const AMBERL = "F4E9CE";
const BODY = "4C5563";
const MUTE = "8A929B";
const LINE = "E4E1D9";
const WHITE = "FFFFFF";
const CARD = "FFFFFF";
const ONDK = "E7EEF7";   // testo su fondo scuro
const ONDK2 = "9DB9DD";  // accento chiaro su scuro

const SERIF = "Georgia";
const SANS = "Arial";

const W = 13.333, H = 7.5, MX = 0.7, CW = W - MX * 2;
const NTOT = 22;

/* ---------- Componenti ricorrenti ---------- */
function bg(s) { s.background = { color: BG }; }

// Logo scuola in alto a destra (identico su tutte le slide)
function brand(s) {
  const lw = 1.34, lh = lw / 3.673, lx = W - MX - lw, ly = 0.30;
  s.addImage({ path: A("logo_header.png"), x: lx, y: ly, w: lw, h: lh });
}

function head(s, kicker, title, o = {}) {
  s.addText(kicker.toUpperCase(), { x: MX, y: 0.5, w: 9.0, h: 0.26, fontFace: SANS, bold: true, fontSize: 10.5, color: BLUE, charSpacing: 2.4, valign: "middle" });
  s.addText(title, { x: MX, y: 0.8, w: o.tw || 10.6, h: o.th || 0.85, fontFace: SERIF, fontSize: o.fs || 25, color: INK, lineSpacingMultiple: 1.02 });
  s.addShape("line", { x: MX, y: 0.76, w: 0.52, h: 0, line: { color: AMBER, width: 2.25 } });
}

function foot(s, n) {
  s.addShape("line", { x: MX, y: 7.04, w: CW, h: 0, line: { color: LINE, width: 1 } });
  s.addText("Studio di fattibilità · Nuovo magazzino e laboratorio logistico · TMWE", { x: MX, y: 7.1, w: 9, h: 0.26, fontFace: SANS, fontSize: 7.5, color: MUTE, valign: "middle" });
  s.addText(`${String(n).padStart(2, "0")} / ${NTOT}`, { x: W - MX - 2, y: 7.1, w: 2, h: 0.26, fontFace: SANS, fontSize: 7.5, color: MUTE, align: "right", valign: "middle" });
}

function keyMsg(s, text, y = 6.42) {
  s.addShape("roundRect", { x: MX, y, w: CW, h: 0.48, rectRadius: 0.05, fill: { color: BLUEL }, line: { type: "none" } });
  s.addShape("rect", { x: MX, y, w: 0.07, h: 0.48, fill: { color: BLUE }, line: { type: "none" } });
  s.addText([
    { text: "MESSAGGIO CHIAVE   ", options: { fontFace: SANS, bold: true, fontSize: 8.5, color: BLUE, charSpacing: 1.4 } },
    { text: text, options: { fontFace: SANS, fontSize: 11, color: INK } },
  ], { x: MX + 0.28, y, w: CW - 0.5, h: 0.48, valign: "middle", lineSpacingMultiple: 0.96 });
}

function card(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: o.r != null ? o.r : 0.08, fill: { color: o.fill || CARD }, line: o.line ? { color: o.line, width: o.lw || 1 } : { color: LINE, width: 1 },
    shadow: o.shadow === false ? undefined : { type: "outer", color: "D9D5CC", blur: 7, offset: 2, angle: 90, opacity: 0.4 } });
}

// Immagine "contain" dentro un box, centrata, su card bianca
function imgFit(s, file, ratio, x, y, w, h, o = {}) {
  if (o.card !== false) card(s, x, y, w, h, { fill: WHITE });
  const pad = o.pad != null ? o.pad : 0.18;
  const bw = w - 2 * pad, bh = h - 2 * pad;
  let dw, dh;
  if (bw / bh > ratio) { dh = bh; dw = bh * ratio; } else { dw = bw; dh = bw / ratio; }
  const ix = x + pad + (bw - dw) / 2, iy = y + pad + (bh - dh) / 2;
  s.addImage({ path: A(file), x: ix, y: iy, w: dw, h: dh });
}

function caption(s, x, y, w, text) {
  s.addText(text, { x, y, w, h: 0.3, fontFace: SANS, italic: true, fontSize: 8.5, color: MUTE, valign: "middle", lineSpacingMultiple: 0.95 });
}

// Elenco puntato con quadratino
function bullets(s, x, y, w, items, o = {}) {
  const lh = o.lh || 0.62, fs = o.fs || 11;
  items.forEach((it, i) => {
    const yy = y + i * lh;
    s.addShape("rect", { x, y: yy + 0.06, w: 0.11, h: 0.11, fill: { color: o.mk || BLUE }, line: { type: "none" } });
    if (Array.isArray(it)) {
      s.addText([{ text: it[0] + "  ", options: { bold: true, color: INK } }, { text: it[1], options: { color: BODY } }],
        { x: x + 0.26, y: yy - 0.03, w: w - 0.26, h: lh, fontFace: SANS, fontSize: fs, valign: "top", lineSpacingMultiple: 1.05 });
    } else {
      s.addText(it, { x: x + 0.26, y: yy - 0.03, w: w - 0.26, h: lh, fontFace: SANS, fontSize: fs, color: BODY, valign: "top", lineSpacingMultiple: 1.05 });
    }
  });
}

function para(s, x, y, w, h, text, o = {}) {
  s.addText(text, { x, y, w, h, fontFace: SANS, fontSize: o.fs || 12, color: o.color || BODY, lineSpacingMultiple: o.ls || 1.3, valign: o.valign || "top", align: o.align || "left" });
}

function stat(s, x, y, w, num, label, sub, o = {}) {
  s.addText(num, { x, y, w, h: 0.56, fontFace: SERIF, fontSize: o.fs || 30, color: o.color || NAVY, valign: "bottom" });
  s.addText(label.toUpperCase(), { x, y: y + 0.58, w, h: 0.42, fontFace: SANS, bold: true, fontSize: 9, color: INK, charSpacing: 0.5, lineSpacingMultiple: 0.95 });
  if (sub) s.addText(sub, { x, y: y + 0.98, w, h: 0.4, fontFace: SANS, fontSize: 8.5, color: MUTE, lineSpacingMultiple: 0.95 });
}

/* =====================================================================
   1 — COPERTINA
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s);
  s.addImage({ path: A("logo_full.png"), x: MX, y: 0.62, w: 2.9, h: 2.9 / 3.883 });
  brand(s);
  s.addShape("rect", { x: MX, y: 2.35, w: 0.09, h: 3.0, fill: { color: BLUE }, line: { type: "none" } });
  s.addText("STUDIO DI FATTIBILITÀ STRATEGICA  ·  A.F. 2025/2026", { x: MX + 0.32, y: 2.35, w: 10, h: 0.3, fontFace: SANS, bold: true, fontSize: 12, color: BLUE, charSpacing: 2.5 });
  s.addText("Dove aprire il prossimo\npolo logistico di TMWE", { x: MX + 0.3, y: 2.75, w: 10.5, h: 1.7, fontFace: SERIF, fontSize: 42, color: INK, lineSpacingMultiple: 1.02 });
  para(s, MX + 0.32, 4.55, 9.6, 1.0,
    "Uno studio data-driven per localizzare un nuovo magazzino e laboratorio logistico: diversificare la rete oltre la Lombardia, presidiare direttamente prima e ultima fascia e recuperare margine sull'ultimo miglio. Base analitica: 82.766 spedizioni, selezione multicriterio e verifica economico-finanziaria.",
    { fs: 13.5, ls: 1.28 });
  s.addShape("line", { x: MX + 0.32, y: 5.85, w: 10.4, h: 0, line: { color: LINE, width: 1 } });
  const cred = [["Corsista", "Raju Ferrisi"], ["Tutor aziendale", "Imane Smouni"], ["Figura professionale", "Tecnico sup. logistica intermodale"], ["Area tecnologica", "Mobilità sostenibile"]];
  cred.forEach((c, i) => {
    const x = MX + 0.32 + i * 2.62;
    s.addText(c[0].toUpperCase(), { x, y: 6.02, w: 2.55, h: 0.24, fontFace: SANS, bold: true, fontSize: 7.5, color: MUTE, charSpacing: 1 });
    s.addText(c[1], { x, y: 6.26, w: 2.55, h: 0.6, fontFace: SANS, fontSize: 11, color: INK, lineSpacingMultiple: 0.95 });
  });
})();

/* =====================================================================
   2 — LA SFIDA STRATEGICA
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "Il punto di partenza", "Un'azienda che cresce, ma poggia su un solo bacino");
  para(s, MX, 1.72, 6.0, 1.2,
    "Tra il 2020 e il 2023 TMWE ha più che triplicato il fatturato. La sua forza operativa — la concentrazione sul nodo di Milano — è però anche la sua principale fragilità strategica: una dipendenza territoriale e da vettori terzi che lo studio intende ridurre.",
    { fs: 12.5 });
  const facts = [["×3,2", "Fatturato 2020 → 2023", "da €2,33 a €7,48 milioni", NAVY], ["96,4%", "Operazioni su vettori terzi", "DHL, FedEx e UPS come fornitori", AMBER], ["77,6%", "Ritiri nazionali dalla Lombardia", "domanda concentrata su un'unica area", NAVY]];
  facts.forEach((f, i) => {
    const y = 3.2 + i * 1.02;
    s.addText(f[0], { x: MX, y, w: 1.85, h: 0.85, fontFace: SERIF, fontSize: 38, color: f[3], valign: "middle" });
    s.addText(f[1], { x: MX + 2.0, y: y + 0.05, w: 4.2, h: 0.36, fontFace: SANS, bold: true, fontSize: 13, color: INK });
    s.addText(f[2], { x: MX + 2.0, y: y + 0.42, w: 4.2, h: 0.34, fontFace: SANS, fontSize: 10.5, color: MUTE });
    if (i < 2) s.addShape("line", { x: MX, y: y + 0.95, w: 6.1, h: 0, line: { color: LINE, width: 1 } });
  });
  card(s, 7.35, 1.72, 5.28, 4.4, { fill: INK, line: INK });
  s.addText("LA DOMANDA DELLO STUDIO", { x: 7.75, y: 2.1, w: 4.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: ONDK2, charSpacing: 2 });
  s.addText("Dove conviene aprire il secondo polo logistico?", { x: 7.75, y: 2.42, w: 4.5, h: 1.3, fontFace: SERIF, fontSize: 24, color: WHITE, lineSpacingMultiple: 1.05 });
  s.addShape("line", { x: 7.75, y: 3.9, w: 4.48, h: 0, line: { color: "34477F", width: 1 } });
  para(s, 7.75, 4.05, 4.5, 2.0,
    "La risposta nasce dai dati, non dalle intuizioni: l'analisi dell'intera rete di ritiri, uno screening per massa critica, una valutazione multicriterio e una verifica economico-finanziaria conducono a un'unica localizzazione ottimale.",
    { fs: 12, color: ONDK, ls: 1.35 });
  keyMsg(s, "Diversificare fuori dalla Lombardia è la leva per ridurre il rischio e liberare nuovo margine.");
  foot(s, 2);
})();

/* =====================================================================
   3 — L'AZIENDA TMWE
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "01 · L'azienda", "TMWE: freight forwarder internazionale, modello asset-light");
  para(s, MX, 1.7, 11.9, 0.9,
    "Transport Management Worldwide Express nasce nel 1999 come corriere espresso e spedizioniere internazionale; l'operatività effettiva prende avvio nel 2005 con l'iscrizione al Registro delle Imprese di Milano. Negli anni si consolida come freight forwarder in un network globale di oltre 7.000 affiliate in 190 Paesi.",
    { fs: 12 });
  const items = [["1999", "Anno di fondazione", "operatività dal 2005 (Milano)"], ["7.000+", "Affiliate nel network", "in oltre 190 Paesi"], ["€7,48 mln", "Fatturato 2023", "×3,2 rispetto al 2020 (€2,33 mln)"], ["16,4%", "Margine lordo di rete", "modello multi-vettore ad alta rotazione"]];
  items.forEach((it, i) => {
    const x = MX + i * 2.98; card(s, x, 2.62, 2.78, 1.72);
    stat(s, x + 0.28, 2.82, 2.3, it[0], it[1], it[2], { fs: 26, color: NAVY });
  });
  card(s, MX, 4.62, 7.05, 1.55, { fill: AMBERL, line: "E7D6AE" });
  s.addText("«We go far and keep close to you»", { x: MX + 0.35, y: 4.8, w: 6.4, h: 0.5, fontFace: SERIF, italic: true, fontSize: 18, color: AMBER });
  para(s, MX + 0.35, 5.36, 6.4, 0.7, "Copertura globale e prossimità al cliente: affidabilità (OTD fino al 79,8% sui nodi presidiati), flessibilità multi-vettore e vicinanza relazionale sono i tre valori del modello operativo.", { fs: 10.5, color: "7A6220", ls: 1.2 });
  s.addText("CREDENZIALI", { x: 8.05, y: 4.66, w: 4.5, h: 0.28, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.5 });
  [["WCA Certified Member", "network mondiale spedizionieri"], ["IATA Cargo Agent", "certificazione trasporto aereo"], ["Adesione AICAI", "corrieri aerei internazionali"]].forEach((c, i) => {
    const y = 5.0 + i * 0.44;
    s.addShape("rect", { x: 8.05, y: y + 0.05, w: 0.11, h: 0.11, fill: { color: BLUE }, line: { type: "none" } });
    s.addText([{ text: c[0] + "  ", options: { bold: true, color: INK } }, { text: "· " + c[1], options: { color: MUTE } }],
      { x: 8.31, y: y - 0.04, w: 4.3, h: 0.42, fontFace: SANS, fontSize: 10, valign: "middle", lineSpacingMultiple: 0.95 });
  });
  foot(s, 3);
})();

/* =====================================================================
   4 — MODELLO MULTI-CARRIER
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "01 · Il modello operativo", "Multi-carrier: arbitrare i grandi network, controllare il cliente");
  para(s, MX, 1.7, 11.9, 0.9,
    "Il modello è asset-light multi-carrier: la quasi totalità dei trasporti è affidata ai grandi network espressi, mentre il marchio proprio e una flotta interna presidiano i flussi a maggior valore. L'assetto consente di arbitrare tariffe e livelli di servizio, mantenendo il controllo commerciale del cliente.",
    { fs: 12 });
  // barre mix vettori
  card(s, MX, 2.65, 6.0, 3.5);
  s.addText("MIX VETTORI SUL PERIMETRO ANALIZZATO", { x: MX + 0.35, y: 2.82, w: 5.4, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.2 });
  const mix = [["DHL Express", 64.3, NAVY], ["FedEx", 11.3, BLUE], ["UPS", 10.8, BLUE], ["Marchio proprio", 9.7, "7FA6CE"], ["Flotta interna", 3.8, AMBER]];
  mix.forEach((m, i) => {
    const y = 3.28 + i * 0.55;
    s.addText(m[0], { x: MX + 0.35, y, w: 1.9, h: 0.4, fontFace: SANS, fontSize: 10.5, color: INK, valign: "middle" });
    const bw = (m[1] / 64.3) * 2.9;
    s.addShape("roundRect", { x: MX + 2.3, y: y + 0.06, w: bw, h: 0.28, rectRadius: 0.03, fill: { color: m[2] }, line: { type: "none" } });
    s.addText(m[1].toString().replace(".", ",") + "%", { x: MX + 2.4 + bw, y: y - 0.02, w: 1.0, h: 0.44, fontFace: SANS, bold: true, fontSize: 10.5, color: INK, valign: "middle" });
  });
  // servizi
  s.addText("UN PORTAFOGLIO CENTRATO SULL'URGENZA", { x: 7.0, y: 2.75, w: 5.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.2 });
  bullets(s, 7.0, 3.15, 5.6, [
    ["Express & domestico", "DHL Express Domestic è il servizio più usato: 39.224 spedizioni"],
    ["Time-definite premium", "Express 9:00 e 12:00: 7.564 spedizioni complessive"],
    ["Internazionale", "Worldwide, International Priority ed Express Saver"],
    ["Merce ad alto valore", "12,6% di spedizioni assicurate, valore medio €2.419"],
  ], { fs: 11, lh: 0.72 });
  keyMsg(s, "La forza è la flessibilità; il limite è la dipendenza quasi totale (96,4%) dai vettori terzi.");
  foot(s, 4);
})();

/* =====================================================================
   5 — ESPERIENZA OPERATIVA & BASE DATI
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "02 · Esperienza & metodo", "Dall'esperienza operativa alla decisione data-driven");
  para(s, MX, 1.72, 6.3, 1.7,
    "L'analisi nasce dall'esperienza diretta di stage in TMWE, nella gestione quotidiana di ritiri e spedizioni nazionali e internazionali. Il perimetro operativo copriva l'intero ciclo di vita della pratica, dalla presa in carico alla prova di consegna.",
    { fs: 12.5 });
  bullets(s, MX, 3.5, 6.3, [
    ["Apertura pratiche", "inserimento a sistema delle richieste di ritiro"],
    ["Monitoraggio tracking", "presidio delle milestone e delle eccezioni"],
    ["Verifica esiti", "segnalazione tempestiva dei casi critici"],
    ["Assistenza al cliente", "dalla preventivazione alla prova di consegna"],
  ], { fs: 11, lh: 0.66 });
  // pannello base dati
  card(s, 7.35, 1.72, 5.28, 4.4, { fill: INK, line: INK });
  s.addText("LA BASE DELL'ANALISI", { x: 7.7, y: 2.02, w: 4.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: ONDK2, charSpacing: 2 });
  para(s, 7.7, 2.34, 4.6, 0.9, "Il contributo si è concretizzato nella strutturazione del database consolidato e nella costruzione del reporting che ha reso possibile l'analisi di fattibilità.", { fs: 11.5, color: ONDK, ls: 1.3 });
  const db = [["82.766", "record normalizzati"], ["17", "variabili operative ed economiche"], ["420", "città ricondotte a nomi univoci"], ["222", "incoerenze città/regione corrette"]];
  db.forEach((d, i) => {
    const x = 7.7 + (i % 2) * 2.4, y = 3.5 + Math.floor(i / 2) * 1.25;
    s.addText(d[0], { x, y, w: 2.3, h: 0.5, fontFace: SERIF, fontSize: 26, color: ONDK2, valign: "bottom" });
    s.addText(d[1], { x, y: y + 0.52, w: 2.3, h: 0.6, fontFace: SANS, fontSize: 9.5, color: ONDK, lineSpacingMultiple: 0.95 });
  });
  keyMsg(s, "Un passaggio da gestione esperienziale a decision making fondato su un database consolidato.");
  foot(s, 5);
})();

/* =====================================================================
   6 — RITIRI ESTERI (fig_esteri_bar)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "03 · Ritiri dall'estero", "Un flusso internazionale sottile, selettivo e presidiabile");
  imgFit(s, "fig_esteri_bar.png", 1.764, MX, 1.7, 6.5, 4.05);
  caption(s, MX, 5.78, 6.5, "Fig. 3.1 — Top 5 nazioni estere per ritiri: la Germania pesa più di Francia e Spagna sommate.");
  para(s, 7.45, 1.72, 5.2, 1.1, "I ritiri esteri sono 1.122, appena l'1,36% del totale, ma cinque nazioni concentrano il 94,8% del flusso: una rete selettiva, presidiabile con pochi accordi di corrispondenza e senza hub oltreconfine.", { fs: 12 });
  bullets(s, 7.45, 3.0, 5.2, [
    ["Germania · 38,1%", "corridoio a maggior valore (peso medio 12,4 kg, OTD 80,3%): consolidamento groupage sul Brennero"],
    ["Francia e Spagna", "margini su transit time e mix vettore; Madrid candidata al groupage stradale (−20/30%)"],
    ["USA e Singapore", "flussi intercontinentali leggeri, con criticità doganali e di coincidenza aerea"],
  ], { fs: 10.5, lh: 0.92 });
  keyMsg(s, "I volumi esteri non impongono un hub estero, ma premiano una sede sull'asse del Brennero.");
  foot(s, 6);
})();

/* =====================================================================
   7 — FLUSSI INTERNAZIONALI (fig_esteri_map)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "03.1 · Lettura dei corridoi", "Il corridoio tedesco punta al suo terminale naturale");
  imgFit(s, "fig_esteri_map.png", 1.376, MX, 1.7, 7.2, 4.45);
  caption(s, MX, 6.18, 7.2, "Fig. 3.2 — Mappa dei flussi internazionali di ritiro verso la rete italiana.");
  para(s, 8.15, 1.75, 4.5, 2.0, "L'implicazione operativa è netta: la localizzazione del nuovo nodo non deve essere orientata all'estero, ma capace di ricevere il corridoio tedesco — il 38% del flusso internazionale — senza rotture di carico aggiuntive.", { fs: 12.5 });
  card(s, 8.15, 3.95, 4.5, 2.05, { fill: BLUEL, line: "C4D6EA" });
  s.addText("Bologna sul TEN-T", { x: 8.45, y: 4.12, w: 4.0, h: 0.4, fontFace: SERIF, fontSize: 17, color: INK });
  para(s, 8.45, 4.55, 3.95, 1.4, "Il valico del Brennero ha in Bologna il terminale naturale del corridoio TEN-T Scandinavo-Mediterraneo: una sede sull'asse A1/Brennero intercetta il corridoio a maggior valore.", { fs: 11, color: "24406F", ls: 1.28 });
  foot(s, 7);
})();

/* =====================================================================
   8 — GEOGRAFIA MACROAREE (fig_macroaree_bar)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "04 · Analisi geografica", "La domanda nazionale vive sulla dorsale padana");
  para(s, MX, 1.7, 11.9, 0.6, "I ritiri nazionali sono 81.644, il 98,6% del totale. La ripartizione per macroaree mostra una concentrazione fortissima al Nord, con Centro e Sud serviti da flussi regolari ma sottili.", { fs: 12 });
  imgFit(s, "fig_macroaree_bar.png", 2.069, MX, 2.4, 7.5, 3.55);
  caption(s, MX, 5.98, 7.5, "Fig. 4.1 — Ritiri nazionali per macroarea (giorni lavorativi: 250/anno).");
  const q = [["90,0%", "Nord Italia", "231 ritiri per città attiva", NAVY], ["7,0%", "Centro Italia", "presidio leggero, flussi sottili", BLUE], ["3,0%", "Sud e Isole", "domanda distribuita su 4 poli", MUTE]];
  q.forEach((r, i) => {
    const y = 2.5 + i * 1.15;
    s.addText(r[0], { x: 8.5, y, w: 1.6, h: 0.7, fontFace: SERIF, fontSize: 28, color: r[3], valign: "middle" });
    s.addText(r[1], { x: 10.15, y: y + 0.05, w: 2.5, h: 0.4, fontFace: SANS, bold: true, fontSize: 12.5, color: INK });
    s.addText(r[2], { x: 10.15, y: y + 0.42, w: 2.5, h: 0.5, fontFace: SANS, fontSize: 9.5, color: MUTE, lineSpacingMultiple: 0.95 });
    if (i < 2) s.addShape("line", { x: 8.5, y: y + 1.02, w: 4.13, h: 0, line: { color: LINE, width: 1 } });
  });
  keyMsg(s, "Fuori dalla Lombardia, l'Emilia-Romagna è la prima regione: 7.700 ritiri, il naturale secondo polo.");
  foot(s, 8);
})();

/* =====================================================================
   9 — HEAT MAP DORSALE (fig_heatmap)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "04 · Dorsale Lombardia–Emilia", "L'87% dei volumi su un unico asse territoriale");
  imgFit(s, "fig_heatmap.png", 1.045, MX, 1.72, 4.85, 4.45);
  caption(s, MX, 6.2, 4.85, "Fig. 4.2 — Heat map regionale dei ritiri (scala logaritmica).");
  para(s, 5.9, 1.75, 6.7, 1.0, "La dorsale Lombardia–Emilia concentra da sola l'87,0% dei volumi nazionali. Due regioni dominano il quadro e definiscono il perimetro di ogni scelta di localizzazione.", { fs: 12.5 });
  bullets(s, 5.9, 2.95, 6.7, [
    ["Lombardia · 63.361 ritiri", "77,6% del totale nazionale — già pienamente presidiata dal nodo di Milano"],
    ["Emilia-Romagna · 7.700", "9,4%: seconda regione d'Italia e prima fuori dal presidio lombardo"],
    ["Arco padano", "Veneto (1.034), Liguria (750) e Piemonte (626) completano oltre 73 mila movimenti/anno"],
  ], { fs: 11, lh: 0.85 });
  keyMsg(s, "Qualunque nuova sede deve restare agganciata alla dorsale: allontanarsene significa rinunciare al 90% della domanda.");
  foot(s, 9);
})();

/* =====================================================================
   10 — TOP CITTÀ PER MACROAREA (fig_topcitta)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "05 · Densità operativa", "Solo tre nodi superano la soglia di sostenibilità");
  para(s, MX, 1.7, 11.9, 0.6, "La soglia critica è di 10 ritiri/giorno: sotto questo valore una presenza fisica dedicata non è economicamente sensata. Solo tre nodi la superano — e due sono in Lombardia.", { fs: 12 });
  imgFit(s, "fig_topcitta.png", 2.348, MX, 2.35, 8.0, 3.6);
  caption(s, MX, 5.98, 8.0, "Fig. 5.1 — Top 5 città per macroarea (si noti la scala differente per area).");
  const nodes = [["Milano", "225 /gg", "Lombardia"], ["Origgio", "46 /gg", "Lombardia"], ["Bologna", "30 /gg", "candidabile"]];
  s.addText("SOPRA LA SOGLIA", { x: 8.9, y: 2.4, w: 3.7, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.5 });
  nodes.forEach((n, i) => {
    const y = 2.8 + i * 1.0; const ok = i === 2;
    card(s, 8.9, y, 3.72, 0.85, { fill: ok ? BLUEL : WHITE, line: ok ? "C4D6EA" : LINE });
    s.addText(n[0], { x: 9.1, y: y + 0.1, w: 1.7, h: 0.65, fontFace: SERIF, fontSize: 17, color: INK, valign: "middle" });
    s.addText(n[1], { x: 10.5, y: y + 0.1, w: 1.0, h: 0.4, fontFace: SANS, bold: true, fontSize: 13, color: ok ? BLUE : NAVY, align: "right", valign: "middle" });
    s.addText(n[2], { x: 10.2, y: y + 0.48, w: 2.3, h: 0.3, fontFace: SANS, fontSize: 8.5, color: MUTE, align: "right" });
  });
  keyMsg(s, "Milano e Origgio sono in Lombardia: Bologna è l'unico candidato che supera la soglia altrove.");
  foot(s, 10);
})();

/* =====================================================================
   11 — DISTRIBUZIONE GEOGRAFICA CITTÀ (fig_bubble_map)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "06 · Approfondimento territoriale", "Milano domina, Bologna guida il resto d'Italia");
  imgFit(s, "fig_bubble_map.png", 0.996, MX, 1.72, 4.7, 4.45);
  caption(s, MX, 6.2, 4.7, "Fig. 6.1 — Mappa dei ritiri per città: la bolla è proporzionale al volume.");
  para(s, 5.75, 1.75, 6.85, 1.05, "L'analisi dei primi tre nodi di ogni macroarea conferma il quadro: un baricentro lombardo maturo, un unico polo emiliano sopra soglia e poli di Centro e Sud da presidiare solo con accordi di corrispondenza.", { fs: 12 });
  bullets(s, 5.75, 3.0, 6.85, [
    ["Milano · 49.935 ritiri (61,2%)", "nodo maturo e già presidiato; costo/ritiro più basso della rete (€19,77)"],
    ["Bologna · 7.520 (9,2%)", "unico nodo non lombardo sopra soglia; 28,3% assicurate, coerente col laboratorio"],
    ["Origgio · 10.214 (12,5%)", "satellite funzionale di Milano: nessun potenziale come sede alternativa"],
    ["Centro e Sud", "poli da 2-3 ritiri/giorno: si servono, non si presidiano"],
  ], { fs: 10.5, lh: 0.8 });
  keyMsg(s, "Escludendo la Lombardia, Bologna è l'unico nodo con massa critica reale.");
  foot(s, 11);
})();

/* =====================================================================
   12 — POSIZIONAMENTO COSTO / OTD (fig_scatter_kpi)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "06 · Costo vs puntualità", "Bologna combina volumi rilevanti e la miglior puntualità");
  imgFit(s, "fig_scatter_kpi.png", 1.515, MX, 1.72, 7.0, 4.4);
  caption(s, MX, 6.16, 7.0, "Fig. 6.2 — Posizionamento costo/puntualità dei principali nodi (bolla = volumi).");
  para(s, 7.95, 1.75, 4.7, 1.5, "Incrociando costo medio per ritiro e puntualità (OTD), Bologna occupa la posizione più favorevole tra i nodi rilevanti: alta puntualità e volumi significativi, con ampio margine di miglioramento sul transit time.", { fs: 12 });
  card(s, 7.95, 3.5, 4.7, 2.6, { fill: WHITE });
  const kpi = [["79,8%", "OTD — miglior valore tra i grandi nodi"], ["3,08 gg", "transit time reale, riducibile con presidio diretto"], ["28,3%", "spedizioni assicurate (2,2× la media di rete)"]];
  kpi.forEach((k, i) => {
    const y = 3.68 + i * 0.78;
    s.addText(k[0], { x: 8.2, y, w: 1.5, h: 0.6, fontFace: SERIF, fontSize: 22, color: NAVY, valign: "middle" });
    s.addText(k[1], { x: 9.75, y, w: 2.75, h: 0.7, fontFace: SANS, fontSize: 10, color: BODY, valign: "middle", lineSpacingMultiple: 1.05 });
    if (i < 2) s.addShape("line", { x: 8.2, y: y + 0.7, w: 4.2, h: 0, line: { color: LINE, width: 1 } });
  });
  keyMsg(s, "Bologna parte da una base di servizio già alta: il presidio diretto la porterà oltre il 90% di OTD.");
  foot(s, 12);
})();

/* =====================================================================
   13 — CLASSIFICA NAZIONALE & MERCATO RESIDUO (fig_classifica)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "07 · Il dato che decide", "Escludendo la Lombardia, non esiste una seconda opzione");
  imgFit(s, "fig_classifica.png", 1.523, MX, 1.72, 6.5, 4.4);
  caption(s, MX, 6.16, 6.5, "Fig. 7.1 — Classifica nazionale in scala logaritmica delle principali città.");
  para(s, 7.45, 1.75, 5.2, 1.0, "Escludendo la Lombardia (già presidiata), il mercato residuo vale 18.283 ritiri/anno. Bologna ne concentra da sola il 41,1%: le nove città successive, sommate, arrivano al 44%.", { fs: 12 });
  card(s, 7.45, 2.95, 2.5, 1.6, { fill: NAVY, line: NAVY });
  s.addText("41,1%", { x: 7.45, y: 3.1, w: 2.5, h: 0.9, fontFace: SERIF, fontSize: 40, color: WHITE, align: "center", valign: "middle" });
  s.addText("del mercato\nextra-Lombardia", { x: 7.45, y: 3.95, w: 2.5, h: 0.55, fontFace: SANS, fontSize: 9.5, color: ONDK, align: "center", lineSpacingMultiple: 0.95 });
  card(s, 10.12, 2.95, 2.5, 1.6, { fill: AMBERL, line: "E7D6AE" });
  s.addText("2,6×", { x: 10.12, y: 3.1, w: 2.5, h: 0.9, fontFace: SERIF, fontSize: 40, color: AMBER, align: "center", valign: "middle" });
  s.addText("distacco sulla\nprima alternativa", { x: 10.12, y: 3.95, w: 2.5, h: 0.55, fontFace: SANS, fontSize: 9.5, color: "7A6220", align: "center", lineSpacingMultiple: 0.95 });
  para(s, 7.45, 4.75, 5.2, 1.3, "Il distacco tra Bologna e la prima alternativa (Roma) è di 4.659 ritiri/anno, pari a 19 ritiri/giorno: nei dati non esiste una seconda scelta comparabile.", { fs: 11.5 });
  foot(s, 13);
})();

/* =====================================================================
   14 — METODO DI SELEZIONE (3 fasi)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "08 · Studio di fattibilità", "Un metodo in tre fasi, dalla domanda alla verifica economica");
  para(s, MX, 1.7, 11.9, 0.55, "La selezione è stata condotta in tre fasi sequenziali. Il vincolo posto dall'azienda — l'esclusione della Lombardia — non è arbitrario, ma economicamente fondato: il nodo di Milano lavora già al costo più basso della rete.", { fs: 12 });
  const steps = [
    ["01", "Screening per massa critica", "Soglia minima ~12.000 ritiri/anno, raggiungibile solo oltre 25-30 ritiri/giorno nel bacino di 50 km.", "Bologna è l'unica candidata extra-lombarda a superarla."],
    ["02", "Valutazione multicriterio", "Sei dimensioni pesate: volume, baricentricità, accessibilità, intermodalità, costo immobiliare, manodopera.", "Bologna prevale su 4 criteri su 6."],
    ["03", "Verifica economico-finanziaria", "Modello di costi, driver di margine e scenari di ritorno sulla prima classificata.", "Payback tra 1,0 e 3,9 anni secondo lo scenario."],
  ];
  const cwid = 3.78, gap = 0.28, y0 = 2.45, ch = 3.3;
  steps.forEach((st, i) => {
    const x = MX + i * (cwid + gap); card(s, x, y0, cwid, ch);
    s.addShape("oval", { x: x + 0.32, y: y0 + 0.3, w: 0.64, h: 0.64, fill: { color: NAVY }, line: { type: "none" } });
    s.addText(st[0], { x: x + 0.32, y: y0 + 0.3, w: 0.64, h: 0.64, fontFace: SERIF, fontSize: 19, color: WHITE, align: "center", valign: "middle" });
    s.addText(st[1], { x: x + 0.32, y: y0 + 1.1, w: cwid - 0.64, h: 0.7, fontFace: SERIF, fontSize: 16, color: INK, lineSpacingMultiple: 1.02 });
    para(s, x + 0.32, y0 + 1.78, cwid - 0.62, 1.0, st[2], { fs: 10.5, ls: 1.22 });
    s.addShape("line", { x: x + 0.32, y: y0 + 2.78, w: cwid - 0.64, h: 0, line: { color: LINE, width: 1 } });
    s.addText([{ text: "→ ", options: { color: AMBER, bold: true } }, { text: st[3], options: { color: NAVY, bold: true } }],
      { x: x + 0.32, y: y0 + 2.84, w: cwid - 0.62, h: 0.42, fontFace: SANS, fontSize: 9.5, valign: "middle", lineSpacingMultiple: 0.95 });
    if (i < 2) s.addText("›", { x: x + cwid - 0.02, y: y0 + ch / 2 - 0.3, w: 0.3, h: 0.6, fontFace: SANS, bold: true, fontSize: 26, color: AMBER, align: "center", valign: "middle" });
  });
  keyMsg(s, "Aprire in Lombardia duplicherebbe costi fissi su volumi già serviti: il valore incrementale nasce altrove.");
  foot(s, 14);
})();

/* =====================================================================
   15 — MATRICE MULTICRITERIO (fig_multicriterio)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "08.3 · Valutazione multicriterio", "Bologna domina il punteggio ponderato");
  para(s, MX, 1.7, 11.9, 0.55, "Le candidate sono state confrontate su sei dimensioni pesate. Bologna ottiene il punteggio ponderato più alto (8,93), prevalendo su quattro criteri su sei e senza mai risultare ultima.", { fs: 12 });
  imgFit(s, "fig_multicriterio.png", 2.126, MX, 2.35, 8.1, 3.6);
  caption(s, MX, 5.98, 8.1, "Fig. 8.1 — Matrice multicriterio (scale 1-10) delle localizzazioni candidate.");
  s.addText("PUNTEGGIO PONDERATO", { x: 9.0, y: 2.4, w: 3.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.3 });
  const sc = [["Bologna", "8,93", true], ["Padova/Verona", "6,73", false], ["Torino", "6,45", false], ["Napoli", "6,28", false], ["Roma", "6,18", false]];
  sc.forEach((r, i) => {
    const y = 2.8 + i * 0.62;
    s.addText(r[0], { x: 9.0, y, w: 2.5, h: 0.5, fontFace: SANS, bold: r[2], fontSize: 11.5, color: r[2] ? INK : BODY, valign: "middle" });
    s.addText(r[1], { x: 11.5, y, w: 1.1, h: 0.5, fontFace: SERIF, fontSize: r[2] ? 18 : 14, color: r[2] ? NAVY : MUTE, align: "right", valign: "middle" });
    if (i < 4) s.addShape("line", { x: 9.0, y: y + 0.54, w: 3.6, h: 0, line: { color: LINE, width: 0.75 } });
  });
  keyMsg(s, "Un profilo senza punti deboli decisivi: volume, posizione e infrastrutture spingono nella stessa direzione.");
  foot(s, 15);
})();

/* =====================================================================
   16 — BARICENTRICITÀ (fig_baricentricita)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "08.4 · Perché Bologna", "Un baricentro, non una periferia");
  imgFit(s, "fig_baricentricita.png", 1.054, MX, 1.72, 4.85, 4.45);
  caption(s, MX, 6.2, 4.85, "Fig. 8.2 — Baricentricità di Bologna: distanze stradali dai principali poli.");
  para(s, 5.9, 1.75, 6.7, 1.0, "Da Bologna la rete extra-lombarda è raggiungibile in giornata: il 97% dei ritiri nazionali ricade entro 4 ore di guida. Quattro evidenze convergono verso la stessa scelta.", { fs: 12.5 });
  bullets(s, 5.9, 2.9, 6.7, [
    ["Domanda", "41,1% dei ritiri extra-Lombardia, €357 mila di ricavi già attivi"],
    ["Geografia", "Firenze 105 km, Padova 120, Verona 140, Milano 215, Roma 380"],
    ["Infrastrutture", "nodo A1/A13/A14, Interporto 4,2 mln mq, PNRR, AV a 1h04 da Milano"],
    ["Economia", "3ª provincia italiana per valore aggiunto pro capite (€45.125)"],
  ], { fs: 10.5, lh: 0.72 });
  keyMsg(s, "La posizione trasforma un'unica sede in un presidio capace di coprire quasi tutta la rete.");
  foot(s, 16);
})();

/* =====================================================================
   17 — ANALISI COMPETITIVA (testo)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "09 · Analisi competitiva", "Non competere sul commodity, ma sui servizi a valore");
  para(s, MX, 1.7, 11.9, 0.85, "Nel bacino bolognese operano sei player da centinaia di milioni a oltre un miliardo di euro (DHL Express €1,42 mld, BRT €1,37 mld, Fercam €706 mln, DSV €662 mln, Italtrans €375 mln, Arco Spedizioni €355 mln): un mercato profondo, con manodopera specializzata e servizi complementari.", { fs: 12 });
  // tre fasce
  const fasce = [["Al vertice", "DHL Express e BRT: parcel standard con hub automatizzati ed economie di scala non replicabili"], ["Fascia intermedia", "Fercam e DSV: trasporto multimodale, groupage e contract logistics fino al 4PL"], ["Fascia specialistica", "Italtrans (ADR) e Arco Spedizioni (spedizioneria e dogana)"]];
  fasce.forEach((f, i) => {
    const x = MX + i * 4.06;
    card(s, x, 2.75, 3.85, 1.5);
    s.addShape("rect", { x, y: 2.9, w: 0.06, h: 1.2, fill: { color: BLUE }, line: { type: "none" } });
    s.addText(f[0], { x: x + 0.28, y: 2.9, w: 3.4, h: 0.4, fontFace: SERIF, fontSize: 15, color: INK });
    para(s, x + 0.28, 3.32, 3.45, 0.85, f[1], { fs: 10, ls: 1.2 });
  });
  // posizionamento TMWE
  card(s, MX, 4.45, 11.93, 1.75, { fill: INK, line: INK });
  s.addText("IL POSIZIONAMENTO DELLA FILIALE TMWE — TRE LEVE DI DIFFERENZIAZIONE", { x: MX + 0.35, y: 4.6, w: 11, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: ONDK2, charSpacing: 1.3 });
  const lev = [["Time-critical & su misura", "consegne 9:00/12:00 e urgenze dove i network offrono prodotti standard"], ["Prossimità relazionale", "un referente diretto contro i canali massivi e impersonali"], ["Laboratorio logistico", "controlli qualità e kitting a valore aggiunto per le PMI"]];
  lev.forEach((l, i) => {
    const x = MX + 0.35 + i * 3.85;
    s.addText((i + 1).toString(), { x, y: 5.0, w: 0.4, h: 0.4, fontFace: SERIF, fontSize: 18, color: AMBER });
    s.addText([{ text: l[0] + "\n", options: { bold: true, color: WHITE, fontSize: 11 } }, { text: l[1], options: { color: ONDK, fontSize: 9.5 } }],
      { x: x + 0.42, y: 4.98, w: 3.35, h: 1.1, fontFace: SANS, valign: "top", lineSpacingMultiple: 1.05 });
  });
  keyMsg(s, "L'obiettivo non è sottrarre quote agli incumbent, ma internalizzare i 7.520 ritiri già captive nel bacino.");
  foot(s, 17);
})();

/* =====================================================================
   18 — STRUTTURA ECONOMICA & DRIVER (fig_costi_rampa)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "10 · Analisi economica", "Il motore del progetto è il differenziale di costo per ritiro");
  imgFit(s, "fig_costi_rampa.png", 2.643, MX, 1.72, 8.0, 3.15);
  caption(s, MX, 4.92, 8.0, "Fig. 10.2 — Struttura dei costi a regime (€239k/anno) e rampa di capacità.");
  // driver a destra
  card(s, 8.85, 1.72, 3.78, 3.15, { fill: BLUEL, line: "C4D6EA" });
  s.addText("IL DRIVER", { x: 9.15, y: 1.9, w: 3.2, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "24406F", charSpacing: 1.5 });
  s.addText([{ text: "€43,67", options: { fontFace: SERIF, fontSize: 22, color: BODY } }, { text: "  →  ", options: { fontSize: 16, color: AMBER } }, { text: "€27,20", options: { fontFace: SERIF, fontSize: 22, color: NAVY } }],
    { x: 9.15, y: 2.3, w: 3.3, h: 0.6, valign: "middle" });
  s.addText("costo vettore oggi → costo pieno navetta interna", { x: 9.15, y: 2.92, w: 3.3, h: 0.4, fontFace: SANS, fontSize: 9, color: "24406F", lineSpacingMultiple: 1.05 });
  s.addShape("line", { x: 9.15, y: 3.45, w: 3.18, h: 0, line: { color: "C4D6EA", width: 1 } });
  s.addText("+€16,5", { x: 9.15, y: 3.55, w: 3.3, h: 0.6, fontFace: SERIF, fontSize: 30, color: "24406F" });
  para(s, 9.15, 4.15, 3.3, 0.7, "di margine liberato per ogni ritiro internalizzato, su 7.520 ritiri/anno già contrattualizzati.", { fs: 10, color: "24406F", ls: 1.2 });
  // nota controintuitiva
  card(s, MX, 5.2, 11.93, 1.02, { fill: WHITE });
  s.addText([{ text: "L'effetto controintuitivo   ", options: { bold: true, fontFace: SERIF, fontSize: 14, color: INK } }, { text: "il beneficio deriva dal differenziale tra costo vettore e costo interno, non dal ricavo di trasporto: la compressione dei margini commerciali rende l'internalizzazione ancora più conveniente.", options: { fontSize: 11, color: BODY } }],
    { x: MX + 0.35, y: 5.2, w: 11.3, h: 1.02, valign: "middle", lineSpacingMultiple: 1.15 });
  foot(s, 18);
})();

/* =====================================================================
   19 — SCENARI DI RITORNO (fig_flussi_cumulati)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "10.5 · Scenari di ritorno", "Un investimento di €78 mila che rientra in 1,5 anni");
  imgFit(s, "fig_flussi_cumulati.png", 1.692, MX, 1.72, 7.0, 4.4);
  caption(s, MX, 6.16, 7.0, "Fig. 10.1 — Flussi cumulati: rientro tra 1,0 e 3,9 anni secondo lo scenario.");
  para(s, 7.95, 1.75, 4.7, 0.8, "La simulazione assume una sede di 350 mq, 4,0 FTE e una navetta dedicata. L'investimento iniziale è di €78.000.", { fs: 11.5 });
  const box = [["Beneficio netto annuo", "€20-78 mila", NAVY], ["Payback period", "3,9 / 1,5 / 1,0 anni", NAVY], ["ROI a 5 anni", "+29% / +239% / +401%", AMBER], ["Break-even operativo", "11.800 movimenti/anno", NAVY]];
  box.forEach((b, i) => {
    const y = 2.75 + i * 0.85; card(s, 7.95, y, 4.7, 0.72);
    s.addText(b[0].toUpperCase(), { x: 8.2, y, w: 2.5, h: 0.72, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 0.8, valign: "middle", lineSpacingMultiple: 0.95 });
    s.addText(b[1], { x: 10.4, y, w: 2.1, h: 0.72, fontFace: SERIF, fontSize: 15, color: b[2], align: "right", valign: "middle" });
  });
  keyMsg(s, "Il progetto resta in payback anche nello scenario prudenziale: rischio basso, upside significativo.");
  foot(s, 19);
})();

/* =====================================================================
   20 — DASHBOARD KPI (fig_dashboard)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "12 · Business intelligence", "Un cruscotto per il monitoraggio direzionale");
  imgFit(s, "fig_dashboard.png", 1.540, MX, 1.72, 7.6, 4.45);
  caption(s, MX, 6.2, 7.6, "Fig. 12.1 — Dashboard direzionale: domanda, costi, servizio e mix assicurativo.");
  para(s, 8.55, 1.75, 4.1, 1.0, "Il cruscotto di sintesi mette a confronto valore attuale e target al terzo anno, con soglie di allerta e revisione trimestrale in Direzione.", { fs: 11.5 });
  const t = [["Costo/ritiro bacino", "€43,67", "€27,20"], ["Puntualità OTD", "79,8%", "≥ 90%"], ["Lead time", "3,08 gg", "2,20 gg"], ["Ritiri/anno bacino", "7.520", "18.000"]];
  s.addText("ATTUALE → TARGET ANNO 3", { x: 8.55, y: 2.95, w: 4.1, h: 0.28, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.2 });
  t.forEach((r, i) => {
    const y = 3.32 + i * 0.72;
    s.addText(r[0], { x: 8.55, y, w: 2.3, h: 0.6, fontFace: SANS, fontSize: 10.5, color: INK, valign: "middle", lineSpacingMultiple: 0.95 });
    s.addText([{ text: r[1] + "  ", options: { color: MUTE, fontSize: 11 } }, { text: "→ ", options: { color: AMBER, fontSize: 10 } }, { text: r[2], options: { color: NAVY, bold: true, fontFace: SERIF, fontSize: 14 } }],
      { x: 10.5, y, w: 2.15, h: 0.6, align: "right", valign: "middle" });
    if (i < 3) s.addShape("line", { x: 8.55, y: y + 0.62, w: 4.1, h: 0, line: { color: LINE, width: 0.75 } });
  });
  foot(s, 20);
})();

/* =====================================================================
   21 — IMMOBILE SANT'AGATA (fig_planimetria)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "11 · Il caso studio", "Sant'Agata Bolognese: l'immobile che verifica il modello");
  imgFit(s, "fig_planimetria.png", 1.961, MX, 1.72, 7.4, 3.95);
  caption(s, MX, 5.72, 7.4, "Fig. 11.1 — Planimetria concettuale: zone funzionali e sequenza operativa.");
  para(s, 8.3, 1.75, 4.35, 1.05, "A valle della selezione territoriale è stato analizzato un immobile coerente con i requisiti: magazzino/deposito a Sant'Agata Bolognese, baricentrico tra i caselli A1 e A13/A14.", { fs: 11.5 });
  const facts = [["350 mq", "piano terra + ufficio e area cortiliva"], ["€1.600/mese", "€54,9/mq/anno · −15/25% vs mercato"], ["~28 km", "da Bologna · a 25 min dall'Interporto"], ["240 pallet", "6 zone · ~15.000 movimenti/anno"]];
  facts.forEach((f, i) => {
    const y = 3.0 + i * 0.82;
    s.addText(f[0], { x: 8.3, y, w: 2.0, h: 0.5, fontFace: SERIF, fontSize: 19, color: NAVY, valign: "middle" });
    s.addText(f[1], { x: 10.3, y, w: 2.35, h: 0.5, fontFace: SANS, fontSize: 9.5, color: MUTE, valign: "middle", lineSpacingMultiple: 0.95 });
    if (i < 3) s.addShape("line", { x: 8.3, y: y + 0.72, w: 4.35, h: 0, line: { color: LINE, width: 1 } });
  });
  keyMsg(s, "Un modulo replicabile a costo d'ingresso minimo: l'affitto pesa solo l'8% dei costi operativi.");
  foot(s, 21);
})();

/* =====================================================================
   22 — CONCLUSIONI & AZIONI
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  card(s, MX, 0.55, 5.35, 6.4, { fill: INK, line: INK });
  s.addText("RACCOMANDAZIONE", { x: MX + 0.4, y: 0.9, w: 4.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10.5, color: ONDK2, charSpacing: 2.5 });
  s.addText("Aprire il nuovo polo nel bacino di Bologna, a Sant'Agata Bolognese, entro il Q4.", { x: MX + 0.4, y: 1.25, w: 4.6, h: 1.5, fontFace: SERIF, fontSize: 24, color: WHITE, lineSpacingMultiple: 1.05 });
  s.addShape("line", { x: MX + 0.4, y: 3.0, w: 4.55, h: 0, line: { color: "34477F", width: 1 } });
  const three = [["41,1%", "della domanda extra-lombarda, con distacco 2,6× sulla seconda alternativa"], ["+€16,5", "di margine per ritiro internalizzato, su 7.520 ritiri/anno già contrattualizzati"], ["1,5 anni", "di payback nello scenario centrale (3,9 anche in quello prudenziale)"]];
  three.forEach((t, i) => {
    const y = 3.2 + i * 1.15;
    s.addText(t[0], { x: MX + 0.4, y, w: 1.9, h: 0.5, fontFace: SERIF, fontSize: 26, color: ONDK2, valign: "middle" });
    s.addText(t[1], { x: MX + 0.4, y: y + 0.5, w: 4.55, h: 0.65, fontFace: SANS, fontSize: 10.5, color: ONDK, lineSpacingMultiple: 1.18 });
  });
  s.addText("CONCLUSIONI", { x: 6.5, y: 0.62, w: 6, h: 0.28, fontFace: SANS, bold: true, fontSize: 10.5, color: BLUE, charSpacing: 2.4 });
  s.addText("Una scelta obbligata dai numeri", { x: 6.5, y: 0.9, w: 6.1, h: 0.55, fontFace: SERIF, fontSize: 23, color: INK });
  const ben = [["Economici", "beneficio netto €20-78k/anno · costo per ritiro −37,7% · ROI 5 anni fino a +401%"], ["Logistici", "lead time da 3,08 a 2,20 gg · OTD oltre il 90% · controllo di prima e ultima fascia"], ["Strategici", "de-risking della concentrazione lombarda (77,6%) · presidio del corridoio tedesco · ingresso nell'ecosistema Interporto"]];
  ben.forEach((b, i) => {
    const y = 1.6 + i * 0.85;
    s.addShape("rect", { x: 6.5, y: y + 0.05, w: 0.06, h: 0.68, fill: { color: BLUE }, line: { type: "none" } });
    s.addText([{ text: b[0] + "\n", options: { bold: true, color: INK, fontSize: 12 } }, { text: b[1], options: { color: BODY, fontSize: 10.5 } }],
      { x: 6.72, y, w: 5.9, h: 0.82, fontFace: SANS, valign: "top", lineSpacingMultiple: 1.08 });
  });
  card(s, 6.5, 4.25, 6.13, 2.7, { fill: BLUEL, line: "C4D6EA" });
  s.addText("AZIONI CONSIGLIATE · PRIMI 90 GIORNI", { x: 6.8, y: 4.42, w: 5.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "24406F", charSpacing: 1.3 });
  const act = ["Firmare la locazione (recesso a 12 mesi, compartecipazione all'efficientamento energetico).", "Ordinare scaffali, attrezzature di laboratorio e allestimento mezzo; attivare il WMS in cloud.", "Selezionare l'organico dal bacino Interporto e avviare la formazione sui processi qualità.", "Migrare in navetta i primi 1.500 ritiri e fissare la review KPI trimestrale in Direzione."];
  act.forEach((a, i) => {
    const y = 4.82 + i * 0.5;
    s.addText((i + 1).toString(), { x: 6.8, y, w: 0.32, h: 0.45, fontFace: SERIF, fontSize: 14, color: NAVY, valign: "middle" });
    s.addText(a, { x: 7.2, y, w: 5.3, h: 0.48, fontFace: SANS, fontSize: 9.5, color: "24406F", valign: "middle", lineSpacingMultiple: 1.0 });
  });
  foot(s, 22);
})();

/* ---------- Salvataggio ---------- */
prs.writeFile({ fileName: "Studio-Fattibilita-TMWE-Bologna.pptx" }).then((fn) => console.log("Creato:", fn));
