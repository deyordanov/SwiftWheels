import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//providers
import { SearchProvider } from "./Contexts/searchContext";
import { AuthProvider } from "./Contexts/authContext";
import { ReactQueryProvider } from "./Contexts/reactQueryContext";
import { PageProvider } from "./Contexts/pageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <PageProvider>
          <SearchProvider>
            <html lang="en">
              <body className={inter.className}>{children}</body>
            </html>
          </SearchProvider>
        </PageProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
