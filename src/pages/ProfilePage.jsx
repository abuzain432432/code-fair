import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  Image,
  Tabs,
  TabPanels,
  Tab,
  TabList,
  TabPanel,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../store/redux/userAuthSlice';

import { useState } from 'react';
import { useRef } from 'react';
import { RiFileUploadLine } from 'react-icons/ri';
// import { HiOutlineXMark } from 'react-icons/hi2';
import {
  BASE_URL,
  useUpdateMeMutation,
  useUpdateUserPasswordMutation,
} from '../store/rtq-apis/api';
import { toast } from 'react-toastify';
function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}
function ProfilePage() {
  const user = useSelector(getUser);
  const [selectedImages, setSelectedImages] = useState({
    url: `${BASE_URL}images/users/${user?.photo}`,
  });
  const [updateUser, { error, isLoading, data: updateUserData }] =
    useUpdateMeMutation();
  const [
    updateUserPassword,
    {
      error: updatePasswordError,
      isLoading: isUpdatingPassword,
      data,
    },
  ] = useUpdateUserPasswordMutation();

  const imageRef = useRef();

  useEffect(() => {
    if (error?.data) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  }, [error?.data]);
  useEffect(() => {
    document.title = `${user?.firstName} ${user?.lastName} | Codefair`;
  }, [user]);
  useEffect(() => {
    if (data) {
      toast.success(data?.message);
    }
  }, [data]);
  useEffect(() => {
    if (updateUserData) {
      toast.success('User details updated successfully');
    }
  }, [updateUserData]);

  useEffect(() => {
    console.log(updatePasswordError?.data);
    if (updatePasswordError?.data) {
      toast.error(
        updatePasswordError?.data?.message || 'Something went wrong'
      );
    }
  }, [updatePasswordError?.data]);

  const handleFormSubmit = values => {
    const updateUserData = new FormData();
    updateUserData.append('firstName', values.firstName);
    updateUserData.append('lastName', values.lastName);
    if (selectedImages?.file)
      updateUserData.append('photo', selectedImages.file);
    updateUser({
      userData: updateUserData,
      token: user?.token,
    });
  };
  const handleChangeFormSubmit = values => {
    updateUserPassword({ userData: values, token: user?.token });
  };

  return (
    <Box className=''>
      <Tabs className='max-w-[1400px] w-[90%] mx-auto'>
        <TabList className='bg-white mt-3 py-1 border border-gray-200 px-2 mx-4 shadow-sm'>
          <Tab>Personal details</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box className=' mt-3 p-4  sm:p-6  lg:py-6 lg:px-12  border border-gray-200   shadow-sm'>
              <Formik
                initialValues={{
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  email: user?.email,
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
                        disabled={true}
                        className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                        name='email'
                      />
                    </FormControl>
                    <Box>
                      <Text
                        mb={2}
                        fontWeight={'bold'}
                        color={'teal.800'}
                      >
                        Profile Image
                      </Text>
                      <Box name='images'>
                        <>
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
                              const imagesToPreview = {
                                url: URL.createObjectURL(files[0]),
                                file: files[0],
                              };
                              setSelectedImages(imagesToPreview);
                            }}
                          />
                        </>
                      </Box>
                    </Box>
                    <Box className='flex mt-4 gap-5'>
                      <Box
                        onClick={() => {
                          imageRef.current.click();
                        }}
                        className='w-[100px] image-box rounded-full overflow-hidden h-[100px] relative '
                        key={
                          selectedImages?.url &&
                          `${BASE_URL}images/user/${
                            user?.photo
                          }?k=${Math.random()}`
                        }
                      >
                        <Image
                          className='object-cover w-full h-full'
                          src={selectedImages?.url}
                        />
                        <Box className='w-full flex justify-center items-center h-full hover:opacity-50 cursor-pointer duration-150 absolute top-0 opacity-5 bg-gray-50'>
                          <RiFileUploadLine size={24} color='teal' />
                        </Box>
                      </Box>
                      {/* ))} */}
                    </Box>

                    <Button
                      isLoading={isLoading}
                      size={['md', 'lg']}
                      mt={6}
                      textTransform={'uppercase'}
                      color={'white'}
                      bg={'teal.200'}
                      type='submit'
                      _hover={{ bg: 'teal.300' }}
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box className=' mt-3 p-4  sm:p-6  lg:py-6 lg:px-12  border border-gray-200   shadow-sm'>
              <Formik
                initialValues={{
                  passwordCurrent: '',
                  password: '',
                  passwordConfirm: '',
                }}
                onSubmit={handleChangeFormSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormControl className='md:mb-6 mb-3'>
                      <FormLabel
                        fontWeight={'bold'}
                        color={'teal.800'}
                        htmlFor='passwordCurrent'
                      >
                        Current Password :
                      </FormLabel>
                      <Field
                        className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                        name='passwordCurrent'
                        validate={validateRequired}
                      />
                      {errors.passwordCurrent &&
                        touched.passwordCurrent && (
                          <Text
                            size='sm'
                            fontWeight={'semibold'}
                            className='text-red-600'
                          >
                            {errors.passwordCurrent}
                          </Text>
                        )}
                    </FormControl>
                    <FormControl className='md:mb-6 mb-3'>
                      <FormLabel
                        fontWeight={'bold'}
                        color={'teal.800'}
                        htmlFor='password'
                      >
                        New Password :
                      </FormLabel>
                      <Field
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
                    <FormControl className='md:mb-6 mb-3'>
                      <FormLabel
                        fontWeight={'bold'}
                        color={'teal.800'}
                        htmlFor='passwordConfirm'
                      >
                        Confirm Password :
                      </FormLabel>
                      <Field
                        validate={validateRequired}
                        className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                        name='passwordConfirm'
                      />

                      {errors.passwordConfirm &&
                        touched.passwordConfirm && (
                          <Text
                            size='sm'
                            fontWeight={'semibold'}
                            className='text-red-600'
                          >
                            {errors.passwordConfirm}
                          </Text>
                        )}
                    </FormControl>

                    <Button
                      isLoading={isUpdatingPassword}
                      size={['md', 'lg']}
                      mt={6}
                      textTransform={'uppercase'}
                      color={'white'}
                      bg={'teal.200'}
                      type='submit'
                      _hover={{ bg: 'teal.300' }}
                    >
                      Update
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ProfilePage;
