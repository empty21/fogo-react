import React from "react";
import {connect} from "react-redux";
import {mapStateToProps} from "../../../redux/store";

function Preloader(props) {
  return(
    <React.Fragment>
      {props.isLoading &&
      <div className="preloader-wrapper active crazy" style={{position: "fixed", bottom: 20, left: 20}}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"/>
          </div>
          <div className="gap-patch">
            <div className="circle"/>
          </div>
          <div className="circle-clipper right">
            <div className="circle"/>
          </div>
        </div>
      </div>
      }
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(Preloader);