import React from "react";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import styles, { ORANGE, BLUE, GREEN, RED, LIGHT_GRAY, BLACK } from "./styles";
import {
  PageHeader, SectionHeader, CB,
  InfoTable, ProductCategoryTable, InspectionConclusion, ChecklistTable
} from "./components";

const INSPECTION_TYPES = { 1: "PSI", 2: "In Line", 3: "Final", 4: "Re Final" };

const PROD_CATS_LABEL = ["Apparel", "Soft Home", "Hard Goods", "Accessories", "Others"];

// ── PAGE 1: General Info + Checklist ─────────────────────────
const Page1 = ({ data, result }) => {
  const { general, assigned, checklist, checklistRemarks } = data;
  const inspType = INSPECTION_TYPES[general?.InspectionTypeID] || "—";
  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <InfoTable general={general} inspType={inspType} />
      <ProductCategoryTable general={general} />
      <InspectionConclusion result={assigned?.InspectionResult} />
      {/* <SectionHeader title="CHECKLIST" /> */}
      <ChecklistTable checklist={checklist} checklistRemarks={checklistRemarks} />
    </Page>
  );
};

// ── PAGE 2: Quantity Info ─────────────────────────────────────
const QTY_COLS = [
  { key: "PONumber", label: "PO Number", w: "9%" },
  { key: "SKU", label: "SKU/Style No.", w: "10%" },
  { key: "Color", label: "Color", w: "14%" },
  { key: "Size", label: "Size", w: "7%" },
  { key: "Description", label: "Description", w: "10%" },
  { key: "QtyPO", label: "Qty PO", w: "6%" },
  { key: "QtyPList", label: "Qty P.List", w: "7%" },
  { key: "QtyDifference", label: "+/- PO", w: "6%" },
  { key: "PcsPerCarton", label: "Pcs/Sets Per Carton", w: "7%" },
  { key: "TotalCartons", label: "Total Cartons", w: "7%" },
  { key: "PscWeight", label: "Pc/Set Weight", w: "6%" },
  { key: "CartonWeight", label: "Carton Weight", w: "6%" },
  { key: "SelectedCartons", label: "Selected Cartons", w: "6%" },
  { key: "SampleSize", label: "Sample Size", w: "6%" },
];

