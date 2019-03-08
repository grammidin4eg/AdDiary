import React from "react";


const LandingForm = () => {
    return (
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                  <button                    
                    className="btn btn-block btn-lg btn-primary">Войти
                  </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <button                      
                      className="btn btn-block btn-lg btn-primary">Регистрация (бесплатно)
                    </button>
                  </div>
                </div>
              </form>
        </div>
    );
}

export default LandingForm;