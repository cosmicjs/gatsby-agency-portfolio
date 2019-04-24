import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Work = () => (
  <Layout>
    <SEO title="Work" />
    <h1>This is the Work page</h1>
    <Link to="/">
      Go back to the homepage
    </Link>
  </Layout>
)

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "work") {
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
