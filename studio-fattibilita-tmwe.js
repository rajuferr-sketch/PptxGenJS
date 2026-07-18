/**
 * Studio di fattibilità strategica — Nuovo magazzino e laboratorio logistico (TMWE)
 * MOBILITA ITS ACADEMY — A.F. 2025/2026
 *
 * Versione 3: 15 slide, testo più esteso, parti ridondanti accorpate.
 * Logo reale della scuola e figure originali del PDF da ./assets-tmwe/.
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

/* ---------- Design system ---------- */
const BG = "F8F7F4", INK = "16255C", NAVY = "1E3A7B", BLUE = "1E7DC2", BLUEL = "DEE8F3",
  AMBER = "D8901A", AMBERL = "F4E9CE", BODY = "4C5563", MUTE = "8A929B", LINE = "E4E1D9",
  WHITE = "FFFFFF", CARD = "FFFFFF", ONDK = "E7EEF7", ONDK2 = "9DB9DD";
const SERIF = "Georgia", SANS = "Arial";
const W = 13.333, H = 7.5, MX = 0.7, CW = W - MX * 2, NTOT = 15;

/* ---------- Componenti ---------- */
function bg(s) { s.background = { color: BG }; }
function brand(s) { const lw = 1.34, lh = lw / 3.673; s.addImage({ path: A("logo_header.png"), x: W - MX - lw, y: 0.30, w: lw, h: lh }); }
function head(s, kicker, title, o = {}) {
  s.addText(kicker.toUpperCase(), { x: MX, y: 0.5, w: 9, h: 0.26, fontFace: SANS, bold: true, fontSize: 10.5, color: BLUE, charSpacing: 2.4, valign: "middle" });
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
  s.addText([{ text: "MESSAGGIO CHIAVE   ", options: { fontFace: SANS, bold: true, fontSize: 8.5, color: BLUE, charSpacing: 1.4 } }, { text: text, options: { fontFace: SANS, fontSize: 11, color: INK } }],
    { x: MX + 0.28, y, w: CW - 0.5, h: 0.48, valign: "middle", lineSpacingMultiple: 0.96 });
}
function card(s, x, y, w, h, o = {}) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: o.r != null ? o.r : 0.08, fill: { color: o.fill || CARD }, line: o.line ? { color: o.line, width: o.lw || 1 } : { color: LINE, width: 1 },
    shadow: o.shadow === false ? undefined : { type: "outer", color: "D9D5CC", blur: 7, offset: 2, angle: 90, opacity: 0.4 } });
}
function imgFit(s, file, ratio, x, y, w, h, o = {}) {
  if (o.card !== false) card(s, x, y, w, h, { fill: WHITE });
  const pad = o.pad != null ? o.pad : 0.18, bw = w - 2 * pad, bh = h - 2 * pad;
  let dw, dh; if (bw / bh > ratio) { dh = bh; dw = bh * ratio; } else { dw = bw; dh = bw / ratio; }
  s.addImage({ path: A(file), x: x + pad + (bw - dw) / 2, y: y + pad + (bh - dh) / 2, w: dw, h: dh });
}
function caption(s, x, y, w, text) { s.addText(text, { x, y, w, h: 0.3, fontFace: SANS, italic: true, fontSize: 8.5, color: MUTE, valign: "middle", lineSpacingMultiple: 0.95 }); }
function bullets(s, x, y, w, items, o = {}) {
  const lh = o.lh || 0.62, fs = o.fs || 11;
  items.forEach((it, i) => {
    const yy = y + i * lh;
    s.addShape("rect", { x, y: yy + 0.06, w: 0.11, h: 0.11, fill: { color: o.mk || BLUE }, line: { type: "none" } });
    if (Array.isArray(it)) s.addText([{ text: it[0] + "  ", options: { bold: true, color: INK } }, { text: it[1], options: { color: BODY } }], { x: x + 0.26, y: yy - 0.03, w: w - 0.26, h: lh, fontFace: SANS, fontSize: fs, valign: "top", lineSpacingMultiple: 1.05 });
    else s.addText(it, { x: x + 0.26, y: yy - 0.03, w: w - 0.26, h: lh, fontFace: SANS, fontSize: fs, color: BODY, valign: "top", lineSpacingMultiple: 1.05 });
  });
}
function para(s, x, y, w, h, text, o = {}) { s.addText(text, { x, y, w, h, fontFace: SANS, fontSize: o.fs || 12, color: o.color || BODY, lineSpacingMultiple: o.ls || 1.3, valign: o.valign || "top", align: o.align || "left" }); }

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
  para(s, MX + 0.32, 4.55, 9.6, 1.0, "Uno studio data-driven per localizzare un nuovo magazzino e laboratorio logistico: diversificare la rete oltre la Lombardia, presidiare direttamente prima e ultima fascia e recuperare margine sull'ultimo miglio. Base analitica: 82.766 spedizioni, selezione multicriterio e verifica economico-finanziaria.", { fs: 13.5, ls: 1.28 });
  s.addShape("line", { x: MX + 0.32, y: 5.85, w: 10.4, h: 0, line: { color: LINE, width: 1 } });
  [["Corsista", "Raju Ferrisi"], ["Tutor aziendale", "Imane Smouni"], ["Figura professionale", "Tecnico sup. logistica intermodale"], ["Area tecnologica", "Mobilità sostenibile"]].forEach((c, i) => {
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
  para(s, MX, 1.72, 6.0, 1.35, "Tra il 2020 e il 2023 TMWE ha più che triplicato il fatturato. La sua forza operativa — la concentrazione sul nodo di Milano — è però anche la sua principale fragilità strategica: una doppia dipendenza, territoriale e da vettori terzi, che questo studio intende ridurre diversificando geograficamente la rete.", { fs: 12.5 });
  const facts = [["×3,2", "Fatturato 2020 → 2023", "da €2,33 a €7,48 milioni", NAVY], ["96,4%", "Operazioni su vettori terzi", "DHL, FedEx e UPS come fornitori", AMBER], ["77,6%", "Ritiri nazionali dalla Lombardia", "domanda concentrata su un'unica area", NAVY]];
  facts.forEach((f, i) => {
    const y = 3.35 + i * 1.0;
    s.addText(f[0], { x: MX, y, w: 1.85, h: 0.82, fontFace: SERIF, fontSize: 37, color: f[3], valign: "middle" });
    s.addText(f[1], { x: MX + 2.0, y: y + 0.04, w: 4.2, h: 0.36, fontFace: SANS, bold: true, fontSize: 13, color: INK });
    s.addText(f[2], { x: MX + 2.0, y: y + 0.42, w: 4.2, h: 0.34, fontFace: SANS, fontSize: 10.5, color: MUTE });
    if (i < 2) s.addShape("line", { x: MX, y: y + 0.94, w: 6.1, h: 0, line: { color: LINE, width: 1 } });
  });
  card(s, 7.35, 1.72, 5.28, 4.4, { fill: INK, line: INK });
  s.addText("LA DOMANDA DELLO STUDIO", { x: 7.75, y: 2.08, w: 4.5, h: 0.3, fontFace: SANS, bold: true, fontSize: 10, color: ONDK2, charSpacing: 2 });
  s.addText("Dove conviene aprire il secondo polo logistico?", { x: 7.75, y: 2.4, w: 4.5, h: 1.3, fontFace: SERIF, fontSize: 24, color: WHITE, lineSpacingMultiple: 1.05 });
  s.addShape("line", { x: 7.75, y: 3.88, w: 4.48, h: 0, line: { color: "34477F", width: 1 } });
  para(s, 7.75, 4.03, 4.5, 2.1, "La risposta nasce dai dati, non dalle intuizioni. L'analisi dell'intera rete di ritiri, uno screening per massa critica, una valutazione multicriterio su sei dimensioni e una verifica economico-finanziaria conducono a un'unica localizzazione ottimale — e a un caso di investimento robusto.", { fs: 12, color: ONDK, ls: 1.35 });
  keyMsg(s, "Diversificare fuori dalla Lombardia è la leva per ridurre il rischio e liberare nuovo margine.");
  foot(s, 2);
})();

