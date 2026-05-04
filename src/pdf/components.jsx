import React from "react";
import { Text, View, Svg, Path, Image } from "@react-pdf/renderer";
import styles, { ORANGE, GREEN, RED, BLUE, LIGHT_GRAY, BLACK } from "./styles";
import texlynxLogo from "../assets/texlynx-logo.jpeg";

// ── PAGE HEADER ──────────────────────────────────────────────
export const PageHeader = ({ result }) => {
  // result: 1 = TQMS only, 2 = logo only, 3 or null = both
  const showTQMS = result == null || result === 1 || result === 3;
  const showLogo = result == null || result === 2 || result === 3;
  return (
    <View style={styles.headerTable} fixed>
      <View style={styles.headerCol1}>
        {showTQMS && <Text style={styles.tqmsText}>TQMS</Text>}
        {showLogo && (
          <Image
            src={texlynxLogo}
            style={{ width: 270, height: 38, objectFit: "contain", marginLeft: showTQMS ? 6 : 0 }}
          />
        )}
      </View>
      <View style={styles.headerCol2}>
        <Text style={styles.reportTitle}>INTERNAL INSPECTION REPORT</Text>
      </View>
      <View style={styles.headerCol3}>
        <Text style={styles.pageNumText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </View>
  );
};

// ── SECTION HEADER ────────────────────────────────────────────
export const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

// ── CHECKBOX ─────────────────────────────────────────────────
// Draws a real ✓ using SVG Path — zero font dependency, always renders.
export const CB = ({ checked, size = 9 }) => (
  <View style={{
    width: size,
    height: size,
    borderWidth: 0.75,
    borderColor: BLACK,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  }}>
    {(checked === true || checked === 1) ? (
      <Svg width={size - 2} height={size - 2} viewBox="0 0 12 12">
        <Path
          d="M1.5 6 L4.5 9.5 L10.5 2.5"
          stroke={BLACK}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    ) : null}
  </View>
);



// ── GENERAL INFO TABLE ────────────────────────────────────────
export const InfoTable = ({ general, inspType }) => (
  <View style={styles.infoTable}>
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}><Text>Report No</Text></View>
      <View style={styles.infoValueFull}><Text>{general?.InspectionReportNo}</Text></View>
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}><Text>Customer Name</Text></View>
      <View style={styles.infoValue}><Text>{general?.CustomerName}</Text></View>
      <View style={styles.infoLabel}><Text>Destination Country</Text></View>
      <View style={styles.infoValueLast}><Text>{general?.DestinationCountry}</Text></View>
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}><Text>Inspection Type Performed</Text></View>
      <View style={styles.infoValue}><Text>{inspType}</Text></View>
      <View style={styles.infoLabel}><Text>Inspection Date</Text></View>
      <View style={styles.infoValueLast}><Text>{general?.InspectionDate}</Text></View>
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}><Text>Manufacturer Name</Text></View>
      <View style={styles.infoValue}><Text>{general?.ManufacturerName}</Text></View>
      <View style={styles.infoLabel}><Text>Inspection Location</Text></View>
      <View style={styles.infoValueLast}><Text>{general?.InspectionLocation}</Text></View>
    </View>
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}><Text>Factory Representative Name</Text></View>
      <View style={styles.infoValue}><Text>{general?.FactoryRepresentative}</Text></View>
      <View style={styles.infoLabel}><Text>Inspector's Arrival Time</Text></View>
      <View style={styles.infoValueLast}><Text>{general?.InspectorArrivalTime}</Text></View>
    </View>
    <View style={[styles.infoRow, styles.infoRowLast]}>
      <View style={styles.infoLabel}><Text>Inspector Name</Text></View>
      <View style={styles.infoValue}><Text>{general?.InspectorName}</Text></View>
      <View style={styles.infoLabel}><Text>Inspector's Departure Time</Text></View>
      <View style={styles.infoValueLast}><Text>{general?.InspectorDepartureTime}</Text></View>
    </View>
  </View>
);

// ── PRODUCT CATEGORY TABLE ────────────────────────────────────
const PROD_CATS = ["Apparel", "Soft Home", "Hard Goods", "Accessories", "Others"];

