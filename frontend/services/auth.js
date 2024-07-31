const API_URL = ""; /////// put here our api

/**
 * Login function
 * @returns {Promise<boolean>}
 */
export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      return true;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Logout function
 */
export function logout() {
  localStorage.removeItem("authToken");
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return localStorage.getItem("authToken") !== null;
}

/**
 * Get the current authentication token
 * @returns {string|null}
 */
export function getAuthToken() {
  return localStorage.getItem("authToken");
}

/**
 * Register function (optional, if your application supports user registration)
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<boolean>}
 */
export async function register(username, password, email) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      return true;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
