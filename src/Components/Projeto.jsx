const Projeto = (props) => {
    return(
        <div className="projeto">
              <div className="relacionados">
                {
                    props.relacionados.map((relacionado, index) => {
                        return <div key={`${props.nomeJogo}_${index}`} className="relacionado"><a href={relacionado.link}><img src={relacionado.foto} alt="relacionado ao projeto"></img></a></div>
                    })
                }
              </div>

              <div className="imagem-do-projeto">
                <img src={props.imagemJogo} alt="imagem do projeto"></img>
              </div>
              
              <article className="descricao-do-projeto">
                  <h3><a href={props.linkJogo}>{props.nomeJogo}</a></h3>
                  <p>{props.detalhesJogo}</p>
                  <article>
                      <p>
                        {props.descricaoJogo}
                      </p>
                  </article>
              </article>
        </div>
    );
}

export default Projeto; 