/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { toast } from "react-toastify";

/**
 * @typedef {Object} UserData
 */
/**
 * @param {UserData} userData - The data of the user to register.
 */
export async function register(userData) {
  try {
    const response = await fetch("/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    if (responseData.status !== 200) {
      toast.error(responseData.message);
    }
    if (responseData.status === 200) {
      localStorage.setItem("user", JSON.stringify(responseData.data));
    }
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

/**
 * @param {UserData} userData - The data of the user to register.
 */
export async function login(userData) {
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = await response.json();
    if (responseData.status === 200) {
      localStorage.setItem("user", JSON.stringify(responseData.data));
    }
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

export async function sendOtp(email) {
  try {
    const queryParams = new URLSearchParams(email).toString(); // Convert object to query string
    const response = await fetch(`/api/user/sendOtp?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

export async function verifyOtp(data) {
  try {
    const queryParams = new URLSearchParams(data).toString(); // Convert object to query string
    const response = await fetch(`/api/user/verifyOtp?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.status !== 200) {
      return toast.error(responseData.message);
    }
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

export async function getAllCategories(data) {
  try {
    const queryParams = new URLSearchParams(data).toString(); // Convert object to query string
    const url = `/api/categories/getCategories?${queryParams}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

/**
 * @param {any} data - The data of the user to register.
 */
export async function addUserCategory(data) {
  try {
    const queryParams = new URLSearchParams(data).toString(); // Convert object to query string
    const url = `/api/userCategories/addUserCategory?${queryParams}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

export async function getUserCategory(data) {
  try {
    const queryParams = new URLSearchParams(data).toString(); // Convert object to query string
    const url = `/api/userCategories/getUserCategory?${queryParams}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}

export async function removeUserCategory(data) {
  try {
    const queryParams = new URLSearchParams(data).toString(); // Convert object to query string
    const url = `/api/userCategories/removeUserCategory?${queryParams}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.json.message);
    }
    const responseData = response.json();
    return responseData;
  } catch (error) {
    return toast.error(error.message || "Internal server error");
  }
}
