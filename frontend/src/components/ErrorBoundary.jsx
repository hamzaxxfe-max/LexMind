import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-cream-500 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-red-200 text-center max-w-md">
            <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4 text-sm">{this.state.error.message}</p>
            <button
              onClick={() => { this.setState({ error: null }); window.location.href = "/"; }}
              className="bg-jungle-500 text-cream-500 px-6 py-2 rounded-lg font-medium hover:bg-jungle-600 transition"
            >
              Go home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
