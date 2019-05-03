import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import { Icon } from 'rsuite'
import Layout from "../components/layout"
import SEO from "../components/seo"

class Work extends React.Component {

  render() {
    const pageData = this.props.data
    const styles = {
      header: {
        padding: '0',
      },
      serviceContainer: {
        height: '50vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      serviceDetails: {
        width: '50%',
      },
      headerFilter: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
    if (pageData.page.object.metadata.splash_image) {
      styles.header.background = `url(${pageData.page.object.metadata.splash_image.url})`
    }
    return (
      <Layout
        siteTitle={pageData.layout.object.metadata.site_title}
        siteLogo={pageData.layout.object.metadata.site_logo}
        headerBreakpoint={window.innerHeight / 3}
      >
        <SEO title="Work" />
        <section className="page-container work">
          <header className="page-header work" style={styles.header}>
            <div style={styles.headerFilter}>
              <h3>What we do</h3>
              {pageData.page.object.metadata.description
                ? <p className="page-header-description">{pageData.page.object.metadata.description}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container work">
            {pageData.page.object.metadata.services.map(service => (
              <div
                className="service-container"
                style={styles.serviceContainer}
                key={service.name}
              >
                <div style={styles.serviceDetails}>
                  {service.icon ? <Icon icon={service.icon} /> : null}
                  <h5>{service.name}</h5>
                  <p>{service.description}</p>
                </div>
                {service.imageUrl ? <img src={service.imageUrl} /> : null}
              </div>
            ))}
          </section>
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
