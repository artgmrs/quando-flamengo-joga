import React, { useState } from 'react';
import getNextGame from '../../services/ApiService'
import { useEffect } from 'react';
import { addHours, formatDate } from '../../utils/DateUtils.js'
import generateGoogleCalendarLink from '../../utils/GoogleCalendarUtils'

const GameDisplay = () => {
  const [dados, setDados] = useState({});

  // let isMandante = dados.mandante ? 'Sim' : 'Não';
  let date;
  let endDate;
  
  if (dados.dataHoraJogo) {
    date = new Date(dados.dataHoraJogo);
    endDate = addHours(date, 2);
  }

  useEffect(() => {
    async function fetchData() {
      setDados(await getNextGame());
    }

    fetchData();
  }, [])

  return (
    <>
      {dados.dataHoraJogo &&
        <div>
          {/* <img src='src/assets/flamengo.png'></img> */}
          <h1>Próximo jogo do Flamengo</h1>
          <h3>{dados.campeonato}</h3>
          <h4>{dados.nomeRival}</h4>
          <img src={dados.imagemRival}></img>
          <h4>Data e Hora: {formatDate(dados.dataHoraJogo)}</h4>
          {/* <h4>Mandante? {isMandante}</h4> */}

          <a href={generateGoogleCalendarLink()} target="_blank">Adicionar ao calendário</a>
        </div>
      }
    </>
  );
};

export default GameDisplay;