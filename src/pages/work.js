import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import { Icon, IconButton } from 'rsuite'
import Layout from "../components/layout"
import SEO from "../components/seo"

class Work extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: null
    }
    this.handleServiceClick = this.handleServiceClick.bind(this)
  }

  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const serviceData = this.props.data.allCosmicjsServices.edges
    const siteData = this.props.data.cosmicjsSettings.metadata
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
      serviceContainer: (i) => {
        if (this.state.activeIndex === i) {
          return {
            height: 'auto',
            width: "25%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 2px gray',
          }
        } else {
          return {
            height: '200px',
            width: "25%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
          }
        }
      },
      serviceExtra: {
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    if (pageData.splash_image) {
      styles.pageHeader.background = `url(${pageData.splash_image.url})`
      styles.pageHeader.backgroundSize = 'cover'
      styles.pageHeader.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={siteData.site_title}
        siteLogo={siteData.site_logo}
        connect={siteData.connect}
        contact={siteData.contact}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Work" />
        <section className="page-container work">
          <header className="page-header work" style={styles.pageHeader}>
            <div className="header-filter">
              <h3>What We Do</h3>
              {pageData.splash_phrase
                ? <p className="page-header-description">{pageData.splash_phrase}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container short row">
            <h4 className="intro-summary" style={styles.summary}>{pageData.intro_summary}</h4>
            <p className="intro-description" style={styles.description}>{pageData.intro_description}</p>
          </section>
          <section className="section-container services medium" style={styles.serviceList}>
            {serviceData.map(service => (
              <div
                key={service.node.title}
                className="service-container"
                style={styles.serviceContainer(serviceData.indexOf(service))}
              >
                <div style={styles.serviceDetails}>
                  {service.node.metadata.icon ? <Icon icon={service.node.metadata.icon} size="3x" onClick={() => this.handleServiceClick(serviceData.indexOf(service))} /> : null}
                  <h5 style={styles.detailsName} onClick={() => this.handleServiceClick(serviceData.indexOf(service))}>{service.node.title}</h5>
                  <p style={styles.detailsDesc} onClick={() => this.handleServiceClick(serviceData.indexOf(service))}>{service.node.metadata.summary}</p>
                  {this.state.activeIndex === serviceData.indexOf(service)
                    ? <div style={styles.serviceExtra}>
                      <p style={styles.detailsDesc}>{service.node.metadata.description}</p>
                      <IconButton
                        circle
                        icon={<Icon icon="angle-up" />}
                        onClick={() => this.handleServiceClick(null)}
                      />
                    </div>
                    : null
                  }
                </div>
              </div>
            ))}
          </section>
          <section className="section-container medium">
            <div style={styles.header}>
              <h2 style={styles.headerText}>Our Clients</h2>
            </div>
            <div style={styles.clientList}>
              {pageData.clients.map(client => (
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

  handleServiceClick(index) {
    this.setState({ activeIndex: index })
  }
}

export const query = graphql`
query Work {
    cosmicjsPages(slug: { eq: "work" }) {
      metadata {
        splash_image {
          url
        }
        splash_phrase
        intro_summary
        intro_description
        clients {
          name
          url
          image
        }
      }
    }
    allCosmicjsServices {
      edges {
        node {
          title
          metadata {
            icon
            summary
            description
          }
        }
      }
    }
    cosmicjsSettings(slug: { eq: "site-data" }) {
      metadata {
        site_title
        site_logo {
          url
        }
        contact {
          address1
          address2
          postalCode
          city
          region
          cc
          phone
          email
        }
        connect {
          name
          url
        }
      }
    }
  }
`

Work.propTypes = {
  data: PropTypes.object,
}

export default Work
