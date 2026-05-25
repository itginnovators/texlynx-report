import { StyleSheet } from "@react-pdf/renderer";

export const ORANGE = "#E87722";
export const BLUE = "#1155CC";
export const BLACK = "#000000";
export const GRAY = "#999999";
export const LIGHT_GRAY = "#F2F2F2";
export const GREEN = "#27AE60";
export const RED = "#CC0000";
export const BORDER = { borderWidth: 0.5, borderColor: BLACK };

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8.5,
    color: BLACK,
    padding: 20,
    backgroundColor: "#fff",
  },

  // ── HEADER ──
  headerTable: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: BLACK,
    marginBottom: 10,
    minHeight: 36,
    alignItems: "stretch",
  },
  headerCol1: {
    width: "33%",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tqmsText: { color: ORANGE, fontSize: 12, fontFamily: "Helvetica-Bold", marginRight: 5 },
  texlynxText: { color: BLACK, fontSize: 21, fontFamily: "Helvetica-Bold", letterSpacing: 3 },
  headerCol2: {
    width: "40%",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  reportTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  headerCol3: {
    width: "27%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 8,
  },
  pageNumText: { color: GRAY, fontSize: 9 },

  // ── SECTION HEADER ──
  sectionHeader: {
    backgroundColor: ORANGE,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 4,
    marginTop: 6,
  },
  sectionHeaderText: { color: 'white', fontFamily: "Helvetica-Bold", fontSize: 9.5, textAlign: "center" },

  // ── INFO TABLE ──
  infoTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  infoRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 28 },
  infoRowLast: { borderBottomWidth: 0 },
  infoLabel: {
    width: "22%", paddingHorizontal: 4, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", justifyContent: "center",
  },
  infoValue: {
    width: "28%", paddingHorizontal: 4, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    color: BLUE, justifyContent: "center", fontFamily: "Helvetica-Bold"
  },
  infoValueFull: {
    width: "78%", paddingHorizontal: 4, paddingVertical: 3,
    color: BLUE, justifyContent: "center", fontFamily: "Helvetica-Bold"
  },
  infoValueLast: {
    width: "28%", paddingHorizontal: 4, paddingVertical: 3,
    color: BLUE, justifyContent: "center", fontFamily: "Helvetica-Bold"
  },

  // ── PRODUCT CATEGORY ──
  catTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 6 },
  catRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 26, alignItems: "stretch" },
  catRowLast: { borderBottomWidth: 0 },
  catLabel: {
    width: "22%", paddingHorizontal: 4, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", justifyContent: "center",
  },
  catChecksRow: { flexDirection: "row", width: "78%" },
  catCheckCell: {
    flex: 1, flexDirection: "row", alignItems: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK,
    paddingHorizontal: 5, paddingVertical: 3,
  },
  catCheckCellLast: {
    flex: 1, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 5, paddingVertical: 3,
  },
  catValueFull: {
    width: "78%", paddingHorizontal: 4, paddingVertical: 3,
    color: BLUE, justifyContent: "center", fontFamily: "Helvetica-Bold"
  },
  cbLabel: { fontSize: 8.5, marginLeft: 3, fontFamily: "Helvetica-Bold" },

  // ── CONCLUSION ──
  conclusionRow: {
    flexDirection: "row", alignItems: "center",
    gap: 100,
    paddingHorizontal: 6, paddingVertical: 8,
    marginBottom: 8,
  },
  conclusionTitle: { fontFamily: "Helvetica-Bold", fontSize: 11, marginRight: 16 },
  conclusionItem: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  confirmText: { color: GREEN, fontFamily: "Helvetica-Bold", fontSize: 9, marginLeft: 4 },
  notConfirmText: { color: RED, fontFamily: "Helvetica-Bold", fontSize: 9, marginLeft: 4 },
  pendingText: { color: ORANGE, fontFamily: "Helvetica-Bold", fontSize: 9, marginLeft: 4 },

  // ── CHECKLIST TABLE ──
  // Column widths per group (must sum to 100%):
  // Point 40% + Confirm 15% + NotConfirm 15% + Pending 15% + NA 15% = 100%
  clTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 6, flex: 1 },
  clHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK,
  },
  clDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, flex: 1 },
  clDataRowLast: { borderBottomWidth: 0.5 },
  // Each group is 25% of table; NO outer group border — last cell per group carries the right border
   clGroupCol: { width: "25%", flexDirection: "row", borderRightWidth: 1, borderRightColor: BLACK, borderLeftWidth: 1, borderLeftColor: BLACK },
  clGroupColLast: { width: "25%", flexDirection: "row", borderRightWidth: 1, borderRightColor: "white" },
  clPointCell: {
    width: "40%", paddingHorizontal: 3, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK, justifyContent: "center",
    fontSize: 7.5,
  },
  // Confirm, Not Confirm, Pending — each 15%
  clCheckCell: {
    width: "15%", justifyContent: "center", alignItems: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK,
  },
  // N/A — 15%; for groups 0-2 also has right border (group separator); group 3 has none
  clCheckCellLast: {
    width: "15%", justifyContent: "center", alignItems: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK,
  },
  clCheckCellLastNoRight: {
    width: "15%", justifyContent: "center", alignItems: "center",
  },
  clHeaderPoint: {
    width: "40%", paddingHorizontal: 3, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", fontSize: 7,
  },
  clHeaderCheck: {
    width: "15%", paddingVertical: 3, textAlign: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", fontSize: 6.5,
  },
  clHeaderCheckLast: {
    width: "15%", paddingVertical: 3, textAlign: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", fontSize: 6.5,
  },
  clHeaderCheckLastNoRight: {
    width: "15%", paddingVertical: 3, textAlign: "center",
    fontFamily: "Helvetica-Bold", fontSize: 6.5,
  },
  // No separate clGroupBorder — border is on the last cell (clCheckCellLast)
  remarksRow: { paddingHorizontal: 5, paddingVertical: 4, fontSize: 8 },

  // ── QUANTITY TABLE ──
  qtyTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  qtyHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK,
  },
  qtyDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 22 },
  qtyDataRowLast: { borderBottomWidth: 0 },
  qtyCell: {
    paddingHorizontal: 4, paddingVertical: 4, justifyContent: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 9,
  },
  qtyCellLast: { paddingHorizontal: 4, paddingVertical: 4, justifyContent: "center", fontSize: 9 },
  qtyHeaderCell: {
    paddingHorizontal: 2, paddingVertical: 4, fontFamily: "Helvetica-Bold",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 7.5, textAlign: "center",
  },
  qtyHeaderCellLast: { paddingHorizontal: 2, paddingVertical: 4, fontFamily: "Helvetica-Bold", fontSize: 7.5, textAlign: "center" },
  totalSampleRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 5, marginBottom: 8 },
  totalSampleText: { fontFamily: "Helvetica-Bold", fontSize: 10 },

  // ── WORKMANSHIP AQL ──
  aqlTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  aqlHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK,
  },
  aqlDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 22 },
  aqlDataRowLast: { borderBottomWidth: 0 },
  aqlCell: {
    paddingHorizontal: 4, paddingVertical: 4, justifyContent: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 9,
  },
  aqlCellLast: { paddingHorizontal: 4, paddingVertical: 4, justifyContent: "center", fontSize: 9 },
  aqlHeaderCell: {
    paddingHorizontal: 2, paddingVertical: 4, fontFamily: "Helvetica-Bold",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 7.5, textAlign: "center",
  },
  aqlHeaderCellLast: {
    paddingHorizontal: 2, paddingVertical: 4, fontFamily: "Helvetica-Bold",
    fontSize: 7.5, textAlign: "center",
  },

  // ── WORKMANSHIP CONTROL RECORD ──
  wcrBlock: { marginBottom: 5, borderWidth: 0.5, borderColor: BLACK },

  // Left column header panel (spans 4 header rows height)
  wcrLeftHeader: {
    flexDirection: "row",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    borderBottomWidth: 0.5,
    borderBottomColor: BLACK,
    backgroundColor: LIGHT_GRAY,
    alignItems: "center",
  },
  wcrErrNumHeader: {
    width: 28,
    paddingHorizontal: 2,
    paddingVertical: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    textAlign: "center",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
  },
  wcrErrDescHeader: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
  },

  // Right header block (meta info)
  wcrRightHeader: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 0.5,
    borderBottomColor: BLACK,
  },
  wcrMetaInfoRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: BLACK,
    backgroundColor: LIGHT_GRAY,
    minHeight: 13,
  },
  wcrMetaInfoLabel: {
    width: 80,
    paddingHorizontal: 3,
    paddingVertical: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    justifyContent: "center",
  },
  wcrMetaInfoValue: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 7.5,
    color: BLUE,
    justifyContent: "center",
    fontFamily: "Helvetica-Bold"
  },
  wcrDefectCatCell: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    textAlign: "center",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
  },

  // Data rows (12 error rows)
  wcrDataRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: BLACK,
    minHeight: 13,
  },
  wcrErrNumCell: {
    width: 28,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    fontSize: 7.5,
    justifyContent: "center",
  },
  wcrDescCell: {
    flex: 1,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    fontSize: 7.5,
    justifyContent: "center",
  },
  wcrCountCell: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    textAlign: "center",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    fontSize: 7.5,
    justifyContent: "center",
  },
  wcrCountCellLast: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    textAlign: "center",
    fontSize: 7.5,
    justifyContent: "center",
  },

  // Footer rows (TOTAL / ALLOWABLE / RESULT)
  wcrFooterRow: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: BLACK,
    minHeight: 13,
    alignItems: "center",
  },
  wcrFooterErrNum: {
    width: 28,
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
    alignSelf: "stretch",
  },
  wcrFooterLabelCell: {
    width: 120,
    paddingHorizontal: 3,
    paddingVertical: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    textAlign: "right",
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
  },
  wcrFooterCount: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    borderRightWidth: 0.5,
    borderRightColor: BLACK,
  },
  wcrFooterCountLast: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
  },

  // ── PACKING ──
  packTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  packRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 18, alignItems: "stretch" },
  packRowLast: { borderBottomWidth: 0 },
  packLabel: {
    width: "28%", paddingHorizontal: 4, paddingVertical: 3,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", justifyContent: "center", fontSize: 8,
  },
  packOptionsRow: { width: "72%", flexDirection: "row", alignItems: "center", flexWrap: "wrap", paddingHorizontal: 4, paddingVertical: 3 },
  packOption: { flexDirection: "row", alignItems: "center", marginRight: 14 },
  packOptionText: { fontSize: 8, marginLeft: 5 },
  packDescBox: {
    borderWidth: 0.5, borderColor: BLACK, minHeight: 40,
    paddingHorizontal: 5, paddingVertical: 4, marginBottom: 8, color: BLUE, fontSize: 8, fontFamily: "Helvetica-Bold"
  },
  simpleTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  simpleHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK,
  },
  simpleDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 22 },
  simpleDataRowLast: { borderBottomWidth: 0 },
  simpleCell: {
    flex: 1, paddingHorizontal: 5, paddingVertical: 4, justifyContent: "center",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 9.5,
  },
  simpleCellLast: { flex: 1, paddingHorizontal: 5, paddingVertical: 4, justifyContent: "center", fontSize: 9.5 },
  simpleHeaderCell: {
    flex: 1, paddingHorizontal: 5, paddingVertical: 4, fontFamily: "Helvetica-Bold",
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 9.5,
  },
  simpleHeaderCellLast: { flex: 1, paddingHorizontal: 5, paddingVertical: 4, fontFamily: "Helvetica-Bold", fontSize: 9.5 },

  // ── MEASUREMENT ──
  measCheckRow: { flexDirection: "row", alignItems: "center", marginBottom: 5, flexWrap: "wrap" },
  measCheckItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  measCheckLabel: { fontSize: 9, marginLeft: 5 },
  measTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  measHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 18,
  },
  measCell: {
    flex: 1, paddingHorizontal: 2, paddingVertical: 2,
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 7.5, textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  measCellLast: { flex: 1, paddingHorizontal: 2, paddingVertical: 2, fontSize: 7.5, textAlign: "center", fontFamily: "Helvetica-Bold" },
  measDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 18 },
  measDataCell: {
    flex: 1, paddingHorizontal: 2, paddingVertical: 2,
    borderRightWidth: 0.5, borderRightColor: BLACK, fontSize: 7.5,
  },
  measDataCellLast: { flex: 1, paddingHorizontal: 2, paddingVertical: 2, fontSize: 7.5 },

  // ── PRODUCT CONFORMITY ──
  obsBox: {
    borderWidth: 0.5, borderColor: BLACK, minHeight: 220,
    paddingHorizontal: 5, paddingVertical: 4, marginBottom: 8,
  },
  obsTitle: { fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, borderWidth: 0.5, borderColor: BLACK, paddingVertical: 3, textAlign: "center", backgroundColor: ORANGE, },
  obsText: { fontSize: 8.5, color: BLUE, fontFamily: "Helvetica-Bold" },
  conformTable: { borderWidth: 0.5, borderColor: BLACK, marginBottom: 8 },
  conformHeaderRow: {
    flexDirection: "row", backgroundColor: LIGHT_GRAY,
    borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 24,
  },
  conformDataRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BLACK, minHeight: 28 },
  conformDataRowLast: { borderBottomWidth: 0 },
  conformLabelCell: {
    width: "28%", paddingHorizontal: 5, paddingVertical: 5,
    borderRightWidth: 0.5, borderRightColor: BLACK, fontFamily: "Helvetica-Bold", fontSize: 9.5, justifyContent: "center",
  },
  conformCheckCell: {
    width: "11%", paddingHorizontal: 4, paddingVertical: 4,
    borderRightWidth: 0.5, borderRightColor: BLACK, flexDirection: "row",
    alignItems: "center", justifyContent: "center", fontSize: 9,
  },
  conformCheckCellLast: {
    width: "11%", paddingHorizontal: 4, paddingVertical: 4,
    borderRightWidth: 0.5, borderRightColor: BLACK, flexDirection: "row",
    alignItems: "center", justifyContent: "center", fontSize: 9,
  },
  conformRemarksCell: {
    width: "23%", paddingHorizontal: 5, paddingVertical: 5,
    fontSize: 9, color: BLUE, justifyContent: "center", fontFamily: "Helvetica-Bold"
  },
  conformHeaderCell: {
    width: "11%", paddingHorizontal: 4, paddingVertical: 4,
    borderRightWidth: 0.5, borderRightColor: BLACK,
    fontFamily: "Helvetica-Bold", fontSize: 9, textAlign: "center",
  },
  conformHeaderCellLast: {
    width: "23%", paddingHorizontal: 4, paddingVertical: 4,
    fontFamily: "Helvetica-Bold", fontSize: 9,
  },
  conformHeaderLabel: {
    width: "28%", paddingHorizontal: 5, paddingVertical: 4,
    borderRightWidth: 0.5, borderRightColor: BLACK, fontFamily: "Helvetica-Bold", fontSize: 9.5,
  },
});

export default styles;
