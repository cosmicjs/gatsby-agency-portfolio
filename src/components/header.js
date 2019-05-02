import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Navbar, Nav } from "rsuite"
import React from "react"

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      scrollTop: true,
      activeKey: window.location.pathname,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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
        color: `#2C2B3B`,
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
              eventKey={'work'}
              onSelect={this.handleSelect}
              componentClass={Link}
              to="/work"
            >
              Work
            </Nav.Item>
            <Nav.Item
              eventKey={'projects'}
              onSelect={this.handleSelect}
              componentClass={Link}
              to="/projects"
            >
              Projects
            </Nav.Item>
            <Nav.Item
              eventKey={'about'}
              onSelect={this.handleSelect}
              componentClass={Link}
              to="/about"
            >
              About
            </Nav.Item>
            <Nav.Item
              eventKey={'contact'}
              onSelect={this.handleSelect}
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
    if (window.scrollY > window.innerHeight - 125) {
      this.setState({
        scrollTop: false,
      })
    } else {
      this.setState({
        scrollTop: true,
      })
    }
  }

  handleSelect(activeKey) {
    this.setState({ activeKey: activeKey })
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  logo: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
