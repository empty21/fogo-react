import React from "react";
import {Link} from "react-router-dom";
import "./ErrorPages.scss";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Fogo - 404 Not Found"
  }
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! Nothing was found</h2>
          <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <Link
            to="/">Return to homepage</Link></p>
          <div className="notfound-social">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"/></a>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;