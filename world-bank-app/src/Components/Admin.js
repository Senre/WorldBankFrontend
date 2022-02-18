import React from "react";
import { Button } from "react-bootstrap";
import Network from "./Network";
import Spinner from "react-bootstrap/Spinner";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      searches: [],
      loading: false,
    };
    this.network = new Network();
  }

  componentDidMount = () => {
    this.getAllSearches();
  };

  alternateLoading = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  };

  getLoadingComponent = () => {
    return (
      <Spinner size="lg" animation="border" role="status" variant="dark" />
    );
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
        <li key={i} value={i} onClick={this.fireHistoricSearch}>
          User {user_id} searched {country}, {indicatorPresent} between{" "}
          {start_year} and {end_year} | {created_at}
        </li>
      );
    });
  };

  fireHistoricSearch = async (e) => {
    this.alternateLoading();
    const { searches } = this.state;
    let { country, indicator, start_year, end_year } =
      searches[Number(e.target.value)];
    indicator = indicator ? indicator : "";
    const compareCountries = country.split(" vs ");
    if (compareCountries.length > 1) {
      const response = await this.network.fetchCountryData(
        compareCountries[0],
        indicator,
        start_year,
        end_year
      );
      const compareResponse = await this.network.fetchCountryData(
        compareCountries[1],
        indicator,
        start_year,
        end_year
      );
      this.props.setData(response, compareResponse);
    } else {
      const response = await this.network.fetchCountryData(
        country,
        indicator,
        start_year,
        end_year
      );
      this.props.setData(response);
    }
    this.alternateLoading();
  };

  render() {
    return (
      <div>
        <header>
          <Button onClick={() => this.props.exitAdmin()} variant="danger">
            Exit
          </Button>
        </header>

        {this.state.loading ? (
          this.getLoadingComponent()
        ) : (
          <ul>{this.listAllSearches(this.state.searches)}</ul>
        )}
      </div>
    );
  }
}

export default Admin;
