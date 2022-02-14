import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      country: "",
      indicator: "",
      startYear: 1960,
      endYear: 2015,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { country, indicator, year } = this.state;
    country = country.split(" ").join("");
    console.log(country, indicator ? indicator : "All", year ? year : "All");
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
  };

  getYearOptions = () => {
    let years = Array(2016 - 1960).fill(0);

    return years.map((element, i) => {
      return (
        <option key={i} value={1960 + i}>
          {1960 + i}
        </option>
      );
    });
  };

  render() {
    return (
      <main>
        <div>
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </main>
    );
  }
}

export default SearchPage;
