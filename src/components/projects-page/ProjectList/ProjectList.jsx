/* eslint-disable react/prop-types */
import { Box, Image, Skeleton } from '@chakra-ui/react';
import ProjectItem from '../ProjectItem/ProjectItem';
import NoDataImage from '../../../assets/no-data.jpg';
function ProjectList({
  data,
  isLoading,
  onProjectViewBtn,
  projectDetailsLoading,
}) {
  return (
    <>
      <Box className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6'>
        {isLoading && (
          <>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
            <Skeleton
              borderRadius={'9'}
              className='h-[400px]'
            ></Skeleton>
          </>
        )}
        {Boolean(data.length) > 0 &&
          data.map(project => (
            <ProjectItem
              ownerId={project?.owner?._id}
              projectDetailsLoading={projectDetailsLoading}
              onProjectViewBtn={onProjectViewBtn}
              description={project.description}
              name={project.name}
              category={project.category}
              photos={project.photos}
              members={project.members}
              ownerFirstName={project?.owner?.firstName}
              ownerLastName={project?.owner?.lastName}
              key={project._id}
              id={project._id}
            />
          ))}
      </Box>
      {!data.length && !isLoading && (
        <Box className='flex justify-center'>
          <Image src={NoDataImage} />
        </Box>
      )}
    </>
  );
}

export default ProjectList;
