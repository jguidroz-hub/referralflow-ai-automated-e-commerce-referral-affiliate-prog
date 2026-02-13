import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReferralFlow AI - Automated e-commerce referral & affiliate program management',
  description: 'Value Proposition: Automates setup, tracking, and payouts for referral programs, helping e-commerce businesses grow sales and maximize ROI with minimal manual effort.

Target Customer: Small to medium-sized e-commerce businesses and online retailers seeking to implement or optimize referral marketing without dedicated staff.

---
Category: MarTech
Target Market: Small to medium-sized e-commerce businesses and online retailers seeking to implement or optimize referral marketing without dedicated staff.
Source Hypothesis ID: 1bca33c5-bfea-4375-a4b4-3b0e0c840d13
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">ReferralFlow AI - Automated e-commerce referral & affiliate program management</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
