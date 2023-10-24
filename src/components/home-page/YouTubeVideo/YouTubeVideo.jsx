import { Box } from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const YouTubeVideo = ({ videoLink }) => {
  // eslint-disable-next-line react/prop-types
  const videoId = videoLink?.split('v=')[1];

  return (
    <Box className='wfu' width={'full'} height={'500'}>
      <iframe
        width={'100%'}
        height={'100%'}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default YouTubeVideo;
