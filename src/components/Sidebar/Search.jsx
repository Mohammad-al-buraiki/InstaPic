// COPY AND PASTE AS THE STARTER CODE FOR THE SEARCH COMPONENT
import { Box, Flex, Tooltip } from '@chakra-ui/react';
import { SearchLogo } from '../../assets/constants';
import { useDisclosure } from '@chakra-ui/react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useShowToast from '../../hooks/useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useEffect } from 'react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';
import { useTranslation } from 'react-i18next';
const Search = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const { t } = useTranslation();
  const handleSearchUser = e => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  console.log(user);
  return (
    <>
      <Tooltip
        hasArrow
        label={'Search'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: 'none', md: 'block' }}>{t('Search')}</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg='black' border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder='Enter username' ref={searchRef} />
              </FormControl>

              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button type='submit' ml={'auto'} size={'sm'} my={4} isLoading={isLoading}>
                  {t('Search')}
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
            {/* here we basically did:
             * if user is not null, render the SuggestedUser component
             * pass the user object as a prop to the SuggestedUser component
             * the SuggestedUser component will then render the user's details
             * the SuggestedUser component will also have a button to follow/unfollow the user
             */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
