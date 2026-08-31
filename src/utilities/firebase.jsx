// Importaciones de librerías externas
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVUjW950SSKWURBAwsgtjNHaRySK4wCKo",
  authDomain: "ubiqum-u3-t2-scheduler.firebaseapp.com",
  databaseURL: "https://ubiqum-u3-t2-scheduler-default-rtdb.firebaseio.com",
  projectId: "ubiqum-u3-t2-scheduler",
  storageBucket: "ubiqum-u3-t2-scheduler.firebasestorage.app",
  messagingSenderId: "1008534799343",
  appId: "1:1008534799343:web:956c5205c37c24fb05ec1a"
};

// 1. Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 2. Inicializar Realtime Database y exportarlo
export const database = getDatabase(app);

// 3. Definir y exportar el hook useData
export const useData = (path, transform) => {
  const [snapshot, loading, error] = useObject(ref(database, path));
  let data;

  if (snapshot) {
    const value = snapshot.val();
    data = !loading && !error && transform ? transform(value) : value;
  }

  return [data, loading, error];
};

export const setData = (path, value) => (
  update(ref(database, path), value)
);