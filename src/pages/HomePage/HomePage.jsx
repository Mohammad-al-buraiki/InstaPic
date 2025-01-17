import { Box, Container, Flex, Link, Image, VStack, Text, Button } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';
import { useTranslation } from 'react-i18next'; // Added

const HomePage = () => {
  const { t, i18n } = useTranslation(); // Added

  // const toggleLanguage = () => {
  //   const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
  //   i18n.changeLanguage(newLanguage); // Change language based on the current language
  // };

  return (
    <Container maxW={'container.lg'}>
      <Flex
        fontSize={14}
        color={'gray.500'}
        mt={3}
        display={{ base: 'block', lg: 'none' }}
        marginLeft={2}
        justifyContent={'space-between'}
      >
        ❖ {t('built_by')} {''} {/* Replaced static text with translation key */}
        <Link
          href='https://github.com/Mohammad-al-buraiki'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display='inline-flex'
          alignItems='center'
          marginLeft={1.5}
        >
          {t('author_name')} {/* Replaced static text with translation key */}
          <Image
            src='/github-logo.png' // Access image relative to the public folder
            alt='GitHub Logo'
            boxSize='16px'
            ml={2}
            cursor={'pointer'}
          />
        </Link>
        {/* <Button onClick={toggleLanguage} size={'xs'} marginLeft={10}>
          {i18n.language === 'en' ? 'العربية' : 'English'}
        </Button> */}
      </Flex>

      <Flex gap={20} display={{ base: 'none', lg: 'flex' }}>
        <Box flex={2} py={0} my={0}>
          <FeedPosts />
        </Box>
        <Box flex={3} mr={20} display={{ lg: 'block' }} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </Flex>

      <VStack gap={20} display={{ base: 'flex', lg: 'none' }}>
        <Box flex={2} py={0} my={0}>
          <FeedPosts />
        </Box>

        <Text fontSize={20} color={'White'} fontFamily={'cursive'}>
          {t('no_more_posts')} {/* Replaced static text with translation key */}
        </Text>

        <Box flex={3} mr={20} maxW={'300px'}>
          <SuggestedUsers />
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;
