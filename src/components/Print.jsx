import React from 'react';
import Logo from './Logo';

function Print({ data }) {
  // Ensure data is defined before accessing its properties
  if (!data) return null;

  // Ensure user array is defined before accessing its elements
  const { user } = data;
  if (!user || user.length === 0) return null;

  const result = user[0];

  return (
    <div className='Print-Container'>
      <Logo />
      <p>Helloooooo {result}</p>
      <h1>This is my View Form page and form Id is</h1>
    </div>
  );
}

export default Print;
