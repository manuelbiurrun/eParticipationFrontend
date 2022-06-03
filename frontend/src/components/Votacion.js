import React, { useState, useEffect } from "react";
import Poll from "@gidesan/react-polls";

function Votacion({ opciones, pregunta }) {
  const [pollAnswers, setPollAnswers] = useState([]);

  useEffect(() => {
    setPollAnswers(opciones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [votacion, setVotacion] = useState(opciones);

  const guardarVotacion = () => {
    console.log(votacion);
  };

  const handleVote = (voteAnswer) => {
    const newPollAnswers = votacion.map((answer) => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    setVotacion(newPollAnswers);
    guardarVotacion();
  };
  return (
    <div>
      <Poll question={pregunta} answers={pollAnswers} onVote={handleVote} />
    </div>
  );
}

export default Votacion;
