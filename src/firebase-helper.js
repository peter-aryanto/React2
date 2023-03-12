// npm install firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAxkkxpmmAHB8dpuJbWZOcqFQLx8_KhUJc", 
  authDomain: "p-a-react2.firebaseapp.com", 
  databaseURL: "https://p-a-react2-default-rtdb.asia-southeast1.firebasedatabase.app", 
  // projectId: "p-a-react2", 
  // storageBucket: "p-a-react2.appspot.com", 
  // messagingSenderId: "1002079014797", 
  // appId: "1:1002079014797:web:a7e27835db68e64becb7c4", 
  // measurementId: "G-Y0959KY73L" ,
});

const firebaseDb = getDatabase(firebaseApp);
// const firebaseDb = getFirestore(firebaseApp);

export { firebaseApp };
export { firebaseDb };