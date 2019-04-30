import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Work extends React.Component {

  render() {
    const pageData = this.props.data
    return (
      <Layout siteTitle={pageData.layout.object.metadata.site_title} siteLogo={pageData.layout.object.metadata.site_logo}>
        <SEO title="Work" />
        <section className="section-container">
          <h1>This is the Work page</h1>
          <Link to="/">
            Go back to the homepage
          </Link>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "work") {
        title
        metadata
      }
    }
    layout {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "layout") {
        title
        metadata
      }
    }
  }
`

Work.propTypes = {
  data: PropTypes.object,
}

export default Work
