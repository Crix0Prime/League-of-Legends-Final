import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc ,getDocs, query, where  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkzHNzINCMgppgjyd-orwS-Mc6ami5iwA",
    authDomain: "estacionamiento1-bb8fe.firebaseapp.com",
    projectId: "estacionamiento1-bb8fe",
    storageBucket: "estacionamiento1-bb8fe.appspot.com",
    messagingSenderId: "500135249915",
    appId: "1:500135249915:web:002e3e10cc3af03b29ad5e"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);

//función para guardar un registro
export const save = async (lea) => {
  try {
    const modeloExiste = await verificarExistente(lea.campeon);
    if (modeloExiste) {
        Swal.fire({
            title: "Error",
            text: "El campeon ya existe en la colección",
            icon: "error"
        });
        return; // Detener el proceso de guardar el registro
    }

    await addDoc(collection(db, 'League'), lea);
    Swal.fire({
        title: "Guardado",
        text: "Su registro ha sido guardado exitosamente",
        icon: "success"
    });
} catch (error) {
    Swal.fire({
        title: "Error",
        text: "Se produjo un error al intentar guardar el registro",
        icon: "error"
    });
    console.error("Error al guardar el registro:", error);
}
}
//función para listar todos los registros
export const getData = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'League'), data)
}

//función eliminar 
export const eliminar = async (id) =>{
  try {
    // Elimina el documento de la colección 'Celulares' por su id
    await deleteDoc(doc(db, 'League', id));
    // Si se completa la operación sin errores, muestra el SweetAlert de éxito
    Swal.fire({
        title: "Eliminado",
        text: "El registro ha sido eliminado exitosamente",
        icon: "success"
    });
} catch (error) {
    // Si ocurre un error, muestra un SweetAlert de error
    Swal.fire({
        title: "Error",
        text: "Se produjo un error al intentar eliminar el registro",
        icon: "error"
    });
    console.error("Error al eliminar el registro:", error);
}
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtener = (id) => getDoc(doc(db,'League',id))

//función para actualizar los datos del documento 
export const update = async (id,league) =>{
  try {
    const Existente = await verificarExistente(league.campeon, id);
    if (Existente) {
      Swal.fire({
        title: "Error",
        text: "El Campeon ya existe en la colección",
        icon: "error"
      });
      return; // Detener el proceso de actualizar el registro
    }
    // Actualizar el documento en Firestore
    await updateDoc(doc(db, 'League', id), league);
    Swal.fire({
      title: "Actualizado",
      text: "Su registro ha sido actualizado exitosamente",
      icon: "success"
    });
  } catch (error) {
    console.error("Error al verificar Campeon:", error);
  }
};
export const verificarExistente = async (campeon, id = null) => {
  let querySnapshot;
  if (id) {
    querySnapshot = await getDocs(query(collection(db, 'League'), where('campeon', '==', campeon), where('__name__', '!=', id)));
  } else {
    querySnapshot = await getDocs(query(collection(db, 'League'), where('campeon', '==', campeon)));
  }
  return !querySnapshot.empty;
}