import React, { Component } from 'react';
// import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

class Transaction extends Component {
  //   state = {
  //     transactions: []
  //   };

  //   getData() {
  //     axios
  //       .get(
  //         'https://cors-anywhere.herokuapp.com/https://nextar.flip.id/frontend-test'
  //       )
  //       .then(res => {
  //         this.setState({
  //           transactions: res.data
  //         });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }

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

  //   componentDidMount() {
  //     this.getData();
  //   }
  render() {
    return (
      <div
        className={`transaction-list__container ${this.props.status.toLowerCase()}`}
        key={this.props.id}
      >
        <div className='info__container'>
          <div className='bank-name__container'>
            <span className='bank-name__detail'>
              {this.formatBankName(this.props.sender_bank)}
            </span>
            <FaArrowRight className='arrow-icon' />
            <span className='bank-namme__detail'>
              {this.formatBankName(this.props.beneficiary_bank)}
            </span>
          </div>
          <p className='m0'>{this.props.beneficiary_name.toUpperCase()}</p>
          <span>{this.formatCurrency(this.props.amount)}</span>
          <span className='dot'> . </span>
          <span>{this.changeDateFormat(this.props.completed_at)}</span>
        </div>
        <div className='status__container'>
          <div className={`status-detail ${this.props.status.toLowerCase()}`}>
            <p className='m0'>
              {this.props.status.charAt(0).toUpperCase() +
                this.props.status.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
