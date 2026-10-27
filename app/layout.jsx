import './globals.css';
import './landing.css';
import './course.css';
import AppShell from './components/app-shell';

export const metadata = {
  title: 'Clearance — ATC Training',
  description: 'Learn aviation radio communication from your first call to full ATC scenarios.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
