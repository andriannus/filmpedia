import type { Metadata } from 'next';

import AppLayout from '@/app/shared/components/app-layout';

import Content from './components/content';
import './styles.scss';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Authenticate your API Key!',
  openGraph: {
    title: 'Login',
    description: 'Authenticate your API Key!',
  },
  twitter: {
    title: 'Login',
    description: 'Authenticate your API Key!',
  },
};

function PageLogin() {
  return (
    <AppLayout>
      <div className="login">
        <Content />
      </div>
    </AppLayout>
  );
}

export default PageLogin;
