import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Error:</h2>
              <pre className="bg-gray-900 p-4 rounded overflow-x-auto mb-4">
                {this.state.error && this.state.error.toString()}
              </pre>
              <h2 className="text-xl font-semibold mb-2">Stack Trace:</h2>
              <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
