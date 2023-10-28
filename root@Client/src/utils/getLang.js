import axios from 'axios' // You need to import the axios library

export const getLang = async() => {
  try {
    const response = await axios.post("https://quizbackend-5adb.onrender.com/getLang"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it higher in the call stack
  }
};  

 