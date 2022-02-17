import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import Network from "../Network";
import { Typeahead } from "react-bootstrap-typeahead";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import Header from "../Header";
import Spinner from "react-bootstrap/Spinner";

class SearchPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      country: "",
      countryCompare: "",
      indicator: "",
      startYear: 1960,
      endYear: 2015,
      compare: false,
      indicatorList: [],
      countriesList: [],
      currentUser: Number(cookies.get("user_id")),
      username: cookies.get("email"),
      loading: false,
    };
    this.network = new Network();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.alternateLoading();
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
    this.alternateLoading();
  };

  componentDidMount = async () => {
    const indicators = await this.getIndicatorNames();
    const countries = await this.getCountryNames();
    this.setState({ indicatorList: indicators, countriesList: countries });
  };

  getIndicatorNames = async () => {
    const response = await this.network.fetchIndicatorNames();
    // const indicators = response.rows.map((entry) => {
    //   return entry.indicatorname;
    // });
    return response;
  };

  getCountryNames = async () => {
    const response = await this.network.fetchCountryNames();
    // const countries = response.rows.map((entry) => {
    //   return entry.shortname;
    // });
    return response;
  };

  activateCompare = async () => {
    const { compare } = this.state;
    this.setState({ compare: !compare });
    this.getIndicatorNames();
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
      // <div className="spacing">
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
      // </div>
    );
  };

  render() {
    return (
      <main>
        <div className="spacing">
          <header className="main-header">
            <Header
              setData={(data, compareData) =>
                this.props.setData(data, compareData)
              }
              logIn={() => this.props.logIn()}
            ></Header>
          </header>
        </div>
        <div className="spacing">{this.renderSearchForm()}</div>
      </main>
    );
  }
}

export default withCookies(SearchPage);
