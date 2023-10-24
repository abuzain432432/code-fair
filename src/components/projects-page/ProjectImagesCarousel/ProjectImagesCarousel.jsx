/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import { BASE_URL } from '../../../store/rtq-apis/api';

function ProjectImagesCarousel({ images }) {
  if (!images?.length) {
    return <div></div>;
  }
  console.log(images);
  return (
    <Box>
      <Carousel>
        {images?.map(imageSrc => (
          <img
            className='h-[350px] object-cover'
            key={imageSrc}
            src={`${BASE_URL}images/projects/${imageSrc}`}
          />
        ))}
      </Carousel>
    </Box>
  );
}

export default ProjectImagesCarousel;
