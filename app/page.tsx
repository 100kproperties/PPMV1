"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  Users,
  Wrench,
  DollarSign,
  HeartPulse,
  Sparkles,
  Download,
  Plus,
} from "lucide-react";

type Section =
  | "dashboard"
  | "properties"
  | "rentroll"
  | "ledger"
  | "leases"
  | "documents"
  | "maintenance"
  | "assets"
  | "expenses"
  | "calendar"
  | "health"
  | "crm"
  | "roadmap";

const rentRollRows = [
  ["16133 Curtis", "Tenant A", "1350", "1st", "900", "450", "Partial"],
  ["Detroit Condo", "Tenant B", "1900", "1st", "1900", "0", "Paid"],
];

const ledgerRows = [
  ["2026-06-01", "16133 Curtis", "Income", "Rent", "June rent partial", "900", "0", "900"],
  ["2026-06-03", "16133 Curtis", "Expense", "Repair", "Plumbing service", "0", "275", "625"],
  ["2026-06-01", "Detroit Condo", "Income", "Rent", "June rent", "1900", "0", "2525"],
];

function exportCSV(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function Logo() {
  return (
    <div className="brand">
      <div className="logo-mark" aria-hidden="true">
        <div className="roof" />
        <div className="window w1" />
        <div className="window w2" />
        <div className="window w3" />
      </div>
      <h1>Pocket Property Manager™</h1>
      <small>Property Operations OS</small>
    </div>
  );
}

function Sidebar({
  section,
  setSection,
}: {
  section: Section;
  setSection: (section: Section) => void;
}) {
  const items: { id: Section; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "properties", label: "Properties", icon: <Home size={18} /> },
    { id: "rentroll", label: "Rent Roll", icon: <ClipboardList size={18} /> },
    { id: "ledger", label: "Property Ledger", icon: <Receipt size={18} /> },
    { id: "leases", label: "Leases", icon: <FileText size={18} /> },
    { id: "documents", label: "Documents", icon: <FileText size={18} /> },
    { id: "maintenance", label: "Maintenance", icon: <Wrench size={18} /> },
    { id: "assets", label: "Assets & Warranties", icon: <ShieldCheck size={18} /> },
    { id: "expenses", label: "Expenses", icon: <DollarSign size={18} /> },
    { id: "calendar", label: "Calendar", icon: <CalendarDays size={18} />, badge: "NEW" },
    { id: "health", label: "Property Health", icon: <HeartPulse size={18} /> },
    { id: "crm", label: "CRM", icon: <Users size={18} /> },
    { id: "roadmap", label: "Roadmap", icon: <Sparkles size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <Logo />
      <nav className="nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={section === item.id ? "active" : ""}
            onClick={() => setSection(item.id)}
          >
            <span>{item.icon}{item.label}</span>
            {item.badge ? <span className="pill">{item.badge}</span> : null}
          </button>
        ))}
      </nav>

      <div className="export-box">
        <button
          className="secondary"
          style={{ width: "100%" }}
          onClick={() =>
            exportCSV(
              "rentroll_export",
              ["Property", "Tenant", "Rent", "Due", "Paid", "Balance", "Status"],
              rentRollRows
            )
          }
        >
          <Download size={15} /> CSV Export Center
        </button>
      </div>

      <div className="profile-box">
        <div className="avatar">BD</div>
        <div>
          <strong>Brittany D.</strong>
          <br />
          <span className="note">Founder Plan</span>
        </div>
      </div>
    </aside>
  );
}

function Metric({
  label,
  value,
  sub,
  onClick,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <div className="card metric">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <a className="linkish" onClick={onClick}>{sub}</a>
    </div>
  );
}

function CalendarMini() {
  const days = [
    "31","1","2","3","4","5","6","7","8","9","10","11","12","13",
    "14","15","16","17","18","19","20","21","22","23","24","25","26","27",
    "28","29","30","1","2","3","4"
  ];
  const dots: Record<number, string> = { 1: "", 3: "green", 4: "green", 6: "red", 10: "green", 11: "green", 12: "blue", 13: "purple", 19: "purple", 23: "red", 24: "", 26: "red", 27: "purple" };
  return (
    <div className="calendar">
      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="day-name">{d}</div>)}
      {days.map((d, i) => (
        <div key={`${d}-${i}`} className={`day ${d === "5" && i < 10 ? "current" : ""}`}>
          {d}
          {i in dots ? <span className={`dot ${dots[i]}`} /> : null}
        </div>
      ))}
    </div>
  );
}

