import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { TopNav } from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
	title: "T3 Gallery",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
	modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<PostHogProvider>
				<html lang="en">
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					<body className={`font-sans ${geist.variable} dark`}>
						<div className="grid h-screen grid-rows-[auto_1fr]">
							<TopNav />
							<main className="overflow-y-scroll">{children}</main>
							{modal}
						</div>
						<div id="modal-root" />
						<Toaster />
					</body>
				</html>
			</PostHogProvider>
		</ClerkProvider>
	);
}
