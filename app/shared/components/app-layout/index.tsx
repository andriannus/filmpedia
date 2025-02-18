'use client';

import { PropsWithChildren } from 'react';

import './styles.scss';

function AppLayout({ children }: PropsWithChildren) {
  return <div className="layout">{children}</div>;
}

export default AppLayout;
