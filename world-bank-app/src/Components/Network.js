export default class Network {
  async registerUser(username, password) {
    const endpoint = "http://localhost:8080/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const json = await response;
    return json;
  }

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

  fetchIndicatorNames = async () => {
    const response = await fetch("http://localhost:8080/indicators", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  fetchCountryNames = async () => {
    const response = await fetch("http://localhost:8080/countries", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  loggingIn = async (email, password) => {
    const body = {
      email,
      password,
    };

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;
  };

  addUserSearch = async (country, indicator, start_year, end_year, user_id) => {
    const body = {
      country,
      indicator,
      start_year,
      end_year,
    };

    const response = await fetch(`http://localhost:8080/searches/${user_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;
  };
}
