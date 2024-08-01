import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import book1 from '../../src/assets/book3.jpg';
import book2 from '../../src/assets/book4.jpg';
import book3 from '../../src/assets/book5.jpg';
import book4 from '../../src/assets/book2.jpg';
import bg2 from '../../src/assets/bg2.jpg';

function Home() {
  const data = [
    {
      src: `${book2}`,
      title: 'His Dark Material',
      description: '4.21M views',
    },
    {
      src: `${book3}`,
      title: 'Harry Potter',
      description: '4.74M views',
    },
    {
      src: `${book1}`,
      title: 'A Song of Ice and Fire',
      description: '8.98M views',
    },
    {
      src: `${book4}`,
      title: 'Mountain view',
      description: '3.98M views',
    },
  ];

  return (
    <div className='p-3 mt-5'>
      <section>
        <div className='row p-4 rounded transparent-bg w-100 mx-auto'>
          <div className='col-md-6 p-5'>
            <h1>
              <b>
                <span className='text-warning'>Welcome Back!</span>, How are you today?
              </b>
            </h1>
            <p className='mt-4'>
              Everyday reading nourishes our knowledge by continually exposing us to new information, ideas, and perspectives, thereby expanding our understanding of the world. It also cultivates patience and focus, as we immerse ourselves in the intricate narratives and complex concepts that reading demands.
            </p>

            <h5 className='mt-5'>
              <b>
                What's your plan today <span className='text-warning'>Champ?</span>
              </b>
            </h5>

            <Link className='btn btn-primary mt-3 w-50' to={'/library'}>Go to Library</Link>
          </div>
          <div className='col-md-6 p-5'>
            <img style={{ marginTop: '-45px' }} className='rounded w-75 ms-5' src={bg2} alt='Welcome' />
          </div>
        </div>
      </section>

      <section className='bg-warning container rounded w-100 p-3 mt-5'>
        <div className='row p-5'>
          <div className='col-md-12'>
            <h3 className='text-center text-white'><b>Have something to share? Do upload your books in our readers community!</b></h3>
            <Link className='btn btn-primary text-center d-flex align-items-center justify-content-center mx-auto w-25 mt-4 p-2' to={'/uploadbooks'}> Upload Books </Link>

            <div className='mt-5 d-flex align-items-center justify-content-center'>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  py: 1,
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  '& > *': {
                    scrollSnapAlign: 'center',
                  },
                  '::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {data.map((item) => (
                  <Card orientation='horizontal' size='sm' key={item.title} variant='outlined'>
                    <AspectRatio ratio='1' sx={{ minWidth: 60 }}>
                      <img
                        srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.src}?h=120&fit=crop&auto=format`}
                        alt={item.title}
                      />
                    </AspectRatio>
                    <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
                      <Typography level='title-md'>{item.title}</Typography>
                      <Typography level='body-sm'>{item.description}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
