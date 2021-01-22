import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import {Firebase} from "./lib/Firebase";


function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <Router>
        <Header/>
        <main className="flex-shrink-0 flex-grow-1">
          <Firebase>
            <Switch>
              <Route path="/" exact>
                <Landing />
              </Route>
              <Route path="/diary">
                DIARY
              </Route>
              <Route path="/login">
                LOGIN
              </Route>
              <Route path="/reg">
                REG
              </Route>
              <Route path="/restore">
                restore
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </Firebase>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
