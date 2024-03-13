import React from 'react';

const Footer = () => {
  return(
    <footer className='kiwano-footer'>
        <ul className='flex-1'>
          <li><h3>Kiwano Group</h3></li>
          <li><p>Kiwano group is a non-profit organization on a mission to <br/> streamline company onboarding.</p></li>
          <br></br>
        </ul>
        <ul className='flex-1'>
          <li><h3>Contact Info</h3></li>
          <li>1-800-KIWANOG</li>
          <li>kiwanogroup@kiwano.com</li>
          <li>support@kiwano.com</li>
        </ul>
        <ul className='flex-1'>
          <li><h3>Links</h3></li>
          <li><a href="#" className="kiwano-link">Corporate Sponsors</a></li>
          <li><a href="#" className="kiwano-link">Terms of Service</a></li>

        </ul>
    </footer>
  )
}

export default Footer;