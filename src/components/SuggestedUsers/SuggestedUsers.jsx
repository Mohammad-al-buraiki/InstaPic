import { VStack, Flex, Text, Box, Link } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import { Image } from '@chakra-ui/react';
const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUsers.length !== 0 && (
        <Flex alignItems='center' justifyContent={'space-between'} w={'full'}>
          <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
            Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map(user => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      {/* <Box
        fontSize={12}
        color={'gray.500'}
        mt={5}
        alignSelf={'start'}
        alignItems={'center'}
        display={'flex'}
        marginRight={4}
      >
        © Built By{' '}
        <Link href='https://github.com/Mohammad-al-buraiki' target='_blank' color='blue.500' fontSize={14} margin>
          Mohammad Al Buraiki
          <Image
            src='/github-logo.png' // Access image relative to the public folder
            alt='GitHub Logo'
            boxSize='16px' // Set size to 16px or adjust as needed
            display='inline'
            mr={5}
          />
        </Link>
      </Box> */}
      <Box fontSize={14} color={'gray.500'} mt={5} alignSelf={'start'}>
        ❖ Built By {''}
        <Link
          href='https://github.com/Mohammad-al-buraiki'
          target='_blank'
          color='blue.500'
          fontSize={14}
          display='inline-flex'
          alignItems='center'
        >
          Mohammad Al Buraiki
          <Image
            src='/github-logo.png' // Access image relative to the public folder
            alt='GitHub Logo'
            boxSize='16px' // Set size to 16px or adjust as needed
            ml={2} // Margin-right for spacing between the logo and the name
          />
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
