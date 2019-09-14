  
import React from 'react'

export default function() {

    return <>
      <footer class="footer">
          <div>
            <h1 class= "footer__title">JAMBA</h1>
          </div>
          <div class="footer__contact">
            <h6 class="footer__contact-title">Contact</h6>
            <address class="footer__contact-address"> 
                <br>Address: Carrer de Roc Boronat 35,</br>
                <br>08005, Barcelona </br>
                <br>hello@jamba.io</br>
            </address>       

          </div>
          <ul class="footer__social">
              <li class="footer__item"><a href="" class="fab fa-facebook-f" title="facebook"></a></li>
              <li class="footer__item"><a href="" class="fab fa-instagram" title="instagram"></a></li>
              <li class="footer__item"><a href="" class="fab fa-twitter" title="twitter"></a></li>
          </ul>      
      </footer>
    </>
}