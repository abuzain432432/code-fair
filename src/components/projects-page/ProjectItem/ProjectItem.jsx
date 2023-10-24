/* eslint-disable react/prop-types */
import './ProjectItem.css';
import {
  Box,
  Button,
  Image as ChakraUiImage,
  Flex,
  Heading,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  BASE_URL,
  useDeleteProjectMutation,
  useLazyProjectDetailsQuery,
} from '../../../store/rtq-apis/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoading,
  getSelectedProjectId,
  storeError,
  storeLoading,
  storeProject,
  storeSelectedProjectId,
} from '../../../store/redux/projectDetailsSlice';
import { useEffect } from 'react';
import { getUser } from '../../../store/redux/userAuthSlice';
import { toast } from 'react-toastify';
// eslint-disable-next-line react/prop-types
function ProjectItem({
  category,
  description,
  ownerFirstName,
  ownerLastName,
  ownerId,
  members,
  name,
  photos,
  id,
}) {
  const [trigger, result] = useLazyProjectDetailsQuery();
  const isPosterCard = category === 'poster';
  const isCodingCard = category === 'coding';
  const isResearchCard = category === 'research';
  const isDataScienceCard = category === 'data_science';
  const selectedProjectId = useSelector(getSelectedProjectId);
  const projectDetailsLoading = useSelector(getLoading);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [
    deleteProject,
    {
      // data: deletedProjectData,
      error: deletedProjectError,
      isLoading: isLoadingDeleteProject,
    },
  ] = useDeleteProjectMutation();

  useEffect(() => {
    if (deletedProjectError) {
      console.log(deletedProjectError?.data?.message);
      toast.error(
        deletedProjectError?.data?.message || 'Something went wrong'
      );
    }
  }, [deletedProjectError]);

  useEffect(() => {
    if (result?.data?.data) {
      dispatch(storeProject({ project: result.data.data[0] }));
    }
  }, [result.data, dispatch]);

  useEffect(() => {
    if (result.isFetching) {
      dispatch(storeLoading());
    }
  }, [dispatch, result.isFetching]);

  useEffect(() => {
    if (result.error?.data?.message) {
      dispatch(storeError({ error: result.error.data.message }));
    }
  }, [result.error, dispatch]);

  const handleDeleteProjectClick = () => {
    deleteProject({ projectId: id, token: user?.token });
  };

  return (
    <Box
      bg={'white'}
      className={`${isPosterCard && 'poster-card'} ${
        isDataScienceCard && 'data-science-card'
      } ${isCodingCard && 'coding-card'} ${
        isResearchCard && 'research-card'
      } `}
    >
      <Box className='card-flip h-[450px]'>
        <Box className='flip'>
          <Box className='front h-[450px] shadow-lg'>
            {/* <!-- front content --> */}
            <Box>
              <ChakraUiImage
                className='card-img-top card-image '
                src={`${BASE_URL}images/projects/${photos[0]}`}
                alt='100%x180'
                style={{
                  height: 250,
                  width: '100%',
                  display: 'block',
                }}
                data-holder-rendered='true'
              />
              <Box px={5} mt={4}>
                <Heading noOfLines={1} size={'md'} as={'h3'}>
                  {name}
                </Heading>
                <Text noOfLines={4}>{description}</Text>
                <Box mt={4}>
                  <Tag className={`category-tag`}>{category}</Tag>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={`back h-[450px] flex justify-center shadow-lg items-center`}
          >
            <Box>
              <Heading size={'md'} mb={1} className={`card-heading`}>
                Owner
              </Heading>
              <Tooltip label={`${ownerFirstName} ${ownerLastName}`}>
                <Text
                  noOfLines={1}
                  className={`card-owner-name flex gap-2`}
                >
                  <Text>{ownerFirstName}</Text>
                  <Text>{ownerLastName}</Text>
                </Text>
              </Tooltip>

              <Heading
                size={'md'}
                mb={1}
                mt={4}
                className={`card-heading`}
              >
                Team Members
              </Heading>
              <Box className='mb-5 w-[150px]'>
                {members.map(member => (
                  <Tooltip key={member} label={`${member}`}>
                    <Text
                      mb={4}
                      noOfLines={1}
                      className={`${
                        isPosterCard && 'poster-team-member-text'
                      } team-member-email `}
                    >
                      {member}
                    </Text>
                  </Tooltip>
                ))}
              </Box>
              <Flex justifyContent={'center'} width={'full'}>
                <Button
                  isLoading={
                    selectedProjectId === id && projectDetailsLoading
                  }
                  onClick={() => {
                    dispatch(storeSelectedProjectId({ id }));
                    trigger(id);
                  }}
                  _hover={{ opacity: 0.9 }}
                  rounded={'full'}
                  size={'md'}
                  className={`card-btn`}
                >
                  View Details
                </Button>
              </Flex>

              {(user?.role === 'admin' || ownerId === user?._id) && (
                <Box className='flex justify-center items-center ml-1 mt-3'>
                  <Button
                    isLoading={isLoadingDeleteProject}
                    onClick={handleDeleteProjectClick}
                    className='delete-btn duration-150'
                    rounded={'full'}
                    colorScheme='red'
                    size={'md'}
                  >
                    Delete Project
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectItem;
