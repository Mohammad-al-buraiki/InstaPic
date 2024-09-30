import { Box, Container, Flex, Link, Image } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
      {/* add link to my github https:github.com/mohammad-al-buraiki */}
      {/* <Box py={5} textAlign={'center'}>
        <a href='https:github.com/mohammad-al-buraiki' target='_blank'>
          <Text fontSize='xl'>My Github</Text>
        </a>
      </Box> */}
      <Flex
        fontSize={14}
        color={'gray.500'}
        mt={5}
        // make it in middle above feedposts
        display={{ base: 'block', lg: 'none' }}
        marginLeft={2}
      >
        ❖ Built By {''}
        <Link
          href='https://github.com/Mohammad-al-buraiki'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display='inline-flex'
          alignItems='center'
          marginLeft={1.5}
        >
          Mohammad Al Buraiki
          <Image
            src='/github-logo.png' // Access image relative to the public folder
            alt='GitHub Logo'
            boxSize='16px' // Set size to 16px or adjust as needed
            ml={2} // Margin-right for spacing between the logo and the name
          />
        </Link>
      </Flex>

      <Flex gap={20}>
        <Box flex={2} py={0} my={-5}>
          <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={{ base: 'none', lg: 'block' }} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
