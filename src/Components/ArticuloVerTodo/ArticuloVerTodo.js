'usse strict';

import React from 'react'
//css
import './ArticuloVerTodo.css'
//firebase
import firebase from 'firebase';
class ArticuloVerTodo extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                array:[],
                arrayActualizado:[]
            };
    }

    componentDidMount(){
        this._isMount = true;
        firebase.database().ref().on('value', snap => {
            if(this._isMount){
                 this.setState({array:snap.val()})               
            }            
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        let arrayAuxiliar = [];
        this.state.array.forEach( (data, key) => {
            if(data.contenido){
                data.contenido.forEach( (d,k) => {
                    let contenido = 
                        {
                            indiceUsuario:key,
                            indiceImagen:k,
                            usuario:data.nombre,
                            foto:d.imagen,
                            mensaje:d.mensaje,
                        };
                    arrayAuxiliar.push(contenido);
                })
            }
        })
 
        // console.log(arrayAuxiliar);
 
        return(
            <article className='aVerTodo'>
                <div className='divTitulo'>
                    <h2>VER TODO</h2>
                </div>

                <div className='divContenedorVerTodo'>
                    {
                        this._isMount && arrayAuxiliar
                        ?
                        arrayAuxiliar.map( (dato, key) => {
                            return(
                                <div key={key} className='divContenidoVerTodo' onClick={this.props.funcionVentanaComentarios} data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}>
                                    <div className='divFotoVerTodo' data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}>
                                        <img src={dato.foto} alt={dato.foto} data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}></img>
                                    </div>
                                    <div className='divUsuarioVerTodo' data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}>
                                        <h3 data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}>{dato.usuario}</h3>
                                    </div>
                                    <div className='divParrafoVerTodo' data-indiceusuario={dato.indiceUsuario} data-indiceimagen={dato.indiceImagen} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario}>
                                        <p>{dato.mensaje}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div>Cargando...</div>                        
                    }
                </div>
            </article>
        )
    }
}

export default ArticuloVerTodo;