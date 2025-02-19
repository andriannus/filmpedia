'use client';

import { PropsWithChildren } from 'react';

import AppFooter from '@/app/shared/components/app-footer';
import AppHeader from '@/app/shared/components/app-header';

import './styles.scss';

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}

export default AppLayout;
