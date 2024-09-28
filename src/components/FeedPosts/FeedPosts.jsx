// import { Container, Flex, Skeleton, SkeletonCircle, VStack, Box } from '@chakra-ui/react';
// import FeedPost from './FeedPost';
// import { useEffect, useState } from 'react';

// const FeedPosts = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <Container maxW={'container.sm'} py={10} px={2}>
//       {isLoading &&
//         [0, 1, 2, 3].map((_, idx) => (
//           <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
//             <Flex gap='2'>
//               <SkeletonCircle size='10' />
//               <VStack gap={2} alignItems={'flex-start'}>
//                 <Skeleton height='10px' w={'200px'} />
//                 <Skeleton height='10px' w={'200px'} />
//               </VStack>
//             </Flex>
//             <Skeleton w={'full'}>
//               <Box h={'500px'}>contents wrapped</Box>
//             </Skeleton>
//           </VStack>
//         ))}

//       {!isLoading && (
//         <>
//           <FeedPost img='/img1.png' username='mo74' avatar='/profilepic.png' />
//           <FeedPost img='/img2.png' username='num2' avatar='/img2.png' />
//           <FeedPost img='/img3.png' username='num3' avatar='/img3.png' />
//           <FeedPost img='/img4.png' username='num4' avatar='/img4.png' />
//         </>
//       )}
//     </Container>
//   );
// };

// export default FeedPosts;

import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
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
        <>
          <Text fontSize={'md'} color={'red.400'}>
            Dayuum. Looks like you don&apos;t have any friends.
          </Text>
          <Text color={'red.400'}>Stop coding and go make some!!</Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
