//next
import type { Metadata } from "next";

//google
import { Inter } from "next/font/google";

//uploadthing
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

//providers
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SearchProvider } from "./Contexts/searchContext";
import { AuthProvider } from "./Contexts/authContext";
import { ReactQueryProvider } from "./Contexts/reactQueryContext";
import { PageProvider } from "./Contexts/pageContext";
import { CreateCarProvider } from "./Contexts/createCarContext";
import { CarDetailsProvider } from "./Contexts/carDetailsContext";

//types
import React from "react";

//styles
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SwiftWheels",
    description: "Generated by create next app",
};

const AllProviders = ({ children }: { children: React.ReactNode }) => (
    <ReactQueryProvider>
        <AuthProvider>
            <PageProvider>
                <SearchProvider>
                    <CreateCarProvider>
                        <CarDetailsProvider>{children}</CarDetailsProvider>
                    </CreateCarProvider>
                </SearchProvider>
            </PageProvider>
        </AuthProvider>
    </ReactQueryProvider>
);

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

            <body className={`${inter.className} hide-scrollbar`}>
                <AllProviders>{children}</AllProviders>
            </body>
        </>
    );
}
