import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Survey from './Survey/Survey';
import Final from './Final/Final';
import store from '../rootReducer'
import './styles.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">         
            <Final />
            <Survey />  
        </div>
      </Provider>
    );
  }
}

export default App;
