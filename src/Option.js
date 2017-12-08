import React from 'react';

export const Option = ({ active, title, onClick }) => <div
    className="text-grey-darkest bg-grey-lightest hover:text-black border hover:border-grey py-1 px-2 m-1 rounded cursor-pointer"
    onClick={onClick}
  >
    {title}
    {active && <span className="ml-1">✓</span>}
  </div>;