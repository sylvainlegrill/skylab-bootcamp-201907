  
import React from 'react'

export default function() {

    return <>
      <footer className="footer">
          <div>
            <h1 className= "footer__title">JAMBA</h1>
          </div>
          <div className="footer__contact">
            <h6 className="footer__contact-title">Contact</h6>
            <address className="footer__contact-address"> 
                <br>Address: Carrer de Roc Boronat 35,</br>
                <br>08005, Barcelona </br>
                <br>hello@jamba.io</br>
            </address>       

          </div>
          <ul className="footer__social">
              <li className="footer__item"><a href="" className="fab fa-facebook-f" title="facebook"></a></li>
              <li className="footer__item"><a href="" className="fab fa-instagram" title="instagram"></a></li>
              <li className="footer__item"><a href="" className="fab fa-twitter" title="twitter"></a></li>
          </ul>      
      </footer>
    </>
}