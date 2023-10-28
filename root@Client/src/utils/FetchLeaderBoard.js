import axios from 'axios' // You need to import the axios library

export const getLeader = async (Language) => {
  try {
    const response = await axios.post("http://localhost:8080/getLeader", {
      language:Language
    } ); 
    const sortedData = response.data.sort((a, b) => b.score - a.score); 
    const topThreeData = sortedData.slice(0, 3).map(item => ({ ...item, isTrue: true }));

    // Combine the top three items with the rest of the sorted data
    const combinedData = topThreeData.concat(sortedData.slice(3));

    return combinedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it higher in the call stack
  }
};  

 