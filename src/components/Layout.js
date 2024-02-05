// Layout.js

import React from 'react';
import Logo from './Logo';
import styles from '../Style/Layout.module.css'
// import styles from '../Style/DirectorReview.module.css'; // Create a CSS file for styling



const Layout = ({ children }) => {
  return (
    <div className={styles.centeredContainer}>
      <header>
        <Logo />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
