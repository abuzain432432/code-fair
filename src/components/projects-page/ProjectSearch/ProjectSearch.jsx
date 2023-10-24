// ProjectSearch.js

import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLazyProjectsQuery } from '../../../store/rtq-apis/api.js';
import {
  storeError,
  storeLoading,
  storeProjects,
} from '../../../store/redux/projectsSlice.js';
import { useDispatch } from 'react-redux';

function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [trigger, result] = useLazyProjectsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result.isFetching) {
      dispatch(storeLoading({ loading: result.isFetching }));
    }
  }, [dispatch, result.isFetching]);

  useEffect(() => {
    if (result.data)
      dispatch(storeProjects({ projects: result?.data?.data }));
  }, [result.data, dispatch]);

  useEffect(() => {
    if (result.error?.data?.message) {
      dispatch(storeError({ error: result.error.data.message }));
    }
  }, [result.error, dispatch]);

  const handleSearchClick = () => {
    trigger({ searchTerm: searchTerm });
  };

  return (
    <Box>
      <Flex gap={4} dir='row'>
        <Input
          shadow={'md'}
          border={'1px'}
          borderColor={'blackAlpha.200'}
          _focusVisible={{ borderColor: 'inhert' }}
          placeholder='Search project by title or description'
          size='lg'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          _hover={{ backgroundColor: 'teal.500' }}
          fontWeight={'bold'}
          textColor={'white'}
          bg={'teal.400'}
          size={'lg'}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Flex>
    </Box>
  );
}

export default ProjectSearch;
