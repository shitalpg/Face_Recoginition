import React from 'react'
import './Footer.css'
// import ImgGithub from './github.png'
// import ImgGmail from './gmail.png'
// import ImgLinkedin from './linkedin.png'


function Footer() {
    return (
        <div className='footer-container mx-auto flex flex-col items-center'>
            <p className="text-center mb-2">
          &copy; {new Date().getFullYear()} Criminal Or Missing Person Face Recongnition !
         </p>
            <div className='text-footer'>
                  <span className='font-semibold text-lg me-2'> Developed By </span>  Bhavika Karnawat, Vaibhav shinde, Pranita Tambe, Shivaprasad Potdar, 
                     Omkar Wagh
            </div>



        </div>
    )
}

export default Footer