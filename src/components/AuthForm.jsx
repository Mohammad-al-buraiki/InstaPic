import { Box, Button, Image, Input, VStack, Text, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert('Please fill in all fields')
      console.log('Fields missing');
      return;
    }
    console.log('Email:', inputs.email)
    console.log('Password', inputs.password)
    navigate('/')
    console.log('Navigating to home page');
  }
  return (
    <>
    <Box border={'1px solid gray'} borderRadius={'4'} padding={4}>
      <VStack spacing={4}>

        <Image src={'/logo.png'} style={{ height: '40px' }} alt={'logo'} />

        <Input
          placeholder={'Email'}
          fontSize={14}
            type='Email'
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        
        <Input
          placeholder={'Password'}
          fontSize={14}
            type={'password'}
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

        
        {!isLogin ? (
                  <Input
                    placeholder={'Confirm Password'}
                    fontSize={14}
              type={'password'}
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}

            />
        ) : null}
        
        {/* button w full colorsc blue size sm fontsz 14 */}
        <Button
          colorScheme={'blue'}
          size={'sm'}
          fontSize={14}
          w={'full'} onClick={handleAuth}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        {/* ------------- OR -------------- */}
        <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
        <Box flex={2} h={'1px'} bg={'gray.400'} />
          <Text mx={'1'} color={'white'}>OR</Text>
          <Box flex={2} h={'1px'} bg={'gray.400'} />
        </Flex>


        {/* google login */}
        <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}> 

          <Image src={'/google.png'} w={5} alt={'Google logo'} />
          <Text mx={2} fontSize={14} color={'blue.500'}>
            Log in with Google
          </Text>
        </Flex>

      </VStack>
    </Box>

      {/* This is the small box below the login box */}
    <Box border={'1px solid gray'} borderRadius={4} padding={5}>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Box mx={2} fontSize={14}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </Box>
        <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'} fontSize={14}>
          {isLogin ? 'Sign Up' : 'Login'}
        </Box>
      </Flex>
    </Box>

    
    </>
        )
}

export default AuthForm