import React, { useEffect, useState } from "react";
import Poll from "@gidesan/react-polls";

function Encuesta({ pregunta, opciones }) {
  const [pollAnswers, setPollAnswers] = useState([]);

  useEffect(() => {
    setPollAnswers(opciones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [encuesta, setEncuesta] = useState(opciones);

  const guardarEncuesta = () => {
    console.log(encuesta);
  };

  const handleVote = (voteAnswer) => {
    const newPollAnswers = encuesta.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    setEncuesta(newPollAnswers);
    guardarEncuesta();
  };
  return (
    <div>
      <Poll question={pregunta} answers={pollAnswers} onVote={handleVote} />
    </div>
  );
}

export default Encuesta;
