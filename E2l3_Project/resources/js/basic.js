import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3_-Ry9Z8L70cTlTt3_UdOag6LBMSB1bk",
  authDomain: "e2i3-115bf.firebaseapp.com",
  projectId: "e2i3-115bf",
  storageBucket: "e2i3-115bf.appspot.com",
  messagingSenderId: "668756502687",
  appId: "1:668756502687:web:c7bd2afbcd5943cb5c1aaa",
  measurementId: "G-FEPJ5215YB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  try {
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

async function updateScore(collectionName, dataObj) {
  try {
    const collect = collection(db, collectionName);
    const q = query(
      collect,
      where("id", "==", dataObj.id),
      where("type", "==", dataObj.type)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // 문서가 존재하지 않으면 새 문서 추가
      await addDoc(collect, dataObj);
      console.log("New document successfully added!");
    } else {
      // 문서가 존재하면 점수 업데이트
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await setDoc(docRef, { score: dataObj.score }, { merge: true });
        console.log("Document successfully updated!");
      });
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function updateTotalScore(collectionName, docId, totalDataObj) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, totalDataObj);
      console.log("totalScore 문서 업데이트 완료:", totalDataObj);
    } else {
      await setDoc(docRef, totalDataObj);
      console.log("새로운 totalScore 문서 추가:", totalDataObj);
    }
  } catch (error) {
    console.error("totalScore 업데이트 오류:", error);
    throw error; // 오류 처리를 위해 예외 던지기
  }
}
async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateinfoObj) {
  const docRef = await doc(db, collectionName, docId);
  await updateDoc(docRef, updateinfoObj);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  updateScore,
  updateTotalScore,
};
