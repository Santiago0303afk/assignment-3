/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCredit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    props.addCredit(newCredit);
    setDescription('');
    setAmount('');
  };

  const creditsView = () => {
    return props.credits.map((credit) => {
      const date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          ${credit.amount.toFixed(2)} - {credit.description} ({date})
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Credits</h1>
      <ul>{creditsView()}</ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Paycheck"
            required
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            placeholder="e.g. 1000.00"
            required
          />
        </div>
        <button type="submit">Add Credit</button>
      </form>

      <br />
      <AccountBalance accountBalance={props.accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
