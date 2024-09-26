import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { path, use } from 'framer-motion/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';
import { Spinner } from '@chakra-ui/react';
// instead of adding sidebar to every page, we can create a layout component that includes the sidebar
// and wrap the page content with this layout component, except for the /auth page
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const canRenderSidebar = pathname !== '/auth' && user;
  const canRenderNavbar = !user && !loading && pathname !== '/auth'; //if user is not logged in, and not on the auth page, and not loading, render the navbar

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  ///////////////////////////////////////////

  return (
    <Flex flexDir={canRenderNavbar ? 'column' : 'row'}>
      {/* sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: '70px', md: '240px' }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* navbar */}

      {canRenderNavbar ? <Navbar /> : null}

      {/* page content on the right */}
      <Box
        flex={1}
        w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }}
        mx={'auto'}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir='column'
      h='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Spinner size='xl' />
    </Flex>
  );
};