const Page2 = ({ data, result }) => {
  const rows = data.quantityInfo || [];
  const totalSample = rows.reduce((s, r) => s + (r.SampleSize || 0), 0);
  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>QUANTITY INFO</Text>
      <View style={styles.qtyTable}>
        {/* Header */}
        <View style={styles.qtyHeaderRow}>
          {QTY_COLS.map((col, i) => (
            <Text key={i} style={[
              i === QTY_COLS.length - 1 ? styles.qtyHeaderCellLast : styles.qtyHeaderCell,
              { width: col.w }
            ]}>{col.label}</Text>
          ))}
        </View>
        {/* Data */}
        {rows.map((row, ri) => {
          const diff = row.QtyDifference;
          const diffColor = diff > 0 ? GREEN : diff < 0 ? RED : BLACK;
          return (
            <View key={ri} wrap={false} style={[styles.qtyDataRow, ri === rows.length - 1 && styles.qtyDataRowLast]}>
              {QTY_COLS.map((col, ci) => {
                const val = row[col.key] ?? "—";
                const isLast = ci === QTY_COLS.length - 1;
                const color = col.key === "QtyDifference" ? diffColor : BLACK;
                return (
                  <Text key={ci} style={[isLast ? styles.qtyCellLast : styles.qtyCell, { width: col.w, color }]}>
                    {String(val)}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
      <View style={styles.totalSampleRow}>
        <Text style={styles.totalSampleText}>Total Sample Size: {totalSample}</Text>
      </View>
    </Page>
  );
};

// ── PAGE 3: Workmanship AQL ───────────────────────────────────
const AQL_COLS = [
  { key: "desc", label: "Description", w: "20%" },
  { key: "Size", label: "Size", w: "8%" },
  { key: "SampleSize", label: "Sample Size", w: "7%" },
  { key: "critAllowed", label: "Critical Defect Allowed", w: "9%" },
  { key: "MajorAllowed", label: "Major Defect Allowed", w: "9%" },
  { key: "MinorAllowed", label: "Minor Defect Allowed", w: "9%" },
  { key: "CriticalTotal", label: "Critical Defect Found", w: "9%" },
  { key: "MajorTotal", label: "Major Defect Found", w: "9%" },
  { key: "MinorTotal", label: "Minor Defect Found", w: "9%" },
  { key: "Result", label: "Result", w: "9%" },
];

const Page3 = ({ data, result }) => {
  const rows = data.workmanship || [];
  const aql = data.aql?.[0] || {};
  const totalSample = rows.reduce((s, r) => s + Number(r.SampleSize || 0), 0);
  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <View style={{ borderWidth: 0.5, borderColor: BLACK, fontSize: 9, }}>
        <Text style={{ fontSize: 10, marginBottom: 6, marginTop: 6, borderBottomWidth: 0.5, padding: 5 }}>1-A. AVERAGE WORKMANSHIP AND FINISH</Text>
        <Text style={{ fontSize: 10, marginBottom: 6, padding: 5 }}>
          {`Sampling Method: ANSI-ASQC Z1.4; Single Sampling plan, General inspection Level-${aql.LevelAQL || ""}, AQL: ${aql.MajorAQL || ""} Major / ${aql.MinorAQL || ""} Minor (Sample Size: ${totalSample}):`}
        </Text>
      </View>
      <View style={styles.aqlTable}>
        <View style={styles.aqlHeaderRow}>
          {AQL_COLS.map((col, i) => (
            <Text key={i} style={[
              i === AQL_COLS.length - 1 ? styles.aqlHeaderCellLast : styles.aqlHeaderCell,
              { width: col.w }
            ]}>{col.label}</Text>
          ))}
        </View>
        {rows.map((row, ri) => {
          const isPass = row.Result === 1;
          return (
            <View key={ri} wrap={false} style={[styles.aqlDataRow, ri === rows.length - 1 && styles.aqlDataRowLast]}>
              <Text style={[styles.aqlCell, { width: "20%" }]}>{row.Product || row.Color || "—"}</Text>
              <Text style={[styles.aqlCell, { width: "8%" }]}>{row.Size || "—"}</Text>
              <Text style={[styles.aqlCell, { width: "7%", textAlign: "center" }]}>{row.SampleSize}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.CriticalAllowed ?? 0}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.MajorAllowed}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.MinorAllowed}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.CriticalTotal}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.MajorTotal}</Text>
              <Text style={[styles.aqlCell, { width: "9%", textAlign: "center" }]}>{row.MinorTotal}</Text>
              <Text style={[styles.aqlCellLast, {
                width: "9%", textAlign: "center",
                color: isPass ? GREEN : RED, fontFamily: "Helvetica-Bold"
              }]}>{isPass ? "PASS" : "FAIL"}</Text>
            </View>
          );
        })}
      </View>
    </Page>
  );
};

// ── PAGE 4: Workmanship Control Record ───────────────────────
const Page4 = ({ data, result }) => {
  const allRows = data.workmanship || [];

  const bR = { borderRightWidth: 0.5, borderRightColor: BLACK };
  const bB = { borderBottomWidth: 0.5, borderBottomColor: BLACK };
  const pad = { paddingHorizontal: 5, paddingVertical: 4 };
  const f9 = { fontSize: 9 };
  const f8 = { fontSize: 8 };
  const ctr = { textAlign: "center" };
  const blk = { fontFamily: "Helvetica-Bold" };

  // Skip rows where ALL Error1–Error12 are null/undefined
  const rows = allRows.filter(w =>
    Array.from({ length: 12 }, (_, i) => w[`Error${i + 1}`]).some(v => v != null)
  );

  if (rows.length === 0) return null;

  return (
    <>
      {rows.map((w, wi) => {
        const errors = Array.from({ length: 12 }, (_, i) => ({
          n: i + 1,
          desc: w[`Error${i + 1}`] || "",
          critical: w[`Critical${i + 1}`] ?? 0,
          major: w[`Major${i + 1}`] ?? 0,
          minor: w[`Minor${i + 1}`] ?? 0,
          hasData: w[`Error${i + 1}`] != null,
        }));

        const critTotal = errors.reduce((s, e) => s + (e.hasData ? e.critical : 0), 0);
        const majTotal = errors.reduce((s, e) => s + (e.hasData ? e.major : 0), 0);
        const minTotal = errors.reduce((s, e) => s + (e.hasData ? e.minor : 0), 0);
        const isPass = w.Result === 1;

        return (
          <Page key={wi} size="A4" style={[styles.page, { display: "flex", flexDirection: "column" }]} orientation="landscape">
            <PageHeader result={result} />
            {wi === 0 && (
              <View style={{ marginTop: -20, color: 'white' }}>
                <SectionHeader title="1-C. AVERAGE WORKMANSHIP AND FINISH CONTROL RECORD:" />
              </View>
            )}

            {/* wcrBlock fills remaining page height */}
            <View style={[styles.wcrBlock, { flex: 1, marginTop: wi !== 0 ? 4 : 0 }]}>

              {/* ── Header: left merged panel + right stacked meta ── */}
              <View style={[{ flexDirection: "row" }, bB]}>

                {/* LEFT PANEL */}
                <View style={[{ width: "45%", flexDirection: "row", backgroundColor: LIGHT_GRAY }, bR]}>
                  <View style={[{ width: "15.56%", alignItems: "center", justifyContent: "center" }, bR]}>
                    <Text style={[f8, blk, ctr]}>ERROR{"\n"}#</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 5, paddingVertical: 4 }}>
                    <Text style={[f8, blk]}>ERROR DESCRIPTION</Text>
                  </View>
                </View>

                {/* RIGHT PANEL: 4 stacked meta rows */}
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <View style={[{ flexDirection: "row", backgroundColor: LIGHT_GRAY }, bB]}>
                    <Text style={[{ width: "25.45%" }, pad, f8, bR, blk]}>DESIGN / COLOR</Text>
                    <Text style={[{ flex: 1 }, pad, f9, { color: BLUE, textAlign: "center" }]}>{w.Color}</Text>
                  </View>
                  <View style={[{ flexDirection: "row", backgroundColor: LIGHT_GRAY }, bB]}>
                    <Text style={[{ width: "25.45%" }, pad, f8, bR, blk]}>SIZE/STYLE</Text>
                    <Text style={[{ flex: 1 }, pad, f9, { color: BLUE, textAlign: "center" }]}>{w.Size}</Text>
                  </View>
                  <View style={[{ flexDirection: "row", backgroundColor: LIGHT_GRAY }, bB]}>
                    <Text style={[{ width: "25.45%" }, pad, f8, bR, blk]}>SAMPLE SIZE</Text>
                    <Text style={[{ flex: 1 }, pad, f9, { color: BLUE, textAlign: "center" }]}>{w.SampleSize}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[{ width: "25.45%" }, pad, f8, bR, blk]}>DEFECT CATEGORY</Text>
                    <Text style={[{ flex: 1 }, pad, f8, bR, blk, ctr]}>CRITICAL</Text>
                    <Text style={[{ flex: 1 }, pad, f8, bR, blk, ctr]}>MAJOR</Text>
                    <Text style={[{ flex: 1 }, pad, f8, blk, ctr]}>MINOR</Text>
                  </View>
                </View>
              </View>

              {/* ── 12 data rows — flex:1 each so they fill remaining space ── */}
              {errors.map((err, ei) => (
                <View key={ei} style={[{ flexDirection: "row", flex: 1 }, bB]}>
                  {/* Error # */}
                  <View style={[{ width: "7%", justifyContent: "center", alignItems: "center" }, bR]}>
                    <Text style={[f9, { color: BLUE, fontFamily: "Helvetica-Bold", textAlign: "center" }]}>{err.n}</Text>
                  </View>
                  {/* Error description */}
                  <View style={[{ width: "38%", justifyContent: "center", paddingHorizontal: 5, paddingVertical: 3 }, bR]}>
                    <Text style={[f9, { color: err.hasData ? BLUE : BLACK, fontFamily: "Helvetica-Bold" }]}>{err.desc}</Text>
                  </View>
                  {/* Empty defect category spacer */}
                  <View style={[{ width: "14%" }, bR]} />
                  {/* Critical */}
                  <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, bR]}>
                    <Text style={[f9, { color: err.hasData ? BLUE : BLACK, fontFamily: "Helvetica-Bold", textAlign: "center" }]}>
                      {err.hasData ? err.critical : ""}
                    </Text>
                  </View>
                  {/* Major */}
                  <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, bR]}>
                    <Text style={[f9, { color: err.hasData ? BLUE : BLACK, fontFamily: "Helvetica-Bold", textAlign: "center" }]}>
                      {err.hasData ? err.major : ""}
                    </Text>
                  </View>
                  {/* Minor */}
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={[f9, { color: err.hasData ? BLUE : BLACK, fontFamily: "Helvetica-Bold", textAlign: "center" }]}>
                      {err.hasData ? err.minor : ""}
                    </Text>
                  </View>
                </View>
              ))}

              {/* ── TOTAL row ── */}
              <View style={[{ flexDirection: "row", minHeight: 18, backgroundColor: LIGHT_GRAY }, bB]}>
                <Text style={[{ width: "59%" }, pad, f9, bR, blk, { textAlign: "right" }]}>TOTAL</Text>
                <Text style={[{ flex: 1 }, pad, f9, bR, blk, ctr]}>{critTotal}</Text>
                <Text style={[{ flex: 1 }, pad, f9, bR, blk, ctr]}>{majTotal}</Text>
                <Text style={[{ flex: 1 }, pad, f9, blk, ctr]}>{minTotal}</Text>
              </View>

              {/* ── ALLOWABLE row ── */}
              <View style={[{ flexDirection: "row", minHeight: 18, backgroundColor: LIGHT_GRAY }, bB]}>
                <Text style={[{ width: "59%" }, pad, f9, bR, blk, { textAlign: "right" }]}>ALLOWABLE</Text>
                <Text style={[{ flex: 1 }, pad, f9, bR, blk, ctr]}>{w.CriticalAllowed ?? 0}</Text>
                <Text style={[{ flex: 1 }, pad, f9, bR, blk, ctr]}>{w.MajorAllowed}</Text>
                <Text style={[{ flex: 1 }, pad, f9, blk, ctr]}>{w.MinorAllowed}</Text>
              </View>

              {/* ── RESULT row ── */}
              <View style={{ flexDirection: "row", minHeight: 18 }}>
                <Text style={[{ flex: 1 }, pad, f9, blk, ctr]}>RESULT</Text>
                <Text style={[{ flex: 1 }, pad, f9, blk, ctr, { color: isPass ? GREEN : RED }]}>
                  {isPass ? "PASS" : "FAIL"}
                </Text>
              </View>

            </View>
          </Page>
        );
      })}
    </>
  );
};




