import React from 'react';

const Header = () => (
  <header id="site-header" className="header-one fixed-scroll shrink-sticky-header clr dyn-styles">
    <div id="site-header-inner" className="container clr">
      <div id="site-logo" className="site-branding clr header-one-logo"><div id="site-logo-inner" className="clr">
        <p className="woocommerce-mini-cart__empty-message">No products in the cart.</p>
        <p className="woocommerce-mini-cart__buttons buttons wcppec-cart-widget-spb"></p>
      </div>
      </div>
    </div>
  </header>
);

export default Header;
