

const Conhecimento = (props) => {
    return(
        <div className="conhecimento" id="cnt1">
        <label htmlFor="cnt1">{props.conhecimento}</label>
        <div className="borda">
            <div className="preenchimento" style={{width: `${props.porcentagem}%`}}></div>
        </div>
        </div>    
    );
}

export default Conhecimento;