// ── PAGE 5: Packing ───────────────────────────────────────────
const packingOptions = {
  product: ["Individual Polybag", "Polybag Per Article", "No Individual Polybag"],
  inner: ["Inner Polybag", "No Inner Polybag", "Other"],
  export: ["Yes", "No", "Pending for Buyer's Approval"],
};

const Page5 = ({ data, result }) => {
  const pk = data.packing || {};
  const cartonSel = data.cartonSelected || [];
  const cartonDim = data.cartonDimension || [];
  // Derive the dynamic last-column label from the first row's SelectedOption
  const selectedColLabel = cartonSel[0]?.SelectedOption || "Selected Cartons";

  // Shared table styles
  const bAll = { borderWidth: 0.5, borderColor: BLACK };
  const bR = { borderRightWidth: 0.5, borderRightColor: BLACK };
  const bB = { borderBottomWidth: 0.5, borderBottomColor: BLACK };
  const bold = { fontFamily: "Helvetica-Bold" };
  const f8 = { fontSize: 8 };
  const f85 = { fontSize: 8.5 };
  const pad = { paddingHorizontal: 6, paddingVertical: 4 };

  // One packing row: label | opt1 | opt2 | opt3
  const PackRow = ({ label, options, isLast }) => (
    <View style={[{ flexDirection: "row", minHeight: 20 }, bB, isLast && { borderBottomWidth: 0 }]}>
      {/* Label cell */}
      <View style={[{ width: "22%" }, pad, bR, { justifyContent: "center" }]}>
        <Text style={[f8, bold]}>{label}</Text>
      </View>
      {/* 3 option columns, each takes equal share of remaining 78% */}
      {options.map((opt, i) => (
        <View key={i} style={[
          { flex: 1, flexDirection: "row", alignItems: "center" },
          pad,
          i < options.length - 1 && bR,
        ]}>
          <CB checked={opt.checked} />
          <Text style={[f85, { marginLeft: 5 }, opt.checked && { color: BLUE, fontFamily: "Helvetica-Bold" }]}>
            {opt.label}
            {opt.checked && opt.extra ? ` (${opt.extra})` : ""}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>2- PACKING:</Text>

      {/* Packing table */}
      <View style={[bAll, { marginBottom: 6 }]}>
        <PackRow
          label="Product packing:"
          options={[
            { label: "Individual polybag", checked: pk.ProductPacking === 1 },
            { label: "Polybag per article", checked: pk.ProductPacking === 2, extra: pk.PolybagPerArticle },
            { label: "No individual polybag", checked: pk.ProductPacking === 3 },
          ]}
        />
        <PackRow
          label="Inner packing controlled:"
          options={[
            { label: "Inner polybag", checked: pk.InnerPackingControlled === 1, extra: pk.InnerText },
            { label: "No Inner polybag", checked: pk.InnerPackingControlled === 2 },
            { label: "Other", checked: pk.InnerPackingControlled === 3, extra: pk.OtherText },
          ]}
        />
        <PackRow
          label="Export packing conformity:"
          isLast
          options={[
            { label: "Yes", checked: pk.ExportPackingConformity === 1 },
            { label: "No", checked: pk.ExportPackingConformity === 2 },
            { label: "Pending for Buyer's approval", checked: pk.ExportPackingConformity === 3 },
          ]}
        />
      </View>

      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8.5, marginBottom: 3 }}>Packing Description:</Text>
      <View style={styles.packDescBox}>
        <Text>{pk.PackingDescription || ""}</Text>
      </View>

      {/* Cartons Selected */}
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>Cartons Selected for Inspection</Text>
      <View style={styles.simpleTable}>
        <View style={styles.simpleHeaderRow}>
          <Text style={styles.simpleHeaderCell}>Article</Text>
          <Text style={styles.simpleHeaderCell}>Size</Text>
          <Text style={styles.simpleHeaderCellLast}>{selectedColLabel}</Text>
        </View>
        {cartonSel.map((row, ri) => (
          <View key={ri} style={[styles.simpleDataRow, ri === cartonSel.length - 1 && styles.simpleDataRowLast]}>
            <Text style={styles.simpleCell}>{row.Article}</Text>
            <Text style={styles.simpleCell}>{row.Size}</Text>
            <Text style={styles.simpleCellLast}>{row.Cartons}</Text>
          </View>
        ))}
      </View>

      {/* Carton Dimension */}
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>Carton Dimension and Weight Check</Text>
      <View style={styles.simpleTable} wrap={false}>
        <View style={styles.simpleHeaderRow}>
          {["Article", "SKU", "UPC/Barcode", "Carton\nDimension\n(Specs)", "Observed\nCarton\nDimension", "Packed Product\nDimension", "Carton PLY", "Retail Price", "Retailer"].map((h, i, arr) => (
            <Text key={i} style={i === arr.length - 1 ? styles.simpleHeaderCellLast : styles.simpleHeaderCell}>{h}</Text>
          ))}
        </View>
        {cartonDim.map((row, ri) => (
          <View key={ri} style={[styles.simpleDataRow, ri === cartonDim.length - 1 && styles.simpleDataRowLast]} >
            {[row.Article, row.SKU, row.BarcodeOrUPC, row.CartonDimension, row.ObservedCartonDimension, row.PackedProductDimension, row.CartonPLY, row.RetailPrice, row.Retailer].map((v, ci, arr) => (
              <Text key={ci} style={ci === arr.length - 1 ? styles.simpleCellLast : styles.simpleCell} >{v ?? "—"}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  );
};

// ── PAGE 6: Product Measurements ─────────────────────────────
// photoUrl is now a full URL from the API — no base prefix needed

const Page6 = ({ data, result }) => {
  const m = data.measurement || {};
  const measPhoto = (data.photos || []).find(p => p.PhotoType === "Measurement");
  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>3- PRODUCT MEASUREMENTS: On 15% of Sample Size (min 3 per size/color)</Text>
      <View style={styles.measCheckRow}>
        <View style={styles.measCheckItem}><CB checked={m.BuyerChart} /><Text style={styles.measCheckLabel}>Buyer's Measurement Chart</Text></View>
        <View style={styles.measCheckItem}><CB checked={m.SupplierChart} /><Text style={styles.measCheckLabel}>Supplier's Measurement Chart</Text></View>
      </View>
      <View style={[styles.measCheckRow, { marginBottom: 8 }]}>
        <View style={styles.measCheckItem}><CB checked={m.WithinTolerance} /><Text style={styles.measCheckLabel}>Within Tolerance</Text></View>
        <View style={styles.measCheckItem}><CB checked={m.BeyondTolerance} /><Text style={styles.measCheckLabel}>Beyond Tolerance</Text></View>
        <View style={styles.measCheckItem}><CB checked={m.ActualFindings} /><Text style={styles.measCheckLabel}>Actual Findings</Text></View>
      </View>
      {/* Measurement photo instead of empty grid */}
      {measPhoto && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            src={measPhoto.photoUrl}
            style={{ maxWidth: "100%", maxHeight: 360, objectFit: "contain" }}
          />
          <Text style={{ fontSize: 8, color: BLUE, marginTop: 4, fontFamily: "Helvetica-Bold" }}>Measurements Sheet</Text>
        </View>
      )}
    </Page>
  );
};

// ── PAGE 7a: KEY OBSERVATION Photo Page ──────────────────────
const CONFORM_ROWS = [
  "PO Sheet Provided by",
  "Specifications Provided by",
  "Reference Swatch Provided by",
  "Approvals Trim Card Provided by",
  "Any Special Instructions Provided by",
];
const CONFORM_OPTS = ["Buyer", "Manufacturer", "Office", "Not Available"];

const OBS_PER_ROW = 3;
const OBS_ROWS_PP = 2;
const OBS_PER_PAGE = OBS_PER_ROW * OBS_ROWS_PP;

const Page7 = ({ data, result }) => {
  const obsPhotos = data.observationPhotos || [];
  if (obsPhotos.length === 0) return null;

  // Split into pages of 6
  const pages = [];
  for (let i = 0; i < obsPhotos.length; i += OBS_PER_PAGE) {
    pages.push(obsPhotos.slice(i, i + OBS_PER_PAGE));
  }

  return pages.map((pagePhotos, pi) => (
    <Page key={pi} size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <SectionHeader title=" KEY OBSERVATION PHOTOS" />
      {[0, 1].map(row => {
        const rowPhotos = pagePhotos.slice(row * OBS_PER_ROW, row * OBS_PER_ROW + OBS_PER_ROW);
        if (rowPhotos.length === 0) return null;
        return (
          <View key={row} style={{ flexDirection: "row", marginBottom: 8 }}>
            {rowPhotos.map((photo, ci) => {
              // Global picture index across all pages
              const globalIndex = pi * OBS_PER_PAGE + row * OBS_PER_ROW + ci + 1;
              return (
                <View key={ci} style={{
                  flex: 1,
                  marginHorizontal: 3,
                  borderWidth: 0.5,
                  borderColor: BLACK,
                  alignItems: "center",
                }}>
                  <Image
                    src={photo.photoUrl}
                    style={{ width: "100%", height: 165, objectFit: "cover" }}
                  />
                  <Text style={{ fontSize: 7.5, color: BLUE, paddingVertical: 3, textAlign: "center", fontFamily: "Helvetica-Bold" }}>
                    {`Picture ${globalIndex}`}
                  </Text>
                </View>
              );
            })}
            {/* Fill empty slots */}
            {Array.from({ length: OBS_PER_ROW - rowPhotos.length }).map((_, ei) => (
              <View key={`e${ei}`} style={{ flex: 1, marginHorizontal: 3 }} />
            ))}
          </View>
        );
      })}
    </Page>
  ));
};

// ── PAGE 7b: Observation Remarks + Product Conformity ─────────
const Page7b = ({ data, result }) => {
  const pc = data.productConformity || {};
  const obsRemarks = data.observationRemarks || [];
  return (
    <Page size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      {/* Observation Remarks box */}
      <Text style={[styles.obsTitle, { color: 'white' }]}>OBSERVATION REMARKS:</Text>
      <View style={styles.obsBox}>
        {obsRemarks.length > 0 ? (
          obsRemarks.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
              {obsRemarks.length > 1 && (
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8.5, marginRight: 4, color: BLACK }}>
                  {i + 1}.
                </Text>
              )}
              <Text style={styles.obsText}>{item.Remarks || ""}</Text>
            </View>
          ))
        ) : null}
      </View>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, marginBottom: 4, marginTop: 6, borderWidth: 0.5, borderColor: BLACK, padding: 5, }}>1-B. PRODUCT CONFORMITY:</Text>
      <View style={styles.conformTable}>
        {/* Header */}
        <View style={styles.conformHeaderRow}>
          <Text style={styles.conformHeaderLabel}>Item</Text>
          {CONFORM_OPTS.map((opt, i) => (
            <Text key={i} style={styles.conformHeaderCell}>{opt}</Text>
          ))}
          <Text style={styles.conformHeaderCellLast}>Remarks (if any)</Text>
        </View>
        {/* Data rows */}
        {CONFORM_ROWS.map((label, ri) => {
          const result = pc[`Result${ri + 1}`];
          const remark = pc[`Remarks${ri + 1}`];
          return (
            <View key={ri} style={[styles.conformDataRow, ri === CONFORM_ROWS.length - 1 && styles.conformDataRowLast]}>
              <View style={styles.conformLabelCell}><Text>{label}</Text></View>
              {CONFORM_OPTS.map((_, oi) => (
                <View key={oi} style={styles.conformCheckCell}>
                  <CB checked={result === (oi + 1)} />
                </View>
              ))}
              <View style={styles.conformRemarksCell}><Text>{remark || ""}</Text></View>
            </View>
          );
        })}
      </View>
    </Page>
  );
};

