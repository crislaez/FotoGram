import React from 'react'

//css
import './Nav.css'

//font awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'

class Nav extends React.Component{

    render(){
 
        return(
            <nav>
                <button id='bMenu' onClick={this.props.functionSidebar}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
                <input id='bVerTodo' type='button' value='VER TODO' onClick={this.props.handleClick}></input>
                {
                    this.props.ventanaPerfiles
                    ?
                    <input id='bPerfil' type='button' value='PERFIL' onClick={this.props.handleClick}></input>
                    :
                    <input type='button' value='any' style={{width:'0px', height:'0px', display:'none'}} ></input>
                }
                

                <input id='bRegistro' className='bDerecha' type='button' value='REGISTRARSE' onClick={this.props.funcionRegistro}></input>
                {
                    this.props.botonLogin 
                    ?
                    <input id='bLoguear' className='bDerecha' type='button' value='LOGIN' onClick={this.props.funcionLogin}></input> 
                    :
                    <input id='bCerrarSesion' className='bDerecha' type='button' value='CERRAR SESION' onClick={this.props.funcionBotonLogin}></input> 
                }
                               
            </nav>
        )
    }
}

export default Nav;