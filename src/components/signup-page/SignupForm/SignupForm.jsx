import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Button,
  // Input,
  // Image,
} from '@chakra-ui/react';
// import { RiFileUploadLine } from 'react-icons/ri';

import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
// import { useRef, useState } from 'react';
// import { HiOutlineXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../../store/rtq-apis/api';
import { setUser } from '../../../store/redux/userAuthSlice';
import { toast } from 'react-toastify';
function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

export const SignupForm = () => {
  // const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedImagesError, setSelectedImagesError] = useState('');
  const [signup, { data, error, isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const imageRef = useRef();
  const handleFormSubmit = async values => {
    const credientials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      passwordConfirm: values.password,
    };
    signup(credientials);

    // if (selectedImages.length) {
    //   const signupData = new FormData();
    //   signupData.append('firstName', values.firstName);
    //   signupData.append('lastName', values.lastName);
    //   signupData.append('email', values.email);
    //   signupData.append('password', values.password);
    //   signupData.append('passwordConfirm', values.password);
    //   console.log(signupData);
    //   signup(signupData);
    // }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.data?.message);
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      dispatch(setUser({ token: data.token, ...data.user }));
      navigate('/home');
    }
  }, [data, dispatch, navigate]);

  // const handleSelectedImageRemove = url => {
  //   setSelectedImages(preState =>
  //     preState.filter(imageData => imageData.url !== url)
  //   );
  // };
  // const formBtnClick = () => {
  //   setSelectedImagesError(!selectedImages.length);
  // };
  return (
    <Box className='min-h-[100vh]'>
      <Box className='grid grid-cols-1 md:grid-cols-2  mt-10 form max-w-[1400px] w-[90%] shadow-2xl hover:shadow-3xl duration-300 hover:scale-[1.03] rounded-md  mx-auto '>
        <Box className='w-full h-full hidden md:flex justify-center items-center'>
          <Link to={'/login'}>
            <Button
              _hover={{ bg: 'teal.300' }}
              size={'lg'}
              textTransform={'uppercase'}
              color={'white'}
              bg={'teal.200'}
            >
              Singup Now
            </Button>
          </Link>
        </Box>
        <Box className='bg-white md:py-16 px-6 sm:px-8 py-6 md:border-none border border-gray-200  lg:py-24 lg:px-14 '>
          <Heading
            color={'teal.800'}
            mb={[4, 8]}
            as={'h1'}
            size={['lg', 'xl']}
          >
            Sigup to CodeFair
          </Heading>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              password: '',
              email: '',
            }}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='firstName'
                  >
                    First Name :
                  </FormLabel>
                  <Field
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                    name='firstName'
                    validate={validateRequired}
                  />
                  {errors.firstName && touched.firstName && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.firstName}
                    </Text>
                  )}
                </FormControl>
                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='lastName'
                  >
                    Last Name :
                  </FormLabel>
                  <Field
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                    name='lastName'
                    validate={validateRequired}
                  />
                  {errors.lastName && touched.lastName && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.lastName}
                    </Text>
                  )}
                </FormControl>
                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='email'
                  >
                    Email :
                  </FormLabel>
                  <Field
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                    name='email'
                    validate={validateRequired}
                  />
                  {errors.email && touched.email && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.email}
                    </Text>
                  )}
                </FormControl>
                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='password'
                  >
                    Password :
                  </FormLabel>
                  <Field
                    type='password'
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                    name='password'
                    validate={validateRequired}
                  />
                  {errors.password && touched.password && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.password}
                    </Text>
                  )}
                </FormControl>
                {/* <Box>
                  <Text mb={2} fontWeight={'bold'} color={'teal.800'}>
                    Upload Images
                  </Text>
                  <Box name='images'>
                    <>
                      <Button
                        size={'lg'}
                        className='bg-white w-full cursor-pointer'
                        onClick={() => {
                          imageRef.current.click();
                          setSelectedImagesError('');
                        }}
                      >
                        <RiFileUploadLine size={24} color='teal' />
                      </Button>
                      <Input
                        ref={imageRef}
                        bg='white'
                        size='lg'
                        className='hidden'
                        type='file'
                        accept='image/*'
                        onChange={event => {
                          const files = Array.from(
                            event.target.files
                          );
                          console.log(files);

                          // Display a preview of the selected images
                          const imagesToPreview = files
                            .slice(0, 4)
                            .map(file => ({
                              url: URL.createObjectURL(file),
                              file,
                            }));
                          setSelectedImages(imagesToPreview);
                        }}
                      />
                      {selectedImagesError && (
                        <Text
                          size='sm'
                          fontWeight={'semibold'}
                          className='text-red-600'
                        >
                          Required
                        </Text>
                      )}
                    </>
                  </Box>
                </Box> */}
                {/* <Box className='flex mt-4 gap-5'>
                  {selectedImages.map(file => (
                    <Box
                      className='w-[100px] image-box rounded-lg overflow-hidden h-[100px] relative '
                      key={file.url}
                    >
                      <Image
                        className='object-cover w-full h-full'
                        src={file.url}
                      />
                      <Box className='w-full h-full hover:opacity-50 cursor-pointer duration-150 absolute top-0 opacity-10 bg-gray-50'></Box>
                      <Button
                        onClick={handleSelectedImageRemove.bind(
                          null,
                          file.url
                        )}
                        className='icon-btn'
                      >
                        <HiOutlineXMark color='white' size={16} />
                      </Button>
                    </Box>
                  ))}
                </Box> */}

                <Button
                  isLoading={isLoading}
                  // onClick={formBtnClick}
                  size={['md', 'lg']}
                  mt={6}
                  textTransform={'uppercase'}
                  color={'white'}
                  bg={'teal.200'}
                  type='submit'
                  _hover={{ bg: 'teal.300' }}
                >
                  Singup Now
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupForm;
