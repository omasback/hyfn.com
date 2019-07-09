import React from 'react'
import * as Sentry from '@sentry/browser'

interface IProps {}

class ErrorBoundary extends React.Component<
  IProps,
  {
    eventId?: string
    hasError: boolean
  }
> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  constructor(props: IProps) {
    super(props)
    this.state = { eventId: undefined, hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return (
        <button
          onClick={() =>
            Sentry.showReportDialog({ eventId: this.state.eventId })
          }
        >
          Report feedback
        </button>
      )
    }

    // when there's not an error, render children untouched
    return this.props.children
  }
}

export default ErrorBoundary
