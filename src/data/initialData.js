import { De, GALLERY_IMAGES } from './images';

export const Zo = [
  {
    badge: "TOP SPONSOR",
    title: "FUTURE CITY",
    accent: "ELITE",
    sub: "HMDA Approved Premium Open Plots",
    image: De.entrance,
    price: "₹11,999",
    appreciation: "72%",
    features: [
      "Near Future City",
      "100 Ft Road Access",
      "Grand Entrance Arch",
      "Avenue Plantation",
      "Underground Drainage",
      "Bank Loan Available"
    ]
  },
  {
    badge: "TOP SPONSOR",
    title: "AIRPORT",
    accent: "GREENS",
    sub: "DTCP Approved Plots near Airport Corridor",
    image: De.hero,
    price: "₹14,999",
    appreciation: "65%",
    features: [
      "5 Mins from ORR Exit 13",
      "12 Mins from Airport",
      "Gated Community",
      "Clubhouse",
      "Landscaped Parks",
      "Ready Infrastructure"
    ]
  },
  {
    badge: "PREMIUM",
    title: "VILLA",
    accent: "COUNTY",
    sub: "Luxury Villa Plots in Shadnagar Growth Corridor",
    image: De.villa,
    price: "₹15,500",
    appreciation: "80%",
    features: [
      "Villa Plots",
      "Premium Landscape",
      "Sports Courts",
      "Luxury Entrance Plaza",
      "Community Center",
      "24x7 Security"
    ]
  }
];

export const FD = [
  { name: "Tukkuguda", tag: "Airport Corridor", icon: "plane", lat: 17.2185, lng: 78.4984 },
  { name: "Kothur", tag: "High Growth", icon: "trend", lat: 17.1472, lng: 78.2917 },
  { name: "Shadnagar", tag: "High Growth", icon: "trend", lat: 17.0673, lng: 78.2078 },
  { name: "Adibatla", tag: "Emerging", icon: "sprout", lat: 17.2343, lng: 78.5866 },
  { name: "Maheshwaram", tag: "High Growth", icon: "trend", lat: 17.1352, lng: 78.4326 },
  { name: "Yacharam", tag: "High Growth", icon: "trend", lat: 17.0543, lng: 78.6834 },
  { name: "Bongloor", tag: "Future Ready", icon: "rocket", lat: 17.2512, lng: 78.5413 },
  { name: "Future City", tag: "Mega Hub", icon: "city", lat: 17.1124, lng: 78.5521 }
];

// Exact catalog matching Image 2 & onlyplots.online
export const ALL_INITIAL_PLOTS = [
  {
    id: "ace-arandale",
    name: "ACE ARANDALE",
    title: "ACE ARANDALE",
    location: "chevella, Hyderabad, Telangana",
    city: "Hyderabad",
    area_locality: "chevella",
    price: "₹35000",
    priceNum: 35000,
    area: "300 Sq Yd",
    plot_area: 300,
    area_unit: "Sq Yd",
    facing: "West",
    road: "60 Ft",
    road_width: "60 Ft",
    approval: "HMDA Approved",
    approvals: "HMDA Approved",
    badge: "NEW",
    kind: "villa",
    typeLabel: "Villa Plot",
    image: De.gate,
    image_url: De.gate,
    photos: GALLERY_IMAGES,
    lat: 17.3068,
    lng: 78.1352,
    description: "ACE ARANDALE in Chevella, Hyderabad offers luxury HMDA approved villa plots with resort-style infrastructure, wide 60 ft blacktop roads, underground electrical cabling, and 24x7 gated security.",
    status: "published",
    views: 450,
    leads: 28,
    created: "2025-08-10"
  },
  {
    id: "premium-openplots",
    name: "Premium openplots",
    title: "Premium openplots",
    location: "Maheshwaram, Hyderabad, Telangana",
    city: "Hyderabad",
    area_locality: "Maheshwaram",
    price: "₹20000",
    priceNum: 20000,
    area: "220 Sq Yd",
    plot_area: 220,
    area_unit: "Sq Yd",
    facing: "West",
    road: "40 Ft",
    road_width: "40 Ft",
    approval: "HMDA Approved",
    approvals: "HMDA Approved",
    badge: "NEW",
    kind: "buy",
    typeLabel: "Open Plot",
    image: De.road,
    image_url: De.road,
    photos: GALLERY_IMAGES,
    lat: 17.1352,
    lng: 78.4326,
    description: "Premium open plots in Maheshwaram growth corridor. HMDA sanctioned with immediate bank loan sanctions, clear title, avenue plantation, and prompt access to Hardware Park.",
    status: "published",
    views: 380,
    leads: 21,
    created: "2025-08-12"
  },
  {
    id: "ace-arcadia",
    name: "Ace Arcadia",
    title: "Ace Arcadia",
    location: "Maheshwaram, Hyderabad, Telangana",
    city: "Hyderabad",
    area_locality: "Maheshwaram",
    price: "₹22000",
    priceNum: 22000,
    area: "220 Sq Yd",
    plot_area: 220,
    area_unit: "Sq Yd",
    facing: "East",
    road: "30 Ft",
    road_width: "30 Ft",
    approval: "HMDA Approved",
    approvals: "HMDA Approved",
    badge: "FEATURED",
    kind: "residential",
    typeLabel: "Residential Plot",
    image: De.road,
    image_url: De.road,
    photos: GALLERY_IMAGES,
    lat: 17.1389,
    lng: 78.4412,
    description: "Ace Arcadia features East-facing residential plots in Maheshwaram with ready-to-construct facilities, children park, underground drainage, and electricity.",
    status: "published",
    views: 420,
    leads: 25,
    created: "2025-08-14"
  },
  {
    id: "pavani-royale",
    name: "Pavani Royale",
    title: "Pavani Royale",
    location: "Shadnagar, Kothur",
    city: "Hyderabad",
    area_locality: "Shadnagar",
    price: "₹15500",
    priceNum: 15500,
    area: "200 Sq Yd",
    plot_area: 200,
    area_unit: "Sq Yd",
    road: "100 Ft Road",
    road_width: "100 Ft Road",
    approval: "HMDA Approved",
    approvals: "HMDA Approved",
    facing: "East",
    badge: "HMDA",
    kind: "buy",
    typeLabel: "Open Plot",
    image: De.road,
    image_url: De.road,
    photos: GALLERY_IMAGES,
    lat: 17.0782,
    lng: 78.2245,
    description: "Pavani Royale is an elite HMDA approved plotted layout near Shadnagar and Kothur with 100 ft master road access, clear titles, and high appreciation outlook.",
    status: "published",
    views: 342,
    leads: 18,
    created: "2025-08-15"
  },
  {
    id: "sapphire-county",
    name: "Sapphire County",
    title: "Sapphire County",
    location: "Shadnagar",
    city: "Hyderabad",
    area_locality: "Shadnagar",
    price: "₹12999",
    priceNum: 12999,
    area: "167 Sq Yd",
    plot_area: 167,
    area_unit: "Sq Yd",
    road: "60 Ft Road",
    road_width: "60 Ft Road",
    approval: "DTCP Approved",
    approvals: "DTCP Approved",
    facing: "North",
    badge: "DTCP",
    kind: "buy",
    typeLabel: "Open Plot",
    image: De.meadows,
    image_url: De.meadows,
    photos: GALLERY_IMAGES,
    lat: 17.0621,
    lng: 78.2091,
    description: "DTCP approved open plots in Shadnagar with 60 ft roads, water lines, compound fencing, and fast connectivity to Bengaluru Highway NH-44.",
    status: "published",
    views: 289,
    leads: 14,
    created: "2025-08-20"
  },
  {
    id: "fortune-smart-city",
    name: "Fortune Smart City",
    title: "Fortune Smart City",
    location: "Shadnagar",
    city: "Hyderabad",
    area_locality: "Shadnagar",
    price: "₹13999",
    priceNum: 13999,
    area: "150 Sq Yd",
    plot_area: 150,
    area_unit: "Sq Yd",
    road: "Grand Entrance",
    road_width: "80 Ft Road",
    approval: "RERA Approved",
    approvals: "RERA Approved",
    facing: "East",
    badge: "RERA",
    kind: "buy",
    typeLabel: "Open Plot",
    image: De.entrance,
    image_url: De.entrance,
    photos: GALLERY_IMAGES,
    lat: 17.0715,
    lng: 78.2155,
    description: "RERA registered modern plotted venture with grand entrance arch, designer streetscapes, overhead water storage, and children play park.",
    status: "published",
    views: 198,
    leads: 11,
    created: "2025-09-01"
  },
  {
    id: "ashoka-meadows",
    name: "Ashoka Meadows",
    title: "Ashoka Meadows",
    location: "Kothur, Hyderabad",
    city: "Hyderabad",
    area_locality: "Kothur",
    price: "₹16500",
    priceNum: 16500,
    area: "183 Sq Yd",
    plot_area: 183,
    area_unit: "Sq Yd",
    road: "80 Ft Road",
    road_width: "80 Ft Road",
    approval: "HMDA Approved",
    approvals: "HMDA Approved",
    facing: "West",
    badge: "HMDA",
    kind: "villa",
    typeLabel: "Villa Plot",
    image: De.villa,
    image_url: De.villa,
    photos: GALLERY_IMAGES,
    lat: 17.1512,
    lng: 78.2987,
    description: "Located within the booming Kothur industrial and residential junction, Ashoka Meadows provides ready-to-construct villa plots with HMDA sanctions.",
    status: "published",
    views: 412,
    leads: 23,
    created: "2025-08-10"
  },
  {
    id: "apple-county",
    name: "Apple County",
    title: "Apple County",
    location: "Farooqnagar, Hyderabad",
    city: "Hyderabad",
    area_locality: "Farooqnagar",
    price: "₹11999",
    priceNum: 11999,
    area: "200 Sq Yd",
    plot_area: 200,
    area_unit: "Sq Yd",
    road: "40 Ft Road",
    road_width: "40 Ft Road",
    approval: "DTCP Approved",
    approvals: "DTCP Approved",
    facing: "South",
    badge: "DTCP",
    kind: "residential",
    typeLabel: "Residential Plot",
    image: De.grid,
    image_url: De.grid,
    photos: GALLERY_IMAGES,
    lat: 17.0589,
    lng: 78.1942,
    description: "Budget-friendly DTCP layout in Farooqnagar zone with wide blacktop roads, clear titles, compound fencing, and excellent appreciation forecast.",
    status: "published",
    views: 156,
    leads: 9,
    created: "2025-09-05"
  },
  {
    id: "green-valley-corner",
    name: "Green Valley Corner",
    title: "Green Valley Corner",
    location: "Maheshwaram, Hyderabad",
    city: "Hyderabad",
    area_locality: "Maheshwaram",
    price: "₹18500",
    priceNum: 18500,
    area: "250 Sq Yd",
    plot_area: 250,
    area_unit: "Sq Yd",
    road: "60 Ft Road",
    road_width: "60 Ft Road",
    approval: "RERA Approved",
    approvals: "RERA Approved",
    facing: "Corner",
    badge: "RERA",
    kind: "villa",
    typeLabel: "Villa Plot",
    image: De.entrance,
    image_url: De.entrance,
    photos: GALLERY_IMAGES,
    lat: 17.1412,
    lng: 78.4356,
    description: "Prime corner plots in Maheshwaram with dual road connectivity, RERA approved layout, and immediate registration.",
    status: "published",
    views: 310,
    leads: 19,
    created: "2025-09-10"
  },
  {
    id: "sunrise-county-south",
    name: "Sunrise County",
    title: "Sunrise County",
    location: "Shadnagar, Hyderabad",
    city: "Hyderabad",
    area_locality: "Shadnagar",
    price: "₹14000",
    priceNum: 14000,
    area: "200 Sq Yd",
    plot_area: 200,
    area_unit: "Sq Yd",
    road: "40 Ft Road",
    road_width: "40 Ft Road",
    approval: "DTCP Approved",
    approvals: "DTCP Approved",
    facing: "South",
    badge: "DTCP",
    kind: "buy",
    typeLabel: "Open Plot",
    image: De.meadows,
    image_url: De.meadows,
    photos: GALLERY_IMAGES,
    lat: 17.0691,
    lng: 78.2123,
    description: "DTCP approved south facing open plots in Shadnagar with 100% vaastu compliance and underground drainage.",
    status: "published",
    views: 220,
    leads: 12,
    created: "2025-09-12"
  }
];

