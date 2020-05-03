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
                ventanaFoto:false,
                fotoCambio:'',
                indiceUsuario:''
            };
    }

    componentDidMount(){
        this._isMount = true;
        if(localStorage.getItem('indiceUsuario')){
            firebase.database().ref(`${localStorage.getItem('indiceUsuario')}`).on('value',snap => {
                if(this._isMount){
                    console.log(snap.val());
                    this.setState({array:snap.val(), nombre:snap.val().nombre, foto:snap.val().foto, indiceUsuario:localStorage.getItem('indiceUsuario')});
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
            let indiceimagen = event.target.parentNode.parentNode.dataset.indiceimagen;
            firebase.database().ref(`${indiceUsuario}/contenido/${indiceimagen}`).remove();
        }   
    }

    cerrarVentana = () => {
        this.setState({ventanaFoto:false});
        this._VSubirFoto = false;
    }

    //funcion para el mouseOver para que aparezca el formulario
    handleMouseOver = (event) => {
        let formulario = event.target.getElementsByTagName('form')
        if(formulario[0]){
            formulario[0].style.display = 'block';
        }        
    }

    //funcion para el mouseLeave para que desaparezca el formulatio
    handleMouseLeave = (event) => {
        let formulario = event.target.getElementsByTagName('form');  
        if(formulario[0]){
            formulario[0].style.display = 'none';     
        }         
    }

    handleSUbmit = (event) => {
        event.preventDefault();
        if(!this.state.fotoCambio){
            alert('Seleccione una foto')
        }
        else if(!this.state.indiceUsuario){
            alert('Tienes que estar logueado')
        }
        else{
            // console.log(this.state.fotoCambio);
            // console.log(this.state.indiceUsuario);
            let storage = firebase.storage().ref(`/imagenes/${this.state.fotoCambio.name}`);
            storage.put(this.state.fotoCambio)
            .then(res => {
                storage.getDownloadURL()
                .then(ruta => {
                    let rutaFoto = ruta
                    firebase.database().ref(`${localStorage.getItem('indiceUsuario')}/foto/`).set(rutaFoto) 
                })
            })

            this.setState({fotoCambio:''})
        }        
    }

    render(){
        
        let arrayContenido = [];
        if(this.state.array.contenido){
            let nombre = this.state.array.nombre
            this.state.array.contenido.forEach((dato,key) => {
                let contenidoUsuario = 
                    {
                        indicUsuario:localStorage.getItem('indiceUsuario'),
                        indiceContenido:key,
                        imagen:dato.imagen,
                        mensaje:dato.mensaje,
                        nombre:nombre
                    };
                    // console.log(contenidoUsuario)
                arrayContenido.push(contenidoUsuario)             
            })
        }
        // funcionVentanaComentarios
        return(
            <article className='articlePerfil'>

                <div className='divTituloUsuario'>
                
                    <div className='divBotonSubirFoto'>
                        <input type='button' value='SUBIR FOTO' onClick={this.handleClick}></input>
                    </div>

                    <div className='divUsuario'>
                        <h3>Bienvenido: {this.state.nombre}</h3>
                    </div>
                    
                    <div className='divAparecerForm' onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>

                        <div className='divFotoUsuario'>
                            <img src={this.state.foto} alt={this.state.foto}></img>
                        </div>
                        
                        <form className='formCambiarFoto' action='' method='' encType='multipart/form-data' onSubmit={this.handleSUbmit}>
                            <input type='file' onChange={(params) => {this.setState({fotoCambio:params.target.files[0]})}}></input>
                            <input type='submit' value='Cambiar foto'></input>
                        </form>

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
                                <div key={key} className='contenedorContenido' onClick={this.props.funcionVentanaComentarios} data-indiceusuario={dato.indicUsuario} data-indiceimagen={dato.indiceContenido} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}>
                                    <div className='divImage'>
                                        <img src={dato.imagen} alt={dato.imagen} data-indiceusuario={dato.indicUsuario} data-indiceimagen={dato.indiceContenido} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}></img>
                                    </div>
                                    <div className='divMensaje' data-indiceusuario={dato.indicUsuario} data-indiceimagen={dato.indiceContenido} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}>
                                        <p data-indiceusuario={dato.indicUsuario} data-indiceimagen={dato.indiceContenido} data-foto={dato.imagen} data-mensaje={dato.mensaje} data-usuario={dato.nombre}>{dato.mensaje}</p>
                                    </div>
                                    <div className='divBotonBorrar' >
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