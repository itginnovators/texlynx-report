import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import InspectionReport from "./pdf/InspectionReport";
import "./App.css";

const BASE_API = "https://texlynxreactapi.scmcloud.online/api/Inspections/assigned";

// Extract numeric ID from URL path, e.g. /21 → "21"
function getIdFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const id = parts[0];
  return id && /^\d+$/.test(id) ? id : null;
}

// Recursively trim \n, \r, and whitespace from all string values in the response
function trimData(val) {
  if (typeof val === "string") return val.replace(/[\r\n]+/g, " ").trim();
  if (Array.isArray(val)) return val.map(trimData);
  if (val && typeof val === "object") {
    return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, trimData(v)]));
  }
  return val;
}

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const assignedId = getIdFromPath();

  useEffect(() => {
    if (!assignedId) {
      setLoading(false);
      return;
    }
    const url = `${BASE_API}/${assignedId}/full-report`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        return r.json();
      })
      .then((d) => { setData(trimData(d)); setLoading(false); })
      .catch((e) => { setError("Failed to fetch: " + e.message); setLoading(false); });
  }, [assignedId]);

  // No ID in URL
  if (!assignedId) return (
    <div className="app-error">
      <h2>🔍 No Report ID</h2>
      <p>Please provide an inspection ID in the URL.</p>
      <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>Example: <code>localhost:5173/21</code></p>
    </div>
  );

  if (loading) return (
    <div className="app-loader">
      <div className="spinner" />
      <p>Loading inspection report #{assignedId}…</p>
    </div>
  );

  if (error) return (
    <div className="app-error">
      <h2>⚠️ Error</h2><p>{error}</p>
    </div>
  );

  const fileName = `Inspection_Report_${data?.general?.InspectionReportNo || assignedId}.pdf`;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>TEXLYNX</h1>
          <span className="tagline">Inspection Report Viewer</span>
        </div>
        <div className="header-right">
          <span className="icn-badge">ICN: {data?.assigned?.FormattedICN}</span>
          <PDFDownloadLink
            document={<InspectionReport data={data} />}
            fileName={fileName}
            className="download-btn"
          >
            {({ loading: pdfLoading }) => (pdfLoading ? "Preparing..." : "⬇ Download PDF")}
          </PDFDownloadLink>
        </div>
      </header>
      <main className="pdf-viewer-container">
        <PDFViewer width="100%" height="100%" showToolbar >
          <InspectionReport data={data} />
        </PDFViewer>
      </main>
    </div>
  );
}

export default App;
