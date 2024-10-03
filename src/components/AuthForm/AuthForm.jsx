import { Box, Button, Image, Input, VStack, Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
import { useTranslation } from 'react-i18next';
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const { t } = useTranslation();

  const { t, i18n } = useTranslation(); // Added

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage); // Change language based on the current language
  };

  return (
    <>
      <Button onClick={toggleLanguage} size={'xs'}>
        {i18n.language === 'en' ? 'العربية' : 'English'} {/* Show Arabic when in English, and vice versa */}
      </Button>
      <Box border={'1px solid gray'} borderRadius={'4'} padding={4}>
        <VStack spacing={4}>
          <Image src={'/logo.png'} style={{ height: '40px' }} alt={'logo'} />

          {/* print location of compiler */}

          {isLogin ? <Login /> : <Signup />}

          {/* ------------- OR -------------- */}
          <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={'1'} color={'white'}>
              {t('OR')}
            </Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>

          {/* google login */}
          <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign up'} />
        </VStack>
      </Box>

      {/* This is the small box below the login box */}
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? t("Don't have an account?") : t('Already have an account?')}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'} fontSize={14}>
            {isLogin ? t('Sign Up') : t('Login')}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
