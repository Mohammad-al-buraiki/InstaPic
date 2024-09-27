import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { firestore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const useFollowUser = userId => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore(state => state.user);
  const setAuthUser = useAuthStore(state => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, 'users', authUser.uid);
      const userToFollowOrUnfollorRef = doc(firestore, 'users', userId);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      });

      await updateDoc(userToFollowOrUnfollorRef, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      });

      if (isFollowing) {
        // unfollow
        setAuthUser({
          ...authUser,
          following: authUser.following.filter(uid => uid !== userId)
        });
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(uid => uid !== authUser.uid)
          });

        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter(uid => uid !== userId)
          })
        );
        setIsFollowing(false);
      } else {
        // follow
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId]
        });

        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid]
          });

        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId]
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  ////////////////////////////////// below is from chatgpt, is working btw /////////////////////////////////////////

  //   const handleFollowUser = async () => {
  //     setIsUpdating(true);
  //     try {
  //       const currentUserRef = doc(firestore, 'users', authUser.uid);
  //       const userToFollowOrUnfollorRef = doc(firestore, 'users', userId);

  //       // Update the current user's following array
  //       await updateDoc(currentUserRef, {
  //         following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
  //       });

  //       // Update the other user's followers array
  //       await updateDoc(userToFollowOrUnfollorRef, {
  //         followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
  //       });

  //       if (isFollowing) {
  //         // Unfollow logic
  //         setAuthUser({
  //           ...authUser,
  //           following: authUser.following ? authUser.following.filter(uid => uid !== userId) : []
  //         });
  //         if (userProfile)
  //           setUserProfile({
  //             ...userProfile,
  //             followers: userProfile.followers ? userProfile.followers.filter(uid => uid !== authUser.uid) : []
  //           });

  //         // Update localStorage
  //         localStorage.setItem(
  //           'user-info',
  //           JSON.stringify({
  //             ...authUser,
  //             following: authUser.following ? authUser.following.filter(uid => uid !== userId) : []
  //           })
  //         );
  //         setIsFollowing(false);
  //       } else {
  //         // Follow logic
  //         setAuthUser({
  //           ...authUser,
  //           following: [...(authUser.following || []), userId] // Ensure following is an array
  //         });

  //         if (userProfile)
  //           setUserProfile({
  //             ...userProfile,
  //             followers: [...(userProfile.followers || []), authUser.uid] // Ensure followers is an array
  //           });

  //         // Update localStorage
  //         localStorage.setItem(
  //           'user-info',
  //           JSON.stringify({
  //             ...authUser,
  //             following: [...(authUser.following || []), userId]
  //           })
  //         );
  //         setIsFollowing(true);
  //       }
  //     } catch (error) {
  //       showToast('Error', error.message, 'error');
  //     } finally {
  //       setIsUpdating(false);
  //     }
  //   };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
