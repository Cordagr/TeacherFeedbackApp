import {db} from './firebase'
import {collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore"; 

// Add a new student user to the database
export async function addUser(information)
{
  try {
    const docRef = await setDoc(doc(db, "students", information.email), information);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Get student data based on their email
export async function getUser(email)
{
  const q = query(collection(db, "students"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let user;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  })
  return user;
}

// Get all students interested in a particular course or major
export async function filterCourse(course)
{
  let student;
  var array = [];

  const q = query(collection(db, "students"), where("type", "==", "student"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let studentCourses = doc.data().courses.toLowerCase();
    if(studentCourses.includes(course.toLowerCase()))
    {
      student = doc.data();
      array.push(student);
    }
  })
  return array;
}

// Get all students who have rated a particular teacher
export async function filterTeacherRatings(teacherName)
{
  let student;
  var array = [];

  const q = query(collection(db, "students"), where("type", "==", "student"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let ratings = doc.data().teacherRatings;
    if(ratings && ratings[teacherName])
    {
      student = doc.data();
      array.push(student);
    }
  })
  return array;
}

// Get all students who match the course preferences
export async function getRecommendedCourses(user)
{
  let temp;
  var array = [];

  // Fetch students with similar course preferences
  let q = query(collection(db, "students"), where("courses", "in", user.courseInterests), where("type", "==", "student"));
  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp = doc.data();
    array.push(temp);
  })

  // Shuffle for randomness and return
  shuffle(array)
  return array;
}

// Get all students with matching interests or major
export async function getMajorRecommended(user) {
  let temp;
  var array = [];

  let q = query(collection(db, "students"), where("major", "in", user.majorInterests), where("type", "==", "student"));
  let querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp = doc.data();
    array.push(temp);
  })

  shuffle(array)
  return array;
}

// Set or update a student's course interests
export async function setCourses(email, array)
{
  const ref = doc(db, 'students', email);
  setDoc(ref, { courseInterests: array }, { merge: true });
}

// Set or update a student's teacher ratings
export async function setTeacherRatings(email, teacherName, rating)
{
  const ref = doc(db, 'students', email);
  setDoc(ref, { [`teacherRatings.${teacherName}`]: rating }, { merge: true });
}

// Shuffle the array randomly (for recommendations)
export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
