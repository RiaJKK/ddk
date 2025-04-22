import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactions';
import TransactionCard from '../components/TransactionCard';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  return (
    <div>
      <h1>Движение денежных средств</h1>
      <div className="transaction-list">
        {transactions.map(tx => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
}