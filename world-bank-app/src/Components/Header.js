import React from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Network from "./Network";

class Header extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor() {
    super();
    this.state = {
      userSearches: [],
    };
    this.network = new Network();
  }

  componentDidMount() {
    this.getUserSearches();
  }

  getUserSearches = async () => {
    const { cookies } = this.props;
    const user_id = cookies.get("user_id");
    const searches = await this.network.getUserSearches(user_id);
    this.setState({ userSearches: searches });
  };

  addSearchesToDropdown(searches) {
    return searches.map((search, i) => {
      const { created_at, country, indicator, start_year, end_year } = search;
      const indicatorPresent = indicator ? `${indicator},` : "";
      return (
        <Dropdown.Item eventKey={i} key={i}>
          {country}, {indicatorPresent} between {start_year} and {end_year} |{" "}
          {created_at}
        </Dropdown.Item>
      );
    });
  }

  fireHistoricSearch = async (e) => {
    const { userSearches } = this.state;
    let { country, indicator, start_year, end_year } = userSearches[Number(e)];
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
  };

  logInOrExitAdmin = () => {
    this.props.admin ? this.props.exitAdmin() : this.props.logIn();
  };

  render() {
    return (
      <div className="header-buttons">
        <div id="home-logout-btn">
          <Link to="/home">
            <Button variant="primary" onClick={() => this.props.setData()}>
              Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" onClick={() => this.logInOrExitAdmin()}>
              Log Out
            </Button>
          </Link>
        </div>
        <div className="history-btn">
          <Dropdown onSelect={this.fireHistoricSearch}>
            <Dropdown.Toggle id="history-dropdown" variant="secondary">
              History
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.addSearchesToDropdown(this.state.userSearches)}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withCookies(Header);
