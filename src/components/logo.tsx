import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

export const logoQuery = graphql`
  query {
    file(relativePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(width: 200, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
const Logo: React.FunctionComponent<any> = () => {
  const data = useStaticQuery(logoQuery);

  return (
    <div className="logo">
      <img
        src={data.file.childImageSharp.fixed.src}
        srcSet={data.file.childImageSharp.fixed.srcStet}
        alt="73nko blog"
      />
    </div>
  );
};

export default Logo;
