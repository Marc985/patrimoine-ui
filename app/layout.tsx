import "./globals.scss";
import React, { useEffect } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/context/session";
import { useAuthStore } from "@/store/auth-store";
export const metadata: Metadata = {
    title: "patrimony managemnt app",
    description: "Generated by create next app",
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) 
{
   

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={"min-h-screen"}>
                <ThemeProvider
                    enableSystem
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                >
                    <Provider>
                        <Navbar />
                        {children}
                        <Toaster />
                    </Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
