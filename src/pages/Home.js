import React from 'react';
import styles from './Home.module.css';
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Company Logo" className={styles.logo} />
      <h1>Welcome to Our Tour Company</h1>
    </div>
  );
}

export default Home;
