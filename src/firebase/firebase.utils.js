// import firebase from 'firebase/FirebaseApp';
// import 'firebase/firestore';
// import auth from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { getFirestore, doc, getDoc,  setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyC1_I0wgDXhs6BHTys4CeAHkEw9LadCG0I",
  authDomain: "my-shop-project-1ca82.firebaseapp.com",
  projectId: "my-shop-project-1ca82",
  storageBucket: "my-shop-project-1ca82.appspot.com",
  messagingSenderId: "257341123298",
  appId: "1:257341123298:web:79494b6082586a78308cbb",
  measurementId: "G-TB3K3V6J0Z"
};

// const app = initializeApp(config);
initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const document = doc(firestore, "users", userAuth.uid);

  const userSnapshot = await getDoc(document);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    console.log('in createUserProfileDocument:', displayName, email, userAuth.uid)
    const createdAt = new Date();

    try {
      await setDoc(document, { displayName, email, createdAt, ...additionalData})
    }
    catch (error) {
      console.log('error creating user', error.message);

    }
  }

  return userSnapshot;

}

let provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithRedirect(auth, provider);

// export default firebase;