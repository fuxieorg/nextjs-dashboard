import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export default {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  pages: {
    // signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
  providers: [GitHub],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;
