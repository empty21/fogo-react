import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../../redux/store";
import { Link } from "react-router-dom";
import { isMobilePhone, isLength } from "validator";
import api from "../../../services/api";
import pushNotify from "../../../utils/pushNotify";


function RegisterComponent(props) {
  const { register, handleSubmit, errors, getValues } = useForm();
  useEffect(() => {
    document.title = "Fogo - Đăng ký";
  },[])

  return (
    <React.Fragment>

    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)