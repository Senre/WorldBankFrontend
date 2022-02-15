export default class Network {
  fetchCountryData = async (country, indicator, startYear, endYear) => {
    const response = await fetch(
      `http://localhost:8080/${encodeURIComponent(
        country
      )}?indicator=${encodeURIComponent(
        indicator
      )}&startYear=${startYear}&endYear=${endYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };
}
