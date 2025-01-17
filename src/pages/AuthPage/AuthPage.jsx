import { Box, Container, Flex, VStack, Link, Image } from '@chakra-ui/react';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useTranslation } from 'react-i18next'; // Added
const AuthPage = () => {
  const { t, i18n } = useTranslation(); // Added
  return (
    <Flex minH={'100vh'} direction='column' px={4} alignItems={'center'}>
      {/* Built By Section */}
      <Flex
        fontSize={14}
        color={'gray.500'}
        justifyContent={'center'}
        alignItems={'center'}
        mb={1} // Adds space below the "Built by" section
        marginTop={5}
      >
        ❖ {t('built_by')} {''}
        <Link
          href='https://github.com/Mohammad-al-buraiki'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display='inline-flex'
          alignItems='center'
          marginLeft={1.5}
        >
          {t('author_name')}
          <Image src='/github-logo.png' alt='GitHub Logo' boxSize='16px' ml={2} cursor={'pointer'} />
        </Link>
      </Flex>

      {/* Main Auth Content */}
      <Container maxW={'container.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={'10'}>
          {/* Left side */}
          <Box display={{ base: 'none', md: 'block' }}>
            <img src='/auth.png' style={{ height: '650px' }} alt='Phone img' />
          </Box>

          {/* Right side */}
          <VStack spacing={4} align={'stretch'}>
            <AuthForm />
            <Box textAlign={'center'}> Get the app.</Box>
            <Flex gap={5} justifyContent={'center'}>
              <img src='/microsoft.png' style={{ height: '40px' }} alt='Appstore logo' />
              <img src='/playstore.png' style={{ height: '40px' }} alt='Playstore logo' />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
