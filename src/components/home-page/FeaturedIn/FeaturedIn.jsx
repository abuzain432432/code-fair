import businessInsider from '../../../assets/business-insider.png';
import newYorkTimes from '../../../assets/the-new-york-times.png';
import forbes from '../../../assets/forbes.png';
import usaToday from '../../../assets/usa-today.png';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
function FeaturedIn() {
  return (
    <Box className='border-b border-b-gray-200' paddingY={10}>
      <Heading
        size={'sm'}
        color={'blackAlpha.300'}
        textTransform={'uppercase'}
        textAlign={'center'}
      >
        AS FEATURED IN
      </Heading>
      <Flex
        justifyContent={'center'}
        paddingY={5}
        className='lg:gap-10 gap-4'
      >
        <Image
          className='xl:h-[40px] sm:h-[30px] h-[15px]'
          style={{ filter: 'brightness(0) opacity(20%)' }}
          src={newYorkTimes}
        />
        <Image
          className='xl:h-[40px] sm:h-[30px] h-[15px]'
          style={{ filter: 'brightness(0) opacity(20%)' }}
          src={businessInsider}
        />
        <Image
          className='xl:h-[40px] sm:h-[30px] h-[15px]'
          style={{ filter: 'brightness(0) opacity(20%)' }}
          src={usaToday}
        />
        <Image
          className='xl:h-[40px] sm:h-[30px] h-[15px]'
          style={{ filter: 'brightness(0) opacity(20%)' }}
          src={forbes}
        />
      </Flex>
    </Box>
  );
}

export default FeaturedIn;
