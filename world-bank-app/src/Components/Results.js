import React from "react";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    return <p>hello</p>;
  }
}

export default Results;
