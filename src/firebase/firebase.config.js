import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APP_KEY,
  appId: import.meta.env.VITE_FB_APP_ID,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
};
console.log({ firebaseConfig });

const app = initializeApp(firebaseConfig);
export default app;
