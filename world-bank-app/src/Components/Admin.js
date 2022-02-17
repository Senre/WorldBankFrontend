import React from "react";
import { Button } from "react-bootstrap";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.setAdmin()} variant="danger">
          Exit
        </Button>
      </div>
    );
  }
}

export default Admin;
