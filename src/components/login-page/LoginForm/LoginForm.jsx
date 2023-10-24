import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useLoginMutation } from '../../../store/rtq-apis/api';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/redux/userAuthSlice';
import { Link, useNavigate } from 'react-router-dom';

function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}
function validateEmail(value) {
  let errors;
  if (!value) {
    errors = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    errors = 'Invalid email address';
  }
  return errors;
}
export const LoginForm = () => {
  const [login, { data, error, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async values => {
    const credentials = {
      email: values.userName,
      password: values.password,
    };
    login(credentials);
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

  return (
    <Box className='min-h-[100vh]'>
      <Box className='grid grid-cols-1 md:grid-cols-2  mt-16  form max-w-[1400px] w-[90%] shadow-2xl hover:shadow-3xl duration-300 hover:scale-[1.03] rounded-md  mx-auto '>
        <Box className='w-full h-full hidden md:flex justify-center items-center'>
          <Link to={'/signup'}>
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
            Login to CodeFair
          </Heading>

          <Formik
            initialValues={{
              userName: '',
              password: '',
            }}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='userName'
                  >
                    Email:
                  </FormLabel>
                  <Field
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                    name='userName'
                    validate={validateEmail}
                  />
                  {errors.userName && touched.userName && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.userName}
                    </Text>
                  )}
                </FormControl>

                <FormControl className='md:mb-6 mb-3'>
                  <FormLabel
                    fontWeight={'bold'}
                    color={'teal.800'}
                    htmlFor='password'
                  >
                    Password:
                  </FormLabel>
                  <Field
                    bg={'white'}
                    as={Input}
                    size={'lg'}
                    className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200'
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
                  Login Now
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
