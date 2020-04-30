'usse strict';

import React from 'react';
//css
import './VentanaComentarios.css';
//firebase
import firebase from 'firebase';

class VentanaComentarios extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                objeto:this.props.datosParaVentanaComentarios,
                comentario:'',
                indice:'',
                arrayComentarios:[]
            };
    }

    componentDidMount(){
        this._isMount = true;
        console.log(this.props.datosParaVentanaComentarios);
        // this.setState({objeto:this.props.datosParaVentanaComentarios});
        firebase.database().ref(`${this.state.objeto.indiceusuario}/contenido/${this.state.objeto.indiceimagen}/comentarios`).on('value', snap => {
            if(this._isMount){
                if(snap.val()){
                    this.setState({indice:snap.val().length, arrayComentarios:snap.val()});
                }
                else{
                    this.setState({indice:0});
                }
            }
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleSubmit = (event) => {

        event.preventDefault();
        let usuario = localStorage.getItem('usuario');

        if(!usuario){
            alert('Tienes que estar logueado para poder comentar');
        }
        else if(!this.state.comentario){
            alert('Rellena el comentario');
        }
        else{
            console.log(this.state.comentario);
            console.log(usuario);

            let dato = 
                {
                    usuario:usuario,
                    comentario:this.state.comentario
                }
              
            firebase.database().ref(`${this.state.objeto.indiceusuario}/contenido/${this.state.objeto.indiceimagen}/comentarios/${this.state.indice}`).set(dato);
            alert('Mensaje subido');
        }

        this.setState({comentario:''});
        
    }

    render(){

        console.log(this.state.arrayComentarios)

        return(
            <article className='articleComentadios'>
                <div className='divTituloComentarios'>
                    <h2>COMENTARIOS</h2>
                </div>
                <div className='divContenedorComentarios'>

                    <div className='divBotonAtras'>
                        <input type='button' value='Atras' onClick={this.props.funcionVentanaComentarios}></input>
                    </div>

                    <div className='divFotoComentarios'>
                        <img src={this.state.objeto.foto} alt={this.state.objeto.foto}></img>
                    </div>

                    <div className='divUsuarioComentarios'>
                        <h3>{this.state.objeto.usuario}</h3>
                        <p>{this.state.objeto.mensaje}</p>
                    </div>

                    <div className='divCajaComentarios'>
                        {
                            this._isMount && this.state.arrayComentarios
                            ?
                            this.state.arrayComentarios.map( (dato, key) => {
                                return(
                                    <div key={key} className='divComentario'>
                                        <p className = 'p1'><strong>Usuario:</strong> {dato.usuario}</p>
                                        <p className = 'p2'><strong>Comentario:</strong>  {dato.comentario}</p>
                                    </div>
                                )
                            })
                            :
                            <div></div>
                        }
                    </div>
                    <form onSubmit={this.handleSubmit} className='formComentario' action='' method='' encType='multipart/form-data'>
                        <input type='text' value={this.state.comentario} onChange={(params)=> {this.setState({comentario:params.target.value})}} placeholder='Comentario...'></input>
                        <br></br>
                        <input type='submit' value='Enviar'></input>
                    </form>
                </div>
            </article>
        )
    }
}

export default VentanaComentarios;
