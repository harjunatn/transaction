import React, { Component } from 'react';
import { FaArrowRight } from 'react-icons/fa';

class Transaction extends Component {
  changeDateFormat = e => {
    let date = e.split(' ')[0];
    let splitDate = date.split('-');
    let month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Desember'
    ];

    let monthName = month[splitDate[1]];

    return `${splitDate[2]} ${monthName} ${splitDate[0]}`;
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

  render() {
    const trans = this.props;
    return (
      <div
        className={`transaction-list__container ${trans.status.toLowerCase()}`}
        key={trans.id}
      >
        <div className='info__container'>
          <div className='bank-name__container'>
            <span className='bank-name__detail'>
              {this.formatBankName(trans.sender_bank)}
            </span>
            <FaArrowRight className='arrow-icon' />
            <span className='bank-namme__detail'>
              {this.formatBankName(trans.beneficiary_bank)}
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
  }
}

export default Transaction;
