import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

export const logoQuery = graphql`
  query LogoQUery {
    logo: file(absolutePath: { regex: "/logo/" }) {
      childImageSharp {
        fixed(width: 50, height: 50, quality: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
const Logo: React.FunctionComponent<any> = () => {
  return (
    <div className="logo">
      <StaticQuery
        query={logoQuery}
        render={(data) => {
          console.log({ data });
          return (
            <Image fixed={data.logo.childImageSharp.fixed} alt="73nko blog" />
          );
        }}
      />
    </div>
  );
};

export default Logo;
