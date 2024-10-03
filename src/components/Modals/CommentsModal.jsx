// import {
//   Button,
//   Flex,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay
// } from '@chakra-ui/react';
// import Comment from '../Comment/Comment';
// import usePostComment from '../../hooks/usePostComment';
// import { useEffect, useRef } from 'react';

// const CommentsModal = ({ isOpen, onClose, post }) => {
//   const { handlePostComment, isCommenting } = usePostComment();
//   const commentRef = useRef(null);
//   const commentsContainerRef = useRef(null);
//   const handleSubmitComment = async e => {
//     // do not refresh the page, prevent it
//     e.preventDefault();
//     await handlePostComment(post.id, commentRef.current.value);
//     commentRef.current.value = '';
//   };

//   useEffect(() => {
//     const scrollToBottom = () => {
//       commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
//     };
//     if (isOpen) {
//       setTimeout(() => {
//         scrollToBottom();
//       }, 100);
//     }
//   }, [isOpen, post.comments.length]);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
//       <ModalOverlay />
//       <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
//         <ModalHeader>Comments</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody pb={6}>
//           <Flex mb={4} gap={4} flexDir={'column'} maxH={'250px'} overflowY={'auto'} ref={commentsContainerRef}>
//             {post.comments.map((comment, idx) => (
//               <Comment key={idx} comment={comment} />
//             ))}
//           </Flex>
//           <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
//             <Input placeholder='Comment' size={'sm'} ref={commentRef} />
//             <Flex w={'full'} justifyContent={'flex-end'}>
//               <Button type='submit' ml={'auto'} size={'sm'} my={4} isLoading={isCommenting}>
//                 Post
//               </Button>
//             </Flex>
//           </form>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default CommentsModal;

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import Comment from '../Comment/Comment';
import usePostComment from '../../hooks/usePostComment';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const [comment, setComment] = useState(''); // Added state to track the comment input
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const { t } = useTranslation(); // this hook is used for translation. it basically returns a function that we can use to translate our text

  const handleSubmitComment = async e => {
    // do not refresh the page, prevent it
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = '';
    setComment(''); // Clear the state after submitting
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader>{t('Comments')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex mb={4} gap={4} flexDir={'column'} maxH={'250px'} overflowY={'auto'} ref={commentsContainerRef}>
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
            <Input
              placeholder={t('Comment')}
              size={'sm'}
              ref={commentRef}
              onChange={e => setComment(e.target.value)} // Track input changes
              value={comment} // Bind input to the comment state
            />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button
                type='submit'
                ml={'auto'}
                size={'sm'}
                my={4}
                isLoading={isCommenting}
                isDisabled={!comment.trim()} // Disable if comment is empty or just spaces
              >
                {t('Post')}
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
