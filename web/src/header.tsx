import React from 'react'

interface HeaderProps{
    title?: string
}

/*function Header() {//Manter todo componente com letra maiúscula para não bater com as tags html
    return(
        <header>
            <h1>Ecoleta</h1>
        </header>
    )
}*/

//Generic é o tipo do typescript onde pode-se receber um parâmetro
const  Header: React.FC<HeaderProps> = (props) => {//React.FC  é para informar que o componente é escrito no formato de função, FC é do tipo genérico
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}
export default Header