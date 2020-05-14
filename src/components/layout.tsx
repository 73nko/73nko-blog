import React from 'react';

import Logo from '../components/logo';
import { rhythm } from '../utils/typography';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="bg" />
      <div
        style={{
          opacity: 1,
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(35),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Logo />
        <main
          style={{
            opacity: 1,
            backgroundColor: `var(--white)`,
            boxShadow: `8px 8px 14px #01001`,
            borderRadius: `${rhythm(0.5)}`,
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(35),
            padding: `${rhythm(1.5)} 0`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
