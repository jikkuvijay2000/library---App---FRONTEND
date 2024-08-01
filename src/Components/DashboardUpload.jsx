import axios from 'axios'
import React, { useEffect, useState } from 'react'
import baseURL from '../Utils/base_url'
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';

function DashboardUpload() {

    const [doc, setDoc] = useState([])
    
 

    useEffect(() => {
        const getDocument = async () => {
            
            try {
                const response = await axios.get(`${baseURL}/file/getbooks`)
                setDoc(response.data)
               

            } catch (err) {
                console.log(err)
            }
        }


        getDocument()
    }, [])

    const handleDeleteBook =async(docID)=>
        {
           
            try
            {
                const bookDelete=await axios.delete(`${baseURL}/file/delete/${docID}`
                   
                )
                toast.warning(`Book Deleted`)
                const remainingBook = doc.filter(docs=>docs._id!=docID)
                setDoc(remainingBook)


            }catch(err)
            {
            toast.error(err) 
            }
        }

    return (
        <div className='p-5' style={{marginTop:"-70px"}}>
            <div className='container p-5'>
                <h2><b>Uploaded Files</b></h2>
                <p>Manage uploaded files here. All files will be updated here according to each user!</p>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Book Name</th>
                            <th>Description</th>
                            <th>Uploaders</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doc.length > 0 ? (
                                doc.map((docs, index) => (
                                    <tr key={docs._id}>
                                        <td>{index + 1}</td>
                                        <td>{docs.bookName}</td>
                                        <td className='w-25'>{docs.description}</td>
                                        <td>{docs.uploadedby}</td>
                                        <td>
                                            
                                            <button onClick={()=>handleDeleteBook(docs._id)} className='btn btn-danger'><DeleteIcon/></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No files uploaded!</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default DashboardUpload
