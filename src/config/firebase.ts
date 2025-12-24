import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8VwWONHcubYwNPWnleh7WId-DkqQ19qs",
  authDomain: "personal-operating-syste-4094b.firebaseapp.com",
  projectId: "personal-operating-syste-4094b",
  storageBucket: "personal-operating-syste-4094b.firebasestorage.app",
  messagingSenderId: "50060193020",
  appId: "1:50060193020:web:a33f3362d08a16a36fbb79",
  measurementId: "G-LJ5VXENJNN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
