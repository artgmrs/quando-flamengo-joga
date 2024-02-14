import React, { useState } from 'react';
import getNextGame from '../../services/ApiService'
import { useEffect } from 'react';
import { formatFullDate, formatDate, formatTime } from '../../utils/DateUtils.js'
import { generateGoogleCalendarLink } from '../../utils/GoogleCalendarUtils'
import ClipLoader from 'react-spinners/ClipLoader';
import {
  ShaderGradientCanvas,
  ShaderGradient,
} from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
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
      <ShaderGradientCanvas
        importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        style={{
          top: 0,
          pointerEvents: "none",
          height: "100vh",
          position: "absolute"
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=5.2&cPolarAngle=90&cameraZoom=1&color1=%23ff000d&color2=%23aa0004&color3=%23000000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=0.7&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=1.5&uFrequency=5.5&uSpeed=0.2&uStrength=3.4&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>

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
                  <div>
                    <img src={dados.imagemRival}></img>
                    <h4>{dados.nomeRival}</h4>
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