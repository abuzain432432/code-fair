import {
  Container,
  Box,
  Text,
  HStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaTwitter,
  FaDribbble,
  FaLinkedin,
} from 'react-icons/fa';
import './Footer.css';
const Footer = () => {
  return (
    <Box
      bg='#26272b'
      py='24'
      fontSize='15px'
      lineHeight='24px'
      color='#737373'
    >
      <Box className='grid lg:grid-cols-9 mx-auto max-w-[1300px] w-[90%] gap-6'>
        <Box className='about-text-footer'>
          <Text
            color='#fff'
            fontSize='16px'
            textTransform='uppercase'
            mt='5px'
            letterSpacing='2px'
            marginBottom={2}
          >
            About
          </Text>
          <Text as='p' textAlign='justify'>
            At CodeFair, we are dedicated to empowering your creative
            journey. Our platform is built on a passion for innovation
            and a commitment to providing a space where talent
            thrives. Join our vibrant community and be part of a
            network that celebrates your projects, your ideas, and
            your unique perspective. Welcome to a world of limitless
            creativity and connection.
          </Text>
        </Box>
        <Box>
          <Text
            color='#fff'
            fontSize='16px'
            textTransform='uppercase'
            mt='5px'
            letterSpacing='2px'
            marginBottom={2}
          >
            Categories
          </Text>
          <UnorderedList listStyleType='none' pl='0'>
            <ListItem>Poster</ListItem>
            <ListItem>Coding</ListItem>
            <ListItem>Data science</ListItem>
            <ListItem>Research</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text
            color='#fff'
            fontSize='16px'
            textTransform='uppercase'
            mt='5px'
            letterSpacing='2px'
            marginBottom={2}
          >
            Pages
          </Text>
          <UnorderedList listStyleType='none' pl='0'>
            <ListItem>
              <a href='http://scanfcode.com/about/'>Home</a>
            </ListItem>
            <ListItem>
              <a href='http://scanfcode.com/contact/'>Projects</a>
            </ListItem>
            <ListItem>
              <a href='http://scanfcode.com/contribute-at-scanfcode/'>
                Post Project
              </a>
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
      <hr style={{ borderTopColor: '#bbb', opacity: 0.5 }} />
      <Container className='mt-2'>
        <HStack justifyContent='space-between'>
          <Text margin='0'>
            Copyright &copy; 2017 All Rights Reserved by{' '}
            <a href='#'>CodeFair</a>.
          </Text>
          <HStack spacing='6px'>
            <a href='#' className='social-icon'>
              <FaFacebook />
            </a>
            <a href='#' className='social-icon'>
              <FaTwitter />
            </a>
            <a href='#' className='social-icon'>
              <FaDribbble />
            </a>
            <a href='#' className='social-icon'>
              <FaLinkedin />
            </a>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
