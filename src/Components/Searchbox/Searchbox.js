import React from 'react';
import './Searchbox.css';
import { IoMdSearch } from 'react-icons/io';

const Searchbox = props => {
  return (
    <div className='searc-box__container'>
      <IoMdSearch className='search-icon' />
      <input
        className='search-box__input'
        onChange={props.handleInput}
        type='text'
        placeholder='Cari nama'
      />
    </div>
  );
};

export default Searchbox;
