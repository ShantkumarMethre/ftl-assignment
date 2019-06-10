import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from './components/Slider';
import './App.css';

const Styles = styled.div`
  .App {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    margin-top: 20vh;
    width: 80%;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInput: 0,
      droplets: {},
      interest: 0,
      moneyV: 500,

      monthV: 7,
      // monthlyPayment:0,
      amount:0
    }
  }
  componentWillMount() {
    var url = 'https://ftl-frontend-test.herokuapp.com/interest?amount=' + this.state.moneyV + '&numMonths=' + this.state.monthV
    fetch(url)
      .then(res => res.json())
      .then(droplets => {

        this.setState({

          droplets: droplets,
     
          interest: droplets.interestRate,
          amount:droplets.monthlyPayment.amount
        
        })
        console.log("hello inside the fetch" + this.state.droplets.interestRate)
        console.log("hello inside the fetch" + this.state.amount)
      });
  }

  handleAmount(data) {
    var url = 'https://ftl-frontend-test.herokuapp.com/interest?amount=' + data + '&numMonths=' + this.state.monthV
    fetch(url)
      .then(res => res.json())
      .then(droplets => {

        this.setState({

          droplets: droplets,
          name: null,
          interest: droplets.interestRate,
          amount:droplets.monthlyPayment.amount
        })
      });
    console.log(data)
  }
  handleMonth(month) {
    var url = 'https://ftl-frontend-test.herokuapp.com/interest?amount=' + this.state.moneyV + '&numMonths=' + month
    fetch(url)
      .then(res => res.json())
      .then(droplets => {

        this.setState({

          droplets: droplets,

          interest: droplets.interestRate,
          amount:droplets.monthlyPayment.amount
        })
      });
    console.log(month)
  }
  render() {
    return (
      <Styles>
        <div className="App">
          <div className="wrapper">
            <h1>Full Throttle Labs Assignment</h1>
            <h1>Interested in taking a loan? Find out more about it below.</h1>
            <Slider min={500} max={5000} event={this.handleAmount.bind(this)} />
            <Slider min={6} max={24} event={this.handleMonth.bind(this)} />
            <h1>Monthly Payment is:     {this.state.amount} </h1>
            <h1>Interest Rate is:      {this.state.interest}</h1>
          </div>
        </div>
      </Styles>
    );
  }
}

export default App;
