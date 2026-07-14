// nomni-shared-google-auth
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_COMPANY_DOMAINS = new Set([
  "nomni.ai",
  "liven.com.au",
  "liven.love",
  "abacus.co",
  "orderup.com",
  "orderup.com.au",
  "zeemart.asia",
  "zeemart.co",
  "usecopper.com",
  "nomnie.com",
]);

function hasAllowedCompanyDomain(email: string | null | undefined): boolean {
  const domain = email?.trim().toLowerCase().split("@").at(1);
  return Boolean(domain && ALLOWED_COMPANY_DOMAINS.has(domain));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      return hasAllowedCompanyDomain(user.email);
    },
    authorized({ auth: session }) {
      return hasAllowedCompanyDomain(session?.user?.email);
    },
  },
});
