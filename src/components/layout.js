/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Container } from 'rsuite'
import Header from "./header"
import "./layout.scss"

const layoutStyle = {
  main: {
    minheight: 'calc(100vh - 185px)',
  },
  footer: {
    width: "100%",
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

const Layout = ({ children, siteTitle, siteLogo, headerBreakpoint }) => {
  return (
    <Container>
      <Header siteTitle={siteTitle} logo={siteLogo} breakpoint={headerBreakpoint} />
      <main style={layoutStyle.main}>{children}</main>
      <footer style={layoutStyle.footer}>
        <span>
          © {new Date().getFullYear()}, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
        <a href="https://cosmicjs.com/add-bucket?import_bucket=5cbf745a10d5c22da1f9b3e2"><img src="https://s3-us-west-2.amazonaws.com/cosmicjs/51fe54d0-4f6e-11e9-9f32-8d001da69630-powered-by-cosmicjs.svg" /></a>
      </footer>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string.isRequired,
  siteLogo: PropTypes.object.isRequired,
  headerBreakpoint: PropTypes.number,
}

export default Layout
