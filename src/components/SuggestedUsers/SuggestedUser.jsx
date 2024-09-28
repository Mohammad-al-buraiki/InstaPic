import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import useFollowUser from '../../hooks/useFollowUser';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';
const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore(state => state.user);
  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing ? user.followers.filter(uid => uid !== authUser.uid) : [...user.followers, authUser.uid]
    });
  };
  return (
    <Flex justifyContent='space-between' alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        {/* <Link to={`/profile/${user.uid}`}> */}
        <Link to={`/${user.username}`}>
          <Avatar src={user.profilePicURL} name={name} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {user.fullName}
          </Box>
          <Box fontSize={11} color={'gray.500'}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {}
      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg='transparent'
          p={0}
          h='max-content'
          fontWeight='medium'
          color='blue.400'
          cursor='pointer'
          _hover={{ color: 'white' }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;

/*
summary of this class:
- This is a functional component that takes a user object as a prop and renders a user card. this is implemented above starting at: const SuggestedUser = ({ user }) => {
- The user card contains the user's profile picture, full name, and the number of followers. this is implemented above starting at: <Avatar src={user.profilePicURL} name={name} size={'md'} />
- The user card also contains a follow/unfollow button that toggles the isFollowed state. this is implemented above starting at: <Button onClick={() => setIsFollowed(!isFollowed)}>{isFollowed ? 'Unfollow' : 'Follow'}</Button>
- The button text changes based on the isFollowed state. this is implemented above starting at: {isFollowed ? 'Unfollow' : 'Follow'}
- the const [isFollowed, setIsFollowed] = useState(false); is used to toggle the button text between 'Follow' and 'Unfollow'
*/
