import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css';
import Transaction from './Transaction';
import { cors, config } from '../../Config';

class TransactionList extends Component {
  state = {
    transactions: [],
    error: false
  };

  async getData() {
    await axios
      .get(cors + 'https://nextar.flip.id/frontend-test', config)
      .then(res => {
        this.setState({
          transactions: res.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        document.getElementById('error').innerHTML = error;
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { transactions } = this.state;
    const transactionsArray = Object.values(transactions);
    let transactionList;

    if (transactionsArray.length) {
      let arrayFilter = transactionsArray.filter(trans => {
        return trans.beneficiary_name
          .toLowerCase()
          .includes(this.props.filterText.toLowerCase());
      });

      if (arrayFilter.length) {
        transactionList = arrayFilter.map(trans => {
          return (
            <Transaction
              key={trans.id}
              status={trans.status}
              sender_bank={trans.sender_bank}
              beneficiary_bank={trans.beneficiary_bank}
              beneficiary_name={trans.beneficiary_name}
              amount={trans.amount}
              completed_at={trans.completed_at}
            />
          );
        });
      } else {
        return (
          <div className='no-result'>
            <p>No Results</p>
          </div>
        );
      }
    } else {
      return this.state.error ? (
        <p id='error' className='no-result'></p>
      ) : (
        <div className='loader'></div>
      );
    }

    return <div className='container__transaction'>{transactionList}</div>;
  }
}

export default TransactionList;
