'usse strict';

import React from 'react'
//css
import './Perfil.css'
//firebase
import firebase from 'firebase';
//componentes
import SubirFoto from '../SubirFoto/SubirFoto'
class Perfil extends React.Component{

    _isMount = false;
    _VSubirFoto = false;

    constructor(props){
        super(props);
        this.state = 
            {
                array:[],
                nombre:'',
                foto:'',
                ventanaFoto:false
            };
    }

    componentDidMount(){
        this._isMount = true;
        if(localStorage.getItem('indiceUsuario')){
            firebase.database().ref(`${localStorage.getItem('indiceUsuario')}`).on('value',snap => {
                if(this._isMount){
                    console.log(snap.val());
                    this.setState({array:snap.val(), nombre:snap.val().nombre, foto:snap.val().foto});
                }
            })
        }
    }    

    componentWillUnmount(){
        this._isMount = false;
    }
    
    handleClick = () => {
        if(!this._VSubirFoto){
            this.setState({ventanaFoto:true});
            this._VSubirFoto = true;
        }
        else{
            this.setState({ventanaFoto:false});
            this._VSubirFoto = false;
        }
    }

    handleClickBorrar = (event) => {
        let confirmacion = window.confirm('Seguro que desea borrar la imagen?');

        if(confirmacion){
            let indiceUsuario = event.target.parentNode.parentNode.dataset.indiceusuario;
            let indiceContenido = event.target.parentNode.parentNode.dataset.indicecontenido;
            firebase.database().ref(`${indiceUsuario}/contenido/${indiceContenido}`).remove();
            // firebase.database().ref(`${event.target.dataset.indice1}/datos/`).child(`${event.target.dataset.indice2}`).remove();
        }   
    }

    cerrarVentana = () => {
        this.setState({ventanaFoto:false});
        this._VSubirFoto = false;
    }



    render(){
        
        let arrayContenido = [];
        if(this.state.array.contenido){
            this.state.array.contenido.forEach((dato,key) => {
                let contenido = 
                    {
                        indicUsuario:localStorage.getItem('indiceUsuario'),
                        indiceContenido:key,
                        imagen:dato.imagen,
                        mensaje:dato.mensaje
                    };
                arrayContenido.push(contenido)             
            })
        }

        return(
            <article className='articlePerfil'>
                <div className='divTituloUsuario'>
                    <div className='divBotonSubirFoto'>
                        <input type='button' value='SUBIR FOTO' onClick={this.handleClick}></input>
                    </div>
                    <div className='divUsuario'>
                        <h3>Bienvenido: {this.state.nombre}</h3>
                    </div>
                    
                    <div className='divFotoUsuario'>
                        <img src={this.state.foto} alt={this.state.foto}></img>
                    </div>
                </div>  

                <div className='divContenedorPerfil'>
                                
                    {
                        this.state.ventanaFoto
                        ?
                        <SubirFoto handleClick={this.handleClick} cerrarVentana={this.cerrarVentana}></SubirFoto>
                        :
                        <div></div>
                    }

                    {
                        arrayContenido
                        ?
                        arrayContenido.map((dato, key) => {
                            return(
                                <div key={key} className='contenedorContenido' data-indiceusuario={dato.indicUsuario} data-indicecontenido={dato.indiceContenido}>
                                    <div className='divImage'>
                                        <img src={dato.imagen} alt={dato.imagen}></img>
                                    </div>
                                    <div className='divMensaje'>
                                        <p>{dato.mensaje}</p>
                                    </div>
                                    <div className='divBotonBorrar'>
                                        <input type='button' value='Borrar' onClick={this.handleClickBorrar}></input>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }
                    
                </div>
            </article>
        )
    }
}

export default Perfil;