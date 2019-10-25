import React from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import 'normalize.css';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles

const App = () => (
  <div className='App'>
    <Header />
    <div className="container">
      <Navigation />
      <h1>It Works!</h1>
      <p>This React project just works including <span className={styles.redButton}>css-module</span> local styles.</p>
      <p>Enjoy!</p>
    </div>
    <Footer />
  </div>
);

export default App;
