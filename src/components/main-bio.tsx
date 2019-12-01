import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SOCIAL from '../constants/social';
import { rhythm } from '../utils/typography';

const mainBioQuery = graphql`
  query MainBioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic2.jpg/" }) {
      childImageSharp {
        fixed(width: 250, height: 250, quality: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
      render={data => {
        const { author } = data.site.siteMetadata;
        return (
          <div
            className="main-bio-container"
            style={{
              marginBottom: rhythm(2.5),
            }}
          >
            <div className="main-bio">
              <h1 className="front-end" style={{ marginBottom: rhythm(1 / 5) }}>
                Hello! Alex Pérez is a frontEnd senior developer!{' '}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </h1>
              <ul
                className="horizontal-links"
                style={{ marginBottom: rhythm(1) }}
              >
                {SOCIAL.map(s => (
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
                I write about JavaScript, TypeScript, Elixir, and more. Welcome!
              </p>
            </div>
            <Image
              className="avatar"
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginBottom: 0,
                minWidth: 250,
                borderRadius: `100%`,
                border: `8px solid var(--white)`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
          </div>
        );
      }}
    />
  );
};

export default MainBio;
