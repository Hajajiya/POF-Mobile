import { initializeApp, getApps } from "firebase/app";
import  {initializeAuth, getReactNativePersistence, getAuth} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCKUIkZeSM5fSIs4Is-R6Krh8NndNcTdY8",
  authDomain: "poflogin.firebaseapp.com",
  projectId: "poflogin",
  storageBucket: "poflogin.firebasestorage.app",
  messagingSenderId: "987161430070",
  appId: "1:987161430070:web:d16f0c9388d8fa635f7097",
  measurementId: "G-GZTQ8RN767"
};

let auth;

if(getApps().length == 0){
const app = initializeApp(firebaseConfig);

auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

}else{
  auth = getAuth();
}


export default auth;


