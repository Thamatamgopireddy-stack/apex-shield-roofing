export interface ServicePlan {
  id: string;
  slug: "inspection" | "deposit" | "flat-rate-repair";
  badge: string;
  title: string;
  priceDisplay: string;
  priceCents: number;
  whopPlanId: string;
  isDeposit?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
}

export const siteConfig = {
  company: {
    name: "Apex Shield Roofing & Exteriors",
    shortName: "Apex Shield",
    tagline: "Licensed, Bonded & Insured Residential Roofing",
    phone: "(512) 555-0194",
    email: "estimates@apexshieldroofing.com",
    licenseNumber: "TX-ROOF-884920",
    yearsInBusiness: 18,
    warrantyYears: 25,
  },
  serviceAreas: {
    metro: "Greater Austin & Central Texas",
    zipCodes: ["78701", "78704", "78731", "78745", "78759", "78613", "78664", "78681"],
    cities: [
      "Austin",
      "Round Rock",
      "Cedar Park",
      "Westlake Hills",
      "Lakeway",
      "Georgetown",
      "Pflugerville",
      "Dripping Springs",
    ],
  },
  plans: [
    {
      id: "plan-inspection",
      slug: "inspection",
      badge: "21-Point Drone + Attic Audit",
      title: "Comprehensive Roof Inspection",
      priceDisplay: "$149",
      priceCents: 14900,
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_INSPECTION || "plan_inspection_149",
      isDeposit: false,
      description:
        "Full thermal moisture scan, 4K drone shingle imaging, flashing check, and insurance-ready PDF report.",
      features: [
        "Same-week licensed inspector dispatch",
        "High-res drone imagery & moisture meter scan",
        "Credited 100% toward any repair or replacement",
      ],
      ctaLabel: "Book $149 Inspection",
    },
    {
      id: "plan-flat-rate",
      slug: "flat-rate-repair",
      badge: "Most Popular Flat-Rate",
      title: "Storm Leak & Flashing Tune-Up",
      priceDisplay: "$495",
      priceCents: 49500,
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_REPAIR || "plan_repair_495",
      isDeposit: false,
      description:
        "Upfront flat-rate repair for missing shingles, pipe boot replacements, ridge cap sealing, and valley leaks.",
      features: [
        "Up to 15 architectural shingles replaced",
        "All roof penetrations & pipe boots resealed",
        "5-Year No-Leak Workmanship Guarantee",
      ],
      ctaLabel: "Schedule Flat-Rate Repair",
    },
    {
      id: "plan-deposit",
      slug: "deposit",
      badge: "Full Replacement Lock-In",
      title: "Roof Replacement Project Deposit",
      priceDisplay: "$500",
      priceCents: 50000,
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_DEPOSIT || "plan_deposit_500",
      isDeposit: true,
      description:
        "Locks in material pricing and secures your installation crew date. Card is saved on file for seamless final completion billing.",
      features: [
        "Locks shingle color & material delivery slot",
        "Card securely saved on file for final invoice",
        "Eligible for Klarna, Afterpay & Splitit at checkout",
      ],
      ctaLabel: "Pay $500 Project Deposit",
    },
  ] as ServicePlan[],
  reviews: [
    {
      author: "Marcus & Elena Vance",
      location: "Westlake Hills, TX",
      rating: 5,
      project: "Full Standing-Seam Metal & Architectural Shingle Replacement",
      quote:
        "Booked the $149 drone inspection on Tuesday, locked our crew with the $500 deposit online, and settled the final balance via invoice the day they finished magnet-sweeping our driveway.",
    },
    {
      author: "David Chen",
      location: "Round Rock, TX",
      rating: 5,
      project: "Hail Damage Insurance Replacement",
      quote:
        "Zero pushy sales tactics. Their inspection report gave our adjuster everything needed, and being able to split our deductible with Klarna right inside checkout was a lifesaver.",
    },
    {
      author: "Sarah Jenkins",
      location: "Cedar Park, TX",
      rating: 5,
      project: "Flat-Rate Chimney & Valley Flashing Repair",
      quote:
        "Fixed a persistent leak during heavy rain for the exact $495 flat rate quoted on the site. Clean, fast, and transparent.",
    },
  ],
};
