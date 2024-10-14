import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from '../components/Footer';

import '../app/globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'My Next.js Website',
  description: 'Simple website with Home, About, Services, and Contact pages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
