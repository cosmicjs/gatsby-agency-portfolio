import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Navbar, Nav } from "rsuite"
import React from "react"

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      scrollTop: true
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
        background: 'none',
        marginBottom: `1.45rem`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        transition: '0.75s ease-in-out'
      },
      navheader: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      },
      link: {
        color: `#2C2B3B`,
        textDecoration: `none`,
      }
    }
    if (!this.state.scrollTop) {
      styles.container.background = `#000000`
      styles.container.color = `#ffffff`
    }

    const { siteTitle } = this.props
    return (
      <Navbar style={styles.container}>
        <Navbar.Header style={styles.navheader}>
          <h5>GAP</h5>
          <h1>
            <Link to="/" style={styles.link}>
              {siteTitle}
            </Link>
          </h1>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item componentClass={Link} to="/work">
              Work
            </Nav.Item>
            <Nav.Item componentClass={Link} to="/projects">
              Projects
            </Nav.Item>
            <Nav.Item componentClass={Link} to="/about">
              About
            </Nav.Item>
            <Nav.Item componentClass={Link} to="/#contact">
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
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
