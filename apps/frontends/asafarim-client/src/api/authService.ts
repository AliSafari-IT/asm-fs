import API_URL from "./getApiUrls";

const login = async (usernameOrEmail: string, password: string) => {
  console.debug('API_URL in authService: ' + API_URL);
  try {
    const response = await fetch(`${API_URL}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (!response.ok) {
      let errorMessage = 'Login failed';
      try {
        // Attempt to extract the error message from JSON response
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = `Login failed: ${errorData.message}`;
        }
      } catch (err) {
        // Handle parsing error
        console.error('Error parsing JSON response:', err);
        errorMessage = 'Login failed: ' + response.statusText + ' (' + response.status + '). Please try again.';
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export default { login };
