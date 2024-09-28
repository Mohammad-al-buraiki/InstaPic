import { Flex, GridItem, Text, Box, Avatar, VStack, Divider, Button } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
// import image
import { Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore(state => state.userProfile);
  const authUser = useAuthStore(state => state.user);
  return (
    <>
      <GridItem
        cursor={'pointer'}
        borderRadius={4}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor='whiteAlpha.300'
        position={'relative'}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg='blackAlpha.700'
          transition={'all 0.3s ease'}
          zIndex={1}
          justifyContent={'center'}
        >
          <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={'bold'} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={'bold'} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* <img
      src="/img1.png"
      alt="post"
      width="100%"
      height="100%"
      objectFit="cover"
    /> */}
        {/* img src img */}
        <Image src={post.imageURL} alt='profile post' width={'100%'} height={'100%'} objectFit={'cover'} />
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={5}>
            <Flex gap='4' w={{ base: '90%', sm: '70%', md: 'full' }} mx={'auto'} maxH={'90vh'} minH={'50vh'}>
              <Flex
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Image src={post.imageURL} alt='profile post' />
              </Flex>
              <Flex flex={1} flexDir={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar src={userProfile.profilePicURL} size={'sm'} name='As a Programmer' />
                    <Text fontWeight={'bold'} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>

                  {authUser?.uid === userProfile.uid && (
                    <Button
                      size={'sm'}
                      bg={'transparent'}
                      _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
                      borderRadius={4}
                      p={1}
                    >
                      <MdDelete size={20} cursor='pointer' />
                    </Button>
                  )}
                </Flex>

                <Divider my={4} bg={'gray.500'} />

                <VStack w='full' alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                  <Comment
                    createdAt='1d ago'
                    username='asaprogrammer_'
                    profilePic='/profilepic.png'
                    text='Dummy images from unsplash'
                  />
                  <Comment
                    createdAt='12h ago'
                    username='abrahmov'
                    profilePic='https://bit.ly/dan-abramov'
                    text='Nice pic'
                  />
                  <Comment
                    createdAt='3h ago'
                    username='kentcdodds'
                    profilePic='https://bit.ly/kent-c-dodds'
                    text='Good clone dude!'
                  />
                </VStack>
                <Divider my={4} bg={'gray.8000'} />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
