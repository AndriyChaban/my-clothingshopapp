// import firebase from 'firebase/FirebaseApp';
// import 'firebase/firestore';
// import auth from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { enableIndexedDbPersistence } from "firebase/firestore";




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
enableIndexedDbPersistence(firestore);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const document = doc(firestore, "users", userAuth.uid);
  const userSnapshot = await getDoc(document);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const { displayName } = additionalData;
    console.log('in createUserProfileDocument:', displayName, email, userAuth.uid)
    const createdAt = new Date();

    try {
      await setDoc(document, { displayName, email, createdAt, ...additionalData })
    }
    catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userSnapshot;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit()
}


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: `${title.toLowerCase()}`,
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// export default firebase;