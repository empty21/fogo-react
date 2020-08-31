import React, {useState} from "react";
import ReactModal from "react-modal";
import BannerImage from "../../../images/firstVisitBanner.png"

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    maxWidth: "700px",
    top: "15%",
    padding: "0",
    bottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    textAlign: "center"
  }
}
function FirstVisitPopupComponent() {
  const [showModal, setShowModal] = useState(!sessionStorage.getItem("isVisited"));
  const handleClose = () => {
    setShowModal(false);
  }
  return(
    <ReactModal
      isOpen = {showModal}
      onRequestClose = {handleClose}
      onAfterOpen = {()=>sessionStorage.setItem("isVisited", "true")}
      style = {style}
    >
      <a href="https://www.facebook.com/FogoVnTeam/" onClick={handleClose} target="_blank" rel="noopener noreferrer">
        <img alt={"Banner"} style={{width: "100%"}} src={BannerImage}/>
      </a>
    </ReactModal>
  );
}

export default FirstVisitPopupComponent;