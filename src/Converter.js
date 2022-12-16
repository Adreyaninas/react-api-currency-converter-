import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Converter.css";

// Class = Converter | @ state = default properties | currencies array to hold data
class Converter extends Component {
  state = {
    result: null,
    fromCurrency: "USD",
    toCurrency: "MXN",
    amount: 1,
    currencies: []
  };

  // Initializes the currencies with LATEST CURRENCY VALUES from the openrates.io API
  componentDidMount() {
    console.log(
      "componentDidMount - HTTP: GET latest currency rates https://api.openrates.io/latest"
    );
    axios
      .get("https://api.openrates.io/latest")
      .then((response) => {
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr.sort() });
      })
      .catch((err) => {
        console.log(
          "Houston, we've got a problem; see following ERROR message: " +
            err.message
        );
      });
  }

  // Event handler for the conversion | GET latest rates fromCurrency = USD || toCurrency = MXN (Mexican Peso) = default FROM & TO SELECT values
  convertHandler = () => {
    console.log("convertHandler() working");
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.openrates.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
        )
        .then((response) => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch((err) => {
          console.log("Opps", err.message);
        });
    } else {
      this.setState({
        result:
          "Unable to convert the same currency! Must have a different From & To currency type."
      });
    }
  };

  //  selectHandler() function updates "FROM" & "TO" States based on user seelction (event)
  selectHandler = (event) => {
    // console.log("selectHandler() from & to");
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
      console.log("selectHandler() from { fromCurrency }");
    }
    if (event.target.name === "to") {
      this.setState({ toCurrency: event.target.value });
      console.log("selectHandler() to { toCurrency }");
    }
  };

  // render() function is required to display HTML & CSS, as well as Font-Awesome "USD" Icon
  render() {
    return (
      <div className="Converter">
        <h2>
          <span>
            <i className="fa fa-usd" aria-hidden="true"></i> Currency Converter{" "}
            <i className="fa fa-usd" aria-hidden="true"></i>
          </span>
        </h2>

        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={(event) => this.setState({ amount: event.target.value })}
          ></input>

          {/* This select element is for designating the "FROM" currency in drop down */}
          <select
            name="from"
            onChange={(event) => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          {/* This select element is for designating the "TO" currency in drop down */}
          <select
            name="to"
            onChange={(event) => this.selectHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>

          <button onClick={this.convertHandler}>Convert</button>
        </div>
        {this.state.result && <h3>{this.state.result}</h3>}
      </div>
    );
  }
}

export default Converter;
