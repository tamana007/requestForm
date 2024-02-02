// Logo.js
import React from 'react';
// import {marketingRequestForm} from '../Style'
import '../Style/marketingRequestForm.css'; // Corrected import path
import Image from 'next/image';


const Logo = () => {
  return (
    <div className="logo-container">
      <Image 
        src="/logoImage.png" alt="Logo"
        width={300}
        height={200}
      />
      {/* <img src="/logo/logoImage.png" alt="Logo" className="logo-image" /> */}
    </div>
  );
};

export default Logo;
