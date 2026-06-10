# Pocket Property Manager™ — Next.js Starter

This is a deployable Next.js starter for Pocket PPM using the dark/gold brand direction.

## Included
- Next.js App Router
- Dark/gold branded dashboard
- Left sidebar with Pocket Property Manager™ logo mark
- Rent Roll
- Property Ledger
- Lease Lifecycle
- Document Vault
- Maintenance
- Assets & Warranties
- Expense Tracker
- Calendar Sync & Deadline Hub
- Property Health Intelligence placeholder
- CRM
- Roadmap
- CSV exports
- Supabase client scaffold

## Local setup

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Vercel settings

Framework Preset:
```bash
Next.js
```

Install Command:
```bash
npm install
```

Build Command:
```bash
npm run build
```

Output Directory:
```bash
Leave blank
```

## Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase keys when ready.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next build steps
1. Connect Supabase Auth.
2. Create database tables for properties, tenants, leases, documents, rent_roll, ledger_entries, work_orders, assets, contacts, and calendar_events.
3. Replace sample arrays in `app/page.tsx` with Supabase queries.
4. Add Supabase Storage for documents, receipts, photos, deeds, and land contracts.
