// @ts-nocheck
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import * as React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.error({ error })
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <Link href={ROUTES.HOME}>
            <p>Click here to go back to main page</p>
          </Link>
        </div>
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
