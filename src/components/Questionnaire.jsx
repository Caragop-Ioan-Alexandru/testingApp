import React from "react";

export const Questionnaire = ({
  showAnswers,
  handleAnswer,
  handleNextQuestion,
  score,
  data: { question, correct_answer, answers, explanation },
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="bg-white text-center text-purple-800 p-4 mb-6 rounded-lg shadow-md w-1/4">
        Your score is {score}
      </h3>
      <div className="bg-white text-purple-800 p-4 rounded-lg shadow-md max-w-2xl">
        <p
          className="text-2xl leading-6"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6 max-w-2xl">
        {answers.map((answer, idx) => {
          const bgColor = showAnswers
            ? answer === correct_answer
              ? "bg-green-400"
              : "bg-red-400"
            : "bg-white";
          const textColor = showAnswers ? "text-white" : "text-purple-700";
          return (
            <button
              key={idx}
              dangerouslySetInnerHTML={{ __html: answer }}
              onClick={() => {
                handleAnswer(answer);
              }}
              className={`${bgColor} p-4 ${textColor} font-semibold rounded shadow`}
            />
          );
        })}
      </div>

      {showAnswers && (
        <div className="max-w-2xl flex flex-col">
          <p
            className="text-base leading-relaxed my-3 text-purple-800 text-justify"
            dangerouslySetInnerHTML={{ __html: explanation }}
          />
          <button
            onClick={handleNextQuestion}
            className={`mt-6 ml-auto p-4 bg-purple-700 text-white font-semibold rounded shadow`}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};
