import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Animation, Icon, Input, Button, Message } from 'rsuite'
const { Fade, Collapse } = Animation

import 'rsuite/dist/styles/rsuite.min.css'
import Layout from "../components/layout"
import SEO from "../components/seo"

// Home Page
class IndexPage extends React.Component {
  constructor() {
    super()
    this.state = {
      showWork: false,
      showPeople: false,
      showContact: false,
      userName: '',
      userEmail: '',
      userMessage: '',
      messageSubject: '',
      messageError: false,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleContactForm = this.handleContactForm.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentDidUpdate() {
    if (this.state.messageError) {
      window.setTimeout(() => this.setState({ messageError: false }), 3000)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { data } = this.props
    const styles = {
      splash: {
        background: `#000000`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      splashPhrase: {
        width: '70%',
        paddingLeft: '20%',
        color: '#ffffff',
      },
      work: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        transition: '0.4s ease-in-out'
      },
      contactForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      service: {
        height: '250px',
        width: '200px',
        margin: '50px',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      project: {
        margin: '50px',
        minWidth: '400px',
        minHeight: '400px',
      }
    }
    if (data.page.object.metadata.splash_image) {
      styles.splash.background = `url(${data.page.object.metadata.splash_image.url})`
      styles.splash.backgroundSize = `cover`
      styles.splash.backgroundRepeat = 'no-repeat'
      styles.splash.backgroundPosition = 'center'
    }

    return (
      <Layout>
        <SEO title="Home" keywords={[`cosmic js`, `application`, `react`]} />
        <section style={styles.splash} className="section-container splash">
          {data.page.object.metadata.splash_phrase
            ? <div className="splash-phrase" style={styles.splashPhrase}>
              <h2 style={{ fontSize: '2.5rem' }}>{data.page.object.metadata.splash_phrase}</h2>
            </div>
            : null
          }
        </section>
        <section style={styles.work} className="section-container content work">
          <Fade in={this.state.showWork}>
            <div className="section-wrapper">
              <h2 className="section-title">What We Do</h2>
              <div className="wrapper-content services">
                {data.page.object.metadata.services.map(service => (
                  <Link to="/work" key={service.name} style={styles.service}>
                    <Icon icon={service.icon} />
                    <h5>{service.name}</h5>
                    <p>{service.description}</p>
                  </Link>
                ))}
              </div>
              <div className="wrapper-content projects">
                {data.page.object.metadata.showcase.map(project => {
                  let style = styles.project
                  style.background = `url(${project.image})`
                  style.backgroundSize = 'cover'
                  style.backgroundPosition = 'center'
                  return (
                    <Link to="/projects" key={project.title} style={style}>
                      <h5>{project.title}</h5>
                      <p>{project.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Fade>
        </section>
        <section className="section-container content people">
          <Fade in={this.state.showPeople}>
            <div className="section-wrapper">
              <h2 className="section-title">Who We Are</h2>
              <div className="wrapper-content people">
                <p className="people-description">{data.page.object.metadata.description}</p>
                {data.page.object.metadata.people.map(person => {
                  return (
                    <Link key={person.name} to="/about">
                      <h5>{person.name}</h5>
                      <h6>{person.title}</h6>
                      <img alt={person.name} src={person.imageUrl} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </Fade>
        </section>
        <section name="contact" className="section-container content bottom contact" >
          <Fade in={this.state.showContact}>
            <div className="contact-container">
              <div className="imageFilter" />
              <h2 className="section-title">Contact Us</h2>
              <form style={styles.contactForm} onSubmit={this.handleContactForm}>
                <Collapse in={this.state.messageError}>
                  <Message type="error" title="Error" description="Please Provide a valid input to all fields" />
                </Collapse>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                  <Input name="userName" value={this.state.userName} onChange={this.handleInput} placeholder="Name" />
                  <Input name="userEmail" value={this.state.userEmail} onChange={this.handleInput} placeholder="Email" />
                </div>
                <Input name="messageSubject" value={this.state.messageSubject} onChange={this.handleInput} placeholder="Subject" />
                <Input
                  componentClass="textarea"
                  name="userMessage"
                  value={this.state.userMessage}
                  onChange={this.handleInput}
                  rows={5}
                  placeholder="Message..."
                />
                <Button type="submit" appearance="ghost">
                  Send Mail
                </Button>
              </form>
            </div>
          </Fade>
        </section>
      </Layout>
    )
  }

  handleScroll() {
    if (window.scrollY >= (window.innerHeight / 2) + 150) {
      this.setState({ showWork: true })
    } else {
      this.setState({ showWork: false })
    }
    if (window.scrollY >= (window.innerHeight / 2.5) + (window.innerHeight + 200)) {
      this.setState({ showPeople: true, showWork: false })
    } else {
      this.setState({ showPeople: false })
    }
    if (window.scrollY >= (window.innerHeight / 2.5) + (2 * window.innerHeight + 100)) {
      this.setState({ showContact: true, showPeople: false })
    } else {
      this.setState({ showContact: false })
    }
  }

  handleContactForm(e) {
    e.preventDefault()
    if (!this.state.userName || !this.state.userEmail || !this.state.messageSubject || !this.state.userMessage) {
      this.setState({ messageError: true })
    } else {
      window.location.href = `
        mailto:${this.props.data.page.object.metadata.contact_email}
        ?subject=${this.state.messageSubject}
        &body=Name :: ${this.state.userName}%0D%0AEmail :: ${this.state.userEmail}%0D%0ASent From :: ${window.location.href},%0D%0A%0D%0A${this.state.userMessage}`
    }
  }

  handleInput(value, e) {
    const { name } = e.target
    this.setState({ [name]: value })
  }
}

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
