import React from 'react'

//css
import './SubirFoto.css'
//firebase
import firebase from 'firebase';

class SubirFoto extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                foto:'',
                mensaje:'',
                indiceArray:''
            };
    }

    componentDidMount(){
        this._isMount = true;
        firebase.database().ref(`${localStorage.getItem('indiceUsuario')}/contenido`).on('value', snap => {
            if(this._isMount){
                //si existe alguna foto, aqui tomamos su indice, si no el valor es 0
                if(snap.val()){
                    this.setState({indiceArray:snap.val().length})
                    console.log(snap.val().length);
                }
                else{
                    this.setState({indiceArray:0});
                    // console.log('cero')
                }                
            }
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.foto){
            alert('Seleccione la foto');
        }
        else if(!this.state.mensaje){
            alert('rellene el mensaje correctamente');
        }
        else{
            
            localStorage.getItem('indiceUsuario')
            const storage = firebase.storage().ref(`/imagenes/${this.state.foto.name}`);
            storage.put(this.state.foto)
            .then(res => {
                storage.getDownloadURL().then(ruta => {
                    let datos = 
                        {
                            mensaje:this.state.mensaje,
                            imagen:ruta                            
                        }

                    firebase.database().ref(`${localStorage.getItem('indiceUsuario')}/contenido/${this.state.indiceArray}`).set(datos);
                })
            })

            this.setState({foto:'', mensaje:''})
            //cerramos la ventana de subir foto
            const cerrarVentana = this.props.cerrarVentana;
            cerrarVentana();

            alert('Ingresado correctamente');
        }
    }

    render(){

        return(
            <div className='divContenedorSubirFoto'>

                <div className='divSubirFoto'>

                    <div className='divTituloSubirFoto'>
                        <h2>SUBIR FOTO</h2>
                    </div>
                    <div className='divSubirFotoBoton'>
                        <input type='button' value='X' onClick={this.props.handleClick}></input>
                    </div>

                    <form action="" method="" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <input type='file' className='campoForm' onChange={(params) => {this.setState({foto:params.target.files[0]})}}></input>
                        <br></br>
                        <input type='text' className='campoForm' value={this.state.mensaje} onChange={(params) => {this.setState({mensaje:params.target.value})}} placeholder='mensaje...'></input>
                        <br></br>
                        <input type='submit' value='Subir'></input>
                    </form>

                </div>

            </div>
        )
    }
}

export default SubirFoto;