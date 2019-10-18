import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css';
import { FaArrowRight } from 'react-icons/fa';

class Transactions extends Component {
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

  changeDateFormat = e => {
    let date = e.split(' ')[0];
    let splitDate = date.split('-');
    let month = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ];

    let monthName = month[splitDate[1]];

    return `${splitDate[2]} ${monthName} ${splitDate[0]}`;
    // console.log(monthName);
  };

  formatCurrency = num => {
    return 'Rp' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  formatBankName = string => {
    if (string.length <= 4) {
      return string.toUpperCase();
    }

    return string;
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { transactions } = this.state;
    const transactionsArray = Object.values(transactions);

    const transactionList = transactionsArray.length ? (
      transactionsArray
        .filter(trans => {
          return trans.beneficiary_name
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase());
        })
        .map(trans => {
          return (
            <div
              className={`transaction-list__container ${trans.status.toLowerCase()}`}
              key={trans.id}
            >
              <div className='info__container'>
                <div className='bank-name__container'>
                  <span className='bank-namme__detail'>
                    {this.formatBankName(trans.beneficiary_bank)}
                  </span>
                  <FaArrowRight className='arrow-icon' />
                  <span className='bank-name__detail'>
                    {this.formatBankName(trans.sender_bank)}
                  </span>
                </div>
                <p className='m0'>{trans.beneficiary_name.toUpperCase()}</p>
                <span>{this.formatCurrency(trans.amount)}</span>
                <span className='dot'> . </span>
                <span>{this.changeDateFormat(trans.completed_at)}</span>
              </div>
              <div className='status__container'>
                <div className={`status-detail ${trans.status.toLowerCase()}`}>
                  <p className='m0'>
                    {trans.status.charAt(0).toUpperCase() +
                      trans.status.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          );
        })
    ) : (
      <div className='loader'></div>
    );

    return <div className='container__transaction'>{transactionList}</div>;
  }
}

export default Transactions;
