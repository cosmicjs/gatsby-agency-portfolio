import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Navbar, Nav } from "rsuite"

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      scrollTop: true,
      activeKey: '',
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        this.setState({ activeKey: window.location.hash })
      } else {
        this.setState({ activeKey: window.location.pathname })
      }
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  render() {
    const styles = {
      container: {
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        background: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: '0.75s ease-in-out'
      },
      navheader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      },
      link: {
        color: `#728f99`,
        textShadow: '0px 0px 1px #ffffff',
        margin: '0 0 0 30px',
        textDecoration: `none`,
      },
      logo: {
        width: '50px',
        padding: '10px',
        margin: '0',
      }
    }
    if (!this.state.scrollTop) {
      styles.container.background = `#000000`
      styles.container.color = `#ffffff`
      styles.link.color = `#ffffff`
      styles.link.textShadow = 'none'
    }

    const { siteTitle, logo } = this.props
    return (
      <Navbar style={styles.container}>
        <Navbar.Header style={styles.navheader}>
          {logo ? <img src={logo.url} style={styles.logo} /> : <h5>GAP</h5>}
          <h1>
            <Link to="/" style={styles.link}>
              {siteTitle}
            </Link>
          </h1>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item
              className={this.state.activeKey.includes('work') ? 'active' : ''}
              componentClass={Link}
              to="/work"
            >
              Work
            </Nav.Item>
            <Nav.Item
              className={this.state.activeKey.includes('projects') ? 'active' : ''}
              componentClass={Link}
              to="/projects"
            >
              Projects
            </Nav.Item>
            <Nav.Item
              className={this.state.activeKey.includes('about') ? 'active' : ''}
              componentClass={Link}
              to="/about"
            >
              About
            </Nav.Item>
            <Nav.Item
              className={this.state.activeKey.includes('contact') ? 'active' : ''}
              componentClass={Link}
              to="/#contact"
            >
              Contact
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    )
  }

  handleScroll() {
    let breakpoint = window.innerHeight / 2
    if (this.props.breakpoint) {
      breakpoint = this.props.breakpoint
    }
    if (window.scrollY > breakpoint) {
      this.setState({
        scrollTop: false,
      })
    } else {
      this.setState({
        scrollTop: true,
      })
    }
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  logo: PropTypes.object,
  breakpoint: PropTypes.number,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
