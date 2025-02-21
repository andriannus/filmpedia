import cc from 'classcat';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import './styles.scss';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  outline?: boolean;
};

function AppButton({
  active,
  children,
  outline,
  ...props
}: PropsWithChildren<AppButtonProps>) {
  return (
    <button
      className={cc([
        'button',
        {
          'button--active': active,
          'button--outline': outline,
        },
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

export default AppButton;
