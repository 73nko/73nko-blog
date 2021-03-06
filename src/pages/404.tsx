import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface NotFoundProps {
  data: any;
  location: Location;
}

const NotFoundPage: React.FunctionComponent<NotFoundProps> = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <h1>Página no encontrada</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
