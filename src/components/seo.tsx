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
  image?: string;
}

const SEO: React.FunctionComponent<SEOProps> = ({
  description,
  lang = 'es',
  meta = [],
  keywords = [],
  title,
  image,
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
            social {
              twitter
            }
          }
        }
        file(relativePath: { regex: "/logo/" }) {
          childImageSharp {
            fixed(width: 600, quality: 100) {
              srcWebp
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const twitterImage = `https://73nko.es${
    image || file.childImageSharp.fixed.srcWebp
  }`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title} - Blog de ${site.siteMetadata.author}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.author,
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
          content: `article`,
        },
        {
          property: `og:article:author`,
          content: site.siteMetadata.author,
        },
        {
          name: `og:image`,
          content: twitterImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: `@` + site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:site`,
          content: `@` + site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:domain`,
          content: `73nko.es`,
        },
        {
          name: `twitter:image`,
          content: twitterImage,
        },
        {
          name: `twitter:image:alt`,
          content: title,
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
