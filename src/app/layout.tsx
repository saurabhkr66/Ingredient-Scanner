import { ThemeProvider } from "@/utils/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/common/Header";
import QueryProviders from "@/utils/query-provider";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

import { CategoryProvider } from "@/context/CategoryContext";
import { CapturedImageProvider } from "@/context/ImageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterMultiSessionSingleSignOutUrl="/">
      <html lang="en" className="dark" suppressHydrationWarning>
        <QueryProviders>
          <body className="flex flex-col" cz-shortcut-listen="true">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark" // <-- make dark the default
              enableSystem={false} // <-- prevent system theme override
              disableTransitionOnChange
            >
              <Header />
              <Suspense fallback={<Loading />}>
                <CategoryProvider>
                  <CapturedImageProvider>
                    <main className="min-h-0 flex-1">{children}</main>
                  </CapturedImageProvider>
                </CategoryProvider>
              </Suspense>
              {/* <Footer /> */}
              <Toaster />
            </ThemeProvider>
          </body>
        </QueryProviders>
      </html>
    </ClerkProvider>
  );
}
