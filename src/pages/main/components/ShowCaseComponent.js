import React, { useState } from "react";
import {Card} from "react-bootstrap";
import api from "../../../services/api";
import {Link} from "react-router-dom";

function ShowCaseComponent(props) {
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const handleChange = (e) => {
    const {value} = e.target;
    setSearchText(value);
    if(typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(()=>{
      api.post("/rooms/search/suggestion", {text: value})
        .then(data => setSearchSuggestion(data))
        .catch();
    },300));
  }
  const appendSearchText = (e) => {
    setSearchText(e.target.textContent);
  }
  return(
    <React.Fragment>
      <div className="showcase">
        <div className="showcase-share">
          <div className="d-flex justify-content-center h-100">
            <div id="search-box" className="col-10 col-md-6 mt-5">
              <i className="fas fa-map-marker-alt"/>
              <input type="text" id="search-input" name="s"
                     placeholder="Hà Đông..."
                     value={searchText}
                     onChange={handleChange}
              />
              <span className="inline-search">
                <Link to={"/search/"+searchText.split(" ").join("-") }>
                  <button id="search-btn">
                    <i className="fa fa-search text-white"/>
                  </button>
                </Link>
              </span>
              {searchSuggestion.length > 0 &&
              <Card className="col-8 mt-2 text-center" id="search-suggestion">
                <Card.Body className="p-2">
                  {searchSuggestion.map(val =>
                    <React.Fragment key={val}>
                      <div className="text-decoration-none suggestion-item" onClick={appendSearchText}>{val}</div>
                      <div className="border-bottom my-1"/>
                    </React.Fragment>
                  )
                  }
                </Card.Body>
              </Card>
              }
            </div>
          </div>
        </div>
        <div className="showcase-slogan text-fogo">
          <h1 style={{color:"#F25C05",fontSize:"80px"}}>Fogo</h1>
          <h3>Ứng dụng tìm kiếm phòng trọ <span className="hahahaha"></span> !</h3>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ShowCaseComponent;
