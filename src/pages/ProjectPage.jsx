// ProjectPage.js

import { Box } from '@chakra-ui/react';
import ProjectSearch from '../components/projects-page/ProjectSearch/ProjectSearch';
import ProjectList from '../components/projects-page/ProjectList/ProjectList';
import ProjectFilter from '../components/projects-page/ProjectFilter/ProjectFilter';
import ProjectDetails from '../components/projects-page/ProjectDetails/ProjectDetails';
import { useEffect } from 'react';
import { useProjectsQuery } from '../store/rtq-apis/api';
import {
  getProjects,
  storeProjects,
  getLoading,
  storeLoading,
  getError,
  storeError,
} from '../store/redux/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
function ProjectPage() {
  const projectsData = useSelector(getProjects);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    error: errorResponse,
  } = useProjectsQuery({});

  useEffect(() => {
    if (data?.data) dispatch(storeProjects({ projects: data?.data }));
  }, [data?.data, dispatch]);

  useEffect(() => {
    console.log(isLoading);
    if (isLoading) dispatch(storeLoading({ loading: isLoading }));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (errorResponse?.data.message) {
      dispatch(storeError({ error: errorResponse.data.message }));
    }
  }, [errorResponse?.data, dispatch]);

  useEffect(() => {
    document.title = 'CodeFair : Find projects for your learning';
  }, []);

  return (
    <Box>
      <Box className='max-w-[1100px] w-[90%] mt-16 mx-auto'>
        <ProjectSearch />
        <ProjectFilter />
        <ProjectList
          data={projectsData}
          isLoading={loading}
          error={error}
        />
        <ProjectDetails />
      </Box>
    </Box>
  );
}

export default ProjectPage;
