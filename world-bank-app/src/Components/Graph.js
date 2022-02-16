import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

class Graph extends React.Component {
  combineData = (setOne, setTwo) => {
    return setOne.map((entry, i) => {
      const combined = {
        year: entry.year,
        [entry.countryname]: entry.value,
        [setTwo[i].countryname]: setTwo[i].value,
      };
      return combined;
    });
  };

  singleGraph = (data) => {
    return (
      <div className="graph-container">
        <h5 className="graph-title">{data[0].indicatorname}</h5>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );
  };

  comparisonGraph = (data, compareData) => {
    const combinedData = this.combineData(data, compareData);

    return (
      <div className="graph-container">
        <h5 className="graph-title">{data[0].indicatorname}</h5>
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
