export const getTitles = async (user: any) => {
  const queryParams = new URLSearchParams(user as Record<string, string>).toString()
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:8000/api/v1/title`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `${token}`
      }
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTitle = async (formData: any) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:8000/api/v1/title`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    console.log(finalData)

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};