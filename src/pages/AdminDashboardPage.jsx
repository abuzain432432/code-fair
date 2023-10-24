// ProjectPage.js

import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
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
import UserTable from '../components/admin-dashboard-page/UserTable/UserTable';
function AdminDashboardPage() {
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

  return (
    <Box className='max-w-[1100px] mx-auto'>
      <Tabs>
        <TabList className='bg-white mt-3 py-1 border border-gray-200 px-2 mx-4 shadow-lg'>
          <Tab>Projects</Tab>
          <Tab>Users</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProjectSearch />
            <ProjectFilter />
            <ProjectList
              data={projectsData}
              isLoading={loading}
              error={error}
            />
            <ProjectDetails />
          </TabPanel>
          <TabPanel>
            <UserTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default AdminDashboardPage;
