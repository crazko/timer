import React from 'react';

export const Unit = ({ handleOnChange, value, isDisabled, title, isExpired }) => {
  const leadingZero = (value > -10 && value < 10) ? '0' : '';
  const negative = Math.sign(value) === -1 ? '-' : '';
  const textColor = isExpired ? ' text-red-dark' : '';
  
  return <div className="flex flex-col-reverse">
    <span className="text-center">{title}</span>
    <input
      className={'unit bg-white rounded-lg m-2 shadow text-right appearance-none border hover:border-grey' + textColor}
      disabled={isDisabled}
      max="59"
      min="0"
      onChange={handleOnChange}
      type="number"
      value={negative + leadingZero + Math.abs(value)}
    />
  </div>;
}