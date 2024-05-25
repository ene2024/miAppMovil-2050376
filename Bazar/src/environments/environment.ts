import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    // Configuración de Firebase para entorno de desarrollo
    apiKey: "AIzaSyDnu5pGkPIiuTgsFynC60F_0pCkWkKPXZs",
    authDomain: "bazar-63c99.firebaseapp.com",
    projectId: "bazar-63c99",
    storageBucket: "bazar-63c99.appspot.com",
    messagingSenderId: "684837899212",
    appId: "1:684837899212:web:87c5af3b0f9005de2dab69",
    measurementId: "G-ZM9F6QWC2M"
  }
};

// Inicializar Firebase para entorno de desarrollo
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
