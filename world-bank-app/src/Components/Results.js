import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  renderLineChart = () => {
    const { data } = this.state;
    let altData = data.map((item) => {
      item.value = Number(item.value);
      return item;
    });

    if (altData.length > 2) {
      return (
        <LineChart
          width={600}
          height={300}
          data={altData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </LineChart>
      );
    } else if (altData.length === 1) {
      return (
        <h3>
          {data[0].indicatorname} for {data[0].countryname} was {data[0].value}{" "}
          in {data[0].year}
        </h3>
      );
    }
  };

  render() {
    return (
      <main>
        <header className="main-header">
          <div className="header-buttons">
            <div className="header-search-button">
              <Link to="/home">
                <Button variant="primary" onClick={() => this.props.setData()}>
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <div className="results-content">{this.renderLineChart()}</div>
      </main>
    );
  }
}

export default Results;
