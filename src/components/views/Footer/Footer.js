import React from 'react'

function Footer() {
   return (
      <div className='footer'>
         <div className='section'>
            <div className='footer-section'>
               <div className='footer-column'>
                  <div className='column1'>
                     <h3>For Company</h3>
                     <a href=''>
                        <p>Aboutus</p>
                     </a>
                     <a href=''>
                        <p>Privacy Poilicy</p>
                     </a>
                     <a href=''>
                        <p>Terms And Condition</p>
                     </a>
                  </div>
               </div>
               <div className='footer-column'>
                  <div className='column2'>
                     <h3>For Customer</h3>
                     <a href=''>
                        <p>Login</p>
                     </a>
                     <a href=''>
                        <p>Sign Up</p>
                     </a>
                  </div>
               </div>
               <div className='footer-column'>
                  <div className='column3'>
                     <h3>For Restaurant</h3>
                     <a href=''>
                        <p>Restaurant Login</p>
                     </a>
                     <a href=''>
                        <p>Registration</p>
                     </a>
                  </div>
               </div>
            </div>
            <div className='footer-line'></div>
            <div className='footer-copyright'>
               <div className='left'>
                  <p>
                     © Copyrights <span>AT&A Retail Limited.</span> All Rights
                     Reserved.
                  </p>
               </div>
               <div className='right'>
                  <a href=''>
                     <i class='fab fa-twitter-square'></i>
                  </a>
                  <a href=''>
                     <i class='fab fa-instagram-square'></i>
                  </a>
                  <a href=''>
                     <i class='fab fa-linkedin'></i>
                  </a>
                  <a href=''>
                     <i class='fab fa-whatsapp-square'></i>
                  </a>
                  <a href=''>
                     <i class='fab fa-linkedin'></i>
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Footer
