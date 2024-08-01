import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <div>

<MDBFooter className='text-center text-white mt-5  ' style={{ backgroundColor: '#f1f1f1' }}>
      
        

      <div className='text-center bg-primary text-light p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
           Jikku Vijay
        </a>
      </div>
    </MDBFooter>

    </div>
  )
}

export default Footer