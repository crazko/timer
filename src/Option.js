import React from 'react';

export const Option = ({ active, title, onClick }) => <div
    className="cursor-pointer"
    onClick={onClick}
  >
    {active && <span>✓</span>}
    {title}
  </div>;