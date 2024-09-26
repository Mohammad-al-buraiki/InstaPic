import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore(state => state.login);

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

    const usersRef = collection(firestore, 'users');

    const q = query(usersRef, where('username', '==', inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast('Error', 'Username already exists', 'error');
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
        ); // if error arises, replace 'userDoc' with '{ uid: userDoc.uid, username: userDoc.username }
        console.log(docSnap.data().uid);
        console.log(docSnap.data().email);
        console.log(docSnap.data().username);
        console.log(docSnap.data().fullName);
        console.log(docSnap.data().bio);
        console.log(docSnap.data().profilePicURL);
        console.log(docSnap.data().followers);
        console.log(docSnap.data().following);
        console.log(docSnap.data().posts);
        console.log(docSnap.data().createdAt);
        loginUser(userDoc);
        // showToast('Success', 'Account created successfully!', 'success');
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
