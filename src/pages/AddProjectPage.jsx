import { Box } from '@chakra-ui/react';
import ProjectForm from '../components/ui/ProjectForm';
import { useEffect } from 'react';

function AddProjectPage() {
  useEffect(() => {
    document.title =
      'CodeFair : Share your projects details with amazing community';
  }, []);

  return (
    <Box>
      <ProjectForm />
    </Box>
  );
}

export default AddProjectPage;
