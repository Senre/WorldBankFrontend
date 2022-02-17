import React from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Header extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  getUserSearches = async () => {
    const { cookies } = this.props;
    const user_id = cookies.get("user_id");
  };

  render() {
    return (
      <div className="header-buttons">
        <div className="header-search-button">
          <Link to="/home">
            <Button variant="primary" onClick={() => this.props.setData()}>
              Search
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" onClick={() => this.props.logIn()}>
              Log Out
            </Button>
          </Link>
          <Dropdown>
            <Dropdown.Toggle id="history-dropdown" variant="secondary">
              History
            </Dropdown.Toggle>

            <Dropdown.Menu></Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withCookies(Header);
