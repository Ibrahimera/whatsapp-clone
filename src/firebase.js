import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBa5oe8xDezmkei0PXOKU1MOzEVtOhpnCU",
    authDomain: "whatsapp-5e50d.firebaseapp.com",
    projectId: "whatsapp-5e50d",
    storageBucket: "whatsapp-5e50d.appspot.com",
    messagingSenderId: "1070382931247",
    appId: "1:1070382931247:web:ac921540b1a7ae3543d5da"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;