/* =====================================================================
   3 — AZIENDA & MODELLO OPERATIVO (merge)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "01 · L'azienda e il modello", "TMWE: freight forwarder asset-light, multi-carrier");
  para(s, MX, 1.68, 11.9, 1.0, "Nata nel 1999 e operativa dal 2005 a Milano, TMWE è un freight forwarder in un network globale di oltre 7.000 affiliate in 190 Paesi. Il fatturato è passato da €2,33 a €7,48 milioni (2020-2023), con un margine lordo di rete del 16,4%. Il modello è asset-light: la quasi totalità dei trasporti è affidata ai grandi network, mentre marchio proprio e flotta interna presidiano i flussi a maggior valore.", { fs: 11.5 });
  // mix vettori
  card(s, MX, 3.0, 5.75, 3.1);
  s.addText("MIX VETTORI SUL PERIMETRO ANALIZZATO", { x: MX + 0.35, y: 3.16, w: 5.2, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.1 });
  const mix = [["DHL Express", 64.3, NAVY], ["FedEx", 11.3, BLUE], ["UPS", 10.8, BLUE], ["Marchio proprio", 9.7, "7FA6CE"], ["Flotta interna", 3.8, AMBER]];
  mix.forEach((m, i) => {
    const y = 3.58 + i * 0.47;
    s.addText(m[0], { x: MX + 0.35, y, w: 1.85, h: 0.36, fontFace: SANS, fontSize: 10, color: INK, valign: "middle" });
    const bw = (m[1] / 64.3) * 2.75;
    s.addShape("roundRect", { x: MX + 2.25, y: y + 0.05, w: bw, h: 0.24, rectRadius: 0.03, fill: { color: m[2] }, line: { type: "none" } });
    s.addText(m[1].toString().replace(".", ",") + "%", { x: MX + 2.33 + bw, y: y - 0.03, w: 1.0, h: 0.42, fontFace: SANS, bold: true, fontSize: 10, color: INK, valign: "middle" });
  });
  // servizi + certificazioni
  s.addText("PORTAFOGLIO, CLIENTELA E CREDENZIALI", { x: 6.75, y: 3.05, w: 5.9, h: 0.3, fontFace: SANS, bold: true, fontSize: 9, color: MUTE, charSpacing: 1.1 });
  bullets(s, 6.75, 3.45, 5.9, [
    ["Urgenza come driver", "DHL Express Domestic è il servizio più usato (39.224); Express 9:00/12:00 valgono 7.564 spedizioni"],
    ["Merce ad alto valore", "12,6% di spedizioni assicurate, valore medio €2.419 — coerente con un laboratorio tecnico"],
    ["Affidabilità certificata", "WCA Member, IATA Cargo Agent, adesione AICAI; motto «We go far and keep close to you»"],
  ], { fs: 10.5, lh: 0.9 });
  keyMsg(s, "La forza è la flessibilità multi-vettore; il limite è la dipendenza quasi totale (96,4%) dai vettori terzi.");
  foot(s, 3);
})();

/* =====================================================================
   4 — ESPERIENZA, BASE DATI E METODO (merge)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "02 · Metodo", "Dall'esperienza operativa alla decisione data-driven");
  para(s, MX, 1.68, 11.9, 0.95, "L'analisi nasce dall'esperienza diretta di stage in TMWE, nella gestione quotidiana di ritiri e spedizioni: apertura pratiche, monitoraggio del tracking, intercettazione delle eccezioni e assistenza al cliente. Da qui la strutturazione di un database consolidato e la selezione della localizzazione in tre fasi.", { fs: 11.5 });
  // base dati (dark)
  card(s, MX, 2.9, 5.0, 3.2, { fill: INK, line: INK });
  s.addText("LA BASE DELL'ANALISI", { x: MX + 0.35, y: 3.08, w: 4.3, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: ONDK2, charSpacing: 1.6 });
  const db = [["82.766", "record normalizzati"], ["17", "variabili operative ed economiche"], ["420", "città ricondotte a nomi univoci"], ["222", "incoerenze città/regione corrette"]];
  db.forEach((d, i) => {
    const x = MX + 0.35 + (i % 2) * 2.3, y = 3.5 + Math.floor(i / 2) * 1.2;
    s.addText(d[0], { x, y, w: 2.2, h: 0.5, fontFace: SERIF, fontSize: 25, color: ONDK2, valign: "bottom" });
    s.addText(d[1], { x, y: y + 0.5, w: 2.2, h: 0.55, fontFace: SANS, fontSize: 9, color: ONDK, lineSpacingMultiple: 0.95 });
  });
  // 3 fasi
  s.addText("TRE FASI DI SELEZIONE", { x: 6.0, y: 2.95, w: 6.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.4 });
  const steps = [["01", "Screening per massa critica", "soglia minima ~12.000 ritiri/anno: solo Bologna la supera fuori dalla Lombardia"], ["02", "Valutazione multicriterio", "sei dimensioni pesate: volume, baricentricità, accessibilità, intermodalità, costi, manodopera"], ["03", "Verifica economico-finanziaria", "modello di costi, driver di margine e scenari di ritorno sulla prima classificata"]];
  steps.forEach((st, i) => {
    const y = 3.4 + i * 0.92;
    s.addShape("oval", { x: 6.0, y, w: 0.54, h: 0.54, fill: { color: NAVY }, line: { type: "none" } });
    s.addText(st[0], { x: 6.0, y, w: 0.54, h: 0.54, fontFace: SERIF, fontSize: 15, color: WHITE, align: "center", valign: "middle" });
    s.addText([{ text: st[1] + "  ", options: { bold: true, color: INK, fontSize: 12 } }, { text: "— " + st[2], options: { color: BODY, fontSize: 10 } }],
      { x: 6.7, y: y - 0.05, w: 5.9, h: 0.85, fontFace: SANS, valign: "top", lineSpacingMultiple: 1.1 });
  });
  keyMsg(s, "L'esclusione della Lombardia non è arbitraria: il nodo di Milano è già saturo ed efficiente.");
  foot(s, 4);
})();

/* =====================================================================
   5 — RITIRI ESTERI (fig_esteri_bar)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "03 · Ritiri dall'estero", "Un flusso internazionale sottile, selettivo e presidiabile");
  imgFit(s, "fig_esteri_bar.png", 1.764, MX, 1.7, 6.5, 4.05);
  caption(s, MX, 5.78, 6.5, "Fig. 3.1 — Top 5 nazioni estere per ritiri: la Germania pesa più di Francia e Spagna sommate.");
  para(s, 7.45, 1.72, 5.2, 1.3, "I ritiri esteri sono 1.122, appena l'1,36% del totale, ma cinque nazioni concentrano il 94,8% del flusso: una rete selettiva, presidiabile con pochi accordi di corrispondenza e senza necessità di hub oltreconfine.", { fs: 12 });
  bullets(s, 7.45, 3.15, 5.2, [
    ["Germania · 38,1%", "corridoio a maggior valore (12,4 kg medi, OTD 80,3%): consolidamento groupage sul Brennero, che ha in Bologna il suo terminale naturale"],
    ["Francia e Spagna", "margini su transit time e mix vettore; Madrid candidata al groupage stradale (−20/30%)"],
    ["USA e Singapore", "flussi intercontinentali leggeri, con criticità doganali e di coincidenza aerea"],
  ], { fs: 10.5, lh: 1.0 });
  keyMsg(s, "I volumi esteri non impongono un hub estero, ma premiano una sede sull'asse del Brennero/A1.");
  foot(s, 5);
})();

/* =====================================================================
   6 — LA DORSALE PADANA (fig_heatmap)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "04 · Analisi geografica", "La domanda nazionale vive sulla dorsale padana");
  imgFit(s, "fig_heatmap.png", 1.045, MX, 1.72, 4.85, 4.45);
  caption(s, MX, 6.2, 4.85, "Fig. 4.2 — Heat map regionale dei ritiri (scala logaritmica).");
  para(s, 5.9, 1.75, 6.7, 1.25, "I ritiri nazionali sono 81.644 (98,6% del totale) e si distribuiscono per il 90,0% al Nord, il 7,0% al Centro e il 3,0% al Sud. La dorsale Lombardia–Emilia concentra da sola l'87,0% dei volumi: due regioni definiscono il perimetro di ogni scelta di localizzazione.", { fs: 12 });
  bullets(s, 5.9, 3.25, 6.7, [
    ["Lombardia · 63.361 ritiri", "77,6% del totale nazionale, già pienamente presidiata dal nodo di Milano"],
    ["Emilia-Romagna · 7.700", "9,4%: seconda regione d'Italia e prima fuori dal presidio lombardo"],
    ["Arco padano", "Veneto (1.034), Liguria (750) e Piemonte (626) completano oltre 73 mila movimenti/anno"],
  ], { fs: 11, lh: 0.9 });
  keyMsg(s, "Qualunque nuova sede deve restare agganciata alla dorsale: allontanarsene significa rinunciare al 90% della domanda.");
  foot(s, 6);
})();

/* =====================================================================
   7 — LE CITTÀ SOPRA SOGLIA (fig_topcitta)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "05 · Densità operativa", "Solo tre nodi superano la soglia di sostenibilità");
  para(s, MX, 1.68, 11.9, 0.9, "La soglia critica è di 10 ritiri/giorno: sotto questo valore una presenza fisica dedicata non è economicamente sensata. Solo tre nodi la superano — Milano (225/gg), Origgio (46) e Bologna (30) — mentre tutti gli altri poli restano sotto i 4/giorno. Ma Milano e Origgio sono in Lombardia, esclusa per vincolo.", { fs: 11.5 });
  imgFit(s, "fig_topcitta.png", 2.348, MX, 2.75, 8.0, 3.2);
  caption(s, MX, 5.98, 8.0, "Fig. 5.1 — Top 5 città per macroarea (si noti la scala differente per area).");
  card(s, 8.9, 2.75, 3.72, 3.2, { fill: BLUEL, line: "C4D6EA" });
  s.addText("BOLOGNA, UNICA CANDIDATA", { x: 9.15, y: 2.95, w: 3.3, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "24406F", charSpacing: 1 });
  bullets(s, 9.15, 3.4, 3.3, [
    ["30,1 ritiri/giorno", "l'unico nodo extra-lombardo sopra soglia"],
    ["OTD 79,8%", "la miglior puntualità tra i grandi nodi"],
    ["28,3% assicurate", "merce ad alto valore, coerente col laboratorio"],
  ], { fs: 10, lh: 0.82, mk: BLUE });
  keyMsg(s, "Bologna è l'unico candidato che supera la soglia di massa critica fuori dalla Lombardia.");
  foot(s, 7);
})();

/* =====================================================================
   8 — IL DATO CHE DECIDE (fig_classifica)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "07 · Il dato che decide", "Escludendo la Lombardia, non esiste una seconda opzione");
  imgFit(s, "fig_classifica.png", 1.523, MX, 1.72, 6.5, 4.4);
  caption(s, MX, 6.16, 6.5, "Fig. 7.1 — Classifica nazionale in scala logaritmica delle principali città.");
  para(s, 7.45, 1.75, 5.2, 1.25, "Escludendo la Lombardia (già presidiata), il mercato residuo vale 18.283 ritiri/anno. Bologna ne concentra da sola il 41,1%: le nove città successive, sommate, arrivano appena al 44%. Non esiste, nei dati, una seconda opzione comparabile.", { fs: 12 });
  card(s, 7.45, 3.2, 2.5, 1.55, { fill: NAVY, line: NAVY });
  s.addText("41,1%", { x: 7.45, y: 3.34, w: 2.5, h: 0.88, fontFace: SERIF, fontSize: 38, color: WHITE, align: "center", valign: "middle" });
  s.addText("del mercato\nextra-Lombardia", { x: 7.45, y: 4.18, w: 2.5, h: 0.5, fontFace: SANS, fontSize: 9.5, color: ONDK, align: "center", lineSpacingMultiple: 0.95 });
  card(s, 10.12, 3.2, 2.5, 1.55, { fill: AMBERL, line: "E7D6AE" });
  s.addText("2,6×", { x: 10.12, y: 3.34, w: 2.5, h: 0.88, fontFace: SERIF, fontSize: 38, color: AMBER, align: "center", valign: "middle" });
  s.addText("distacco sulla\nprima alternativa", { x: 10.12, y: 4.18, w: 2.5, h: 0.5, fontFace: SANS, fontSize: 9.5, color: "7A6220", align: "center", lineSpacingMultiple: 0.95 });
  para(s, 7.45, 4.95, 5.2, 1.15, "Il distacco tra Bologna e la prima alternativa (Roma) è di 4.659 ritiri/anno, pari a 19 ritiri/giorno di differenza: la partita è decisa dai numeri.", { fs: 11.5 });
  foot(s, 8);
})();

/* =====================================================================
   9 — PERCHÉ BOLOGNA (fig_baricentricita)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "08 · Perché Bologna", "Un baricentro, non una periferia: quattro evidenze convergenti");
  imgFit(s, "fig_baricentricita.png", 1.054, MX, 1.72, 4.85, 4.45);
  caption(s, MX, 6.2, 4.85, "Fig. 8.2 — Baricentricità di Bologna: distanze stradali dai principali poli.");
  para(s, 5.9, 1.75, 6.7, 1.0, "Da Bologna la rete extra-lombarda è raggiungibile in giornata: il 97% dei ritiri nazionali ricade entro 4 ore di guida. Quattro evidenze indipendenti spingono nella stessa direzione.", { fs: 12 });
  bullets(s, 5.9, 2.9, 6.7, [
    ["Domanda", "41,1% dei ritiri extra-Lombardia, €357 mila di ricavi già attivi, 28,3% assicurate"],
    ["Geografia", "Firenze 105 km, Padova 120, Verona 140, Milano 215, Roma 380 — servibili in giornata"],
    ["Infrastrutture", "nodo A1/A13/A14, Interporto 4,2 mln mq, terminal ferroviario PNRR, AV a 1h04 da Milano"],
    ["Economia", "3ª provincia italiana per valore aggiunto pro capite (€45.125), ecosistema logistico profondo"],
  ], { fs: 10.5, lh: 0.78 });
  keyMsg(s, "La posizione trasforma un'unica sede in un presidio capace di coprire quasi tutta la rete.");
  foot(s, 9);
})();

/* =====================================================================
   10 — VALUTAZIONE MULTICRITERIO (fig_multicriterio)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "08.3 · Valutazione multicriterio", "Bologna domina il punteggio ponderato");
  para(s, MX, 1.68, 11.9, 0.9, "Le candidate extra-lombarde sono state confrontate su sei dimensioni pesate: volume dei ritiri (30%), baricentricità (15%), accessibilità autostradale (15%), intermodalità ferro/aereo (15%), costo immobiliare (15%) e manodopera logistica (10%). Bologna ottiene 8,93, prevalendo su quattro criteri su sei e senza mai risultare ultima.", { fs: 11.5 });
  imgFit(s, "fig_multicriterio.png", 2.126, MX, 2.9, 8.1, 3.05);
  caption(s, MX, 5.98, 8.1, "Fig. 8.1 — Matrice multicriterio (scale 1-10) delle localizzazioni candidate.");
  s.addText("PUNTEGGIO PONDERATO", { x: 9.0, y: 2.95, w: 3.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: MUTE, charSpacing: 1.3 });
  const sc = [["Bologna", "8,93", true], ["Padova/Verona", "6,73", false], ["Torino", "6,45", false], ["Napoli", "6,28", false], ["Roma", "6,18", false]];
  sc.forEach((r, i) => {
    const y = 3.35 + i * 0.5;
    s.addText(r[0], { x: 9.0, y, w: 2.5, h: 0.44, fontFace: SANS, bold: r[2], fontSize: 11, color: r[2] ? INK : BODY, valign: "middle" });
    s.addText(r[1], { x: 11.5, y, w: 1.1, h: 0.44, fontFace: SERIF, fontSize: r[2] ? 17 : 13, color: r[2] ? NAVY : MUTE, align: "right", valign: "middle" });
    if (i < 4) s.addShape("line", { x: 9.0, y: y + 0.46, w: 3.6, h: 0, line: { color: LINE, width: 0.75 } });
  });
  keyMsg(s, "Un profilo senza punti deboli decisivi: volume, posizione e infrastrutture spingono nella stessa direzione.");
  foot(s, 10);
})();

/* =====================================================================
   11 — ANALISI COMPETITIVA (testo)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "09 · Analisi competitiva", "Non competere sul commodity, ma sui servizi a valore");
  para(s, MX, 1.68, 11.9, 0.95, "Nel bacino bolognese operano sei player da centinaia di milioni a oltre un miliardo di euro (DHL Express €1,42 mld, BRT €1,37 mld, Fercam €706 mln, DSV €662 mln, Italtrans €375 mln, Arco Spedizioni €355 mln): un mercato profondo e conteso, con manodopera specializzata e servizi complementari. La compresenza di operatori di questa scala conferma la profondità della domanda.", { fs: 11.5 });
  const fasce = [["Al vertice", "DHL Express e BRT: parcel standard con hub automatizzati ed economie di scala non replicabili"], ["Fascia intermedia", "Fercam e DSV: trasporto multimodale, groupage e contract logistics fino al 4PL"], ["Fascia specialistica", "Italtrans (merci ADR) e Arco Spedizioni (spedizioneria e pratiche doganali)"]];
  fasce.forEach((f, i) => {
    const x = MX + i * 4.06; card(s, x, 3.0, 3.85, 1.5);
    s.addShape("rect", { x, y: 3.15, w: 0.06, h: 1.2, fill: { color: BLUE }, line: { type: "none" } });
    s.addText(f[0], { x: x + 0.28, y: 3.15, w: 3.4, h: 0.4, fontFace: SERIF, fontSize: 15, color: INK });
    para(s, x + 0.28, 3.57, 3.45, 0.85, f[1], { fs: 10, ls: 1.2 });
  });
  card(s, MX, 4.72, 11.93, 1.5, { fill: INK, line: INK });
  s.addText("IL POSIZIONAMENTO DELLA FILIALE TMWE — TRE LEVE DI DIFFERENZIAZIONE", { x: MX + 0.35, y: 4.85, w: 11, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: ONDK2, charSpacing: 1.3 });
  const lev = [["Time-critical & su misura", "consegne 9:00/12:00 e urgenze dove i network offrono prodotti standard"], ["Prossimità relazionale", "un referente diretto contro i canali massivi e impersonali"], ["Laboratorio logistico", "controlli qualità e kitting a valore aggiunto per le PMI"]];
  lev.forEach((l, i) => {
    const x = MX + 0.35 + i * 3.85;
    s.addText((i + 1).toString(), { x, y: 5.22, w: 0.4, h: 0.4, fontFace: SERIF, fontSize: 17, color: AMBER });
    s.addText([{ text: l[0] + "\n", options: { bold: true, color: WHITE, fontSize: 11 } }, { text: l[1], options: { color: ONDK, fontSize: 9.5 } }], { x: x + 0.42, y: 5.2, w: 3.35, h: 0.95, fontFace: SANS, valign: "top", lineSpacingMultiple: 1.05 });
  });
  foot(s, 11);
})();

/* =====================================================================
   12 — ANALISI ECONOMICA (fig_costi_rampa)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "10 · Analisi economica", "Il motore del progetto è il differenziale di costo per ritiro");
  para(s, MX, 1.68, 11.9, 0.9, "La simulazione assume una sede di 350 mq, operativa 250 giorni/anno, con 4,0 FTE e una navetta dedicata su due run. I costi operativi a regime valgono €239.400/anno (personale €158k, costi fissi €51,4k, navetta €30k). Il beneficio non dipende dal ricavo di trasporto, ma dal differenziale di costo per ritiro.", { fs: 11.5 });
  imgFit(s, "fig_costi_rampa.png", 2.643, MX, 2.95, 8.0, 3.15);
  caption(s, MX, 6.16, 8.0, "Fig. 10.2 — Struttura dei costi a regime e rampa di capacità.");
  card(s, 8.9, 2.95, 3.72, 3.15, { fill: BLUEL, line: "C4D6EA" });
  s.addText("IL DRIVER", { x: 9.2, y: 3.12, w: 3.2, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "24406F", charSpacing: 1.5 });
  s.addText([{ text: "€43,67", options: { fontFace: SERIF, fontSize: 20, color: BODY } }, { text: "  →  ", options: { fontSize: 14, color: AMBER } }, { text: "€27,20", options: { fontFace: SERIF, fontSize: 20, color: NAVY } }], { x: 9.2, y: 3.5, w: 3.3, h: 0.55, valign: "middle" });
  s.addText("costo vettore oggi → costo pieno navetta interna", { x: 9.2, y: 4.08, w: 3.3, h: 0.4, fontFace: SANS, fontSize: 9, color: "24406F", lineSpacingMultiple: 1.05 });
  s.addShape("line", { x: 9.2, y: 4.58, w: 3.12, h: 0, line: { color: "C4D6EA", width: 1 } });
  s.addText("+€16,5", { x: 9.2, y: 4.66, w: 3.3, h: 0.6, fontFace: SERIF, fontSize: 29, color: "24406F" });
  para(s, 9.2, 5.28, 3.3, 0.75, "di margine liberato per ogni ritiro internalizzato, su 7.520 ritiri/anno già contrattualizzati.", { fs: 9.5, color: "24406F", ls: 1.2 });
  foot(s, 12);
})();

/* =====================================================================
   13 — SCENARI DI RITORNO (fig_flussi_cumulati)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "10.5 · Scenari di ritorno", "Un investimento di €78 mila che rientra in 1,5 anni");
  imgFit(s, "fig_flussi_cumulati.png", 1.692, MX, 1.72, 7.0, 4.4);
  caption(s, MX, 6.16, 7.0, "Fig. 10.1 — Flussi cumulati: rientro tra 1,0 e 3,9 anni secondo lo scenario.");
  para(s, 7.95, 1.75, 4.7, 1.1, "L'investimento iniziale è di €78.000 (scaffali, laboratorio, IT, allestimento mezzo). Il progetto resta in payback anche nello scenario prudenziale: rischio basso, upside significativo.", { fs: 11.5 });
  const box = [["Beneficio netto annuo", "€20-78 mila", NAVY], ["Payback period", "3,9 / 1,5 / 1,0 anni", NAVY], ["ROI a 5 anni", "+29% / +239% / +401%", AMBER], ["Break-even operativo", "11.800 movimenti/anno", NAVY]];
  box.forEach((b, i) => {
    const y = 3.05 + i * 0.78; card(s, 7.95, y, 4.7, 0.66);
    s.addText(b[0].toUpperCase(), { x: 8.2, y, w: 2.5, h: 0.66, fontFace: SANS, bold: true, fontSize: 8.5, color: MUTE, charSpacing: 0.6, valign: "middle", lineSpacingMultiple: 0.95 });
    s.addText(b[1], { x: 10.4, y, w: 2.1, h: 0.66, fontFace: SERIF, fontSize: 14, color: b[2], align: "right", valign: "middle" });
  });
  keyMsg(s, "Il beneficio nasce dal controllo del costo: comprimere i margini di trasporto rende l'internalizzazione ancora più conveniente.");
  foot(s, 13);
})();

/* =====================================================================
   14 — L'IMMOBILE SANT'AGATA (fig_planimetria)
   ===================================================================== */
