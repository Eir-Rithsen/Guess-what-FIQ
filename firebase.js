import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDk6qMEfHiIwgO2GRXqB5oDnVvNyqalN2o",
    authDomain: "guess-what-fiq.firebaseapp.com",
    projectId: "guess-what-fiq",
    storageBucket: "guess-what-fiq.firebasestorage.app",
    messagingSenderId: "875433633715",
    appId: "1:875433633715:web:db62e6b21d117698f44dc6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Usuario autenticado:", result.user.email);
            document.getElementById("user-info").textContent = `Bienvenido, ${result.user.email}`;
        })
        .catch(error => console.error("Error en autenticación:", error));
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
    return scores.sort((a, b) => b.score - a.score);
}
