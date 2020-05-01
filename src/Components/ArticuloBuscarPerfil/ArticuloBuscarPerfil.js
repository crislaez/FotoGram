'use strict';

import React from 'react'
//css
import './ArticuloBuscarPerfil.css'

class ArticuloBuscarPerfil extends React.Component{
    
    _isMountd = false;

    constructor(props){
        super(props);
        this.state = 
            {
                usuario:''
            }
    }

    componentDidMount(){
        this._isMountd = true;
        this.setState({usuario:this.props.datoUsuarioBuscador});
    }
    
    componentWillUnmount(){
        this._isMount = false;
        console.log(this._isMount)
    }

    componentDidUpdate(prevProps){
        if(this.props.datoUsuarioBuscador !== prevProps.datoUsuarioBuscador){
            this.setState({usuario:this.props.datoUsuarioBuscador})
        }  
    }
    
    render(){

        console.log(this.state.usuario)
        let arrayAuxuliar = [];

        if(this.state.usuario.contenido){
            this.state.usuario.contenido.forEach( (dato, key) => {
                let contniodoArray = 
                    {
                        indice:key,
                        imagen: dato.imagen,
                        mensaje:dato.mensaje
                    };
                    arrayAuxuliar.push(contniodoArray);
                    console.log(contniodoArray)
            });
        }

        return(
            <article className='articleBuscarPerfil'>

                <div className='divBuscarPerfilTitulo'>
                    <h2>{this.state.usuario.nombre}</h2>
                </div>

                <div className='divContenedorBuscadorPerfilTitulo'>

                    <div className='divFotoBuscadorPerfil'>
                        <img src={this.state.usuario.foto} alt={this.state.usuario.foto}></img>
                    </div>

                    <div className='divDerechaBuscadorPErfil'>

                    {
                        arrayAuxuliar
                        ?
                        arrayAuxuliar.map( (dato, key) => {
                            return(
                                <div key={key} className='divContenidoBuscadorPerfil'>
                                    <div className='divContenidoImagenBusadorPerfil'>
                                        <img src={dato.imagen} alt={dato.imagen}></img>
                                    </div>
                                    <div className='divContenidoParrafo'>
                                        <p>{dato.mensaje}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }
                    </div>

                </div>

            </article>
        )
    }
}

export default ArticuloBuscarPerfil;