(() => {
  const s = prs.addSlide(); bg(s); brand(s);
  head(s, "11 · Il caso studio", "Sant'Agata Bolognese: l'immobile che verifica il modello");
  para(s, MX, 1.68, 11.9, 0.9, "A valle della selezione territoriale è stato analizzato un immobile coerente con i requisiti: magazzino/deposito di 350 mq a Sant'Agata Bolognese, baricentrico tra i caselli A1 (Modena Sud) e A13/A14, a 25 minuti dall'Interporto. Il layout organizza gli spazi in sei zone funzionali, con la merce assicurata in area videosorvegliata adiacente al laboratorio.", { fs: 11.5 });
  imgFit(s, "fig_planimetria.png", 1.961, MX, 2.9, 7.4, 3.1);
  caption(s, MX, 6.12, 7.4, "Fig. 11.1 — Planimetria concettuale: zone funzionali e sequenza operativa.");
  const facts = [["350 mq", "piano terra + ufficio e area cortiliva"], ["€1.600/mese", "€54,9/mq/anno · −15/25% vs mercato"], ["~28 km", "da Bologna · a 25 min dall'Interporto"], ["240 pallet", "6 zone · ~15.000 movimenti/anno"]];
  facts.forEach((f, i) => {
    const y = 2.95 + i * 0.78;
    s.addText(f[0], { x: 8.3, y, w: 2.0, h: 0.48, fontFace: SERIF, fontSize: 18, color: NAVY, valign: "middle" });
    s.addText(f[1], { x: 10.25, y, w: 2.4, h: 0.48, fontFace: SANS, fontSize: 9, color: MUTE, valign: "middle", lineSpacingMultiple: 0.95 });
    if (i < 3) s.addShape("line", { x: 8.3, y: y + 0.68, w: 4.35, h: 0, line: { color: LINE, width: 1 } });
  });
  keyMsg(s, "Un modulo replicabile a costo d'ingresso minimo: l'affitto pesa solo l'8% dei costi operativi.");
  foot(s, 14);
})();

