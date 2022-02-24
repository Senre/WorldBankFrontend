export default class Network {
  serverEndpoint = `${process.env.REACT_APP_SERVER}`;
  async registerUser(username, password) {
    const endpoint = `${this.serverEndpoint}/register`;
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
      `${this.serverEndpoint}/${encodeURIComponent(
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
    const response = await fetch(`${this.serverEndpoint}/indicators`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  fetchCountryNames = async () => {
    const response = await fetch(`${this.serverEndpoint}/countries`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  loggingIn = async (email, password) => {
    console.log(this.serverEndpoint);
    const body = {
      email,
      password,
    };

    const response = await fetch(`${this.serverEndpoint}/login`, {
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

    const response = await fetch(`${this.serverEndpoint}/searches/${user_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;
  };

  getUserSearches = async (user_id) => {
    const response = await fetch(`${this.serverEndpoint}/searches/${user_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  getAllSearches = async () => {
    const response = await fetch(`${this.serverEndpoint}/searches`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };
}
