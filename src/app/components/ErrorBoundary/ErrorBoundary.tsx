import React, { Component, ErrorInfo, ReactNode } from 'react';

type ErrorState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<{}, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) return <p>Whoops. There was an error.</p>;
    else return this.props.children;
  }
}

export default ErrorBoundary;
