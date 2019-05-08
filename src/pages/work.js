import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import { Icon, Popover, Whisper } from 'rsuite'
import Layout from "../components/layout"
import SEO from "../components/seo"

const Speaker = ({ title, content }) => (
  <Popover title={title}>
    <p>{content}</p>
  </Popover>
)

class Work extends React.Component {

  render() {
    const pageData = this.props.data
    const services = pageData.page.object.metadata.services
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    const styles = {
      pageHeader: {
        padding: '0',
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: '2.5rem',
        padding: '20px',
        borderBottom: 'thin solid black',
      },
      serviceList: {
        width: '80vw',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      clientList: {
        width: '70%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      clientItem: {
        width: '150px',
        height: '150px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black'
      },
      clientImage: {
        width: '75%',
        margin: '10px auto',
      },
      serviceContainer: {
        height: '200px',
        width: "25%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      serviceDetails: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      summary: {
        width: '20%',
        maxWidth: '300px',
        paddingRight: '50px',
        margin: '0 20px',
        textAlign: 'right',
        fontSize: '1.5rem',
        borderRight: 'thin solid black'
      },
      description: {
        width: '40%',
        marginRight: '30px',
        fontSize: '1.0rem'
      },
      detailsName: {
        fontSize: '1.3rem',
      },
      detailsDesc: {
        fontSize: '0.9rem',
      },
    }
    if (pageData.page.object.metadata.splash_image) {
      styles.pageHeader.background = `url(${pageData.page.object.metadata.splash_image.url})`
      styles.pageHeader.backgroundSize = 'cover'
      styles.pageHeader.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={pageData.layout.object.metadata.site_title}
        siteLogo={pageData.layout.object.metadata.site_logo}
        connect={pageData.layout.object.metadata.connect}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Work" />
        <section className="page-container work">
          <header className="page-header work" style={styles.pageHeader}>
            <div className="header-filter">
              <h3>What We Do</h3>
              {pageData.page.object.metadata.description
                ? <p className="page-header-description">{pageData.page.object.metadata.description}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container short row">
            <h4 className="intro-summary" style={styles.summary}>{pageData.page.object.metadata.intro_summary}</h4>
            <p className="intro-description" style={styles.description}>{pageData.page.object.metadata.intro_description}</p>
          </section>
          <section className="section-container services medium" style={styles.serviceList}>
            {services.map(service => (
              <Whisper
                key={service.name}
                trigger="click"
                placement="top"
                speaker={<Speaker title={service.name} content={service.description} />}
              >
                <div
                  className="service-container"
                  style={styles.serviceContainer}
                >
                  <div style={styles.serviceDetails}>
                    {service.icon ? <Icon icon={service.icon} size="3x" /> : null}
                    <h5 style={styles.detailsName}>{service.name}</h5>
                    <p style={styles.detailsDesc}>{service.summary}</p>
                  </div>
                </div>
              </Whisper>
            ))}
          </section>
          <section className="section-container medium">
            <div style={styles.header}>
              <h2 style={styles.headerText}>Our Clients</h2>
            </div>
            <div style={styles.clientList}>
              {pageData.page.object.metadata.clients.map(client => (
                <a key={client.name} style={styles.clientItem} href={`https://${client.url}`}>
                  <p>{client.name}</p>
                  <img src={client.image} alt={client.name} style={styles.clientImage} />
                </a>
              ))}
            </div>
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
Speaker.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}

Work.propTypes = {
  data: PropTypes.object,
}

export default Work
