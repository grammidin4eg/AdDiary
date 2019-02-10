import React from "react";
import "./landing.css";

const Landing = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Дневник давления
          </a>
          <a className="btn btn-primary" href="#">
            Помочь сайту
          </a>
        </div>
      </nav>

      <header className="masthead text-white text-center">
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5">
                Дневник давления онлайн
              </h1>
            </div>
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
          </div>
        </div>
      </header>

      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">                
                <i class="fas fa-clock feature-icon"></i>                
                <h3>Измеряйте регулярно</h3>
                <p className="lead mb-0">
                Регулярные записи значений АД очень полезны для врача. На их основе он может скорректировать назначенное пациенту лечение.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
              <i class="fas fa-desktop feature-icon"></i>
                <h3>Электронный дневник</h3>
                <p className="lead mb-0 device-features">
                  <ul>
                    <li>Доступен всегда, с любого компьютера, телефона</li>
                    <li>Удобно заполнять</li>
                    <li>Сам считает средние показатели АД</li>
                    <li>Подсвечивает дни, когда давление было высоким</li>
                    <li>Удобно просматривать измерения</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <i class="fas fa-cloud feature-icon"></i>
                <h3>Поделиться записями</h3>
                <p className="lead mb-0">
                Сохраните на компьютер или распечатайте.                
                </p>
                <p className="lead mb-0">                
                Можно кинуть ссылку на ваш дневник. Удобно при онлайн консультации с врачом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase">
        <div className="container-fluid p-0">
          <img src="/img/rules.jpg" alt="правила измерения давления"/>
        </div>
      </section>
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item">
                  <a href="#">О проекте</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Контакты</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Поддержать</a>
                </li>
                <li className="list-inline-item">&sdot;</li>
                <li className="list-inline-item">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">
                &copy; Карачевцев Ю.Ю. 2019. Все права защищены.
              </p>
            </div>
            <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item mr-3">
                  <a href="#">
                    <i className="fab fa-facebook fa-2x fa-fw" />
                  </a>
                </li>
                <li className="list-inline-item mr-3">
                  <a href="#">
                    <i className="fab fa-twitter-square fa-2x fa-fw" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-instagram fa-2x fa-fw" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