export const ZM = {
  "buy-plots": {
    title: "Buy Plots",
    sub: "Browse all verified open plots across top locations in India.",
    hero: De.hero
  },
  "villa-plots": {
    title: "Villa Plots",
    sub: "Premium villa plots in gated communities with luxury amenities.",
    hero: De.villa
  },
  "residential-plots": {
    title: "Residential Plots",
    sub: "DTCP & RERA approved residential plots for your dream home.",
    hero: De.meadows
  }
};

export const YM = {
  "privacy-policy": {
    title: "Privacy Policy",
    description: "How OnlyPlots.online collects, uses, and protects your personal information.",
    sections: [
      {
        h: "Information We Collect",
        p: "We collect information you provide directly — such as your name, email, phone number, and property preferences when you sign up, list a plot, or contact us. We also collect usage data like pages visited and search queries to improve our marketplace."
      },
      {
        h: "How We Use Your Information",
        p: "Your information is used to provide and improve our services, communicate with you about plots and enquiries, verify listings, and send newsletters you have opted into. We never sell your personal data to third parties."
      },
      {
        h: "Data Security",
        p: "All data is stored securely in our database with role-based access controls. Passwords are hashed. Sensitive documents uploaded by builders are accessible only to authorized administrators."
      },
      {
        h: "Your Rights",
        p: "You may request access to, correction of, or deletion of your personal data at any time by emailing support@onlyplots.online. You can unsubscribe from newsletters at any time via the link in every email."
      },
      {
        h: "Cookies",
        p: "We use essential cookies to keep you logged in and remember your preferences. We do not use cookies for third-party advertising tracking."
      }
    ]
  },
  "terms": {
    title: "Terms & Conditions",
    description: "The terms governing your use of the OnlyPlots.online marketplace.",
    sections: [
      {
        h: "Acceptance of Terms",
        p: "By accessing or using OnlyPlots.online, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the platform."
      },
      {
        h: "User Accounts",
        p: "You must provide accurate information when creating an account and are responsible for keeping your password secure. Buyers and builders have different account types with different permissions."
      },
      {
        h: "Listings",
        p: "Builders and developers are responsible for the accuracy of their plot listings. OnlyPlots.online verifies approvals (HMDA, DTCP, RERA) where documents are provided but does not independently guarantee title or ownership."
      },
      {
        h: "Prohibited Conduct",
        p: "You may not post fraudulent listings, impersonate others, scrape data, or use the platform for any unlawful purpose. Violations may result in account termination."
      },
      {
        h: "Limitation of Liability",
        p: "OnlyPlots.online is a marketplace platform. We are not a party to any transaction between buyers and sellers and are not liable for disputes arising from such transactions."
      }
    ]
  },
  "refund-policy": {
    title: "Refund Policy",
    description: "Our policy on refunds for paid listing and promotion services on OnlyPlots.online.",
    sections: [
      {
        h: "Listing & Promotion Fees",
        p: "Fees paid for premium listings, featured placements, and promotion plans are for visibility services on the platform and are not refundable once the listing is published and live."
      },
      {
        h: "Cancellation Before Publishing",
        p: "If you cancel a paid plan before your listing has been published (within 24 hours of payment and before going live), you are eligible for a full refund."
      },
      {
        h: "How to Request a Refund",
        p: "Email support@onlyplots.online with your transaction details and reason for the request. Approved refunds are processed within 7–10 business days to the original payment method."
      },
      {
        h: "Non-Refundable Items",
        p: "Property transactions themselves are between buyer and seller and are outside the scope of this policy. OnlyPlots.online never handles property payments."
      }
    ]
  }
};

