import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import FuzzyText from "../components/FuzzyText"
import "../components/FuzzyText.css"

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="fuzzy-text-container">
          <h1 className="fuzzy-404">
            <FuzzyText text="404" delay={500} />
          </h1>
          <p className="fuzzy-message">
            <FuzzyText text="Page not found" delay={1500} />
          </p>
          <p className="fuzzy-message">
            <FuzzyText text="Sorry 😔, we couldn't find what you were looking for." delay={2500} />
          </p>
          <Link to="/" className="fuzzy-link">
            <FuzzyText text="Go home" delay={3500} />
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>