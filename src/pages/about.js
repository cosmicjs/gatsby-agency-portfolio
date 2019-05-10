import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Progress } from 'rsuite'
const { Line } = Progress

import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const peopleData = this.props.data.allCosmicjsPeople.edges
    const skillData = this.props.data.allCosmicjsSkills.edges
    const siteData = this.props.data.cosmicjsSettings.metadata
    const contactData = this.props.data.cosmicjsContacts.metadata
    const connectData = this.props.data.allCosmicjsConnects.edges
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    const styles = {
      pageHeader: {
        padding: '0',
      },
      summary: {
        width: '25%',
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
      skills: {
        maxWidth: '1000px',
        padding: '0 15px',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      skillDetails: {
        width: '90%',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      skillName: {
        width: '200px',
        marginRight: '50px',
        borderRight: 'thin solid black',
      },
      skillDescription: {
        maxWidth: '300px',
      },
      person: {
        width: '25%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none'
      },
      personName: {
        marginTop: '0',
        color: 'black',
        fontSize: '1rem'
      },
      personTitle: {
        color: 'grey',
        fontSize: '0.8rem',
      }
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
        contact={contactData}
        connect={connectData}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="About" />
        <section className="page-container about">
          <header className="page-header about" style={styles.pageHeader}>
            <div className="header-filter">
              <h3>Who We Are</h3>
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
          <section className="section-container short" style={styles.skills}>
            {skillData.map(skill => (
              <div key={skill.node.title}>
                <div style={styles.skillDetails}>
                  <h4 style={styles.skillName}>{skill.node.title}</h4>
                  <p style={styles.skillDescription}>{skill.node.metadata.description}</p>
                </div>
                <Line
                  percent={skill.node.metadata.progress}
                  showInfo={false}
                  strokeColor="black"
                />
              </div>
            ))}
          </section>
          <section className="section-container content medium">
            <div className="wrapper-content people">
              {peopleData.map(person => (
                <div key={person.node.title} style={styles.person}>
                  <div
                    style={{
                      background: `url(${person.node.metadata.image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      marginBottom: '14px',
                      width: '100%',
                      height: '200px',
                    }}
                  />
                  <h5 style={styles.personName}>{person.node.title}</h5>
                  <h6 style={styles.personTitle}>{person.node.metadata.job_title}</h6>
                </div>
              ))}
            </div>
          </section>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query About {
    cosmicjsPages(slug: { eq: "about" }) {
      metadata {
        splash_image {
          url
        }
        splash_phrase
        intro_description
        intro_summary
      }
    }
    allCosmicjsPeople {
      edges {
        node {
          title
          metadata {
            image {
              url
            }
            job_title
          }
        }
      }
    }
    allCosmicjsConnects {
      edges {
        node {
          title
          metadata {
            url
          }
        }
      }
    }
    allCosmicjsSkills {
      edges {
        node {
          title
          metadata {
            progress
            description
          }
        }
      }
    }
    cosmicjsContacts(slug: {eq: "company-footer"}) {
      metadata {
        address1
        address2
        postal_code
        city
        region
        country_code
        email
        phone_number
      }
    }
    cosmicjsSettings(slug: { eq: "site-data" }) {
      metadata {
        site_title
        site_logo {
          url
        }
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object.isRequired,
}

export default About