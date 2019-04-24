require('dotenv').config();
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const pageContext = {
    readKey: `${process.env.COSMIC_READ_KEY}`,
    cosmicBucket: `${process.env.COSMIC_BUCKET_SLUG}`,
  }
  if (process.env.NODE_ENV === 'production') {
    pageContext.buildhookUrl = `${process.env.BUILDHOOK_ENDPOINT}`
  }
  deletePage(page)
  createPage({
    ...page,
    context: pageContext,
  })
}

// You can delete this file if you're not using it
