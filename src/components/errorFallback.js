
const ErrorFallback = ({error, resetErrorBoundary}) => {
    return (
      <div role="alert">
        <p>Oops! Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className='btn-loc' onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
}

export default ErrorFallback