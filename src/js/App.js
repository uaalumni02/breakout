import React, { Component } from 'react';
import Header from './components/header/Header';
// import '../css/App.css';

class App extends Component {
  render() {
    return (
        <div>
          <Header tokenData={ {} }/>
          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}

export default App;
