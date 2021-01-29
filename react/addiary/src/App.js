import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import {Firebase} from "./lib/Firebase";
import Login from "./components/Login";
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form'
import ErrorPanel from "./components/ErrorPanel";
import Diary from "./components/Diary";
import PrivateRoute from "./lib/PrivateRoute";
import Registration from "./components/Registration";

const rootReducer = combineReducers({
    form: formReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
    return (
        <div className="d-flex flex-column vh-100">
            <Provider store={store}>
                <Router>
                    <Header/>
                    <main className="flex-shrink-0 flex-grow-1">
                        <ErrorPanel>
                            <Firebase>
                                <Switch>
                                    <Route path="/" exact>
                                        <Landing/>
                                    </Route>
                                    <PrivateRoute path="/diary" component={Diary}/>
                                    <Route path="/login">
                                        <Login/>
                                    </Route>
                                    <Route path="/reg">
                                        <Registration/>
                                    </Route>
                                    <Route path="/restore">
                                        restore
                                    </Route>
                                    <Redirect to="/"></Redirect>
                                </Switch>
                            </Firebase>
                        </ErrorPanel>
                    </main>
                    <Footer/>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
