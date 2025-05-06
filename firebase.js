import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROYECTO",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        console.log("Usuario autenticado:", result.user.email);
    }).catch(error => console.error("Error en autenticación:", error));
}

export function saveScore(userEmail, score) {
    addDoc(collection(db, "leaderboard"), { email: userEmail, score })
        .then(() => console.log("Puntaje guardado!"))
        .catch(error => console.error("Error al guardar puntaje:", error));
}

export async function getLeaderboard() {
    const querySnapshot = await getDocs(collection(db, "leaderboard"));
    let scores = [];
    querySnapshot.forEach(doc => {
        scores.push(doc.data());
    });
    return scores.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor puntaje
}
