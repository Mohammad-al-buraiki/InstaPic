import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore(state => state.login);

  const login = async inputs => {
    if (!inputs.email || !inputs.password) {
      return showToast('Error', 'Please fill all the fields', 'error');
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCred) {
        const docRef = doc(firestore, 'users', userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        console.log(
          'im right now before [loginUser(docSnap.data());] the docsnap error probably'
        );
        loginUser(docSnap.data());
        //   print out user info one by one to console
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
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { loading, error, login };
};

export default useLogin;
