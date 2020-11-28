import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Meta {
  property: string;
  content: string;
  name?: undefined;
}
interface SEOProps {
  description?: string;
  lang?: string;
  meta?: Meta[];
  keywords?: string[];
  title: string;
}

const SEO: React.FunctionComponent<SEOProps> = ({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
}) => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            defaultImage
          }
        }
        file(relativePath: { regex: "/logo.png/" }) {
          childImageSharp {
            fixed(width: 200, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const image = `https://73nko.es` + file.childImageSharp.fixed.src;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title} - A blog by ${site.siteMetadata.author}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:image`,
          content: image,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  );
};

export default SEO;
