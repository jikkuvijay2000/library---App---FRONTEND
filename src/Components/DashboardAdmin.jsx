import React, { useEffect, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../Utils/base_url';


function DashboardAdmin() {
    const [usernumber,setUsernumber] = useState([])
    const [doc,setDoc]=useState([])

    useEffect(()=>
    {   
       const  totalUser =async ()=>
            {
                try
                {
                    const user = await axios.get(`${baseURL}/api/getallusers`);
                    setUsernumber(user.data);
                    console.log(usernumber.length);

                }catch(err)
                {
                    console.log(err);
                }
            }
            totalUser()
    },[])

    useEffect(()=>
    {
     const getAllDocument =async ()=>
      {
        try
        {
          const documentNumber = await axios.get(`${baseURL}/file/getbooks`);
          setDoc(documentNumber.data)
          console.log(doc);
  
        }catch(err)
        {
          console.log(err);
        }
      }
      getAllDocument()
    },[])

  return (
    <div>
      <h2 className='dashboard-title ms-5'><b>Dashboard</b></h2>

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 mb-4'>
            <div className='container text-center bg-primary rounded shadow p-5 text-white'>
              <h1 style={{fontSize:"54px"}} className='text-center'><b>{usernumber.length}</b></h1>
              <p style={{fontSize:"24px"}} className='text-center'>Total Users</p>
              

           
              
            </div>
          </div>
          <div className='col-md-6 mb-4'>
            <div className='container bg-warning rounded shadow p-5'>
            <h1 style={{fontSize:"54px"}} className='text-center'><b>{doc.length}</b></h1>
              <p style={{fontSize:"24px"}} className='text-center'>Total Books</p>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
