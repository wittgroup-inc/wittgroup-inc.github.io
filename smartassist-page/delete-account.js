// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("deleteBtn").addEventListener("click", async () => {
    const user = auth.currentUser;

    if (!user) {
        alert("You need to be logged in to delete your account.");
        return;
    }

    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        return;
    }

    try {
        // Delete Firestore User Data
        await db.collection("users").doc(user.uid).delete();

        // Delete Firebase Auth User
        await user.delete();

        alert("Your account has been deleted successfully.");
        window.location.href = "/";
    } catch (error) {
        if (error.code === "auth/requires-recent-login") {
            alert("Please re-login and try again.");
        } else {
            alert("Error deleting account: " + error.message);
        }
    }
});
