// /*
// // import React, { useState } from 'react';
// // import useAuthStore from '../store/authStore';
// // import useShowToast from './useShowToast';
// // import useUserProfileStore from '../store/userProfileStore';
// // import { updateDoc, doc } from 'firebase/firestore';
// // import { ref, uploadString, getDownloadURL } from 'firebase/storage';
// // import { firestore, storage } from '../firebase/config';
// */
// import { useState } from 'react';
// import useAuthStore from '../store/authStore';
// import useShowToast from './useShowToast';
// import { getDownloadURL, ref, uploadString } from 'firebase/storage';
// import { firestore, storage } from '../firebase/firebase';
// import { doc, updateDoc } from 'firebase/firestore';
// import useUserProfileStore from '../store/userProfileStore';

// const useEditProfile = () => {
//   const [isUpdating, setIsUpdating] = useState(false);
//   const authUser = useAuthStore(state => state.user);
//   const setAuthUser = useAuthStore(state => state.setUser);
//   const setUserProfile = useUserProfileStore(state => state.setUserProfile);
//   const showToast = useShowToast();

//   const editProfile = async (inputs, selectedFile) => {
//     if (isUpdating || !authUser) return;
//     setIsUpdating(true);

//     const storageRef = ref(storage, `profilePics/${authUser.uid}`);
//     const userDocRef = doc(firestore, 'users', authUser.uid);

//     let URL = '';
//     try {
//       if (selectedFile) {
//         await uploadString(storageRef, selectedFile, 'data_url');
//         URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
//       }

//       const updatedUser = {
//         ...authUser,
//         fullName: inputs.fullName || authUser.fullName,
//         username: inputs.username || authUser.username,
//         bio: inputs.bio || authUser.bio,
//         profilePicURL: URL || authUser.profilePicURL
//       };

//       await updateDoc(userDocRef, updatedUser);
//       localStorage.setItem('user-info', JSON.stringify(updatedUser));
//       setAuthUser(updatedUser);
//       setUserProfile(updatedUser);
//       showToast('Success', 'Profile updated successfully', 'success');
//     } catch (error) {
//       showToast('Error', error.message, 'error');
//     }
//   };

//   return { editProfile, isUpdating };
// };
// export default useEditProfile;

import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import useUserProfileStore from '../store/userProfileStore';

// Main custom hook `useEditProfile` is defined here
const useEditProfile = () => {
  // `isUpdating` is a state variable to track if the profile update process is ongoing
  // `setIsUpdating` is the function to update its value (true/false)
  const [isUpdating, setIsUpdating] = useState(false);

  // Using the `useAuthStore` hook to get the current authenticated user (`authUser`) and the function to update them (`setAuthUser`)
  const authUser = useAuthStore(state => state.user); // Get the currently logged-in user's data
  const setAuthUser = useAuthStore(state => state.setUser); // Function to update the logged-in user's data

  // Using `useUserProfileStore` to get the function to update user profile in a different store
  const setUserProfile = useUserProfileStore(state => state.setUserProfile); // Function to update the user profile in a different store

  // `useShowToast` provides the `showToast` function which shows popup messages (toasts)
  const showToast = useShowToast(); // Function to display messages for success or error

  // The main function to handle editing a user's profile
  const editProfile = async (inputs, selectedFile) => {
    // If a profile update is already in progress (isUpdating is true) or there is no authenticated user, exit the function early
    if (isUpdating || !authUser) return; // Early return: if we're already updating or no user is authenticated, do nothing

    setIsUpdating(true); // Mark the start of the update process by setting `isUpdating` to true

    // Create a reference for Firebase Storage where the user's profile picture will be uploaded
    const storageRef = ref(storage, `profilePics/${authUser.uid}`); // This will store the profile picture at 'profilePics/{userID}'

    // Create a reference to the user's document in Firestore database (where the user profile is stored)
    const userDocRef = doc(firestore, 'users', authUser.uid); // This refers to the user's document in Firestore

    let URL = ''; // Initialize an empty URL string to store the download URL for the profile picture

    try {
      // If the user has selected a new file (profile picture), upload it to Firebase Storage
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, 'data_url'); // Upload the selected file as a 'data_url' to Firebase Storage

        // Get the download URL of the newly uploaded profile picture
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`)); // Fetch the download URL for the uploaded picture
      }

      // Create an updated user object by combining the old user data (`authUser`) with new data (`inputs`)
      // If the user has provided new values for fullName, username, or bio, use them, otherwise use the existing values from `authUser`
      // Also update the profile picture URL if there is a new picture, otherwise keep the old one
      const updatedUser = {
        ...authUser, // Spread operator to retain all existing fields in `authUser`
        fullName: inputs.fullName || authUser.fullName, // If the user provides a new full name, use it, otherwise use the existing one
        username: inputs.username || authUser.username, // Same logic for username
        bio: inputs.bio || authUser.bio, // Same logic for bio
        profilePicURL: URL || authUser.profilePicURL // Use the new profile pic URL if available, otherwise use the existing one
      };

      // Update the user's document in Firestore with the new data
      await updateDoc(userDocRef, updatedUser); // Send the updated user object to Firestore, which will overwrite the existing data

      // Store the updated user data in localStorage (browser storage)
      localStorage.setItem('user-info', JSON.stringify(updatedUser)); // Store the updated user info in the browser for persistence

      // Update the authenticated user state with the new data (using `setAuthUser`)
      setAuthUser(updatedUser); // Update the logged-in user state

      // Update the user profile state (using `setUserProfile`)
      setUserProfile(updatedUser); // Update the user profile state in the store

      // Show a success toast message to notify the user that the profile update was successful
      showToast('Success', 'Profile updated successfully', 'success'); // Display a "Success" message to the user
    } catch (error) {
      // If something goes wrong (e.g., uploading the file or updating Firestore fails), catch the error
      showToast('Error', error.message, 'error'); // Show an error message to the user indicating what went wrong
    } finally {
      // Regardless of success or error, mark the update process as complete by setting `isUpdating` to false
      setIsUpdating(false); // Reset `isUpdating` to false after the process is finished
    }
  };

  // The hook returns two things:
  // - `editProfile`: The function that actually performs the profile update when called
  // - `isUpdating`: A boolean flag that tells the component if the profile update is in progress (true) or not (false)
  return { editProfile, isUpdating };
};

// Export the custom hook so it can be used in other parts of the application
export default useEditProfile;
