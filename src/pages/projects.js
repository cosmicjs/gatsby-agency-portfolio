import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Projects extends React.Component {

  render() {
    const pageData = this.props.data
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    return (
      <Layout
        siteTitle={pageData.layout.object.metadata.site_title}
        siteLogo={pageData.layout.object.metadata.site_logo}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Projects" />
        <section className="page-container">
          <header className="page-header projects">
            <h3>Browse our work</h3>
          </header>
          <div className="project-gallery">
            <p>test</p>
          </div>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "projects") {
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

Projects.propTypes = {
  data: PropTypes.object,
}

export default Projects