import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import Logo from '../../content/assets/logo-73.svg';
import SOCIAL from '../constants/social';

interface LayoutProps {
  location: Location;
  title: string;
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  location,
  title,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line no-undef
  let header;

 /* if (location.pathname === rootPath) {
    header = (
      <h2
        style={{
          ...scale(0.3),
          fontStyle: 'italic',
          display: 'inline',
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h2>
    );
  } else {
    header = (
      <h2
        style={{
          ...scale(0.3),
          fontStyle: 'italic',
          display: 'inline',
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h2>
    );
  }
*/
  return (
    <>
      <div className="bg" />
      { /*
       <header
        style={{
          padding: rhythm(1),
          marginTop: 0,
          marginBottom: 0,
          opacity: 1,
        }}
      >
        <div className="logo">
          <Logo
            style={{
              verticalAlign: 'middle',
              marginRight: rhythm(1 / 4),
            }}
          />
          {header}
        </div>
      </header>
        */
      } 
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
            borderRadius: `${rhythm(1)}`,
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()} Alex Pérez
          <div>
            {SOCIAL.map((s, idx) => (
              <React.Fragment key={s.kind}>
                <a href={s.url}>{s.kind}</a>
                {idx === SOCIAL.length - 1 ? '' : <span> / </span>}
              </React.Fragment>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
