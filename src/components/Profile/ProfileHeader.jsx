// import { Avatar, AvatarGroup, Flex, Text, VStack, Button } from '@chakra-ui/react';
// import useUserProfileStore from '../../store/userProfileStore';
// import useAuthStore from '../../store/authStore';
// import { useDisclosure } from '@chakra-ui/react';
// import EditProfile from './EditProfile';
// import useFollowUser from '../../hooks/useFollowUser';

// const ProfileHeader = () => {
//   const { userProfile } = useUserProfileStore();
//   const authUser = useAuthStore(state => state.user);

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.id);

//   const visitingOwnProfile = authUser && authUser.username === userProfile.username; // just for committing
//   const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
//   return (
//     <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
//       <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifySelf='center' alignSelf={{ base: 'flex-start' }} mx='auto'>
//         <Avatar
//           // name='As a Programmer'
//           src={userProfile?.profilePicURL}
//           alt='As a programmer logo'
//         />
//       </AvatarGroup>

//       <VStack alignItems='start' gap={2} mx='auto' flex={1}>
//         <Flex
//           gap={4}
//           direction={{ base: 'column', sm: 'row' }}
//           justifyContent={{ base: 'center', sm: 'flex-start' }}
//           alignItems='center'
//           w={'full'}
//         >
//           <Text fontSize={{ base: 'sm', md: 'lg' }}> {userProfile?.username} </Text>

//           {visitingOwnProfile && (
//             <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
//               <Button
//                 bg={'white'}
//                 color={'black'}
//                 _hover={{ bg: 'whiteAlpha.800' }}
//                 size={{ base: 'xs', md: 'sm' }}
//                 onClick={onOpen}
//               >
//                 Edit Profile
//               </Button>
//             </Flex>
//           )}

//           {visitingAnotherProfileAndAuth && (
//             <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
//               <Button
//                 bg={'blue.500'}
//                 color={'white'}
//                 _hover={{ bg: 'blue.600' }}
//                 size={{ base: 'xs', md: 'sm' }}
//                 onClick={handleFollowUser}
//               >
//                 {console.log('we are in the button FOLLOW')} {console.log(isFollowing)}
//                 {isFollowing ? 'Unfollow' : 'Follow'}
//               </Button>
//             </Flex>
//           )}
//         </Flex>

//         <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
//           <Text fontSize={{ base: 'xs', md: 'sm' }}>
//             <Text as='span' fontWeight={'bold'} mr={1}>
//               {userProfile?.posts.length}
//             </Text>
//             Posts
//           </Text>
//           <Text fontSize={{ base: 'xs', md: 'sm' }}>
//             <Text as='span' fontWeight={'bold'} mr={1}>
//               {userProfile?.followers.length}
//             </Text>
//             Followers
//           </Text>
//           <Text fontSize={{ base: 'xs', md: 'sm' }}>
//             <Text as='span' fontWeight={'bold'} mr={1}>
//               {userProfile?.following.length}
//             </Text>
//             Following
//           </Text>
//         </Flex>
//         <Flex alignItems={'center'} gap={4}>
//           <Text fontSize={'sm'} fontWeight={'bold'}>
//             {userProfile?.fullName}
//           </Text>
//         </Flex>

//         <Text fontSize={'sm'}>{userProfile?.bio || 'no bio yet'}</Text>
//       </VStack>
//       {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
//     </Flex>
//   );
// };

// export default ProfileHeader;

import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';
import { timeAgo } from '../../utils/timeAgo';
import { useTranslation } from 'react-i18next'; // Added
const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
  const timestamp = userProfile.createdAt; // assuming this is in milliseconds
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  const { t } = useTranslation(); // this hook is used for translation. it basically returns a function that we can use to translate our text
  // console.log(formattedDate);

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
        <Avatar
          src={userProfile.profilePicURL}
          alt={userProfile.username ? `${userProfile.username}'s profile picture` : 'Default user profile picture'}
        />
      </AvatarGroup>

      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'center', sm: 'flex-start' }}
          alignItems={'center'}
          w={'full'}
        >
          <Text fontSize={{ base: 'sm', md: 'lg' }}>{userProfile.username}</Text>
          {visitingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'white'}
                color={'black'}
                _hover={{ bg: 'whiteAlpha.800' }}
                size={{ base: 'xs', md: 'sm' }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'blue.500'}
                color={'white'}
                _hover={{ bg: 'blue.600' }}
                size={{ base: 'xs', md: 'sm' }}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </Flex>
          )}
        </Flex>

        <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={'center'} gap={4}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={'sm'}>{userProfile.bio}</Text>

        {/* display user's createdAt */}
        <Text fontSize={'sm'} color={'gray.500'}>
          {t('Joined on')} {formattedDate}
        </Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
