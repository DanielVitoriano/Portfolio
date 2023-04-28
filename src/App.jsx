import { useEffect, useState } from 'react';
import './App.css';
import Conhecimento from './Components/Conhecimento';
import Projeto from './Components/Projeto';
import Contato from './Components/Contato';

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
import imageFbuni from "./Assets/images/centro-universitario-farias-brito_logo.png";

function App() {
  const [anos, setAnos] = useState();

  useEffect(() => {
    setAnos(calcularIdade(1999, 7, 19));
  }, []);

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
  
  return (
    <div className="App">
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
            <p className="texto_descricao_de_perfil">
                Hello there!<br></br>
                Daniel aqui, um jovem programador de {anos} anos.
            </p>
            <p className='texto_descricao_de_perfil secundaria'>
                É fantastico você escrever linhas e daquilo criar algo. Seja o movimento de um personagem ou a funcionalidade de uma página.
                Ver aquilo em funcionamento é algo gratificante.
            </p>
        </div>  
      </div>
      <div className='div-de-conteudo'>
      <h1>Contatos</h1>
        <div id="contatos">
            <Contato id="email" value="daniel.costaht2@gmail.com" src="https://uploads-ssl.webflow.com/58d9afff4f501c40503bfe06/5b51bcb32e9dd81b10d00a3a_white-email-icon.png"/>
            <Contato id="numero" href='https://wa.me/qr/JM52EOUZOJLUO1' value="(85) 9 9418-6677" src="https://www.unifeb.edu.br/img/wpp-light.png"/>
            <Contato id="linkedin" href='https://www.linkedin.com/in/daniel-vitoriano-gd' value="Daniel Vitoriano" src="https://icon-library.com/images/linkedin-icon-png-transparent-background/linkedin-icon-png-transparent-background-8.jpg"/>
            <Contato id="github" href='https://github.com/DanielVitoriano' value="Daniel Vitoriano" src="https://icon-library.com/images/github-icon-white/github-icon-white-6.jpg"/>
        </div>
      </div>
      <div id="conhecimentos" className="div-de-conteudo">
        <h1>Conhecimentos</h1>
        <div id="conhecimentos-scroll">
            <div id="linguagens-de-programacao" className="conhecimento-tipos">
                <h4>Linguagens de Programação</h4>
                <Conhecimento conhecimento="C#" porcentagem={60}/>
                <Conhecimento conhecimento="Java" porcentagem={15}/>
                <Conhecimento conhecimento="JS" porcentagem={45}/>
                <Conhecimento conhecimento="C" porcentagem={12}/>
            </div>
    
            <div id="engines" className="conhecimento-tipos">
                <h4>Game Engines e Frameworks</h4> 
                <Conhecimento conhecimento="Unity" porcentagem={62}/>
                <Conhecimento conhecimento="Godot" porcentagem={15}/>
                <Conhecimento conhecimento="Phaser" porcentagem={35}/>
                <Conhecimento conhecimento="React" porcentagem={30}/>
            </div>
    
            <div id="linguas" className="conhecimento-tipos">
                <h4>Linguagens</h4>
                <Conhecimento conhecimento="Inglês" porcentagem={35}/>
            </div>
        </div>
        
    </div>

      <div id="projetos" className="div-de-conteudo">
        <h1>Projetos</h1>
        <div id="projetos-scroll">
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
                foto:"https://jpie.nz/assets/images/2020/10/react-logo.png"
              }
              ]
              }
              detalhesJogo = "Aplicação para gerenciamento de jogo."
              imagemJogo = {"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4lE8oT0ObwY%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=5282c165933fa15f3de830c715ecd352af382cf8b26a9cd0dfb9763611595e6a&ipo=images"}
              nomeJogo = "Aplicação em desenvolvimento."
              linkJogo = "#projetos"
              descricaoJogo = "" 
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
                foto:"https://docs.hektorprofe.net/cdn/wp-content/uploads/2015/10/logo-phaser-framework.png"
              }
              ]
              }
              detalhesJogo = "Aplicação Web Gameficada."
              imagemJogo = {"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4lE8oT0ObwY%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=5282c165933fa15f3de830c715ecd352af382cf8b26a9cd0dfb9763611595e6a&ipo=images"}
              nomeJogo = "Jogo em desenvolvimento."
              linkJogo = "#projetos"
              descricaoJogo = "" 
            />

            <Projeto relacionados={
              [{
                link: "https://www.linkedin.com/company/fan-studios/", 
                foto: imagemFan
              },
              {
                link: "https://www.linkedin.com/company/copel/", 
                foto:"https://i1.wp.com/vagasabertas.org/wp-content/uploads/2014/06/Copel-Trabalhe-Conosco-Empregos-01.png?resize=187%2C187&ssl=1"
              },
              {
                link: "https://unity.com", 
                foto: imagemUnity
              }
              ]
              }
              detalhesJogo = "Se Liga é um jogo educativo de quizz e exploração."
              imagemJogo = {imagemSeliga}
              nomeJogo = "Se Liga"
              linkJogo = "https://play.google.com/store/apps/details?id=com.Copel.SeLiga&gl=US"
              descricaoJogo = "Monte o seu personagem e explore a cidade dos Desligados acompanhado de Lúcio. O jogador deve explorar a cidade coletando baterías e através de um Quizz ajudar as pessoas que realizam mau uso da energia elétrica." 
            />

            <Projeto relacionados={
              [{
                link: "https://www.linkedin.com/company/fan-studios/", 
                foto: imagemFan
              },
              {
                link: "https://www.linkedin.com/company/copel/", 
                foto:"https://i1.wp.com/vagasabertas.org/wp-content/uploads/2014/06/Copel-Trabalhe-Conosco-Empregos-01.png?resize=187%2C187&ssl=1"
              },
              {
                link: "https://unity.com", 
                foto: imagemUnity
              }
              ]
              }
              detalhesJogo = "Click Esperto consiste em um jogo de corrida infinita, do qual se deve economizar energia enquanto percorre a maior distância possível."
              imagemJogo = {imagemClickEsperto}
              nomeJogo = "Click Esperto"
              linkJogo = "https://play.google.com/store/apps/details?id=com.Copel.ClickEsperto&gl=US"
              descricaoJogo = "Escolha o seu personagem e corra pelas ruas da cidade dos desligados. Apaguê as lâmpadas, colete moedas e desvie dos obstáculos." 
            />

            <Projeto relacionados={
              [{
                link: "https://www.linkedin.com/in/liagodoy/", 
                foto: imagemLia
              },
              {
                link: "https://www.youtube.com/c/CrieSeusJogos/videos", 
                foto:"https://yt3.ggpht.com/YNyHn5LCV6jRDMOYDQSj-VBxsdSIOtFxy41u0-CdVAuChDHusIlwl5I642GshY6_pzJrtn_E=s88-c-k-c0x00ffffff-no-rj"
              },
              {
                link: "https://unity.com", 
                foto: imagemUnity
              }
              ]
              }
              detalhesJogo = "Kenny no breu, é um jogo de exploração e terror com puzzles."
              imagemJogo = {imagemKennyNoBreu}
              nomeJogo = "Kenny no Breu"
              linkJogo = "https://gamejolt.com/games/kenny/615062"
              descricaoJogo = "Kenny está preso em seu pesadelo e você deve ajudá-lo a escapar, mas cuidado com as criaturas! Utilize a lanterna com sabedoria e desvende os mistérios." 
            />

            <Projeto relacionados={
              [{
                link: "https://www.linkedin.com/in/liagodoy/", 
                foto: imagemLia
              },
              {
                link: "https://becocultural.com.br/lei-aldir-blanc/", 
                foto:"https://sulnoticias.net/wp-content/uploads/2020/09/Lei-Aldir-Blanc.jpg"
              },
              {
                link: "https://www.livrolivrecurio.com.br", 
                foto:"https://agripestmanagement.co.uk/wp-content/uploads/2016/03/Bird-Icon.png"
              },
              {
                link: "https://godotengine.org", 
                foto: imagemGodot
              }
              ]
              }
              detalhesJogo = "VISADXS é um jogo de cartas sobre a cultura negra, afro e caribenha."
              imagemJogo = {imagemVisaDXS}
              nomeJogo = "VISADXS"
              linkJogo = "https://www.livrolivrecurio.com.br/post/visadxs-um-jogo-de-representatividade"
              descricaoJogo = "Combine os respectivos pares e descubra mais sobre as figuras presentes neste jogo." 
            />
            <Projeto relacionados={
            [{
              link: "https://www.linkedin.com/school/centro-universitario-farias-brito/", 
              foto: imageFbuni
            },
            {
              link: "https://godotengine.org", 
              foto: imagemGodot
            }
            ]
            }
            detalhesJogo = "Fruit Hunt é um jogo educativo de plataforma e corrida infinita"
            imagemJogo = {imagemFruitHunt}
            nomeJogo = "Fruit Hunt"
            linkJogo = "https://github.com/DanielVitoriano/Fruit-Hunt"
            descricaoJogo = "Pensado para ser jogado por crianças de 5 a 6 anos. O intuito do jogo consiste no aprendizado de novas palavras e em questão da boa alimentação." 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
