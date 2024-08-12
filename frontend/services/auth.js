/**
 * Login function
 * @returns {Promise<boolean>}
 */

export async function login(username, password) {
  try {
    console.log(username, password);
    const response = await fetch(`${API_URL}Users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: username, Password: password }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    // Store relevant user details in localStorage
    if (data.username && data.email) {
      localStorage.setItem("authToken", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem(
        "profileImageLink",
        IMAGE_URL + data.profileImageLink
      );
      localStorage.setItem("coins", data.coins);

      return true;
    } else {
      throw new Error("Login failed: Incomplete data received");
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
  localStorage.removeItem("email");
  localStorage.removeItem("profileImageLink");
  localStorage.removeItem("coins");
  location.reload();
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

export async function register(username, password, email) {
  try {
    const response = await fetch(`${API_URL}Users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        coins: 0,
        profileImageLink: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    console.log(data);

    if (data.username && data.email) {
      localStorage.setItem("authToken", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("profileImageLink", data.profileImageLink);
      localStorage.setItem("coins", data.coins);
      return true;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
