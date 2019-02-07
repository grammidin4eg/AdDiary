import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import UserService from './services/user-service';
import AdDiaryService from './services/addiary-service';
import { ServiceProvider } from './services/service-context';
import store from './store';

const userService = new UserService();
const adDiaryService = new AdDiaryService();
const services = {
    userService,
    adDiaryService
}

ReactDOM.render((
    <Provider store={store}>
        <ServiceProvider value={services}>
            <Router>
                <App />
            </Router>
        </ServiceProvider>
    </Provider>
), document.getElementById('root'));
