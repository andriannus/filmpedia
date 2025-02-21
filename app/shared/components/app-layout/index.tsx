'use client';

import type { PropsWithChildren } from 'react';

import AppFooter from '@/app/shared/components/app-footer';
import AppHeader from '@/app/shared/components/app-header';

import './styles.scss';

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <AppHeader />
      <main className="layout__main">{children}</main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
