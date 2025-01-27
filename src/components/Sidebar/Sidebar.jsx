import { Box, Flex, Link, Tooltip, Avatar, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  InstagramLogo,
  InstagramMobileLogo,
  CreatePostLogo,
  NotificationsLogo,
  SearchLogo
} from '../../assets/constants';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import SidebarItems from './SidebarItems';
import { useTranslation } from 'react-i18next';
const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  return (
    <Box
      height='100vh'
      borderRight='1px solid'
      borderColor='whiteAlpha.300'
      py={8}
      position='sticky'
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction='column' gap={10} w='full' height='full'>
        <Link to='/' as={RouterLink} pl={2} display={{ base: 'none', md: 'block' }} cursor='pointer'>
          <InstagramLogo />
        </Link>
        <Link
          to='/'
          as={RouterLink}
          p={2}
          display={{ base: 'block', md: 'none' }}
          _hover={{ bg: 'whiteAlpha.200' }}
          borderRadius={6}
          w={10}
          cursor='pointer'
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label={'Logout'}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: 'block', md: 'none' }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={'center'}
            gap={4}
            _hover={{ bg: 'whiteAlpha.400' }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: 'full' }}
            // mt='auto'
            mt={{ base: 2, md: 'auto' }}
            justifyContent={{ base: 'center', md: 'flex-start' }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: 'none', md: 'block' }}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              isLoading={isLoggingOut}
            >
              {t('Logout')}
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
