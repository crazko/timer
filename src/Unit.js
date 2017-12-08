import React from 'react';

export const Unit = ({ handleOnChange, value, isDisabled, title }) => {
  const leadingZero = (value > -10 && value < 10) ? '0' : '';
  const negative = Math.sign(value) === -1 ? '-' : '';
  
  return <div className="flex flex-col-reverse">
    <strong className="text-center">{title}</strong>
    <input
      className="bg-white rounded-lg m-2 text-5xl text-right"
      disabled={isDisabled}
      max="59"
      min="0"
      onChange={handleOnChange}
      type="number"
      value={negative + leadingZero + Math.abs(value)}
    />
  </div>;
}