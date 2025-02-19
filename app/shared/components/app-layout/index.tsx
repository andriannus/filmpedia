'use client';

import { PropsWithChildren } from 'react';

import AppFooter from '@/app/shared/components/app-footer';

import './styles.scss';

function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      {children}
      <AppFooter />
    </div>
  );
}

export default AppLayout;
