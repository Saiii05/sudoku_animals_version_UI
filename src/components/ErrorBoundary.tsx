// src/components/ErrorBoundary.tsx
import React from 'react'

type Props = { children: React.ReactNode }
type State = { error: any; info?: any }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }

  componentDidCatch(error: any, info: any) {
    // Log to console (and to remote logging if desired)
    console.error('ErrorBoundary caught error:', error, info)
    this.setState({ info })
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: 'system-ui, Arial', lineHeight: 1.4 }}>
          <h2 style={{ color: '#b91c1c' }}>Application error</h2>
          <p>There was an error rendering the application. The error details are below.</p>
          <pre style={{ background: '#111', color: '#fff', padding: 12, borderRadius: 6, overflowX: 'auto' }}>
            {String(this.state.error)}
            {this.state.info ? '\n\n' + JSON.stringify(this.state.info, null, 2) : ''}
          </pre>
          <p style={{ marginTop: 12 }}>
            Try refreshing the page. If the problem persists, copy the error text and share it with the developer.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}