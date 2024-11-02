import * as dotenv from "dotenv";

dotenv.config();

export const registerNewUser = async (formData: any) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
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