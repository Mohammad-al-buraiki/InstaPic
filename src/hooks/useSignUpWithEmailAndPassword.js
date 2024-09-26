// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase/firebase';
// import Signup from '../components/AuthForm/Signup';
// import { setDoc } from 'firebase/firestore';
// import { doc } from 'firebase/firestore';
// import { firestore } from '../firebase/firebase';
// import { useState } from 'react';
// import useShowToast from './useShowToast';

// const useSignUpWithEmailAndPassword = () => {
//   const [createUserWithEmailAndPassword, user, loading, error] =
//     useCreateUserWithEmailAndPassword(auth);
//   const showToast = useShowToast();

//   const signup = async inputs => {
//     if (
//       !inputs.email ||
//       !inputs.password ||
//       !inputs.username ||
//       !inputs.fullName
//     ) {
//       showToast('Error', 'Please fill in all fields', 'error');
//       return;
//     }

//     try {
//       const newUser = await createUserWithEmailAndPassword(
//         inputs.email,
//         inputs.password
//       );
//       if (!newUser && error) {
//         showToast('Error', error.message, 'error');

//         return;
//       }
//       if (newUser) {
//         const userDoc = {
//           uid: newUser.user.uid,
//           email: inputs.email,
//           username: inputs.username,
//           fullName: inputs.fullName,
//           bio: '',
//           profilePicURL: '',
//           followers: [],
//           following: [],
//           posts: [],
//           createdAt: Date.now()
//         };
//         await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
//         localStorage.setItem('user', JSON.stringify(userDoc));
//       }
//     } catch (error) {
//       showToast('Error', error.message, 'error');
//     }
//   };

//   return { loading, error, signup };
// };

// export default useSignUpWithEmailAndPassword;

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const signup = async inputs => {
    // Check if all fields are filled
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast('Error', 'Please fill in all fields', 'error');
      return;
    }

    try {
      // Create user with email and password
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      // If new user created successfully, proceed to Firestore
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: '',
          profilePicURL: '',
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        };

        // Set user document in Firestore
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);

        // Optionally store minimal user info in local storage
        localStorage.setItem(
          'user',
          JSON.stringify({ uid: userDoc.uid, username: userDoc.username })
        );
        showToast('Success', 'Account created successfully!', 'success');
      }
    } catch (error) {
      // Handle errors and show toast
      showToast(
        'Error',
        error.message || 'An unexpected error occurred',
        'error'
      );
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
