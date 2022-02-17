import React from "react";
import { Button } from "react-bootstrap";
import Network from "./Network";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      searches: [],
    };
    this.network = new Network();
  }

  componentDidMount = () => {
    this.getAllSearches();
  };

  getAllSearches = async () => {
    const response = await this.network.getAllSearches();
    this.setState({ searches: response });
  };

  listAllSearches = (searches) => {
    return searches.map((search, i) => {
      const { created_at, country, indicator, start_year, end_year, user_id } =
        search;
      const indicatorPresent = indicator ? `${indicator},` : "";
      return (
        <li key={i}>
          User {user_id} searched {country}, {indicatorPresent} between{" "}
          {start_year} and {end_year} | {created_at}
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.props.setAdmin()} variant="danger">
          Exit
        </Button>
        <ul>{this.listAllSearches(this.state.searches)}</ul>
      </div>
    );
  }
}

export default Admin;
