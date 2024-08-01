import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import baseURL from '../Utils/base_url';
import { useGetUserID } from '../Hooks/GetUserID';

function Library() {
  const [savedBooks, setSavedBooks] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        if (userID) {
          const response = await axios.get(`${baseURL}/file/viewsavedBooks/${userID}`);
          setSavedBooks(response.data.savedBooks);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedBooks();
  }, [userID]);

  const handleViewPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className='p-5 transparent-bg'>
      <div className='p-3' style={{ marginTop: "-70px" }}>
        <h3 className='text-center mt-5'>
          <b>Welcome to your<span className='text-warning'> Library!</span> Start reading your favourites!</b>
        </h3>

        <div className='container mt-5'>
          {savedBooks.length === 0 ? (
            <div className='text-center'>
              <Typography variant="h6">No saved books available</Typography>
            </div>
          ) : (
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'>
              {savedBooks.map((book) => (
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
                      <Button onClick={() => handleViewPDF(book.pdfurl)} size="small" className='ms-auto'>
                        <VisibilityIcon className='text-primary' />
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Library;
