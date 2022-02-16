import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import Network from "./Network";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

class SearchPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryCompare: "",
      indicator: "",
      startYear: 1960,
      endYear: 2015,
      compare: false,
      indicatorList: [],
      countriesList: [],
    };
    this.network = new Network();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    console.log(cookies.getAll());
    const user_id = cookies.get("user_id");
    const {
      country,
      indicator,
      startYear,
      endYear,
      compare,
      countryCompare,
      countriesList,
    } = this.state;

    if (
      countriesList.includes(country[0]) &&
      compare &&
      countriesList.includes(countryCompare[0])
    ) {
      console.log("submitted");
      const response = await this.network.fetchCountryData(
        country,
        indicator,
        startYear,
        endYear
      );
      const compareResponse = await this.network.fetchCountryData(
        countryCompare,
        indicator,
        startYear,
        endYear
      );
      console.log(compareResponse);
      this.network.addUserSearch(
        [country, countryCompare],
        indicator,
        startYear,
        endYear,
        user_id
      );
      this.props.setData(response, compareResponse);
    } else if (countriesList.includes(country[0])) {
      const response = await this.network.fetchCountryData(
        country,
        indicator,
        startYear,
        endYear
      );
      this.network.addUserSearch(
        country,
        indicator,
        startYear,
        endYear,
        user_id
      );
      this.props.setData(response);
    } else {
      console.log("Invalid Country");
    }
  };

  componentDidMount = async () => {
    const indicators = await this.getIndicatorNames();
    const countries = await this.getCountryNames();
    this.setState({ indicatorList: indicators, countriesList: countries });
  };

  getIndicatorNames = async () => {
    const response = await this.network.fetchIndicatorNames();
    const indicators = response.rows.map((entry) => {
      return entry.indicatorname;
    });
    return indicators;
  };

  getCountryNames = async () => {
    const response = await this.network.fetchCountryNames();
    const countries = response.rows.map((entry) => {
      return entry.shortname;
    });
    return countries;
  };

  activateCompare = async () => {
    const { compare } = this.state;
    this.setState({ compare: !compare });
    this.getIndicatorNames();
  };

  handleChange = (e) => {
    if (e.target.id === "startYear" || e.target.id === "endYear") {
      let newYear = e.target.value > 2015 ? 2015 : e.target.value;
      newYear = newYear < 1960 ? 1960 : newYear;

      this.setState({ [e.target.id]: newYear });
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  comparedCountryForm = () => {
    return (
      <Row>
        <Form.Group className="mb-3" id="form-country-search" as={Col}>
          <Typeahead
            onChange={(selected) => this.setState({ countryCompare: selected })}
            placeholder="Enter a Country..."
            size="lg"
            options={this.state.countriesList}
            id="countryCompare"
          />
        </Form.Group>
      </Row>
    );
  };

  renderSearchForm = () => {
    return (
      <div className="search-section">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Form.Group className="mb-3" id="form-country-search" as={Col}>
              <Typeahead
                onChange={(selected) => this.setState({ country: selected })}
                placeholder="Enter a Country..."
                size="lg"
                options={this.state.countriesList}
                id="country"
              />
              {this.state.compare && this.comparedCountryForm()}
              <Button
                size="sm"
                variant="secondary"
                onClick={this.activateCompare}
              >
                {this.state.compare ? "-" : "+"}
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" as={Col}>
              <Typeahead
                onChange={(selected) => this.setState({ indicator: selected })}
                placeholder="Enter an Indicator..."
                size="lg"
                options={this.state.indicatorList}
                id="indicator"
              />
              <Form.Text>Leave blank to include all.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" as={Col}>
              <Form.Control
                placeholder="Start Year"
                aria-label="Start Year"
                id="startYear"
                value={this.state.startYear}
                onChange={this.handleChange}
                type="number"
                size="lg"
              />
              <Form.Text>From...</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" as={Col}>
              <Form.Control
                placeholder="End Year"
                aria-label="End Year"
                id="endYear"
                value={this.state.endYear}
                onChange={this.handleChange}
                type="number"
                size="lg"
              />
              <Form.Text>To...</Form.Text>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  getUserSearches = async () => {
    const { cookies } = this.props;
    const user_id = cookies.get("user_id");
  };

  render() {
    return (
      <main>
        <header className="main-header">
          <div className="header-buttons">
            <div className="header-search-button">
              <Link to="/home">
                <Button variant="primary">Search</Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" onClick={() => this.props.logIn()}>
                  Log Out
                </Button>
              </Link>
              <Dropdown>
                <Dropdown.Toggle id="history-dropdown" variant="secondary">
                  History
                </Dropdown.Toggle>

                <Dropdown.Menu></Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </header>
        {this.renderSearchForm()}
      </main>
    );
  }
}

export default withCookies(SearchPage);
