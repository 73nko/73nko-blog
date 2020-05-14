import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SOCIAL from '../constants/social';
import { rhythm } from '../utils/typography';

const mainBioQuery = graphql`
  query MainBioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

const MainBio: React.FunctionComponent<{}> = () => {
  return (
    <StaticQuery
      query={mainBioQuery}
      render={(data) => {
        const { author } = data.site.siteMetadata;
        return (
          <div
            className="main-bio-container"
            style={{
              marginBottom: rhythm(1.5),
            }}
          >
            <div className="main-bio">
              <h1 className="front-end" style={{ marginBottom: rhythm(1 / 5) }}>
                Hello! Alex Pérez is a frontEnd senior developer!
              </h1>
              <ul
                className="horizontal-links"
                style={{ marginBottom: rhythm(1) }}
              >
                {SOCIAL.map((s) => (
                  <li key={s.kind}>
                    <a className="u-no-box-shadow" href={s.url}>
                      <FontAwesomeIcon
                        icon={s.icon}
                        color="var(--secondary-light)"
                        title={`Link to my ${s.kind}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                I write about JavaScript, TypeScript, Node, and more. Welcome!
              </p>
            </div>
            <hr className="divider" />
          </div>
        );
      }}
    />
  );
};

export default MainBio;
