import firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC2sQNdmOPeXs7DwzEF0FFC-YcCsQtFVHw",
  authDomain: "tributary-5cdd7.firebaseapp.com",
  projectId: "tributary-5cdd7",
  storageBucket: "tributary-5cdd7.appspot.com",
  messagingSenderId: "307960114162",
  appId: "1:307960114162:web:dae324b552dcdfd08f996b",
  measurementId: "G-Y7RNPL79E6"
}

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

export const auth = firebase.auth();