import { Heading, Text, Flex } from '@chakra-ui/react';

import styles from './HeroSection.module.css';
import { Link } from 'react-router-dom';
function HeroSection() {
  return (
    <>
      <Flex py={'16'} bgColor={'teal.100'}>
        <Flex
          gap={10}
          className='max-w-[1400px] w-[90%] mx-auto'
          direction={'row'}
        >
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            flex={'1'}
            width={'50%'}
          >
            <Heading
              color={'teal.900'}
              width={'full'}
              textAlign={'left'}
              as='h1'
              size={['xl', '2xl', '3xl']}
              noOfLines={2}
            >
              Welcome to CodeFair -
            </Heading>
            <Heading
              color={'teal.900'}
              width={'full'}
              textAlign={'left'}
              marginBottom={'4'}
              as='h1'
              size={['xl', '2xl', '3xl']}
              noOfLines={2}
            >
              Explore, Share, and Elevate Your Creations!
            </Heading>

            <Text marginBottom={'4'} fontSize='xl'>
              Are you ready to unlock the potential of your projects
              and connect with a thriving community of creators?
              Introducing CodeFair, your ultimate platform to bring
              your ideas to life, share your work with the world, and
              take your projects to new heights.
            </Text>
            <Flex width={'full'} direction={'row'}>
              <Link
                to={'/projects'}
                className='bg-teal-400 hover:bg-teal-300 text-white px-8 uppercase py-3 font-bold text-lg'
              >
                Explore Projects
              </Link>
            </Flex>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flex={'1'}
            className={styles.heroImageCon}
            height={'100%'}
          >
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              flex={'1'}
            >
              <div
                className={styles.heroImage}
                // backdropFilter='blur(5px)'
                // filter='grayscale(100%) blur(5px)'
                // src={HeroImage}
                alt='Dan Abramov'
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default HeroSection;
