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

    cerrarVentana = () => {
        this.setState({ventanaFoto:false});
        this._VSubirFoto = false;
    }

    render(){
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
                        <img src={this.state.foto}></img>
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


                </div>
            </article>
        )
    }
}

export default Perfil;