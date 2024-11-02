// import * as dotenv from "dotenv";

// dotenv.config();

const apiUrl = process.env.API_BASE_URL;

console.log("API_BASE_URL:", apiUrl)
export const registerNewUser = async (formData: any) => {
  // console.log("API_BASE_URL_2:", apiUrl)
  try {
    const response = await fetch(`http://localhost:8000/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};