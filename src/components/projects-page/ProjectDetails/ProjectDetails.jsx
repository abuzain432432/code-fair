import { useDispatch, useSelector } from 'react-redux';
import ProjectImagesCarousel from '../ProjectImagesCarousel/ProjectImagesCarousel';
import './ProjectDetails.css';
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from '@chakra-ui/react';
import {
  getProject,
  storeProject,
} from '../../../store/redux/projectDetailsSlice';

function ProjectDetails() {
  const projectDetails = useSelector(getProject);
  const dispatch = useDispatch();
  if (!projectDetails) return <div></div>;
  const {
    name,
    difficulty,
    summary,
    description,
    category,
    photos,
    members,
    owner: { firstName, lastName },
  } = projectDetails;
  const isPosterCard = category === 'poster';
  const isCodingCard = category === 'coding';
  const isResearchCard = category === 'research';
  const isDataScienceCard = category === 'data_science';
  console.log(projectDetails);
  const handleModalClose = () => {
    dispatch(storeProject({ project: null }));
  };
  return (
    <>
      <Modal
        blockScrollOnMount
        size={'4xl'}
        isOpen={projectDetails}
        onClose={handleModalClose}
      >
        <ModalOverlay />
        <ModalContent
          className={`${isPosterCard && 'poster'} ${
            isDataScienceCard && 'data-science-card'
          } ${isCodingCard && 'coding-card'} ${
            isResearchCard && 'research-card'
          } p-6`}
        >
          <ModalHeader>
            <Heading
              size={'md'}
              textTransform={'uppercase'}
              lineHeight={1}
              className='label'
              mb={1}
            >
              Name
            </Heading>
            <Heading
              fontWeight={'semibold'}
              className='project-name'
              lineHeight={1}
              size={'xl'}
              as={'h2'}
            >
              {name}
            </Heading>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <ProjectImagesCarousel images={photos} />

            <Heading
              size={'md'}
              textTransform={'uppercase'}
              lineHeight={1}
              className='label'
              mb={1}
            >
              description
            </Heading>
            <Text>{description}</Text>
            <Heading
              size={'md'}
              textTransform={'uppercase'}
              lineHeight={1}
              className='label'
              mb={1}
              mt={4}
            >
              members
            </Heading>
            <Box>
              {members.map(member => (
                <Text key={member}>{members}</Text>
              ))}
            </Box>
            <Heading
              size={'md'}
              textTransform={'uppercase'}
              lineHeight={1}
              className='label'
              mb={1}
              mt={4}
            >
              summary
            </Heading>
            <Box>{summary}</Box>
            <Heading
              size={'md'}
              textTransform={'uppercase'}
              lineHeight={1}
              className='label'
              mb={1}
              mt={4}
            >
              Owner
            </Heading>
            <Flex className='italic' gap={1} direction={'row'}>
              <Box>{firstName}</Box>
              <Box>{lastName}</Box>
            </Flex>
            <Flex mt={4} gap={4}>
              <Tag
                textTransform={'uppercase'}
                py={2}
                px={4}
                className='tag'
              >
                {category}
              </Tag>
              <Tag
                textTransform={'uppercase'}
                py={2}
                px={4}
                className='tag'
              >
                {difficulty}
              </Tag>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProjectDetails;
