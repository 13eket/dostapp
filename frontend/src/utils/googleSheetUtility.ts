const flattenObject = (obj: any, result: any = {}) => {
  const newResult = { ...result };
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "dinnerPreferences" || key === "surveyAnswers") {
        newResult[key] = JSON.stringify(obj[key]);
      } else {
        newResult[key] = obj[key];
      }
    }
  }
  return newResult;
};
export const publishToGoogleSheet = async (
  data: unknown,
  stateName: string
): Promise<void> => {
  try {
    const flattenedData = flattenObject(data);
    const orderedData: Record<string, unknown> = {
      sheetName: stateName,
      phoneNumber: flattenedData.phoneNumber || "",
      surveyAnswers: flattenedData.surveyAnswers || "",
      dinnerPreferences: flattenedData.dinnerPreferences || "",
      token: flattenedData.token || "",
    };

    const queryParams = new URLSearchParams(
      Object.entries(orderedData).map(([key, value]) => [
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value),
      ])
    ).toString();
    console.log("Publishing data to Google Sheets:", queryParams);

    // Send a GET request with the query parameters
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbzfk5QfTfiNv0a96VDmrUUgMFgEJYGVBzU6GPkSBy76RDNT8QsuqZfsmWju-52piIi9/exec?${queryParams}`
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Data successfully published to Google Sheets:", result);
    } else {
      console.error(
        "Failed to publish data to Google Sheets:",
        await response.text()
      );
    }
  } catch (error) {
    console.error("Error publishing data to Google Sheets:", error);
  }
};
