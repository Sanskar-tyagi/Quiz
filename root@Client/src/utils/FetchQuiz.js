import axios from 'axios' // You need to import the axios library

export const getQuiz = async (Language) => {
  try {
    const response = await axios.post("http://localhost:8080/getQuiz", {
      Language
    } ); 
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it higher in the call stack
  }
};  

 