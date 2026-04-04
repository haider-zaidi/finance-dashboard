/** Customize social links via `.env.local`: NEXT_PUBLIC_LINKEDIN_URL, NEXT_PUBLIC_INSTAGRAM_URL */

export const siteConfig = {
  author: "Mohd Haider Zaidi",
  product: "Lumina Finance",
  description:
    "A production-style finance dashboard for balances, trends, categories, and ledger management.",
  supportEmail: "haiderzaidi45h@gmail.com",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/",
};
