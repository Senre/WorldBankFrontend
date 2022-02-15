import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import Network from "./Network";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      country: "",
      indicator: "",
      startYear: 1960,
      endYear: 2015,
    };
    this.network = new Network();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { country, indicator, startYear, endYear } = this.state;
    const response = await this.network.fetchData(
      country,
      indicator,
      startYear,
      endYear
    );

    console.log(response);
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

  render() {
    return (
      <main>
        <header className="main-header"></header>
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
              </Form.Group>
            </Row>
            <Link to="/results">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Link>
          </Form>
        </div>
      </main>
    );
  }
}

export default SearchPage;
