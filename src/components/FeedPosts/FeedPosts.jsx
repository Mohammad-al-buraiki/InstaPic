import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';
import { Image } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();
  const { t } = useTranslation(); // Added translation hook
  return (
    <Container maxW={'container.sm'} py={1} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap='2'>
              <SkeletonCircle size='10' />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height='10px' w={'200px'} />
                <Skeleton height='10px' w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'400px'}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && posts.length > 0 && posts.map(post => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <Flex mt={10}>
          <Text fontSize={'md'} color={'red.400'}>
            {t('No posts to show, follow this guy')}
            <Link
              as={RouterLink}
              to={'/m'}
              color={'blue.400'}
              fontWeight={'bold'}
              _hover={{ color: 'blue.500' }}
              onClick={e => {
                e.preventDefault(); // Prevent the default behavior
                window.open('/m', '_blank'); // Open the link in a new tab
              }}
            >
              {' '}
              @m
            </Link>
          </Text>
          {/* <Text color={'red.400'}>, {t('he has some cool content')}</Text> */}
        </Flex>
      )}
    </Container>
  );
};

export default FeedPosts;
