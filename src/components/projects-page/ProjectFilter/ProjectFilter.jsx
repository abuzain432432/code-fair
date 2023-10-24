// ProjectFilter.js

import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import { useLazyProjectsQuery } from '../../../store/rtq-apis/api.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  storeError,
  storeLoading,
  storeProjects,
} from '../../../store/redux/projectsSlice.js';

function ProjectFilter() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const dispatch = useDispatch();
  const [trigger, result] = useLazyProjectsQuery();

  useEffect(() => {
    if (selectedCategory) trigger({ category: selectedCategory });
  }, [selectedCategory, trigger]);

  useEffect(() => {
    if (selectedLevel) trigger({ level: selectedLevel });
  }, [selectedLevel, trigger]);

  useEffect(() => {
    if (result.data) {
      dispatch(storeProjects({ projects: result?.data?.data }));
    }
  }, [result.data, dispatch]);

  useEffect(() => {
    if (result.error?.data?.message) {
      {
        dispatch(storeError({ error: result.error.data.message }));
      }
    }
  }, [result.error, dispatch]);

  useEffect(() => {
    if (result.isFetching) {
      {
        dispatch(storeLoading({ loading: result.isFetching }));
      }
    }
  }, [dispatch, result.isFetching]);
  const handleCategoryChange = e => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
  };

  const handleDifficultyLevelChange = e => {
    const selectedDifficultyLevel = e.target.value;
    setSelectedLevel(selectedDifficultyLevel);
  };

  return (
    <Flex className='md:gap-16 sm:gap-8 gap-4' flexWrap={'wrap'}>
      <Box py={4}>
        <Heading fontWeight={'semibold'} mb={1} size={'sm'}>
          Project Category
        </Heading>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          width={[150, 170, 250]}
          borderRadius={'lg'}
          className='mt-1'
          border={'1px'}
          borderColor={'blackAlpha.200'}
          shadow={'md'}
          placeholder='Select category'
        >
          <option value='poster'>Poster</option>
          <option value='coding'>Coding</option>
          <option value='data_science'>Data Science</option>
          <option value='research'>Research</option>
        </Select>
      </Box>
      <Box py={4}>
        <Heading mb={1} fontWeight={'semibold'} size={'sm'}>
          Project Level
        </Heading>
        <Select
          onChange={handleDifficultyLevelChange}
          borderRadius={'lg'}
          value={selectedLevel}
          shadow={'md'}
          border={'1px'}
          borderColor={'blackAlpha.200'}
          width={[150, 170, 250]}
          className='mt-1'
          placeholder='Select Difficulty Level'
        >
          <option value='proficient'>Proficient</option>
          <option value='capable'>Capable</option>
          <option value='developing'>Developing</option>
          <option value='novice'>Novice</option>
        </Select>
      </Box>
    </Flex>
  );
}

export default ProjectFilter;