export const GD = {
  users: "All Users",
  "users-buyers": "Buyers",
  "users-sellers": "Sellers",
  "users-builders": "Builders",
  "users-agents": "Agents / Channel Partners",
  "users-statewise": "State-wise Users",
  listings: "All Listings",
  "listings-pending": "Pending Approval Listings",
  "listings-published": "Published Listings",
  "listings-statewise": "State-wise Listings",
  leads: "All Leads",
  "leads-statewise": "State-wise Leads",
  "leads-citywise": "City-wise Leads",
  ads: "All Advertisements",
  "ads-active": "Active Advertisements",
  "ads-pending": "Pending Advertisements",
  "ads-expired": "Expired Advertisements",
  "ads-statewise": "State-wise Advertisements",
  reports: "Reports",
  notifications: "Notifications",
  payments: "Payments",
  "payments-gateways": "Payment Gateways",
  "payments-bank": "Bank Transfer Verification"
};

export const CITIES_LIST = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Pune",
  "Mumbai",
  "Visakhapatnam",
  "Vijayawada",
  "Warangal",
  "Other"
];

export const BUDGET_RANGES = [
  "Under ₹15L",
  "₹15L – ₹30L",
  "₹30L – ₹50L",
  "₹50L – ₹1Cr",
  "Above ₹1Cr"
];

export const PRICING_PLANS = {
  basicListing: {
    id: "basic",
    name: "Basic Listing",
    price: 0,
    priceLabel: "Free",
    period: "Forever",
    badge: "Free Tier",
    features: [
      "1 Plot Listing",
      "Standard Search Visibility",
      "Direct Buyer Enquiries",
      "Listing Active for 60 Days",
      "Basic Analytics"
    ]
  },
  featuredListing: {
    id: "featured",
    name: "Featured Plan",
    price: 9.99,
    priceLabel: "₹9.99 (Special)",
    period: "30 Days",
    badge: "Most Popular",
    features: [
      "Top Placement in Category Searches",
      "Highlighted 'FEATURED' Badge",
      "3x More Buyer Enquiries",
      "Direct WhatsApp Leads Forwarding",
      "Dedicated Verification Assistance",
      "Instant PhonePe Activation"
    ]
  },
  premiumBuilder: {
    id: "premium",
    name: "Builder Pro",
    price: 499,
    priceLabel: "₹499",
    period: "Per Month",
    badge: "For Developers",
    features: [
      "Up to 10 Active Layouts",
      "Top Carousel Sponsor Slot Eligibility",
      "Full CRM & Lead Management",
      "Priority Verification Review (< 2 hrs)",
      "Brochure & Master Plan Hosting",
      "Site Visit Booking Concierge"
    ]
  }
};
