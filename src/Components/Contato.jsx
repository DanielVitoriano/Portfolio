const Contato = (props) => {
    return (
        <a type="button" className="contato" id={props.id} href={props.href}>
            <img src={props.src} alt='Contato'></img>
            <p>{props.value}</p>
        </a>
    );
}

export default Contato;