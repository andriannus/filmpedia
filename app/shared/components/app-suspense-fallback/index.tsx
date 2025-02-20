import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

import AppLoader from '@/app/shared/components/app-loader';

import './styles.scss';

function SuspenseFallback({ children }: PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <div className="suspense">
          <AppLoader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseFallback;
