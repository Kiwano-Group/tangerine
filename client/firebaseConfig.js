
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCBKvdXjzepXj1B0c6Bonp2zGlMhhl0np8",
    authDomain: "tangerine-d3cd0.firebaseapp.com",
    projectId: "tangerine-d3cd0",
    storageBucket: "tangerine-d3cd0.appspot.com",
    messagingSenderId: "322863556045",
    appId: "1:322863556045:web:688cf7f02517eb89be5084"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };


