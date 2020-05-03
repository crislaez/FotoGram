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
                usuario:'',
                indice:''
            }
    }

    componentDidMount(){
        this._isMountd = true;
        this.setState({usuario:this.props.datoUsuarioBuscador,indice:this.props.indiceUsuario});
    }
    
    componentWillUnmount(){
        this._isMount = false;
        console.log(this._isMount)
    }

    componentDidUpdate(prevProps){
        if(this.props.datoUsuarioBuscador !== prevProps.datoUsuarioBuscador){
            this.setState({usuario:this.props.datoUsuarioBuscador,indice:this.props.indiceUsuario});
        }  
    }
    
    render(){

        console.log(this.state.usuario)
        let arrayAuxuliar = [];

        if(this.state.usuario.contenido){
            let nombre = this.state.usuario.nombre;
            this.state.usuario.contenido.forEach( (dato, key) => {
                let contniodoArray = 
                    {
                        indice:key,
                        imagen: dato.imagen,
                        mensaje:dato.mensaje,
                        nombre:nombre
                    };
                    arrayAuxuliar.push(contniodoArray);
                    // console.log(contniodoArray)
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
                                <div key={key} className='divContenidoBuscadorPerfil' onClick={this.props.funcionVentanaComentarios} data-indiceusuario={this.state.indice} data-indiceimagen={dato.indice} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}>
                                    <div className='divContenidoImagenBusadorPerfil'>
                                        <img src={dato.imagen} alt={dato.imagen} data-indiceusuario={this.state.indice} data-indiceimagen={dato.indice} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}></img>
                                    </div>
                                    <div className='divContenidoParrafo'>
                                        <p data-indiceusuario={this.state.indice} data-indiceimagen={dato.indice} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}>{dato.mensaje}</p>
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