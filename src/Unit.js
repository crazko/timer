import React from 'react';

export const Unit = ({ handleOnChange, value, isDisabled, title }) => {
  const leadingZero = (value > -10 && value < 10) ? '0' : '';
  const negative = Math.sign(value) === -1 ? '-' : '';
  
  return <div className="flex flex-col-reverse">
    <span className="text-center">{title}</span>
    <input
      className="bg-white rounded-lg m-2 shadow text-right appearance-none border hover:border-grey"
      disabled={isDisabled}
      max="59"
      min="0"
      onChange={handleOnChange}
      style={{
        fontSize: '5rem'
      }}
      type="number"
      value={negative + leadingZero + Math.abs(value)}
    />
  </div>;
}