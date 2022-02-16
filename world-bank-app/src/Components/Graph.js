import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class Graph extends React.Component {
  combineData = (setOne, setTwo) => {
    if (setOne.length >= setTwo.length) {
      return setOne.map((entry, i) => {
        const combined = {
          year: entry.year,
          [entry.countryname]: entry.value,
          [setTwo[0].countryname]: setTwo[i] ? setTwo[i].value : null,
        };
        return combined;
      });
    } else {
      return setTwo.map((entry, i) => {
        const combined = {
          year: entry.year,
          [setOne[0].countryname]: setOne[i] ? setOne[i].value : null,
          [entry.countryname]: entry.value,
        };
        return combined;
      });
    }
  };

  singleGraph = (data) => {
    return (
      <div className="graph-container">
        <h5 className="graph-title">{data[0].indicatorname}</h5>
        <div className="graph-plot">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={700}
              height={300}
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
            >
              <Line
                connectNulls
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis type="number" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  comparisonGraph = (data, compareData) => {
    const combinedData = this.combineData(data, compareData);

    return (
      <div className="graph-container">
        <h5 className="graph-title">{data[0].indicatorname}</h5>
        <div className="graph-plot">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={600}
              height={300}
              data={combinedData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line
                connectNulls
                type="monotone"
                dataKey={data[0].countryname}
                stroke="#8884d8"
              />
              <Line
                connectNulls
                type="monotone"
                dataKey={compareData[0].countryname}
                stroke="#82ca9d"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  render() {
    const { data, compareData } = this.props;

    return (
      <div className="graph-container">
        {compareData
          ? this.comparisonGraph(data, compareData)
          : this.singleGraph(data)}
      </div>
    );
  }
}

export default Graph;
