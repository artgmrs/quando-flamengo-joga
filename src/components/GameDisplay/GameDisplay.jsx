import React, { useState } from 'react';
import getNextGame from '../../services/ApiService'
import { useEffect } from 'react';
import { formatDate } from '../../utils/DateUtils.js'
import { generateGoogleCalendarLink } from '../../utils/GoogleCalendarUtils'
import ClipLoader from 'react-spinners/ClipLoader';

const GameDisplay = () => {
  const [dados, setDados] = useState({});
  const [loadingInProgress, setLoading] = useState(false);

  // let isMandante = dados.mandante ? 'Sim' : 'Não';
  let date;

  if (dados.dataHoraJogo) {
    date = new Date(dados.dataHoraJogo);
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setDados(await getNextGame());

      setLoading(false);
    }

    fetchData();
  }, [])

  return (
    <>
      {loadingInProgress ? (
        <div className="loader-container">
          <ClipLoader color={'#fff'} size={50} />
        </div>
      ) : (
        <div>
          {/* <img src='src/assets/flamengo.png'></img> */}
          <h1>Próximo jogo do Flamengo</h1>
          <h3>{dados.campeonato}</h3>
          <h4>{dados.nomeRival}</h4>
          <img src={dados.imagemRival}></img>
          <h4>Data e Hora: {formatDate(dados.dataHoraJogo)}</h4>
          {/* <h4>Mandante? {isMandante}</h4> */}

          <a href={generateGoogleCalendarLink(dados.nomeRival, date)} target="_blank">Adicionar ao calendário</a>
        </div>
      )
      }
    </>
  );
};

export default GameDisplay;