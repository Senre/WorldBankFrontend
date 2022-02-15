import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    return (
      <main>
        <header className="main-header"></header>
        <div className="results-content"></div>
      </main>
    );
  }
}

export default Results;
