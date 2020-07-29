import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCj6nkirF0qnCOu0XG9dqSc86BhoVkwOk0",
    authDomain: "contas-473cc.firebaseapp.com",
    databaseURL: "https://contas-473cc.firebaseio.com",
    projectId: "contas-473cc",
    storageBucket: "contas-473cc.appspot.com",
    messagingSenderId: "64860881820",
    appId: "1:64860881820:web:48cd0bdfef1e218bd1fe59"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const contasDB = firebaseApp.database().ref("contas");