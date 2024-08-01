import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import baseURL from '../Utils/base_url';
import { ToastContainer, toast } from 'react-toastify';

function UploadBooks() {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [bookdata, setBookdata] = useState({
    bookName: '',
    thumbnail: '',
    description: '',
    file: null,
  });

  const [fileName, setFileName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedby = window.localStorage.getItem('userID');
    const token = uploadedby;

    const formData = new FormData();
    formData.append('bookName', bookdata.bookName);
    formData.append('thumbnail', bookdata.thumbnail);
    formData.append('description', bookdata.description);
    formData.append('file', bookdata.file);
    formData.append('uploadedby', uploadedby);

    try {
      await axios.post(`${baseURL}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      toast.success('Hurray! Upload successfull! Thank you again!');
      setBookdata({
        bookName: '',
        thumbnail: '',
        description: '',
        file: null,
      });
      setFileName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadButton = (e) => {
    const file = e.target.files[0];
    setBookdata({ ...bookdata, file });
    setFileName(file.name); 
  };

  return (
    <div className='transparent-bg p-5'>
      <div className='container w-50 p-2  '>
        <h2 className='text-center mt-5'>
          <b>Have some books to share ?<span className='text-warning'> Upload here!</span></b>
        </h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          className='mt-4 p-5'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '50vh',
            '& .MuiTextField-root': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
          className='mt-2'
            id="standard-multiline-flexible"
            label="Book Name"
            placeholder='Give your book name'
            multiline
            maxRows={4}
            variant="standard"
            value={bookdata.bookName}
            onChange={(e) => setBookdata({ ...bookdata, bookName: e.target.value })}
          />
          <TextField
            id="standard-textarea"
            label="Thumbnail"
            placeholder="Place the Link here"
            multiline
            variant="standard"
            value={bookdata.thumbnail}
            onChange={(e) => setBookdata({ ...bookdata, thumbnail: e.target.value })}
          />
          <TextField
            id="standard-textarea"
            label="Description"
            placeholder="Give us a little Description"
            multiline
            variant="standard"
            value={bookdata.description}
            onChange={(e) => setBookdata({ ...bookdata, description: e.target.value })}
          />
          <Button
          className='mt-3'
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input type="file" hidden onChange={handleUploadButton} />
          </Button>
          {fileName && <p className='mt-2'>Uploaded File: {fileName}</p>}
          <p className='mt-2 text-danger'>Your file should be in PDF Format! Make sure your PDF is under 10mb</p>
          <button type="submit" className='btn btn-warning w-75 mt-3 p-2'>Submit</button>
        </Box>
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
  );
}

export default UploadBooks;
