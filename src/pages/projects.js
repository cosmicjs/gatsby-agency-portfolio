import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Modal } from 'rsuite'

import ProjectDisplay from '../components/projectDisplay.js'
import Layout from "../components/layout"
import SEO from "../components/seo"

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedProject: {},
      modalOpen: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    const tempState = state
    const list = props.data.page.object.metadata.list
    let projectName
    if (typeof window !== "undefined") {
      projectName = decodeURI(window.location.search).substring(1)
    }
    for (const i in list) {
      if (list[i].name === projectName) {
        tempState.selectedProject = list[i]
        tempState.modalOpen = true
      }
    }
    return tempState
  }

  render() {
    const pageData = this.props.data
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    const styles = {
      header: {
        padding: '0',
      },
      gallery: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
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
        contact={pageData.layout.object.metadata.contact}
        connect={pageData.layout.object.metadata.connect}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Projects" />
        <section className="page-container">
          <header className="page-header projects" style={styles.header}>
            <div className="header-filter">
              <h3>Check Out Our Work</h3>
              <p className="page-header-description">{pageData.page.object.metadata.summary}</p>
            </div>
          </header>
          <div className="project-gallery">
            {pageData.page.object.metadata.list.map(project => {
              return (
                <ProjectDisplay
                  key={project.name}
                  title={project.name}
                  description={project.summary}
                  image={project.image}
                  size="tall"
                />
              )
            })}
          </div>
          <Modal style={{ top: '50px' }} show={this.state.modalOpen} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>{this.state.selectedProject.name}</Modal.Title>
              <p>{this.state.selectedProject.date}</p>
            </Modal.Header>
            {this.state.selectedProject.name
              ? <Modal.Body>
                {this.state.selectedProject.description}
                <div className="modal-gallery" style={styles.gallery}>
                  {this.state.selectedProject.gallery.map(imageUrl => (
                    <img
                      key={imageUrl}
                      alt={this.state.selectedProject.name}
                      src={imageUrl}
                    />
                  ))}
                </div>
              </Modal.Body>
              : null
            }
          </Modal>
        </section>
      </Layout>
    )
  }

  handleClose() {
    if (typeof window !== 'undefined') {
      window.location.href = window.location.protocol + window.location.pathname
    }
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
  data: PropTypes.object.isRequired,
}

export default Projects