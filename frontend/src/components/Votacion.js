import React, { useState } from "react";
import Poll from "@gidesan/react-polls";

//en pañales
function Votacion() {
  const pollQuestion = "Is react-polls useful?";

  const [encuesta, setEncuesta] = useState([
    { option: "Yes", votes: 0 },
    { option: "No", votes: 0 },
  ]);

  const handleVote = (voteAnswer) => {
    console.log(voteAnswer);
    const newPollAnswers = encuesta.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    setEncuesta(newPollAnswers);
    console.log(encuesta);
  };
  return (
    <div>
      <Poll question={pollQuestion} answers={encuesta} onVote={handleVote} />
    </div>
  );
}

export default Votacion;
