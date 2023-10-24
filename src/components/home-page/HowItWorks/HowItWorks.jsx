import { Box, Heading } from '@chakra-ui/react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

function HowItWorks() {
  return (
    <Box bg={'gray.50'}>
      <Box className='mx-auto w-[90%]  max-w-[1000px]' py={'24'}>
        <Heading
          marginBottom={10}
          textAlign={'center'}
          size={'2xl'}
          color={'blackAlpha.800'}
        >
          How CodeFair Works
        </Heading>
        <YouTubeVideo videoLink='https://www.youtube.com/watch?v=atNM0QFLPTw' />
      </Box>
    </Box>
  );
}

export default HowItWorks;
