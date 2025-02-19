import Image from 'next/image';

import './styles.scss';

function AppFooter() {
  return (
    <footer className="footer">
      <div className="footer__layout">
        <span>&copy; MoovieTime. All rights reserved</span>

        <div className="footer__logo">
          <Image
            src="/images/logo-gray.webp"
            alt="Logo gray"
            height={62}
            width={225}
            priority
          />
        </div>

        <span>Made with Nuxt 3</span>
      </div>
    </footer>
  );
}

export default AppFooter;
