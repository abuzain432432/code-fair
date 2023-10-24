import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  // Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  BASE_URL,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../../store/rtq-apis/api';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/redux/userAuthSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function UserTable() {
  const user = useSelector(getUser);
  const { isFetching, data } = useGetAllUsersQuery(user?.token);

  const [toBeDeletedUser, setToBeDeletedUser] = useState(null);
  const usersData = data?.data || [];
  const [
    deleteProject,
    { error: deletedUserError, isLoading: isLoadingDeletedUser },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (deletedUserError) {
      toast.error('Something went wrong');
    }
  }, [deletedUserError]);

  const handleDeleteUserClick = async () => {
    await deleteProject({
      userId: toBeDeletedUser?._id,
      token: user?.token,
    });
    setToBeDeletedUser(null);
  };
  return (
    <Box>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Photo</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isFetching && (
              <>
                <Tr>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                  <Td>
                    <Skeleton className='h-[40px]'></Skeleton>
                  </Td>
                </Tr>
              </>
            )}
            {!isFetching &&
              usersData.map(userObj => (
                <Tr key={userObj._id}>
                  <Td>{userObj.firstName}</Td>
                  <Td>{userObj.lastName}</Td>
                  <Td>{userObj.email}</Td>
                  <Td>{userObj.role}</Td>
                  <Td>
                    <Image
                      alt={userObj.firstName}
                      className='w-[35px] h-[35px] rounded-full'
                      src={`${BASE_URL}images/users/${userObj.photo}`}
                    />
                  </Td>
                  <Td className=''>
                    <Button
                      size={'md'}
                      className=''
                      colorScheme='red'
                      onClick={() => setToBeDeletedUser(userObj)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={toBeDeletedUser}
        onClose={() => setToBeDeletedUser(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You will not be able to undo this action.
              <span className='font-bold inline-block mx-1'>
                ${toBeDeletedUser?.firstName}{' '}
                {toBeDeletedUser?.lastName}
              </span>
              will be deleted permanently
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              mr={3}
              onClick={() => setToBeDeletedUser(null)}
            >
              Close
            </Button>
            <Button
              isLoading={isLoadingDeletedUser}
              onClick={handleDeleteUserClick}
              colorScheme='red'
            >
              Sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserTable;
