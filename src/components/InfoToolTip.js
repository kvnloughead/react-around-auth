import React from 'react';
import PopupWithForm from './PopupWithForm';
import checkmark from '../images/checkmark.svg';
import redX from '../images/redX.svg';

function InfoToolTip(props) {
  return (
    <PopupWithForm name='tooltip' isOpen={props.isOpen} onClose={props.onClose}>
      <img
        className='popup__tooltip-icon'
        src={props.loggedIn ? checkmark : redX}
        alt='check mark'
      />
      <h2 className='popup__tooltip-title'>
        {props.loggedIn
          ? 'Success! You have now been registered'
          : 'Oops, something went wrong! Please try again.'}
      </h2>
    </PopupWithForm>
  );
}

export default InfoToolTip;
