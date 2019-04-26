import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Animation, Input, Button, Message } from 'rsuite'
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
        <section style={styles.work} className="section-container work">
          <Fade in={this.state.showProjects}>
            <h2 className="section-title">What We Do</h2>
          </Fade>
        </section>
        <section className="section-container people">
          <Fade in={this.state.showPeople}>
            <div>
              <h2 className="section-title">Who We Are</h2>
            </div>
          </Fade>
        </section>
        <section name="contact" className="section-container bottom contact">
          <Fade in={this.state.showContact}>
            <div className="contact-container">
              <div className="imageFilter" />
              <h2 className="section-title">Contact Us</h2>
              <form onSubmit={this.handleContactForm}>
                <Collapse in={this.state.messageError}>
                  <Message type="error" title="Error" description="Please Provide a valid input to all fields" />
                </Collapse>
                <div>
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
    if (window.scrollY >= window.innerHeight / 3) {
      this.setState({ showProjects: true })
    } else {
      this.setState({ showProjects: false })
    }
    if (window.scrollY >= (window.innerHeight / 3) + window.innerHeight) {
      this.setState({ showPeople: true })
    } else {
      this.setState({ showPeople: false })
    }
    if (window.scrollY >= (window.innerHeight / 3) + (2 * window.innerHeight)) {
      this.setState({ showContact: true })
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
