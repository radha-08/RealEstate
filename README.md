# OnlyPlots.online — Website Replica

A complete, high-fidelity replica of **[OnlyPlots.online](https://onlyplots.online/)** built from scratch using **React 19**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and **Leaflet Maps**.

> **"Only Plots. No Distractions."** — India's dedicated marketplace for verified open plots, villa plots, and residential plots.

---

## 🌟 Features Included

- **Exact Visual & Functional Fidelity**: Built from scratch using the exact same design system, colors (`#16a34a` primary green, `#04160d` hero dark, `#f6f8f6` background), typography, and assets from OnlyPlots.
- **Auto-Rotating Hero Carousel**: 6-second automatic rotation with top sponsors (`Future City Elite`, `Airport Greens`, `Villa County`), appreciation badges (`72%`, `65%`, `80%`), and quick search.
- **Top Investment Corridors**: Tukkuguda, Kothur, Shadnagar, Adibatla, Maheshwaram, Yacharam, Bongloor, and Future City.
- **Interactive Leaflet Maps**: OpenStreetMap tile layer with custom branded map pins for every plot and investment zone.
- **Financial Planning & EMI Calculator**: Interactive sliders for Plot Cost, Down Payment %, Interest Rate, and Tenure with principal/interest breakdown.
- **Free Site Visit Booking**: Modal wizard with date picker, time slot, group size, transport mode, and instant confirmation.
- **Request Best Price Quote**: Developer lead capture for discounted price sheets.
- **PhonePe QR Payment Flow**: Real merchant PhonePe QR modal (`₹9.99` Featured Plan), WhatsApp number binding, and celebratory confetti upon confirmation.
- **Multi-Role Authentication**:
  - **Buyer**: Save/shortlist plots, track booked site visits, and view price enquiries.
  - **Builder / Developer**: Manage layouts, lead CRM with 1-click Call & WhatsApp buttons, site visits, and PhonePe promotion upgrades.
  - **SuperAdmin**: Platform KPIs, layout approval/rejection moderation, leads archive, and contact inquiries.
- **Quick 1-Click Role Switcher**: Available in the top navbar and login page to switch between Buyer, Builder, and Admin instantly without typing credentials.

---

## 🧭 Pages & Routes

| Route | Page Description |
|---|---|
| `/` | **Home Page**: Hero carousel, quick search, investment corridors, featured plots grid, value proposition, builder CTA. |
| `/plot/:id` | **Plot Details Page**: Photo gallery, specs, amenities, interactive Leaflet map, embedded EMI calculator, site visit modal, and WhatsApp link. |
| `/buy-plots` | **All Plots**: Full catalog with approval, facing, budget, and sort filters. |
| `/villa-plots` | **Villa Plots**: Filtered gated community villa ventures. |
| `/residential-plots` | **Residential Plots**: DTCP & RERA approved family plots. |
| `/investment-zones` | **Investment Zones**: Deep-dive analysis on Airport Corridor, South Growth Belt, Aerospace Belt, and Future City with maps. |
| `/resources` | **Knowledge Hub**: Interactive EMI calculator, 8-step buyer legal checklist with tracking, and buyer FAQs. |
| `/about` | **About Us**: Mission, verified layout guarantee, statistics, and pillars. |
| `/contact` | **Contact Support**: Office location, direct phone, email, and working interactive contact form. |
| `/privacy-policy` | **Privacy Policy**: Full terms from OnlyPlots.online. |
| `/terms` | **Terms & Conditions**: Marketplace terms and layout developer conditions. |
| `/refund-policy` | **Refund Policy**: Listing and promotion refund rules. |
| `/login` | **Login**: Buyer, Builder, and Admin tabs with 1-click demo logins and Google authentication. |
| `/signup/buyer` | **Buyer Signup**: City selector, budget range, and preferred location interests. |
| `/signup/builder` | **Builder Registration**: Company details, designation, and verification document upload placeholders. |
| `/list-plot` | **Post Your Plot**: Plot submission wizard with layout specifications and PhonePe promotion plan selection. |
| `/dashboard` | **Buyer Dashboard**: Shortlisted plots, scheduled visits, and sent enquiries. |
| `/seller` | **Builder Dashboard & CRM**: Listings manager, buyer leads CRM with Call & WhatsApp, visit management, and billing. |
| `/admin` | **SuperAdmin Console**: Platform analytics, layout moderation (approve/suspend), leads database, and inquiries. |
| `/payment/success` | **Payment Confirmation**: PhonePe payment receipt with confetti and WhatsApp concierge button. |

---

## 🚀 How to Run

### 1. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Demo Accounts (Pre-configured)

You can use the **Quick Role Switcher** in the top navigation bar or log in with these credentials:

| Role | Email | Password |
|---|---|---|
| **Buyer** | `rahul@example.com` | `demo123456` |
| **Builder / Promoter** | `builder@balajiinfra.com` | `demo123456` |
| **SuperAdmin** | `admin@onlyplots.online` | `demo123456` |