function Dashboard({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <>
      <div className="topbar">
        <div>
          <h2>Welcome back, Brittany! 👋</h2>
          <p>Here’s what’s happening with your properties today.</p>
        </div>
        <div className="actions">
          <button
            className="secondary"
            onClick={() => exportCSV("property_ledger_export", ["Date","Property","Type","Category","Description","Income","Expense","Balance"], ledgerRows)}
          >
            Export Ledger CSV
          </button>
          <button className="primary"><Plus size={16} /> Add New</button>
        </div>
      </div>

      <div className="grid cols-5">
        <Metric label="Total Properties" value="2" sub="Units: 2" onClick={() => setSection("properties")} />
        <Metric label="Monthly Rent Roll" value="$3,250" sub="View Rent Roll →" onClick={() => setSection("rentroll")} />
        <Metric label="Open Work Orders" value="3" sub="View Maintenance →" onClick={() => setSection("maintenance")} />
        <Metric label="Compliance Alerts" value={<span style={{ color: "var(--red)" }}>5</span>} sub="View Alerts →" onClick={() => setSection("leases")} />
        <Metric label="Property Health" value={<>87<span style={{ fontSize: 13, color: "var(--muted)" }}> /100</span></>} sub="Portfolio Score" onClick={() => setSection("health")} />
      </div>

      <br />

      <div className="grid wide-grid">
        <div className="grid">
          <div className="card">
            <h3>ACTION REQUIRED</h3>
            <div className="grid cols-4">
              <div className="alert"><div><strong>Lease Expires</strong><span>16133 Curtis St<br />in 72 days</span></div><span>›</span></div>
              <div className="alert"><div><strong>Insurance Renewal</strong><span>16133 Curtis St<br />in 45 days</span></div><span>›</span></div>
              <div className="alert"><div><strong>Late Rent Balance</strong><span>Detroit Condo<br /><b style={{ color: "var(--red)" }}>$450.00</b></span></div><span>›</span></div>
              <div className="alert"><div><strong>Warranty Expiring</strong><span>Dishwasher<br />in 30 days</span></div><span>›</span></div>
            </div>
          </div>

          <div className="grid cols-2">
            <div className="card">
              <h3>PORTFOLIO OVERVIEW</h3>
              <div className="alert property-card">
                <div className="property-img">🏠</div>
                <div><strong style={{ color: "var(--ink)" }}>16133 Curtis St</strong><br /><span>Detroit, MI 48219</span><br /><span>Rent $1,350/mo</span></div>
                <div className="score">82</div>
              </div>
              <br />
              <div className="alert property-card">
                <div className="property-img">🏢</div>
                <div><strong style={{ color: "var(--ink)" }}>Detroit Condo</strong><br /><span>Detroit, MI 48226</span><br /><span>Rent $1,900/mo</span></div>
                <div className="score">92</div>
              </div>
            </div>

            <div className="card">
              <h3>PROPERTY LEDGER SUMMARY</h3>
              <p className="note">This Month</p>
              <div className="grid cols-2">
                <div><span className="tag green">Income</span><h2>$3,250.00</h2></div>
                <div><span className="tag red">Expenses</span><h2>$1,375.00</h2></div>
              </div>
              <hr style={{ borderColor: "var(--line)", borderStyle: "solid", borderWidth: "1px 0 0", margin: "20px 0" }} />
              <p className="note">NET CASH FLOW</p>
              <h1 style={{ color: "var(--gold-2)", fontSize: 38, marginTop: 0 }}>$1,875.00</h1>
              <button className="secondary" style={{ width: "100%" }} onClick={() => setSection("ledger")}>View Property Ledger →</button>
            </div>
          </div>

          <div className="grid cols-3">
            <div className="card"><h3>Recent Activity</h3><p className="note">Expense added for 16133 Curtis St · Plumbing Repair · $275</p><p className="note">Lease document uploaded · Jun 4, 2026</p></div>
            <div className="card"><h3>Recent Documents</h3><p className="note">Lease Agreement · PDF · Jun 2, 2026</p><p className="note">Deed · PDF · May 15, 2026</p></div>
            <div className="card"><h3>Quick Actions</h3><div className="quick-actions"><button className="mini-btn">Add Property</button><button className="mini-btn">Add Expense</button><button className="mini-btn">Work Order</button><button className="mini-btn">Upload Doc</button></div></div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <h3>CALENDAR HUB</h3>
            <button className="secondary" onClick={() => setSection("calendar")}>Sync Calendar ↗</button>
          </div>
          <h3 style={{ fontWeight: 500 }}>June 2026</h3>
          <CalendarMini />
          <br />
          <h3>Upcoming Events</h3>
          <div className="alert-list">
            <div className="alert"><div><strong>Lease Renewal · 16133 Curtis St</strong><span>Jun 10, 2026</span></div><span className="tag green">Lease</span></div>
            <div className="alert"><div><strong>Insurance Renewal · 16133 Curtis St</strong><span>Jun 10, 2026</span></div><span className="tag gold">Insurance</span></div>
            <div className="alert"><div><strong>Maintenance · Plumbing Inspection</strong><span>Jun 12, 2026</span></div><span className="tag blue">Work</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

function TableView({ title, subtitle, headers, rows, filename }: { title: string; subtitle: string; headers: string[]; rows: string[][]; filename: string }) {
  return (
    <>
      <div className="topbar">
        <div><h2>{title}</h2><p>{subtitle}</p></div>
        <button className="secondary" onClick={() => exportCSV(filename, headers, rows)}>Export CSV</button>
      </div>
      <div className="card">
        <table>
          <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </>
  );
}

function SimpleSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <>
      <div className="topbar"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="primary">+ Add New</button></div>
      {children}
    </>
  );
}