/* =====================================================================
   15 — CONCLUSIONI & AZIONI
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
  const ben = [["Economici", "beneficio netto €20-78k/anno · costo per ritiro −37,7% · ROI a 5 anni fino a +401%"], ["Logistici", "lead time da 3,08 a 2,20 giorni · OTD oltre il 90% · controllo diretto di prima e ultima fascia"], ["Strategici", "de-risking della concentrazione lombarda (77,6%) · presidio del corridoio tedesco · ingresso nell'ecosistema Interporto"]];
  ben.forEach((b, i) => {
    const y = 1.6 + i * 0.86;
    s.addShape("rect", { x: 6.5, y: y + 0.05, w: 0.06, h: 0.68, fill: { color: BLUE }, line: { type: "none" } });
    s.addText([{ text: b[0] + "\n", options: { bold: true, color: INK, fontSize: 12 } }, { text: b[1], options: { color: BODY, fontSize: 10.5 } }], { x: 6.72, y, w: 5.9, h: 0.84, fontFace: SANS, valign: "top", lineSpacingMultiple: 1.08 });
  });
  card(s, 6.5, 4.28, 6.13, 2.67, { fill: BLUEL, line: "C4D6EA" });
  s.addText("AZIONI CONSIGLIATE · PRIMI 90 GIORNI", { x: 6.8, y: 4.44, w: 5.6, h: 0.3, fontFace: SANS, bold: true, fontSize: 9.5, color: "24406F", charSpacing: 1.3 });
  const act = ["Firmare la locazione (recesso a 12 mesi, compartecipazione all'efficientamento energetico).", "Ordinare scaffali, attrezzature di laboratorio e allestimento mezzo; attivare il WMS in cloud.", "Selezionare l'organico dal bacino Interporto e avviare la formazione sui processi qualità.", "Migrare in navetta i primi 1.500 ritiri e fissare la review KPI trimestrale in Direzione."];
  act.forEach((a, i) => {
    const y = 4.84 + i * 0.5;
    s.addText((i + 1).toString(), { x: 6.8, y, w: 0.32, h: 0.45, fontFace: SERIF, fontSize: 14, color: NAVY, valign: "middle" });
    s.addText(a, { x: 7.2, y, w: 5.3, h: 0.48, fontFace: SANS, fontSize: 9.5, color: "24406F", valign: "middle", lineSpacingMultiple: 1.0 });
  });
  foot(s, 15);
})();

prs.writeFile({ fileName: "Studio-Fattibilita-TMWE-Bologna.pptx" }).then((fn) => console.log("Creato:", fn));
