import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import baseURL from '../Utils/base_url';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetUserID } from '../Hooks/GetUserID';
import { ToastContainer, toast } from 'react-toastify';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState('');
  const [savedBooks,setSavedBooks] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const getallbooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/file/getbooks`);
        setBooks(response.data);
       
      } catch (err) {
        console.log("something went wrong");
      }
    };

    const fetchSavedBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/file/savedBooks/${userID}`);
        // setSavedBooks(response.data);
        setSavedBooks(response.data.savedBooks)
      } catch (err) {
        console.log(err);
      }
    }; 
    
    fetchSavedBooks()
    getallbooks();
  }, []);

  const saveBook = async (bookID)=>
    {
      try {
        const response = await axios.put(`${baseURL}/file`,
          {
            bookID,userID,
          }
        );
        toast.success("Great Choice. Added to Library!")
        setSavedBooks(response.data.savedBooks)
      } catch (err) {
        console.log("something went wrong");
      }
    }



  const handleViewPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const isbooksaved = (id)=> savedBooks.includes(id)
    

  return (
    <div className='p-5 transparent-bg'>
      <div className='p-3' style={{ marginTop: "-70px" }}>
        <h3 className='text-center mt-5'>
          <b>Try out these books from our community! Make sure to <span className='text-warning'>share your books too!</span></b>
        </h3>

        <div className='container mt-5 '>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'>
            {books.map((book) => (
              <div className='col' key={book._id}>
                <Card className='h-100' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia
                    style={{ height: '200px', objectFit: 'cover' }}
                    image={book.thumbnail}
                    title={book.bookName}
                  />
                  <CardContent style={{ flex: '1 1 auto', overflow: 'hidden' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.bookName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>saveBook(book._id)} className='btn btn-warning' size="small">
                      {
                        isbooksaved(book._id) ? <FavoriteIcon className='text-danger' /> : <FavoriteIcon className='text-secondary' />
                      }
                    </Button>



                    <Button onClick={() => handleViewPDF(book.pdfurl)} size="small" className='ms-auto'><VisibilityIcon className='text-primary' /></Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
                position="top-center"
                autoClose={2000}
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

export default AllBooks;
