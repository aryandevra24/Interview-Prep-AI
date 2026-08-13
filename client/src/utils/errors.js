export const getErrorMessage = (
  error,
  fallback = 'Something went wrong. Please try again.'
) => {
  if (!error) return fallback;

  const data = error.response?.data;

  if (data?.message) return data.message;

  if (error.message === 'Network Error') {
    return 'Unable to reach the server. Check your connection and try again.';
  }

  return fallback;
};

export const parseApiError = async (error, fallback) => {
  const data = error.response?.data;

  if (data instanceof Blob) {
    try {
      const text = await data.text();
      const json = JSON.parse(text);
      if (json.message) return json.message;
    } catch {
      // Fall through to generic handler
    }
  }

  return getErrorMessage(error, fallback);
};
