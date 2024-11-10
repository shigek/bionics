import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from 'next/headers';
import "@/app/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ColorModeChoice, ThemeRegistry } from "@/libs/theme/ThemeRegistry";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const preColorMode = cookies().get('colorMode')?.value;
  const initColorMode: ColorModeChoice =
    preColorMode === 'light' || preColorMode === 'dark'
      ? preColorMode
      : 'device';

  // 初期表示のカスタムスタイルを適用
  let style: any = {};
  if (['light', 'dark'].includes(initColorMode)) {
    style['--background'] = initColorMode === 'dark' ? '#333' : '#fff';
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeRegistry initColorMode={initColorMode}>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
