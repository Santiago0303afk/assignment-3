/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebit = {
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };
    props.addDebit(newDebit);
    setDescription('');
    setAmount('');
  };

  const debitsView = () => {
    return props.debits.map((debit) => {
      const date = debit.date.slice(0, 10);
      return (
        <li key={`${debit.date}-${debit.amount}-${debit.description}`}>
          ${debit.amount.toFixed(2)} - {debit.description} ({date})
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Debits</h1>
      <ul>{debitsView()}</ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Grocery shopping"
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
            placeholder="e.g. 25.50"
            required
          />
        </div>
        <button type="submit">Add Debit</button>
      </form>

      <br />
      <AccountBalance accountBalance={props.accountBalance} />
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
