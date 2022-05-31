import React, { useState } from "react";
import Poll from "react-polls";

//en pañales(ahora es igual a la votacion)
function Encuesta() {
  const pollQuestion = "Is react-polls useful?";
  const pollAnswers = [
    { option: "Yes", votes: 0 },
    { option: "No", votes: 0 },
  ];

  const [encuesta, setEncuesta] = useState(...pollAnswers);

  const handleVote = (voteAnswer) => {
    const newPollAnswers = encuesta.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    setEncuesta(newPollAnswers);
  };
  return (
    <>
      <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} />
    </>
  );
}

export default Encuesta;
