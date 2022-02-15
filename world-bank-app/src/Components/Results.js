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

  sortIncomingData = (data) => {
    let set = -1;
    let sortedData = [];
    let checkYear = "";
    data.forEach((element) => {
      if (checkYear !== element.indicatorname) {
        set++;
        sortedData.push([]);
      }

      sortedData[set].push(element);
      checkYear = element.indicatorname;
    });

    sortedData = sortedData.map((set) => {
      return set.sort((a, b) => (a.year < b.year ? -1 : 1));
    });

    return sortedData;
  };

  renderLineChart = (data) => {
    if (data.length > 2) {
      let altData = data.map((item) => {
        item.value = Number(item.value);
        return item;
      });
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
    } else if (data.length === 1) {
      return (
        <h3>
          {data[0].indicatorname} for {data[0].countryname} was {data[0].value}{" "}
          in {data[0].year}
        </h3>
      );
    }
  };

  renderIncomingData = () => {
    const { data } = this.state;
    const sortedData = this.sortIncomingData(data);

    return sortedData.map((set, i) => {
      return (
        <div key={i} className="rendered-data">
          {this.renderLineChart(set)}
        </div>
      );
    });
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
        <div className="results-content">{this.renderIncomingData()}</div>
      </main>
    );
  }
}

export default Results;
