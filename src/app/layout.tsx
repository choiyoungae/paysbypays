import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "올페이즈",
  description: "올페이즈 과제전형",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