// ── PHOTO PAGES ───────────────────────────────────────────────
const PHOTOS_PER_ROW = 3;
const ROWS_PER_PAGE = 2;
const PHOTOS_PER_PAGE = PHOTOS_PER_ROW * ROWS_PER_PAGE;

const PhotoPage = ({ title, photos, result }) => {
  // Split into pages of 6
  const pages = [];
  for (let i = 0; i < photos.length; i += PHOTOS_PER_PAGE) {
    pages.push(photos.slice(i, i + PHOTOS_PER_PAGE));
  }
  return pages.map((pagePhotos, pi) => (
    <Page key={pi} size="A4" style={styles.page} orientation="landscape">
      <PageHeader result={result} />
      <SectionHeader title={title} />
      {/* Two rows */}
      {[0, 1].map(row => {
        const rowPhotos = pagePhotos.slice(row * PHOTOS_PER_ROW, row * PHOTOS_PER_ROW + PHOTOS_PER_ROW);
        if (rowPhotos.length === 0) return null;
        return (
          <View key={row} style={{ flexDirection: "row", marginBottom: 8 }}>
            {rowPhotos.map((photo, ci) => (
              <View key={ci} style={{
                flex: 1,
                marginHorizontal: 3,
                borderWidth: 0.5,
                borderColor: BLACK,
                alignItems: "center",
              }}>
                <Image
                  src={photo.photoUrl}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                 <Text style={{ fontSize: 7.5, color: photo.PhotoType === "Defect" ? RED : BLUE, paddingVertical: 3, textAlign: "center", fontFamily: 'Helvetica-Bold' }}>
                  {photo.PhotoName}
                </Text>
              </View>
            ))}
            {/* Fill empty slots in last row */}
            {Array.from({ length: PHOTOS_PER_ROW - rowPhotos.length }).map((_, ei) => (
              <View key={`e${ei}`} style={{ flex: 1, marginHorizontal: 3 }} />
            ))}
          </View>
        );
      })}
    </Page>
  ));
};

