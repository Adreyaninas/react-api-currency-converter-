import React, { Component } from 'react';
import Converter from './Converter';
import GitFooter from './GitFooter';

class App extends Component {
  render() {
    return (
      <div id="currencyConverterApp">
        <section className="currencyConvComponent">
          <Converter />
        </section>
        <div>
          <GitFooter />
        </div>
      </div>
    );
  }
}

export default App;