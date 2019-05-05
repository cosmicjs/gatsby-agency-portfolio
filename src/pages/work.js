import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import { Icon } from 'rsuite'
import Layout from "../components/layout"
import SEO from "../components/seo"

class Work extends React.Component {

  render() {
    const pageData = this.props.data
    const services = pageData.page.object.metadata.services
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      detailsName: {
        fontSize: '2rem',
      },
      detailsDesc: {
        fontSize: '1.5rem',
        textAlign: 'center',
      },
    }
    if (pageData.page.object.metadata.splash_image) {
      styles.header.background = `url(${pageData.page.object.metadata.splash_image.url})`
      styles.header.backgroundSize = 'cover'
      styles.header.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={pageData.layout.object.metadata.site_title}
        siteLogo={pageData.layout.object.metadata.site_logo}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Work" />
        <section className="page-container work">
          <header className="page-header work" style={styles.header}>
            <div className="header-filter">
              <h3>What we do</h3>
              {pageData.page.object.metadata.description
                ? <p className="page-header-description">{pageData.page.object.metadata.description}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container work">
            {services.map(service => (
              <div
                className="service-container"
                style={styles.serviceContainer}
                key={service.name}
              >
                {service.imageUrl
                  ? <div>
                    {services.length % (services.indexOf(service) + 1)
                      ? <img src={service.imageUrl} alt="service image" />
                      : null
                    }
                  </div>
                  : null
                }
                <div style={styles.serviceDetails}>
                  {service.icon ? <Icon icon={service.icon} /> : null}
                  <h5 style={styles.detailsName}>{service.name}</h5>
                  <p style={styles.detailsDesc}>{service.summary}</p>
                </div>
                {service.imageUrl
                  ? <div>
                    {!services.length % (services.indexOf(service) + 1)
                      ? <img src={service.imageUrl} alt="service image" />
                      : null
                    }
                  </div>
                  : null
                }
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
