
const ErrorFallback = ({error}) => {
    return (
      <div role="alert">
        <p>Oops! Something went wrong:</p>
        <pre>{error.message}</pre>
      </div>
    )
}

export default ErrorFallback