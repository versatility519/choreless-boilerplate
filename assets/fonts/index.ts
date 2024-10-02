import localFont from "next/font/local";
// import { Inter as FontSans, Urbanist } from "next/font/google";

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// export const fontUrban = Urbanist({
//   subsets: ["latin"],
//   variable: "--font-urban",
// })

export const fontWalsheimBold = localFont({
  src: "./GT-Walsheim-Bold.ttf",
  variable: "--font-Walsheim-Bold",
})

export const fontWalsheimMedium = localFont({
  src: "./GT-Walsheim-Medium.ttf",
  variable: "--font-Walsheim-Medium",
})

export const fontWalsheimRegular = localFont({
  src: "./GT-Walsheim-Regular.ttf",
  variable: "--font-Walsheim-Regular",
})
