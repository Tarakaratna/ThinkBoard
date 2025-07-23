const RateLimitUI = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-red-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Rate Limit Exceeded</h2>
        <p className="text-gray-700 mb-4">
          You have made too many requests in a short period of time.
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Please wait a moment before trying again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default RateLimitUI;
