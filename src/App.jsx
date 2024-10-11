import { useEffect, useState } from 'react';
import './App.css';
import Conhecimento from './Components/Conhecimento';
import Projeto from './Components/Projeto';
import Contato from './Components/Contato';
import textsJson from "./Assets/texts.json";

import imagemArvorar from "./Assets/images/arvorar.png";
import imagemArvorarGerenciador from "./Assets/images/arvorarGerenciador.png";
import imagemSeliga from "./Assets/images/seLiga.webp";
import imagemClickEsperto from "./Assets/images/clickEsperto.webp";
import imagemKennyNoBreu from "./Assets/images/kennynobreu.png";
import imagemVisaDXS from "./Assets/images/visadxs_play.png";
import imagemFruitHunt from "./Assets/images/fruithunt.png";
import imagemDcv from "./Assets/images/dcv.jpeg";
import imagemFan from "./Assets/images/fan.png";
import imagemBeachpark from "./Assets/images/Beach-Park-logo.png";
import imagemUnity from "./Assets/images/unity3d_30t70u3b.jpg";
import imagemLia from "./Assets/images/lia.jpeg";
import imagemGodot from "./Assets/images/godot.jpeg";
import imagemFbuni from "./Assets/images/centro-universitario-farias-brito_logo.png";
import imagemBiao from "./Assets/images/biao.webp";
import imagemProfranca from "./Assets/images/profranca.png";
import imagemIonic from "./Assets/images/ionic.png";
import imagemIa from "./Assets/images/ia.png";
import imagemTaoApp from "./Assets/images/taoApp.png";

