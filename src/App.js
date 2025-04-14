/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      creditList: [],
      debitList: [],
      accountBalance: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Lifecycle method to fetch credit and debit data
  async componentDidMount() {
    try {
      const creditRes = await axios.get("https://johnnylaicode.github.io/api/credits.json");
      const debitRes = await axios.get("https://johnnylaicode.github.io/api/debits.json");
      this.setState({
        creditList: creditRes.data,
        debitList: debitRes.data
      }, this.updateBalance);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  // Add new credit
  addCredit = (credit) => {
    this.setState(prevState => {
      const updatedCredits = [...prevState.creditList, credit];
      return {
        creditList: updatedCredits
      };
    }, this.updateBalance);
  }

  // Add new debit
  addDebit = (debit) => {
    this.setState(prevState => {
      const updatedDebits = [...prevState.debitList, debit];
      return {
        debitList: updatedDebits
      };
    }, this.updateBalance);
  }

  // Recalculate account balance
  updateBalance = () => {
    const totalCredits = this.state.creditList.reduce((sum, credit) => sum + Number(credit.amount), 0);
    const totalDebits = this.state.debitList.reduce((sum, debit) => sum + Number(debit.amount), 0);
    const newBalance = totalCredits - totalDebits;
    this.setState({ accountBalance: newBalance });
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