// Photo type order (Defect first, then specific types, then OTHERS; KEY OBSERVATION excluded)
const PHOTO_ORDER = [
 
  "SHADE COMPARISON",
  "METAL DETECTION TEST",
  "GENERAL PRESENTATION",
  "OTHERS",
   "Defect",
];

// ── MAIN DOCUMENT ─────────────────────────────────────────────
const InspectionReport = ({ data }) => {
  if (!data) return null;

  const result = data.general?.InspectionResult ?? null;
  const allPhotos = data.photos || [];
  // Group photos by type, excluding KEY OBSERVATION and Measurement
  const photoGroups = {};
  allPhotos.forEach(p => {
    if (p.PhotoType === "KEY OBSERVATION" || p.PhotoType === "Measurement") return;
    if (!photoGroups[p.PhotoType]) photoGroups[p.PhotoType] = [];
    photoGroups[p.PhotoType].push(p);
  });

  return (
    <Document title="Texlynx">
      <Page1 data={data} result={result} />
      <Page2 data={data} result={result} />
      <Page3 data={data} result={result} />
      <Page7 data={data} result={result} />
      <Page7b data={data} result={result} />
      <Page4 data={data} result={result} />
      <Page5 data={data} result={result} />
      <Page6 data={data} result={result} />
      {/* Photo pages in defined order */}
      {PHOTO_ORDER.map(type => {
        const photos = photoGroups[type];
        if (!photos || photos.length === 0) return null;
        return <PhotoPage key={type} title={type} photos={photos} result={result} />

      })}
      {/* Any remaining types not in PHOTO_ORDER (except excluded) */}
      {Object.keys(photoGroups)
        .filter(t => !PHOTO_ORDER.includes(t))
        .map(type => (
          <PhotoPage key={type} title={type} photos={photoGroups[type]} result={result} />
        ))}
    </Document>
  );
};

export default InspectionReport;
