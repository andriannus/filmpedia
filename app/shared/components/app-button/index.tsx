import cc from 'classcat';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import './styles.scss';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outline?: boolean;
};

function AppButton({
  children,
  outline,
  ...props
}: PropsWithChildren<AppButtonProps>) {
  return (
    <button
      className={cc(['button', { 'button--outline': outline }])}
      {...props}
    >
      {children}
    </button>
  );
}

export default AppButton;
