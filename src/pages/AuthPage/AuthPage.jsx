import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm'
const AuthPage = () => {
  return (
      <Flex minH={'100vh'} alignItems={'center'} justifyContent={'center'} px={4}>
          <Container maxW={'container.md'} padding={0}>
              <Flex justifyContent={'center'} alignItems={'center'} gap={'10'}>

                  {/* left side */}
                  
              <Box display={{ base: "none", md: "block" }} >
                    <img
                        src="/auth.png"
                      h={650}
                      alt='Phone img'
                    />
              </Box>

                  {/* right side */}
                  
              <VStack spacing={4} align={'stretch'}>
                      <AuthForm />
                      <Box textAlign={'center'}> Get the app.</Box>
                      <Flex gap={5} justifyContent={'center'}>
                            <img src="/microsoft.png" h={'10'} alt='Appstore logo' />
                          <img src='/playstore.png' h={'10'} alt='Playstore logo' />
                        </Flex>
            </VStack>

                </Flex>
              hello
          </Container>
      </Flex>
  )
}

export default AuthPage