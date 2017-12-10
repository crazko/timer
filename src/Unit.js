import React from 'react';

export const Unit = ({ handleOnChange, value, isDisabled, title, isExpired }) => {
  const leadingZero = value > -10 && value < 10 ? '0' : '';
  const textColorClass = isExpired ? ' text-red-dark' : ' text-blue-darkest';

  return (
    <div className="flex flex-col-reverse">
      <span className="text-center">{title}</span>
      <input
        className={'unit m-2 text-right font-mono appearance-none bg-transparent' + textColorClass}
        disabled={isDisabled}
        max="59"
        min="0"
        onChange={handleOnChange}
        type="number"
        value={leadingZero + Math.abs(value)}
      />
    </div>
  );
};
