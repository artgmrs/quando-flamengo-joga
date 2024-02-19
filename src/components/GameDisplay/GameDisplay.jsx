import React, { useState } from 'react';
import getNextGame from '../../services/ApiService'
import { useEffect } from 'react';
import { formatFullDate, formatDate, formatTime } from '../../utils/DateUtils.js'
import { generateGoogleCalendarLink } from '../../utils/GoogleCalendarUtils'
import ClipLoader from 'react-spinners/ClipLoader';
import "./GameDisplay.css"

// @todo - quebrar em componentes menores
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
      <div className="game-thing">
        <div className="box">
          {loadingInProgress ? (
            <div className="loader-container">
              <ClipLoader color={'#808080'} size={80} />
            </div>
          ) : (
            <>
              {/* Engrossar fonte do campeonato */}
              <h3 className="championship">{dados.campeonato}</h3>

              {!dados.mandante ?
                <div className="box-teams">
                  <div className="team-principal">
                    <img src={"/flamengo_escudo.png"}></img>
                    <h4>Flamengo</h4>
                  </div>
                  <div className="team-secondary">
                    <img src={dados.imagemRival}></img>
                    <h4>{dados.nomeRival}</h4>
                  </div>
                </div>
                :
                <div className="box-teams">
                  <div className="team-principal">
                    <img src={dados.imagemRival}></img>
                    <h4>{dados.nomeRival}</h4>
                  </div>
                  <div className="team-secondary">
                    <img src={"/flamengo_escudo.png"}></img>
                    <h4>Flamengo</h4>
                  </div>
                </div>
              }

              {/* <h4>{formatFullDate(dados.dataHoraJogo)}</h4> */}
              <h4>{formatDate(dados.dataHoraJogo)}</h4>
              <h4>{formatTime(dados.dataHoraJogo)}</h4>

              <div className="box-link">
                <a className="link" href={generateGoogleCalendarLink(dados.nomeRival, date)} target="_blank">Adicionar ao calendário</a>
              </div>
            </>
          )
          }
        </div>
      </div>
    </>
  );
};

export default GameDisplay;