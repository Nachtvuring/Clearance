import './globals.css';
import './landing.css';
import './course.css';
import './responsive.css';
import AppShell from './components/app-shell';

export const metadata = {
  title: 'Clearance | ATC Training',
  description: 'Learn aviation radio communication from the first call, with clear explanations and spoken examples.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}
