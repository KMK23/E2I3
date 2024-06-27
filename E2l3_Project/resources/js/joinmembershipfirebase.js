import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  //여기에 쓰는건 firebase.js 에서 필요한것들..
  deleteDoc,
  updateDoc,
  getDoc,
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  try {
    // 문서 ID 수동
    // const saveDoc = await doc(db, collectionName, "2");
    // console.log(`Doc(결과)${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // setDoc 은 return 이 없어서 처리를 해주어야 한다.
    // console.log(`setDoc(결과)${saveResult}`);
    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);

    return true;
  } catch (error) {
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
  // deleteDoc("삭제할 문서 객체")
}

//이게 결국에 firebase 에 내용을 가져오고 수정하고 저장하고 삭제하고 이런것들을
//하기위해 이쪽에 함수를 만드는거야.
async function updateDatas(collectionName, docId, updateinfoObj) {
  // doc(db, collectionName, 문서ID);
  // getDoc(문서레퍼런스 )
  // updateDoc(문서데이터, 수정할 정보객체 )

  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateinfoObj);
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
        console.log(docRef);
        await setDoc(docRef, { score: dataObj.score }, { merge: true });
        console.log("Document successfully updated!");
      });
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export { db, getDatas, addDatas, deleteDatas, updateDatas, updateScore };
//export 는 말그대로 내보내서 쓰는것들이니까 deleteDats를 쓴거야.
