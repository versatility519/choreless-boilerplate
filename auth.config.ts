import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import AppleProvider from "next-auth/providers/apple"

import { env } from "@/env.mjs";
import { sendVerificationRequest } from "@/lib/email";
import email from "next-auth/providers/email";

export default {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: env.APPLE_CLIENT_ID,
      clientSecret: env.APPLE_CLIENT_SECRET || '',
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: env.EMAIL_FROM,
      // sendVerificationRequest,
    }),
  ]
} satisfies NextAuthConfig;
