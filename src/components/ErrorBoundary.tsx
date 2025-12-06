import React from 'react'

type Props = { children: React.ReactNode }
type State = { error: any }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: any) {
    return { error }
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: 'white', background: '#b91c1c' }}>
          <h2>App crashed during render</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
