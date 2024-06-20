const firebaseConfig = {
  apiKey: "AIzaSyD_Pxxjr-V2b5dXe6tdoufjb7B6zwBtEbU",
  authDomain: "myproject-dbbec.firebaseapp.com",
  projectId: "myproject-dbbec",
  storageBucket: "myproject-dbbec.appspot.com",
  messagingSenderId: "547072391356",
  appId: "1:547072391356:web:33f72108eaa649ecb5f8b9",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}
async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}
async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}
async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
