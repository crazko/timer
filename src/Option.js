import React from 'react';

export const Option = ({ active, title, onClick }) => <div
    className="bg-grey-lightest hover:bg-grey py-1 px-2 m-1 rounded cursor-pointer"
    onClick={onClick}
  >
    {title}
    {active && <span className="ml-1">✓</span>}
  </div>;