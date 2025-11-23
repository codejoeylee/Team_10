import { Metadata } from 'next';
import './ui/global.css';
import Navbar from './ui/homepage/navbar';
export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Dashboard',
    default: 'Handcrafted Haven Dashboard',
  },
  description: 'Handcrafted Haven,a marketplace of vintage, hand-hewn goods.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

