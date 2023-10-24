import {
  Box,
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import styles from './Header.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, getUser } from '../../store/redux/userAuthSlice';
import { BASE_URL } from '../../store/rtq-apis/api';
import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
function Header() {
  const user = useSelector(getUser);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Menu>
        <Box className='bg-black sticky top-0 z-10 '>
          <Box className='flex h-[70px] items-center w-[90%] mx-auto justify-between'>
            <Box className='text-white'>LOGO</Box>
            <Box
              className={`xl:gap-4 gap-2 lg:flex hidden  ${styles.menu}`}
            >
              <NavLink
                to={'/home'}
                className={({ isActive }) => {
                  return isActive && 'bg-teal-400';
                }}
              >
                <MenuItem className='w-fit uppercase mx-2 hover:bg-teal-400 active:bg-teal-400 focus:bg-teal-400'>
                  Home
                </MenuItem>
              </NavLink>
              <NavLink
                to={'/projects'}
                className={({ isActive }) => {
                  return isActive && 'bg-teal-400';
                }}
              >
                <MenuItem className='w-fit mx-2 uppercase  hover:bg-teal-400 active:bg-teal-400 focus:bg-teal-400'>
                  Projects
                </MenuItem>
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink
                  to={'/admin-dashboard'}
                  className={() => {
                    return 'bg-red-500';
                  }}
                >
                  <MenuItem className='w-fit mx-2 uppercase bg-red-500  hover:bg-red-500 active:bg-red-500 focus:bg-red-500'>
                    Admin Dashboard
                  </MenuItem>
                </NavLink>
              )}
              {!user && (
                <>
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) => {
                      return isActive && 'bg-teal-400';
                    }}
                  >
                    <MenuItem className='w-fit mx-2 uppercase  hover:bg-teal-400 active:bg-teal-400 focus:bg-teal-400'>
                      Login
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to={'/signup'}
                    className={({ isActive }) => {
                      return isActive && 'bg-teal-400';
                    }}
                  >
                    <MenuItem className='w-fit mx-2 uppercase  hover:bg-teal-400 active:bg-teal-400 focus:bg-teal-400'>
                      Singup
                    </MenuItem>
                  </NavLink>
                </>
              )}
              <NavLink
                to={user ? '/new-project' : '/login'}
                // onClick={() =>
                //   user ? navigate('/new-project') : navigate('/login')
                // }
                className={({ isActive }) => {
                  return isActive && 'bg-teal-400';
                }}
              >
                <MenuItem className='w-fit mx-2 uppercase   hover:bg-teal-400 active:bg-teal-400 focus:bg-transparent'>
                  Post project
                </MenuItem>
              </NavLink>
              {user && (
                <>
                  <span
                    onClick={() => setIsLogoutModalOpen(true)}
                    className={({ isActive }) => {
                      return isActive && 'bg-teal-400';
                    }}
                  >
                    <MenuItem className='w-fit mx-2 uppercase   hover:bg-teal-400 active:bg-teal-400 focus:bg-teal-400'>
                      Logout
                    </MenuItem>
                  </span>
                  <Link to={'profile'}>
                    <Image
                      className='w-[35px] rounded-full h-[35px]'
                      src={`${BASE_URL}images/users/${user.photo}`}
                    />
                  </Link>
                </>
              )}
            </Box>
            <MenuButton
              className='menu-btn'
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon color={'white'} />}
              variant='outline'
            />
            <MenuList className='lg:hidden block'>
              <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                <NavLink
                  to={'/home'}
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-teal-400 py-1  px-2 font-semibold'
                      : 'py-1  px-2 font-semibold text-black';
                  }}
                >
                  Home
                </NavLink>
              </MenuItem>

              <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                <NavLink
                  to={'/projects'}
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-teal-400 py-1  px-2 font-semibold'
                      : 'py-1  px-2 font-semibold text-black';
                  }}
                >
                  Projects
                </NavLink>
              </MenuItem>

              {user?.role === 'admin' && (
                <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                  <NavLink
                    to={'/admin-dashboard'}
                    className={() => {
                      return 'bg-red-500 py-1  px-2 font-semibold ';
                    }}
                  >
                    Admin Dashboard
                  </NavLink>
                </MenuItem>
              )}
              {!user && (
                <>
                  <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                    <NavLink
                      to={'/login'}
                      className={({ isActive }) => {
                        return isActive
                          ? 'bg-teal-400 py-1  px-2 font-semibold'
                          : 'py-1  px-2 font-semibold text-black';
                      }}
                    >
                      Login
                    </NavLink>
                  </MenuItem>

                  <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                    <NavLink
                      to={'/signup'}
                      className={({ isActive }) => {
                        return isActive
                          ? 'bg-teal-400 py-1  px-2 font-semibold'
                          : 'py-1  px-2 font-semibold text-black';
                      }}
                    >
                      Singup
                    </NavLink>
                  </MenuItem>
                </>
              )}

              <MenuItem className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'>
                <NavLink
                  to={user ? '/new-project' : '/login'}
                  // onClick={() =>
                  //   user ? navigate('/new-project') : navigate('/login')
                  // }
                  className={({ isActive }) => {
                    return isActive
                      ? 'bg-teal-400 py-1  px-2 font-semibold'
                      : 'py-1  px-2 font-semibold text-black';
                  }}
                >
                  Post project
                </NavLink>
              </MenuItem>

              {user && (
                <>
                  <MenuItem
                    onClick={() => setIsLogoutModalOpen(true)}
                    className='w-fit bg-transparent  uppercase  hover:bg-transparent active:bg-transparent focus:bg-transparent'
                  >
                    <NavLink
                      to={user ? '/new-project' : '/login'}
                      // onClick={() =>
                      //   user ? navigate('/new-project') : navigate('/login')
                      // }
                      className={({ isActive }) => {
                        return isActive
                          ? 'bg-teal-400 py-1  px-2 font-semibold'
                          : 'py-1  px-2 font-semibold text-black';
                      }}
                    >
                      Logout
                    </NavLink>
                  </MenuItem>

                  <Image
                    className='w-[35px] ml-4 mt-2 rounded-full h-[35px]'
                    src={`${BASE_URL}images/users/${user.photo}`}
                  />
                </>
              )}
            </MenuList>
          </Box>
        </Box>
      </Menu>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to logout from CodeFair
          </ModalBody>

          <ModalFooter>
            <Button
              mr={4}
              colorScheme='teal'
              className='w-fit mx-2 uppercase  bg-teal-400  hover:bg-teal-400 '
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Close
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                dispatch(clearUser());
                setIsLogoutModalOpen(false);
                localStorage.removeItem('token');
                navigate('/home');
              }}
            >
              Sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Header;
