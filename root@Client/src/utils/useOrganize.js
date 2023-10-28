import { setQuizData } from "../Store/Slice/QuizSlice";

// Function to shuffle an array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function organize(data, dispatch,more) {
    // Initialize organizedData as an empty object
    const organizedData = {
        lang: data.Language,
        easy: [],
        medium: [],
        hard: [],
    };

    // Group questions by difficulty
    data.questions.forEach((question) => {
        switch (question.level) {
            case "Easy":
                organizedData.easy.push(question);
                break;
            case "Medium":
                organizedData.medium.push(question);
                break;
            case "Hard":
                organizedData.hard.push(question);
                break;
        }
    });

    // Shuffle questions within each category
    shuffleArray(organizedData.easy);
    shuffleArray(organizedData.medium);
    shuffleArray(organizedData.hard);
    let selectedQuestions;
    if(more==="Easy"){
          selectedQuestions =
          [
              ...organizedData.easy.slice(0, 10),
              ...organizedData.medium.slice(0, 5),
              ...organizedData.hard.slice(0, 5),
          ];
         

    }else if(more==="Medium"){
          selectedQuestions = 
          [
              ...organizedData.easy.slice(0, 5),
              ...organizedData.medium.slice(0, 10),
              ...organizedData.hard.slice(0, 5),
          ];

    }else{
         selectedQuestions = 
        [
            ...organizedData.easy.slice(0, 5),
            ...organizedData.medium.slice(0, 5),
            ...organizedData.hard.slice(0, 10),
        ];
    } 
    dispatch(setQuizData(selectedQuestions));
}
