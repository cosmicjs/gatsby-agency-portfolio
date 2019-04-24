import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Button } from 'rsuite'

import 'rsuite/dist/styles/rsuite.min.css'
import Layout from "../components/layout"
import SEO from "../components/seo"

// Home Page
const IndexPage = ({ data, pageContext }) => (
  <Layout>
    {console.log(data, pageContext)}
    <SEO title="Home" keywords={[`cosmic js`, `application`, `react`]} />
    <div className="carousel-container">
      Carousel Goes Here
    </div>
    <div className="description-container">

    </div>
    <div className="menu-container">

    </div>
    <Link to="/work/">
      <Button>Go to page 2</Button>
    </Link>
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "home") {
        title
        metadata
      }
    }
  }
`

export default IndexPage
