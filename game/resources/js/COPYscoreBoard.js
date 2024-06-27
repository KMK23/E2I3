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
  arrayUnion,
  arrayRemove,
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
    return false;
  }
}

// async function updateScore(collectionName, dataObj) {
//   // const docRef = doc(db, "scores");

//   try {
//     // const docSnap = await getDoc(docRef);
//     const collect = await collection(db, collectionName);
//     await addDoc(collect, dataObj);
//     return true;
//     // if (docSnap.exists()) {
//     //   const data = docSnap.data();
//     //   const scores = data.scores || [];

//     //   const existingUserScore = scores.find((score) => score.id === user);
//     //   if (existingUserScore) {
//     //     // 사용자의 기존 점수를 삭제
//     //     await updateDoc(docRef, {
//     //       scores: arrayRemove(existingUserScore),
//     //     });
//     //   }

//     //   // 새로운 점수를 추가
//     //   // await updateDoc(docRef, {
//     //   //   scores: { id: user, score: newScore, type: gameType },
//     //   // });

//     //   console.log("Document successfully updated!");
//     // } else {
//     //   console.log("No such document!");
//     // }
//   } catch (e) {
//     console.error("Error updating document: ", e);
//   }
// }

async function updateScore(collectionName, dataObj) {
  try {
    const collect = collection(db, collectionName);
    const q = query(
      collect,
      where("id", "==", dataObj.id),
      where("type", "==", dataObj.type)
    );
    const querySnapshot = await getDocs(q);

    let previousScore = 0;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        previousScore = doc.data().score;
        console.log(previousScore);
      });
    }

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

    // 총합 점수 업데이트
    const totalScoreRef = collection(db, "totalScore");
    const totalQuery = query(totalScoreRef, where("id", "==", dataObj.id));
    const totalQuerySnapshot = await getDocs(totalQuery);

    let totalScore = 0;
    if (!totalQuerySnapshot.empty) {
      totalQuerySnapshot.forEach((doc) => {
        totalScore = doc.data().userTotalScore;
        console.log(`1번:${totalScore}`);
      });
    }

    // 이전 점수 제거하고 새 점수 추가
    totalScore = totalScore - previousScore + dataObj.score;
    console.log(`2번:${totalScore}`);
    console.log(`데이터객체스코어:${dataObj.score}`);
    const totalDataObj = {
      id: dataObj.id,
      userTotalScore: totalScore,
      name: dataObj.name,
    };

    await updateTotalScore("totalScore", totalDataObj);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function updateTotalScore(collectionName, totalDataObj) {
  try {
    const collect = collection(db, collectionName);
    const q = query(collect, where("id", "==", totalDataObj.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // 문서가 존재하지 않으면 새 문서 추가
      await addDoc(collect, totalDataObj);
      console.log("New document successfully added!");
    } else {
      // 문서가 존재하면 점수 업데이트
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          userTotalScore: totalDataObj.userTotalScore,
          name: totalDataObj.name,
        });
        console.log("Document successfully updated!");
      });
    }
  } catch (e) {
    console.error("Error updating document: ", e);
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
export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  updateScore,
  updateTotalScore,
};
//export 는 말그대로 내보내서 쓰는것들이니까 deleteDats를 쓴거야.
