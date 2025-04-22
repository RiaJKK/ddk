import React from 'react';

export default function TransactionCard({ transaction }) {
  return (
    <div className="transaction-card">
      <h3>{transaction.status}</h3>
      <p>{transaction.amount} ₽</p>
      <p>{transaction.date_created}</p>
    </div>
  );
}