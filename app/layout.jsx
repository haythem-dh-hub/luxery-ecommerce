import { Manrope, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import ThemeRegistry from "@/components/theme/ThemeRegistry";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScenePlanet from "@/components/shared/ScenePlanet";
import CartDrawer from "@/components/shared/CartDrawer";
import { StoreProvider } from "@/components/shared/StoreProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "Toxic Man",
  description:
    "Advanced modern e-commerce for perfumes, oils, watches, accessories, and streetwear.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-white antialiased">
        <ThemeRegistry>
          <StoreProvider>
            <ScenePlanet />
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
          </StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
