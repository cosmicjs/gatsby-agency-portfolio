import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Progress } from 'rsuite'
const { Line } = Progress

import Layout from "../components/layout"
import SEO from "../components/seo"

class About extends React.Component {
  render() {
    const pageData = this.props.data
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
        maxWidth: '25%',
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
        <SEO title="About" />
        <section className="page-container about">
          <header className="page-header about" style={styles.pageHeader}>
            <div className="header-filter">
              <h3>Who We Are</h3>
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
          <section className="section-container short" style={styles.skills}>
            {pageData.page.object.metadata.skills.map(skill => (
              <div key={skill.name}>
                <div style={styles.skillDetails}>
                  <h4 style={styles.skillName}>{skill.name}</h4>
                  <p style={styles.skillDescription}>{skill.description}</p>
                </div>
                <Line
                  percent={skill.progress}
                  showInfo={false}
                  strokeColor="black"
                />
              </div>
            ))}
          </section>
          <section className="section-container content medium">
            <div className="wrapper-content people">
              {pageData.page.object.metadata.people.map(person => (
                <div key={person.name} style={styles.person}>
                  <img alt={person.name} src={person.imageUrl} />
                  <h5 style={styles.personName}>{person.name}</h5>
                  <h6 style={styles.personTitle}>{person.title}</h6>
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