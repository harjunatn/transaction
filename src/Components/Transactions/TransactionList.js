import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css';
import Transaction from './Transaction';

class TransactionList extends Component {
  state = {
    transactions: []
  };

  getData() {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://nextar.flip.id/frontend-test'
      )
      .then(res => {
        this.setState({
          transactions: res.data
        });
      })
      .catch(error => {
        console.log(error);
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
      let temp = transactionsArray.filter(trans => {
        return trans.beneficiary_name
          .toLowerCase()
          .includes(this.props.filterText.toLowerCase());
      });

      if (temp.length) {
        transactionList = temp.map(trans => {
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
      return <div className='loader'></div>;
    }

    return <div className='container__transaction'>{transactionList}</div>;
  }
}

export default TransactionList;
