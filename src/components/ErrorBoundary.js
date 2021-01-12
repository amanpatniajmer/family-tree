import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /* componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console
  } */

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div style={{padding:"10px"}}>
        <h1>Something went wrong.</h1>
        <br/>
        <h2 style={{textAlign:"left"}}>Possible Solutions:</h2>
        <ul>
          <li>
            Login again.
          </li>
          <li>
            Provide valid parameters(URL and user inputs).
          </li>
          <li>
            Check Internet connectivity.
          </li>
        </ul>
        <br/>
        <br/>
        <h5>Contact <code>amanpatniajmer@gmail.com</code>, if problem persists.</h5>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary