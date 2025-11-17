import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDUrYXGC2lAmNmctvumOLKNq82ceuy9Z6s",
  authDomain: "roomio-meet.firebaseapp.com"
});

const auth = getAuth();

signInWithEmailAndPassword(auth, "test@test.com", "12345678")
  .then(async (res) => {
    const token = await res.user.getIdToken();
    console.log("ID TOKEN:", token);
  });
