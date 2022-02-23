export default class Network {
  async registerUser(username, password) {
    const endpoint =
      "https://protected-everglades-27298.herokuapp.com/register";
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    return response;
  }

  fetchCountryData = async (country, indicator, startYear, endYear) => {
    const response = await fetch(
      `https://protected-everglades-27298.herokuapp.com/${encodeURIComponent(
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
    const response = await fetch(
      "https://protected-everglades-27298.herokuapp.com/indicators",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };

  fetchCountryNames = async () => {
    const response = await fetch(
      "https://protected-everglades-27298.herokuapp.com/countries",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };

  loggingIn = async (email, password) => {
    const body = {
      email,
      password,
    };

    const response = await fetch(
      "https://protected-everglades-27298.herokuapp.com/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response;
  };

  addUserSearch = async (country, indicator, start_year, end_year, user_id) => {
    const body = {
      country,
      indicator,
      start_year,
      end_year,
    };

    const response = await fetch(
      `https://protected-everglades-27298.herokuapp.com/searches/${user_id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return response;
  };

  getUserSearches = async (user_id) => {
    const response = await fetch(
      `https://protected-everglades-27298.herokuapp.com/searches/${user_id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };

  getAllSearches = async () => {
    const response = await fetch(
      `https://protected-everglades-27298.herokuapp.com/searches`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };
}
