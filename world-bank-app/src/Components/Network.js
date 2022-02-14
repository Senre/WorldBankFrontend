export default class Network {
  fetchCountryData = async (country, indicator, startYear, endYear) => {
    const response = await fetch(
      `http://localhost:8080/${encodeURIComponent(country)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ indicator, startYear, endYear }),
      }
    );

    return await response.json();
  };
}
