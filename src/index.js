import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import LoadingBar from 'react-redux-loading';
import Nav from './components/Nav';
import App from './App';
import NewTweet from './components/NewTweet';
import TweetPage from './components/TweetPage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

// Create Redux store
const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <LoadingBar />
        <div className="container">
          <Nav />
          <Route exact path="/" component={App} />
          <Route path="/new" component={NewTweet} />
          <Route path="/tweet/:id" component={TweetPage} />
        </div>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