function App() {
  const [anos, setAnos] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("pt-br");

  useEffect(() => {
    setAnos(calcularIdade(1999, 7, 19));

    const currentSelectedLanguage = localStorage.getItem("[DCV]_portfolio_selectedLanguage");
    if (currentSelectedLanguage) {
      setSelectedLanguage(currentSelectedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("[DCV]_portfolio_selectedLanguage", selectedLanguage)
  }, [selectedLanguage]);

  function calcularIdade(anoAniversario, mesAniversario, diaAniversario) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();

    let idade = anoAtual - anoAniversario;

    if (mesAtual < mesAniversario || (mesAtual === mesAniversario && diaAtual < diaAniversario)) {
      idade--;
    }

    return idade < 0 ? 0 : idade;
  }

  function mudarLinguagem() {
    switch (selectedLanguage) {
      case "pt-br":
        setSelectedLanguage("en");
        break;

      case "en":
        setSelectedLanguage("pt-br");
        break;

      default:
        setSelectedLanguage("pt-br");
        break;
    }
  }

  return (
    <div className="App">
      <button id='butao_seletor_de_lingua' type='button' onClick={() => mudarLinguagem()}>{selectedLanguage}</button>
      <div id="perfil" className="div-de-conteudo">
        <div id="bg-perfil"></div>
        <div id="base-foto-e-nome">
          <div id="foto-e-nome">
            <div id="foto-de-perfil"><img src={imagemDcv} alt='Daniel Vitoriano'></img></div>
            <div id="nome-perfil"><h2 id="nome">Daniel Vitoriano</h2></div>
          </div>
        </div>

        <div id="descricao-de-perfil">
          <div id="bar"></div>
          <p className='texto_descricao_de_perfil secundaria'>
            {textsJson[selectedLanguage].texto_descricao_de_perfil_secundaria}
          </p>
          <h1>{textsJson[selectedLanguage].sobre}</h1>
          <p className="texto_descricao_de_perfil">
            Hello there! <img alt='Obiwan Kenobi' src={imagemBiao} style={{ width: "calc(1vw + 1vh + 8px)", margin: "0%" }}></img><br></br>
            {textsJson[selectedLanguage].texto_descricao_de_perfil.replace("%idade%", anos)}
          </p>
          <p className="texto_descricao_de_perfil secundaria">
            {textsJson[selectedLanguage].descricao_sobre}
          </p>
        </div>
      </div>
      <div className='div-de-conteudo'>
        <h1>{textsJson[selectedLanguage].contatos}</h1>
        <div id="contatos">
          <Contato id="email" value="daniel.costaht2@gmail.com" src="https://uploads-ssl.webflow.com/58d9afff4f501c40503bfe06/5b51bcb32e9dd81b10d00a3a_white-email-icon.png" />
          <Contato id="numero" href='https://wa.me/qr/JM52EOUZOJLUO1' value="(85) 9 9418-6677" src="https://www.unifeb.edu.br/img/wpp-light.png" />
          <Contato id="linkedin" href='https://www.linkedin.com/in/daniel-vitoriano-gd' value="Daniel Vitoriano" src="https://icon-library.com/images/linkedin-icon-png-transparent-background/linkedin-icon-png-transparent-background-8.jpg" />
          <Contato id="github" href='https://github.com/DanielVitoriano' value="Daniel Vitoriano" src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg" />
        </div>
      </div>
      <div id="conhecimentos" className="div-de-conteudo">
        <h1>{textsJson[selectedLanguage].conhecimentos}</h1>
        <div id="conhecimentos-scroll">
          <div id="linguagens-de-programacao" className="conhecimento-tipos">
            <h4>{textsJson[selectedLanguage].linguagens_de_programacao}</h4>
            <Conhecimento conhecimento="C#" porcentagem={60} />
            <Conhecimento conhecimento="Java" porcentagem={10} />
            <Conhecimento conhecimento="JS" porcentagem={45} />
            <Conhecimento conhecimento="C" porcentagem={10} />
            <Conhecimento conhecimento="Python" porcentagem={5} />
          </div>

          <div id="engines" className="conhecimento-tipos">
            <h4>{textsJson[selectedLanguage].engine_e_frameworks}</h4>
            <Conhecimento conhecimento="Unity" porcentagem={55} />
            <Conhecimento conhecimento="Godot" porcentagem={12} />
            <Conhecimento conhecimento="Phaser" porcentagem={20} />
            <Conhecimento conhecimento="React" porcentagem={25} />
            <Conhecimento conhecimento="Ionic" porcentagem={20} />
          </div>

          <div id="linguas" className="conhecimento-tipos">
            <h4>{textsJson[selectedLanguage].linguagens}</h4>
            <Conhecimento conhecimento={textsJson[selectedLanguage].ingles} porcentagem={50} />
          </div>
        </div>

      </div>

      <div id="projetos" className="div-de-conteudo">
        <h1>{textsJson[selectedLanguage].projetos}</h1>
        <div id="projetos-scroll">

        <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "https://www.instagram.com/taichichuanfortaleza/",
              foto: "http://www.taichichuanfortaleza.com.br/style/images/logo.png"
            },
            {
              link: "https://ionicframework.com",
              foto: imagemIonic
            },
            {
              link: "https://angular.dev/",
              foto: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F2400px%2Fsvg_to_png%2F272339%2Fangular.png&f=1&nofb=1&ipt=da1b9d7ed508176558c7486c141bf075c783169807ad4bd5ddc6df27d6156574&ipo=images"
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_taoApp}
            imagemJogo={imagemTaoApp}
            nomeJogo="Tao APP"
            linkJogo="https://play.google.com/store/apps/details?id=io.taoapp.fs"
            descricaoJogo={textsJson[selectedLanguage].descricao_taoApp}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "http://baleiafranca.org.br",
              foto: imagemIa
            },
            {
              link: "https://pt-br.reactjs.org",
              foto: "https://jpie.nz/assets/images/2020/10/react-logo.png"
            },
            {
              link: "https://ionicframework.com",
              foto: imagemIonic
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_profranca}
            imagemJogo={imagemProfranca}
            nomeJogo="ProFRANCA"
            linkJogo="https://play.google.com/store/apps/details?id=com.australis.profranca"
            descricaoJogo={textsJson[selectedLanguage].descricao_profranca}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "https://www.linkedin.com/company/beach-park-hot-is-e-turismo-s-a/",
              foto: imagemBeachpark
            },
            {
              link: "https://pt-br.reactjs.org",
              foto: "https://jpie.nz/assets/images/2020/10/react-logo.png"
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_beachpark_jogo2}
            imagemJogo={imagemArvorarGerenciador}
            nomeJogo="Arvorar Gerenciador"
            linkJogo="#projetos"
            descricaoJogo={textsJson[selectedLanguage].descricao_beachpark_jogo2}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "https://www.linkedin.com/company/beach-park-hot-is-e-turismo-s-a/",
              foto: imagemBeachpark
            },
            {
              link: "https://phaser.io",
              foto: "https://docs.hektorprofe.net/cdn/wp-content/uploads/2015/10/logo-phaser-framework.png"
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_beachpark_jogo1}
            imagemJogo={imagemArvorar}
            nomeJogo="Arvorar"
            linkJogo="#projetos"
            descricaoJogo={textsJson[selectedLanguage].descricao_beachpark_jogo1}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "https://www.linkedin.com/company/copel/",
              foto: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog-static.infra.grancursosonline.com.br%2Fwp-content%2Fuploads%2F2015%2F07%2F03171005%2Fcopel-2-2015.jpg&f=1&nofb=1&ipt=a228445e4fbd5ffec2c22488d4679c8027a992b02bd5ae4fb25bd7b8cb58fd66&ipo=images"
            },
            {
              link: "https://unity.com",
              foto: imagemUnity
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_seliga}
            imagemJogo={imagemSeliga}
            nomeJogo="Se Liga"
            linkJogo="https://play.google.com/store/apps/details?id=com.Copel.SeLiga&gl=US"
            descricaoJogo={textsJson[selectedLanguage].descricao_seliga}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/company/fan-studios/",
              foto: imagemFan
            },
            {
              link: "https://www.linkedin.com/company/copel/",
              foto: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog-static.infra.grancursosonline.com.br%2Fwp-content%2Fuploads%2F2015%2F07%2F03171005%2Fcopel-2-2015.jpg&f=1&nofb=1&ipt=a228445e4fbd5ffec2c22488d4679c8027a992b02bd5ae4fb25bd7b8cb58fd66&ipo=images"
            },
            {
              link: "https://unity.com",
              foto: imagemUnity
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_clickesperto}
            imagemJogo={imagemClickEsperto}
            nomeJogo="Click Esperto"
            linkJogo="https://play.google.com/store/apps/details?id=com.Copel.ClickEsperto&gl=US"
            descricaoJogo={textsJson[selectedLanguage].descricao_clickesperto}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/in/liagodoy/",
              foto: imagemLia
            },
            {
              link: "https://www.youtube.com/c/CrieSeusJogos/videos",
              foto: "https://yt3.ggpht.com/YNyHn5LCV6jRDMOYDQSj-VBxsdSIOtFxy41u0-CdVAuChDHusIlwl5I642GshY6_pzJrtn_E=s88-c-k-c0x00ffffff-no-rj"
            },
            {
              link: "https://unity.com",
              foto: imagemUnity
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_kenny}
            imagemJogo={imagemKennyNoBreu}
            nomeJogo="Kenny no Breu"
            linkJogo="https://gamejolt.com/games/kenny/615062"
            descricaoJogo={textsJson[selectedLanguage].descricao_kenny}
          />

          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/in/liagodoy/",
              foto: imagemLia
            },
            {
              link: "https://becocultural.com.br/lei-aldir-blanc/",
              foto: "https://sulnoticias.net/wp-content/uploads/2020/09/Lei-Aldir-Blanc.jpg"
            },
            {
              link: "https://www.livrolivrecurio.com.br",
              foto: "https://agripestmanagement.co.uk/wp-content/uploads/2016/03/Bird-Icon.png"
            },
            {
              link: "https://godotengine.org",
              foto: imagemGodot
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_visadxs}
            imagemJogo={imagemVisaDXS}
            nomeJogo="VISADXS"
            linkJogo="https://www.livrolivrecurio.com.br/post/visadxs-um-jogo-de-representatividade"
            descricaoJogo={textsJson[selectedLanguage].descricao_kenny}
          />
          <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/school/centro-universitario-farias-brito/",
              foto: imagemFbuni
            },
            {
              link: "https://godotengine.org",
              foto: imagemGodot
            }
            ]
          }
            detalhesJogo={textsJson[selectedLanguage].detalhes_fruithunt}
            imagemJogo={imagemFruitHunt}
            nomeJogo="Fruit Hunt"
            linkJogo="https://github.com/DanielVitoriano/Fruit-Hunt"
            descricaoJogo={textsJson[selectedLanguage].descricao_fruithunt}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
