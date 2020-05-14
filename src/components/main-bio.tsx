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
                Hola! Soy 73Nko, Senior Frontend Engineer.
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
                Ingeniero Informático y actualmente{' '}
                <b>Senior Frontend Engineer</b> en <b>Eventbrite</b>. Entusiasta
                de las tecnologías web:{' '}
                <b>Javacript, Node.js, Deno, React, Mongo</b>, etc..
              </p>
              <p>
                A través del blog espero compartir mi aprendizaje y profundizar
                compartiendo lo que aprendo en mi día a día.
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