export default function HomePage() {
  const [section, setSection] = useState<Section>("dashboard");

  const content = useMemo(() => {
    switch (section) {
      case "dashboard":
        return <Dashboard setSection={setSection} />;
      case "properties":
        return (
          <SimpleSection title="Properties" subtitle="Single source of truth for each property.">
            <div className="grid cols-2">
              <div className="card property-card"><div className="property-img">🏠</div><div><h3>16133 Curtis St</h3><p className="note">Detroit, MI 48219 · Tenant occupied · $1,350/mo</p><span className="tag gold">Insurance renewal soon</span></div><div className="score">82</div></div>
              <div className="card property-card"><div className="property-img">🏢</div><div><h3>Detroit Condo</h3><p className="note">Detroit, MI 48226 · Tenant occupied · $1,900/mo</p><span className="tag green">Healthy</span></div><div className="score">92</div></div>
            </div>
          </SimpleSection>
        );
      case "rentroll":
        return <TableView title="Rent Roll" subtitle="Track monthly rent, balances, due dates, late fees, and payment status." headers={["Property","Tenant","Rent","Due","Paid","Balance","Status"]} rows={rentRollRows} filename="rentroll_export" />;
      case "ledger":
        return <TableView title="Property Ledger" subtitle="Income, expenses, and running property cash flow." headers={["Date","Property","Type","Category","Description","Income","Expense","Balance"]} rows={ledgerRows} filename="property_ledger_export" />;
      case "leases":
        return <TableView title="Lease Lifecycle Manager" subtitle="Track expirations, landlord intent, renewals, notices, rent increases, and compliance deadlines." headers={["Property","Lease Type","End Date","Landlord Intent","Notice Deadline","Status"]} rows={[["16133 Curtis","Month-to-Month","N/A","Review monthly","State-based","Monitor"],["Detroit Condo","Fixed Term","2026-08-16","Undecided","2026-07-01","Intent needed"]]} filename="leases_export" />;
      case "documents":
        return (
          <SimpleSection title="Document Vault" subtitle="Store deeds, land contracts, leases, notices, insurance docs, receipts, and property records.">
            <div className="grid cols-3">
              <div className="card"><h3>Ownership & Title</h3><p className="note">Deeds, land contracts, title policies, purchase agreements, closing statements.</p><span className="tag gold">AI auto-classify later</span></div>
              <div className="card"><h3>Legal & Lease</h3><p className="note">Leases, addendums, notices, renewals, state forms, and e-signature files.</p><span className="tag green">Beta priority</span></div>
              <div className="card"><h3>Receipts & Photos</h3><p className="note">Receipt images, contractor photos, inspection photos, and property condition snapshots.</p><span className="tag gold">CSV export</span></div>
            </div>
          </SimpleSection>
        );
      case "maintenance":
        return <TableView title="Maintenance Tracker" subtitle="Track work orders, vendors, photos, cost, and completion status." headers={["Property","Issue","Vendor","Status","Cost","Photos"]} rows={[["16133 Curtis","Plumbing leak","Mike's Plumbing","In progress","$275","Before/after pending"],["Detroit Condo","Paint touch-up","TBD","Open","TBD","Needed"]]} filename="maintenance_export" />;
      case "assets":
        return <TableView title="Assets & Warranties" subtitle="Track appliances, serial numbers, warranties, coverage plans, and renewal dates." headers={["Property","Asset","Serial/Model","Warranty Ends","Coverage","Status"]} rows={[["16133 Curtis","Water Heater","WH-2024-884","2026-08-05","Home Warranty","60 days"],["Detroit Condo","Refrigerator","RF-2025-112","2028-02-01","Manufacturer","Covered"]]} filename="assets_export" />;
      case "expenses":
        return (
          <SimpleSection title="Expense Tracker" subtitle="Quick sheet for renovation, launch, maintenance, and operating costs.">
            <div className="grid cols-4">
              <Metric label="Total Logged" value="$1,375" sub="Current prototype" />
              <Metric label="Paid" value="$0" sub="Not reconciled" />
              <Metric label="Planned / Pending" value="$1,375" sub="Budgeting" />
              <Metric label="Top Category" value="Furnishing" sub="Category summary" />
            </div>
          </SimpleSection>
        );
      case "calendar":
        return (
          <SimpleSection title="Calendar Sync & Deadline Hub" subtitle="Connect rent due dates, lease deadlines, compliance tasks, maintenance visits, CRM follow-ups, insurance renewals, and warranty expirations.">
            <div className="grid cols-3">
              <div className="card"><h3>Google Calendar</h3><p className="note">Sync property deadlines and tasks.</p><span className="tag gold">Planned</span></div>
              <div className="card"><h3>Apple Calendar</h3><p className="note">Export iCal and sync event feeds.</p><span className="tag gold">Planned</span></div>
              <div className="card"><h3>Outlook Calendar</h3><p className="note">Microsoft calendar support for property operations.</p><span className="tag gold">Planned</span></div>
            </div>
            <br />
            <TableView title="Deadline Types to Sync" subtitle="Calendar feed planning table." headers={["Type","Example","Calendar","Status"]} rows={[["Rent","Rent due / grace period / late fee date","Pocket PPM — Rent","Beta"],["Lease","Expiration, renewal, non-renewal, rent increase notice","Pocket PPM — Compliance","Beta"],["Insurance","Policy renewal and proof-of-coverage reminders","Pocket PPM — Protection","Next"],["Maintenance","Contractor visit, inspection, completion follow-up","Pocket PPM — Maintenance","Next"],["CRM","Applicant, vendor, investor, and referral follow-ups","Pocket PPM — CRM","Next"]]} filename="calendar_deadlines_export" />
          </SimpleSection>
        );
      case "health":
        return (
          <SimpleSection title="Property Health Intelligence" subtitle="Future AI-powered photo assessment, contractor verification, and fraud detection.">
            <div className="grid cols-2">
              <div className="card"><h3>AI Health Score Placeholder</h3><p className="note">Upload photos by room or system: exterior, roof, basement, kitchen, bathroom, HVAC, electrical, appliances.</p><div className="form-grid"><label>Property<select><option>16133 Curtis</option><option>Detroit Condo</option></select></label><label>Photo Category<select><option>Exterior</option><option>Kitchen</option><option>Bathroom</option><option>HVAC</option><option>Contractor After Photo</option></select></label><label>Upload Photo<input type="file" /></label><label>Inspection Type<select><option>Move-in</option><option>Move-out</option><option>Repair verification</option><option>Routine inspection</option></select></label></div></div>
              <div className="card"><h3>Future AI Flags</h3><div className="alert-list"><div className="alert"><div><strong>Condition concern</strong><span>Water stain / mold indicator / roof wear / cracks.</span></div><span className="tag gold">AI</span></div><div className="alert"><div><strong>Contractor verification</strong><span>Compare before and after photos for visible completion.</span></div><span className="tag green">AI</span></div><div className="alert"><div><strong>Fraud detection</strong><span>Flag duplicate, manipulated, stock, or AI-generated photos.</span></div><span className="tag red">AI</span></div></div></div>
            </div>
          </SimpleSection>
        );
      case "crm":
        return <TableView title="CRM & Contacts" subtitle="Track applicants, tenants, vendors, contractors, investors, realtors, lenders, and insurance agents." headers={["Name","Type","Company","Next Follow-Up","Notes"]} rows={[["Mike Smith","Contractor","Mike's Plumbing","2026-06-08","Need invoice and after photos."],["Investor Lead","Investor","Private","2026-06-12","Interested in Detroit rentals."]]} filename="crm_export" />;
      case "roadmap":
        return (
          <SimpleSection title="Beta Roadmap" subtitle="Captured feature pillars for build sequencing.">
            <div className="grid cols-2">
              <div className="card"><h3>Beta 2.1 Must-Haves</h3><p className="note">Dark/gold premium UI, dashboard, rent roll, ledger, lease lifecycle, documents, maintenance, assets/warranties, alerts, calendar hub, CSV exports.</p></div>
              <div className="card"><h3>Beta 2.5</h3><p className="note">Receipt upload, business card scan, OCR extraction, contact creation, document classification, PDF export, calendar export logic.</p></div>
              <div className="card"><h3>V1 Public Beta</h3><p className="note">Tenant portal, state forms library, e-signature integration, compliance templates, late fee automation.</p></div>
              <div className="card"><h3>Future AI</h3><p className="note">Property health scores, photo condition assessment, maintenance recommendations, contractor completion verification, fraud detection.</p></div>
            </div>
          </SimpleSection>
        );
    }
  }, [section]);

  return (
    <div className="app-shell">
      <Sidebar section={section} setSection={setSection} />
      <main className="main">{content}</main>
    </div>
  );
}
