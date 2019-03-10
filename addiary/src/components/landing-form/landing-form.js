import React from "react";
import { connect } from "react-redux";
import { FORM_STATES } from "../../actions/form-states";
import {openRegistration} from "../../actions/index";

const LandingForm = ({ formState, openRegistration }) => {
  console.log("formState", formState);
  let formView = null;
  
  switch (formState) {
    case FORM_STATES.REGISTRATION:
      formView = (
        <form>
          <div className="form-row">            
            <div className="col-12 col-md-6">
              <button className="btn btn-block btn-lg btn-primary">
                Регистрация
              </button>
            </div>
          </div>
        </form>
      );
      break;
    default:
      formView = (
        <div>
          <div className="form-row">
            <div className="col-12 col-md-6">
              <button className="btn btn-block btn-lg btn-primary">
                Войти
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button onClick={openRegistration} className="btn btn-block btn-lg btn-primary">
                Регистрация (бесплатно)
              </button>
            </div>
          </div>
        </div>
      );
  }
  return (
    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
      {formView}
    </div>
  );
};

const mapStateToProps = ({ formState }) => {
  return { formState };
};

const mapDispatchToProps = {
  openRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingForm);
