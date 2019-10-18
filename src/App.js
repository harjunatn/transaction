import React, { Component } from 'react';
import Transactions from './Components/Transactions/Transactions';
import Searchbox from './Components/Searchbox/Searchbox';

class App extends Component {
  state = {
    filterText: ''
  };

  handleInput = e => {
    this.setState({
      filterText: e.target.value
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <Searchbox handleInput={this.handleInput} />
          <Transactions filterText={this.state.filterText} />
        </div>
      </div>
    );
  }
}

export default App;
