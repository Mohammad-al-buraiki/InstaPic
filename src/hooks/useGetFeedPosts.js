// import { useEffect, useState } from 'react';
// import usePostStore from '../store/postStore';
// import useAuthStore from '../store/authStore';
// import useShowToast from './useShowToast';
// import useUserProfileStore from '../store/userProfileStore';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { firestore } from '../firebase/firebase';

// const useGetFeedPosts = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const { posts, setPosts } = usePostStore();
//   const authUser = useAuthStore(state => state.user);
//   const showToast = useShowToast();
//   const { setUserProfile } = useUserProfileStore();

//   useEffect(() => {
//     const getFeedPosts = async () => {
//       setIsLoading(true);
//       if (authUser.following.length === 0) {
//         setIsLoading(false);
//         setPosts([]);
//         return;
//       }
//       const q = query(collection(firestore, 'posts'), where('createdBy', 'in', authUser.following));
//       try {
//         const querySnapshot = await getDocs(q);
//         const feedPosts = [];

//         querySnapshot.forEach(doc => {
//           feedPosts.push({ id: doc.id, ...doc.data() });
//         });

//         feedPosts.sort((a, b) => b.createdAt - a.createdAt);
//         setPosts(feedPosts);
//       } catch (error) {
//         showToast('Error', error.message, 'error');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (authUser) getFeedPosts();
//   }, [authUser, showToast, setPosts, setUserProfile]);

//   return { isLoading, posts };
// };

// export default useGetFeedPosts;

import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore(state => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);

      try {
        const postsRef = collection(firestore, 'posts');
        let feedPosts = [];

        // If the user is not following anyone, fetch only their own posts
        if (authUser.following.length === 0) {
          const userPostsQuery = query(postsRef, where('createdBy', '==', authUser.uid));
          const userPostsSnapshot = await getDocs(userPostsQuery);

          userPostsSnapshot.forEach(doc => {
            feedPosts.push({ id: doc.id, ...doc.data() });
          });
        } else {
          // Fetch posts from both the current user and users they follow
          const userPostsQuery = query(postsRef, where('createdBy', '==', authUser.uid));
          const followingPostsQuery = query(postsRef, where('createdBy', 'in', authUser.following));

          // Execute both queries in parallel
          const [userPostsSnapshot, followingPostsSnapshot] = await Promise.all([
            getDocs(userPostsQuery),
            getDocs(followingPostsQuery)
          ]);

          // Add the current user's posts to the feed
          userPostsSnapshot.forEach(doc => {
            feedPosts.push({ id: doc.id, ...doc.data() });
          });

          // Add the posts from users the current user follows
          followingPostsSnapshot.forEach(doc => {
            feedPosts.push({ id: doc.id, ...doc.data() });
          });
        }

        // Sort the posts by createdAt, newest first
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);

        // Set the posts in the store
        setPosts(feedPosts);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch posts only if authUser is available
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
