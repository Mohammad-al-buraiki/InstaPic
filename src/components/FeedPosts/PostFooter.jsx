import {
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  Button,
  Avatar,
  HStack,
  VStack,
  Divider,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants';
import usePostComment from '../../hooks/usePostComment';
import useShowToast from '../../hooks/useShowToast';
const PostFooter = ({ post, username, isProfilePage }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const { isCommenting, handlePostComment } = usePostComment();
  ///////////////////
  const showToast = useShowToast();
  ///////////////////

  const [comment, setComment] = useState('');
  const handleSubmitComment = async () => {
    if (!comment) {
      return showToast('Error', 'Comment cannot be empty', 'error');
    }
    await handlePostComment(post.id, comment);
    setComment('');
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <Box mb={4} marginTop={'auto'}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike}>{!liked ? <NotificationsLogo /> : <UnlikeLogo />}</Box>

        <Box cursor={'pointer'} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={'sm'}>
        {likes} likes
      </Text>

      {!isProfilePage && (
        <>
          <Text fontSize='sm' fontWeight={700}>
            {username}{' '}
            <Text as='span' fontWeight={400}>
              Feeling good
            </Text>
          </Text>
          <Text fontSize='sm' color={'gray'}>
            View all 1,000 comments
          </Text>
        </>
      )}

      <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
        <InputGroup>
          {/* <Input variant={'flushed'} placeholder={'Add a comment...'} fontSize={14} /> */}
          <Input
            variant={'flushed'}
            placeholder={'Add a comment...'}
            fontSize={14}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <InputRightElement>
            <Button
              fontSize={14}
              color={'blue.500'}
              fontWeight={600}
              cursor={'pointer'}
              _hover={{ color: 'white' }}
              bg={'transparent'}
              onClick={handleSubmitComment}
              isLoading={isCommenting}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
