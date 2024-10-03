import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';
import useUserProfileStore from '../../store/userProfileStore';
import { useTranslation } from 'react-i18next'; // Added
const Caption = ({ post }) => {
  const userProfile = useUserProfileStore(state => state.userProfile);
  const { t } = useTranslation(); // Added
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Flex direction={'column'}>
        <Flex gap={2} alignItems={'center'}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={'bold'} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
          {timeAgo(post.createdAt, t)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Caption;
