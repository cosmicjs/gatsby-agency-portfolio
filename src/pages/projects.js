import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = ({ data }) => (
  <Layout>
    {console.log(data)}
    <SEO title="Projects" />
    <h1>This is the Projects page</h1>
    <Link to="/">
      Go back to the homepage
    </Link>
  </Layout>
)

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "projects") {
        title
        metadata
      }
    }
  }
`

Projects.propTypes = {
  data: PropTypes.object,
}

export default Projects