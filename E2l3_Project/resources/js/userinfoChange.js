import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
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

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  try {
    const collect = collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    console.error("추가 오류:", error);
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("삭제 성공");
  } catch (error) {
    console.error("삭제 오류:", error);
  }
}

async function updateDatas(collectionName, docId, updateinfoObj) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updateinfoObj);
    console.log("업데이트 성공");
  } catch (error) {
    console.error("업데이트 오류:", error);
  }
}

async function changePassword(currentPassword, newPassword) {
  try {
    // Firestore에서 users 컬렉션에서 사용자 정보 가져오기
    const snapshot = await getDocs(collection(db, "user"));
    let success = false;

    for (const doc of snapshot.docs) {
      const userData = doc.data();
      if (userData.password === currentPassword) {
        // 비밀번호 일치 시 해당 사용자의 비밀번호 업데이트
        await updateDatas("user", doc.id, {
          password: newPassword,
          password2: newPassword,
        });
        success = true;
        console.log("비밀번호가 성공적으로 변경되었습니다.");
        break; // 비밀번호가 일치하는 사용자를 찾으면 반복문을 멈춥니다
      }
    }

    if (!success) {
      console.log("현재 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("비밀번호 변경 중 오류:", error);
    return false;
  }
}
async function getUser(userId) {
  const collect = collection(db, "user");
  const q = query(collect, where("id", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot;
}

async function updateUserStatus(userId, newStatus) {
  const userRef = collection(doc); // db 변수를 사용하여 Firestore 컬렉션 참조
  await userRef.update({ active: newStatus }); // 사용자 문서 업데이트
  console.log(`User ${userId} status updated to ${newStatus}`);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  changePassword,
  updateUserStatus,
  getUser,
};
