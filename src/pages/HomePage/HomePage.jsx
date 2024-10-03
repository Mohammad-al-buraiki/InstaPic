import { Box, Container, Flex, Link, Image, VStack, Text } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'} fontFamily={'Cursive'}>
      {/* add link to my github https:github.com/mohammad-al-buraiki */}
      {/* <Box py={5} textAlign={'center'}>
        <a href='https:github.com/mohammad-al-buraiki' target='_blank'>
          <Text fontSize='xl'>My Github</Text>
        </a>
      </Box> */}
      {/* 
      <Text fontFamily='Lobster'>This is Lobster</Text>
      <Text fontFamily='Montserrat'>This is Montserrat</Text>
      <Text fontFamily='Raleway'>This is Raleway</Text>
      <Text fontFamily='Poppins'>This is Poppins</Text>
      <Text fontFamily='Dancing Script'>This is Dancing Script</Text>
      <Text fontFamily='Roboto'>This is Roboto</Text>
      <Text fontFamily='Playfair Display'>This is Playfair Display</Text>
      <Text fontFamily='Oswald'>This is Oswald</Text>
      <Text fontFamily='Pacifico'>This is Pacifico</Text>
      <Text fontFamily='Merriweather'>This is Merriweather</Text>
      <Text fontFamily='Edu VIC WA NT Beginner'>This is Edu Australia VIC WA NT Hand Guides</Text> */}
      <Flex
        fontSize={14}
        color={'gray.500'}
        mt={5}
        // make it in middle above feedposts
        display={{ base: 'block', lg: 'none' }}
        marginLeft={2}
        cursor={'pointer'}
      >
        ❖ Built By {''}
        <Link
          href='https://github.com/Mohammad-al-buraiki'
          target='_blank'
          color='blue.500'
          fontSize={14}
          // display='inline-flex'
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

      <Flex gap={20} display={{ base: 'none', lg: 'flex' }}>
        <Box flex={2} py={0} my={-5}>
          <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={{ lg: 'block' }} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </Flex>

      <VStack gap={20} display={{ base: 'flex', lg: 'none' }}>
        <Box flex={2} py={0} my={-5}>
          <FeedPosts />
        </Box>

        <Text fontSize={20} color={'White'} fontFamily={'cursive'}>
          Looks like you reached the end of the page. Follow more people to see more posts.
        </Text>

        <Box flex={3} mr={20} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
