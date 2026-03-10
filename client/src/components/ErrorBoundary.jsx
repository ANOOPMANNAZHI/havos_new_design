import { Component } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '2rem',
    fontFamily: '"Outfit", sans-serif',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#0A0F1C',
    marginBottom: '0.75rem',
  },
  message: {
    fontSize: '1rem',
    color: '#4A5068',
    marginBottom: '2rem',
    maxWidth: '480px',
    lineHeight: 1.6,
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: '"Outfit", sans-serif',
    color: '#FFFFFF',
    backgroundColor: '#2B5CFF',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  },
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong</h1>
          <p style={styles.message}>
            An unexpected error occurred. Please try again or refresh the page.
          </p>
          {this.state.error && (
            <pre style={{ fontSize: '0.8rem', color: '#DC2626', background: '#FEF2F2', padding: '1rem', borderRadius: '8px', maxWidth: '600px', overflow: 'auto', textAlign: 'left', marginBottom: '1rem' }}>
              {this.state.error.toString()}
              {'\n'}
              {this.state.error.stack}
            </pre>
          )}
          <button
            style={styles.button}
            onClick={this.handleReset}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(43, 92, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
