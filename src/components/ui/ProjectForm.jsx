import { useEffect, useState, useRef } from 'react';
import { RiFileUploadLine } from 'react-icons/ri';
import { HiOutlineXMark } from 'react-icons/hi2';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Select,
  Button,
  Textarea,
  Input,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Image,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useCreateProjectMutation } from '../../store/rtq-apis/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/redux/userAuthSlice';

const EMAIL_REGIX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
function validateRequired(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}
function validateEmailsArray(emailsArray) {
  const hasErrors = emailsArray.some(inputData => {
    return !EMAIL_REGIX.test(inputData.value);
  });
  return hasErrors;
}
export const FieldLevelValidationExample = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, value: '', selected: false, error: '' },
  ]);
  const [createProject, { data, error, isLoading }] =
    useCreateProjectMutation();
  const user = useSelector(getUser);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesError, setSelectedImagesError] = useState('');
  const imageRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (teamMembers.length <= 4) {
      setAlertVisible('');
    }
  }, [teamMembers, setAlertVisible]);

  const addTeamMemberInput = () => {
    const hasErrors = validateEmailsArray(teamMembers);

    console.log(teamMembers.length > 4);

    if (hasErrors) {
      setTeamMembers(preState =>
        preState.map(inputData => {
          if (!EMAIL_REGIX.test(inputData.value)) {
            return {
              ...inputData,
              error: 'Invalid input (must be a valid email address)',
            };
          }
          return inputData;
        })
      );
    } else if (teamMembers.length >= 4) {
      console.log('Run');
      setAlertVisible(
        'You can add a minimum of 1 team member and a maximum of 4 team member details. If you want to add another team member, you must first delete the previous ones.'
      );
    } else {
      setTeamMembers(preState => [
        ...preState,
        { id: Math.random(), value: '', selected: false, error: '' },
      ]);
    }
  };

  const handleConfirmMember = id => {
    setTeamMembers(preState => {
      const newState = preState.map(inputData => {
        if (inputData.id === id) {
          if (!EMAIL_REGIX.test(inputData.value)) {
            return {
              ...inputData,
              error: 'Invalid input (must be a valid email address)',
            };
          } else {
            return {
              ...inputData,
              error: '',
              selected: true,
            };
          }
        } else {
          return inputData;
        }
      });
      return newState;
    });
  };
  const handleUpdateMember = id => {
    setTeamMembers(preState =>
      preState.map(inputData =>
        inputData.id === id
          ? { ...inputData, selected: false }
          : inputData
      )
    );
  };
  const handleDeleteMember = id => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(preState =>
      preState.filter(inputData => inputData.id !== id)
    );
  };
  const handleInputChange = function (e) {
    const value = e.target.value;

    setTeamMembers(preState =>
      preState.map(inputData =>
        inputData.id === this.id
          ? { ...inputData, value: value, error: '' }
          : inputData
      )
    );
  };
  const formBtnClick = () => {
    const hasErrors = validateEmailsArray(teamMembers);
    setSelectedImagesError(!selectedImages.length);
    if (hasErrors) {
      setTeamMembers(preState =>
        preState.map(inputData => {
          if (!EMAIL_REGIX.test(inputData.value)) {
            return {
              ...inputData,
              error: 'Invalid input (must be a valid email address)',
            };
          }
          return inputData;
        })
      );
    }
  };
  const handleFormSubmit = values => {
    const hasErrors = validateEmailsArray(teamMembers);
    if (hasErrors || selectedImagesError) return;
    const projectData = new FormData();
    projectData.append('description', values.projectDescription);
    projectData.append('name', values.projectName);
    projectData.append('summary', values.summary);
    projectData.append('difficulty', values.projectDifficulty);
    projectData.append('category', values.projectCategory);
    projectData.append(
      'photos',
      selectedImages.map(imageObject => imageObject?.file)
    );
    projectData.append('groupSize', selectedImages.length);
    projectData.append(
      'members',
      teamMembers.map(teamMemberObject => teamMemberObject.value)
    );
    console.log('selected images');
    console.log(selectedImages.map(imageObject => imageObject?.file));
    createProject({ projectData: projectData, token: user?.token });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data?.message || 'Somethig went wrong');
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      navigate('/projects');
    }
  }, [data, navigate]);
  const handleSelectedImageRemove = url => {
    setSelectedImages(preState =>
      preState.filter(imageData => imageData.url !== url)
    );
  };

  return (
    <div className='min-h-[100vh]'>
      <Box className='max-w-[1000px] w-[90%] py-8 mt-6 md:mt-8 lg:mt-16 shadow-lg hover:shadow-3xl duration-300 hover:scale-[1.03] rounded-md px-6 sm:px-8 form mx-auto '>
        <Heading
          color={'teal.800'}
          mb={[4, 8]}
          as={'h1'}
          size={['lg', 'xl']}
        >
          Designing the Visual Story
        </Heading>

        <Formik
          initialValues={{
            projectName: '',
            projectCategory: '',
            projectDifficulty: '',
            summary: '',
            projectDescription: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl className='mb-6'>
                <FormLabel
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='projectName'
                >
                  Project Name :
                </FormLabel>
                <Field
                  className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200 input'
                  name='projectName'
                  validate={validateRequired}
                />
                {errors.projectName && touched.projectName && (
                  <Text
                    size='sm'
                    fontWeight={'semibold'}
                    className='text-red-600'
                  >
                    {errors.projectName}
                  </Text>
                )}
              </FormControl>

              <FormControl className='mb-6'>
                <FormLabel
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='projectCategory'
                >
                  Project Category :
                </FormLabel>
                <Field
                  size='lg'
                  bg='white'
                  _focusVisible={{ borderColor: 'gray.400' }}
                  as={Select}
                  className='block w-full focus-visible:border-none focus-visible:shadow-none  border outline-none px-4 border-gray-200'
                  name='projectCategory'
                  validate={validateRequired}
                >
                  <option value=''>Select a category</option>
                  <option value='poster'>Poster</option>
                  <option value='coding'>Coding</option>
                  <option value='data_science'>Data Science</option>
                  <option value='research'>Research</option>
                </Field>
                {errors.projectCategory &&
                  touched.projectCategory && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.projectCategory}
                    </Text>
                  )}
              </FormControl>

              <FormControl className='mb-6'>
                <FormLabel
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='projectDifficulty'
                >
                  Project Difficulty :
                </FormLabel>
                <Field
                  size='lg'
                  bg='white'
                  _focusVisible={{ borderColor: 'gray.400' }}
                  as={Select}
                  className='block w-full focus-visible:border-none focus-visible:shadow-none  border outline-none px-4 border-gray-200'
                  name='projectDifficulty'
                  validate={validateRequired}
                >
                  <option value=''>Select project difficulty</option>
                  <option value='proficient'>Proficient</option>
                  <option value='capable'>Capable</option>
                  <option value='developing'>Developing</option>
                  <option value='novice'>Novice</option>
                </Field>
                {errors.projectDifficulty &&
                  touched.projectDifficulty && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.projectDifficulty}
                    </Text>
                  )}
              </FormControl>

              <FormControl className='mb-6'>
                <FormLabel
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='projectDescription'
                >
                  Project Description :
                </FormLabel>
                <Field
                  bg={'white'}
                  as={Textarea}
                  className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200'
                  name='projectDescription'
                  validate={validateRequired}
                />
                {errors.projectDescription &&
                  touched.projectDescription && (
                    <Text
                      size='sm'
                      fontWeight={'semibold'}
                      className='text-red-600'
                    >
                      {errors.projectDescription}
                    </Text>
                  )}
              </FormControl>
              <FormControl className='mb-6'>
                <FormLabel
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='summary'
                >
                  Summary :
                </FormLabel>
                <Field
                  bg={'white'}
                  as={Textarea}
                  className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200'
                  name='summary'
                  validate={validateRequired}
                />
                {errors.summary && touched.summary && (
                  <Text
                    size='sm'
                    fontWeight={'semibold'}
                    className='text-red-600'
                  >
                    {errors.summary}
                  </Text>
                )}
              </FormControl>
              {alertVisible && (
                <Alert className='mb-' status='error'>
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{alertVisible}</AlertDescription>
                </Alert>
              )}

              <Box className='mb-6'>
                <Text
                  mb={2}
                  fontWeight={'bold'}
                  color={'teal.800'}
                  htmlFor='teamMembers'
                >
                  Team Members:
                </Text>
                <Box>
                  {teamMembers.map((inputData, index) => (
                    <>
                      <Flex
                        gap={4}
                        className='flex mt-4'
                        key={inputData.id}
                      >
                        <Input
                          size={'lg'}
                          value={inputData.value}
                          onChange={handleInputChange.bind({
                            id: inputData.id,
                          })}
                          disabled={inputData.selected}
                          bg={'white'}
                          className='block w-full py-2.5 border outline-none px-4 rounded-md border-gray-200'
                          name={`teamMembers-${index}`}
                        />

                        {inputData.selected && (
                          <Button
                            size={'lg'}
                            onClick={handleUpdateMember.bind(
                              null,
                              inputData.id
                            )}
                          >
                            Update
                          </Button>
                        )}
                        {!inputData.selected && (
                          <Button
                            size={'lg'}
                            onClick={handleConfirmMember.bind(
                              null,
                              inputData.id
                            )}
                          >
                            Confirm
                          </Button>
                        )}
                        <Button
                          size={'lg'}
                          onClick={handleDeleteMember.bind(
                            null,
                            inputData.id
                          )}
                        >
                          Delete
                        </Button>
                      </Flex>

                      {inputData.error && (
                        <Text
                          size='sm'
                          fontWeight={'semibold'}
                          className='text-red-600'
                        >
                          {inputData.error}
                        </Text>
                      )}
                    </>
                  ))}
                  <Button
                    size={'lg'}
                    variant='outline'
                    onClick={addTeamMemberInput}
                    mt={6}
                    mb={2}
                  >
                    Add Team Member
                  </Button>
                </Box>
              </Box>
              <Box>
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
                      multiple
                      max={4}
                      min={1}
                      onChange={event => {
                        const files = Array.from(event.target.files);
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
              </Box>
              <Box className='flex mt-4 gap-5'>
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
              </Box>

              <Button
                isLoading={isLoading}
                size={['md', 'lg']}
                mt={6}
                onClick={formBtnClick}
                _hover={{ backgroundColor: 'teal.200', opacity: 0.9 }}
                textTransform={'uppercase'}
                color={'white'}
                bg={'teal.200'}
                type='submit'
              >
                Create project
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default FieldLevelValidationExample;
