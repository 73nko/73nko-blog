import React from 'react';

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
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main
          style={{
            opacity: 1,
            backgroundColor: `var(--white)`,
            boxShadow: `8px 8px 14px #01001`,
            borderRadius: `${rhythm(1)}`,
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
