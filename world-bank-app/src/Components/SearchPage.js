import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import Network from "./Network";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      country: "",
      countryCompare: "",
      indicator: "",
      startYear: 1960,
      endYear: 2015,
      compare: false,
    };
    this.network = new Network();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { country, indicator, startYear, endYear } = this.state;
    const response = await this.network.fetchCountryData(
      country,
      indicator,
      startYear,
      endYear
    );
    this.props.setData(response);
    console.log("response is", response);
  };

  activateCompare = () => {
    const { compare } = this.state;
    this.setState({ compare: !compare });
  };

  handleChange = (e) => {
    if (e.target.id === "startYear" || e.target.id === "endYear") {
      let newYear = e.target.value > 2015 ? 2015 : e.target.value;
      newYear = newYear < 1960 ? 1960 : newYear;
      console.log(newYear);

      this.setState({ [e.target.id]: newYear });
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  comparedCountryForm = () => {
    return (
      <Row>
        <Form.Group className="mb-3" id="form-country-search" as={Col}>
          <Form.Control
            type="text"
            placeholder="Enter a Country name..."
            id="countryCompare"
            value={this.state.countryCompare}
            onChange={this.handleChange}
            size="lg"
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
              <Form.Control
                type="text"
                placeholder="Enter a Country name..."
                id="country"
                value={this.state.country}
                onChange={this.handleChange}
                size="lg"
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
              <Form.Control
                type="text"
                placeholder="Enter an Indicator..."
                id="indicator"
                value={this.state.indicator}
                onChange={this.handleChange}
                size="lg"
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

  render() {
    return (
      <main>
        <header className="main-header">
          <div className="header-buttons">
            <div className="header-search-button">
              <Link to="/home">
                <Button variant="primary">Search</Button>
              </Link>
            </div>
          </div>
        </header>
        {this.renderSearchForm()}
      </main>
    );
  }
}

export default SearchPage;
