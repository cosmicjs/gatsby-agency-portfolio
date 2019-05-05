import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  render() {
    const pageData = this.props.data
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    // const styles = {}

    return (
      <Layout
        siteTitle={pageData.layout.object.metadata.site_title}
        siteLogo={pageData.layout.object.metadata.site_logo}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="About" />
        <section className="page-container about">
          <header className="page-header about">
            <div className="header-filter">
              <h3>Who We Are</h3>
              {pageData.page.object.metadata.description
                ? <p className="page-header-description">{pageData.page.object.metadata.description}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container about">
            Test
          </section>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query($cosmicBucket: String!, $readKey: String!) {
    page {
      object(bucket_slug: $cosmicBucket, read_key: $readKey, slug: "about") {
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

About.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}

export default About