export const ProductCategoryTable = ({ general }) => (
  <View style={styles.catTable}>
    <View style={styles.catRow}>
      <View style={styles.catLabel}><Text>Product Category</Text></View>
      <View style={styles.catChecksRow}>
        {PROD_CATS.map((cat, i) => (
          <View key={i} style={i === PROD_CATS.length - 1 ? styles.catCheckCellLast : styles.catCheckCell}>
            <CB checked={general?.ProductCategory === (i + 1)} />
            <Text style={styles.cbLabel}>{cat}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.catRow}>
      <View style={styles.catLabel}><Text>Product Description</Text></View>
      <View style={styles.catValueFull}><Text>{general?.ProductDescription}</Text></View>
    </View>
    <View style={[styles.catRow, styles.catRowLast]}>
      <View style={styles.catLabel}><Text>Composition</Text></View>
      <View style={styles.catValueFull}><Text>{general?.Composition}</Text></View>
    </View>
  </View>
);

// ── INSPECTION CONCLUSION ─────────────────────────────────────
export const InspectionConclusion = ({ result }) => (
  <View style={styles.conclusionRow}>
    <Text style={styles.conclusionTitle}>Inspection Conclusion:</Text>
    <View style={styles.conclusionItem}>
      <CB checked={result === 1} />
      <Text style={styles.confirmText}> Confirm</Text>
    </View>
    <View style={styles.conclusionItem}>
      <CB checked={result === 2} />
      <Text style={styles.notConfirmText}> Not Confirm</Text>
    </View>
    <View style={styles.conclusionItem}>
      <CB checked={result === 3} />
      <Text style={styles.pendingText}> Pending</Text>
    </View>
  </View>
);

// ── CHECKLIST TABLE ───────────────────────────────────────────
export const ChecklistTable = ({ checklist, checklistRemarks }) => {
  const cl = checklist || [];
  const groups = [cl.slice(0, 8), cl.slice(8, 16), cl.slice(16, 24), cl.slice(24, 32)];
  const rows = 8;
  const remarksText = (checklistRemarks || []).map(r => r.Remarks).join("; ");

  return (
    <View style={styles.clTable}>
      {/* Header — no group-level border; last cell per group carries the right border */}
      <View style={styles.clHeaderRow}>
        {[0, 1, 2, 3].map(g => (
          <View key={g} style={styles.clGroupCol}>
            <Text style={styles.clHeaderPoint}>Check Points</Text>
            <Text style={styles.clHeaderCheck}>Confirm</Text>
            <Text style={styles.clHeaderCheck}>Not{"\n"}Confirm</Text>
            <Text style={styles.clHeaderCheck}>Pending</Text>
            {/* N/A: border-right on groups 0-2, no border on group 3 */}
            <Text style={g < 3 ? styles.clHeaderCheckLast : styles.clHeaderCheckLastNoRight}>N/A</Text>
          </View>
        ))}
      </View>
      {/* Data rows */}
      {Array.from({ length: rows }).map((_, ri) => (
        <View key={ri} style={[styles.clDataRow, ri === rows - 1 && styles.clDataRowLast]}>
          {groups.map((grp, gi) => {
            const item = grp[ri] || null;
            return (
              <View key={gi} style={styles.clGroupCol}>
                <View style={styles.clPointCell}><Text>{item?.Point || ""}</Text></View>
                <View style={styles.clCheckCell}><CB checked={item?.Result === 1} /></View>
                <View style={styles.clCheckCell}><CB checked={item?.Result === 2} /></View>
                <View style={styles.clCheckCell}><CB checked={item?.Result === 3} /></View>
                {/* N/A: border-right for groups 0-2 (group separator), none for last group */}
                <View style={gi < 3 ? styles.clCheckCellLast : styles.clCheckCellLastNoRight}>
                  <CB checked={item?.Result === 4} />
                </View>
              </View>
            );
          })}
        </View>
      ))}
      {remarksText ? (
        <View style={styles.remarksRow}>
          <Text style={{ color: ORANGE, fontFamily: "Helvetica-Bold" }}>Remarks: </Text>
          <Text style={{ color: BLUE, fontFamily: "Helvetica-Bold" }}>{remarksText}</Text>
        </View>
      ) : null}
    </View>
  );
};

