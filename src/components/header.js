import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Navbar, Nav } from "rsuite"
import React from "react"

const headerStyles = {
  container: {
    background: `#F5F5F7`,
    marginBottom: `1.45rem`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

const Header = ({ siteTitle }) => (
  <Navbar style={headerStyles.container}>
    <Navbar.Header style={headerStyles.navheader}>
      <h5>GAP</h5>
      <h1>
        <Link to="/" style={headerStyles.link}>
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
      </Nav>
    </Navbar.Body>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
