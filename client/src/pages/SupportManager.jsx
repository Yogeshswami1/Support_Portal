import React from 'react'
import SupportMngrNavbar from '../components/layout/SupportMngrNavbar.jsx';
import "./SupportHome.css";
import SupportFooter from '../components/layout/SupportFooter.jsx';


const SupportManager = () => {
  return (
    <>
     <SupportMngrNavbar/>
     <div className='mainHome'>
            <div className='heroTitle'><h1>PREMIUM SUPPORT<br/>AND HELP DESK</h1>
            </div>
            <div className='heroImg'>
              <img src="https://support.saumiccraft.com/wp-content/uploads/2023/05/support-illustration-600x698-1.png" alt="support" />
            </div>
        </div>
        <div className='video'>
          <div className='videoContent'>
            <h2>How to use support portal</h2>
          </div>
          <div className='childVideo'>
            <div className='innerVideo'> <h1>video 1</h1></div>
            <div className='innerVideo'>  <h1>video 2</h1></div>
            <div className='innerVideo'> <h1>video 3</h1></div>
          </div>
        </div>
        <SupportFooter/>
    </>
  )
};
export default SupportManager;