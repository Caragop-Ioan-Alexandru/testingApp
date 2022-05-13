import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Questionnaire } from "./Questionnaire";
import { AnnotationContext, CategoryContext, UserContext } from "./UserContext";

const API_URL = "http://localhost:3000/questions.json";

function AppComponent() {
  const { wrongAnnotation, setWrongAnnotation } = useContext(AnnotationContext);
  const { context, setContext } = useContext(UserContext);
  const { category, setCategory } = useContext(CategoryContext);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results
          .filter((question) => question.category === category)
          .map((question) => ({
            ...question,
            answers: [
              question.correct_answer,
              ...question.incorrect_answers,
            ].sort(() => Math.random() - 0.5),
          }));
        setQuestions(questions);
      });
  }, [category]);

  const handleAnswer = (answer) => {
    //change score
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    } else {
      setWrongAnnotation((prevState) => {
        return [...prevState, questions[currentIndex].annotation];
      });
    }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(wrongAnnotation);
  };

  const tryAgain = () => {
    setCurrentIndex(0);
    setScore(0);
    setCategory(category);
    setContext(context);
    setWrongAnnotation([]);
  };
  const logout = () => {
    setContext(null);
    setWrongAnnotation([]);
  };

  const handleSwitchLanguage = () => {
    setWrongAnnotation([]);
    setCurrentIndex(0);
    setScore(0);
  };

  return questions.length > 0 ? (
    <div className="flex justify-center items-center h-screen">
      {currentIndex >= questions.length ? (
        <div className="flex flex-col">
          <h1 className="text-3xl text-purple-800 font-bold text-center">
            Game over! Your final score is {score}.<br />
            {score === questions.length &&
              " Amazing! You scored a perfect 10! Congratulations!"}
          </h1>
          {wrongAnnotation.indexOf("statements") !== -1 && (
            <p className="text-purple-800 font-bold text-center max-w-md">
              It looks like you made some mistakes for the
              <strong>"statements"</strong> type of questions. You can review
              the
              <strong>"statemens chapter"</strong> and try again.
            </p>
          )}
          {wrongAnnotation.indexOf("loop") !== -1 && (
            <p className="text-purple-800 font-bold text-center max-w-md">
              It looks like you made some mistakes for the{" "}
              <strong>"loop"</strong>
              type of questions. You can review the
              <strong>"loops chapter"</strong> and try again.
            </p>
          )}
          {wrongAnnotation.indexOf("variables") !== -1 && (
            <p className="text-purple-800 font-bold text-center max-w-md">
              It looks like you made some mistakes for the{" "}
              <strong>"variables"</strong>
              type of questions. You can review the
              <strong>"variables"</strong> and try again.
            </p>
          )}
          <div className="flex justify-around items-center">
            <button
              onClick={tryAgain}
              className={`mt-6 p-4 bg-purple-700 text-white font-semibold rounded shadow`}
            >
              Try again
            </button>
            <Link to="/login">
              <button
                onClick={handleSwitchLanguage}
                className={`mt-6 p-4 bg-purple-700 text-white font-semibold rounded shadow`}
              >
                Change language
              </button>
            </Link>
            <Link to="/">
              <button
                onClick={logout}
                className={`mt-6 p-4 bg-purple-700 text-white font-semibold rounded shadow`}
              >
                Log out
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Questionnaire
          handleNextQuestion={handleNextQuestion}
          showAnswers={showAnswers}
          data={questions[currentIndex]}
          explanation={questions[currentIndex].explanation}
          handleAnswer={handleAnswer}
          score={score}
        />
      )}
    </div>
  ) : (
    <h1 className="text-2xl text-white font-bold">Loading questions...</h1>
  );
}

export default AppComponent;
