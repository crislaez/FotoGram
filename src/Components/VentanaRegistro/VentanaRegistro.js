import React from 'react';

//css
import './VentanaRegistro.css';
//firebase
import firebase from 'firebase';

class VentanaRegistro extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                nombre:'',
                apellido:'',
                fecha:'',                
                correo:'',
                clave:'',
                clave2:'',
                foto:'',
                indiceUsuario:''
            }
    }

    componentDidMount(){
        this._isMount = true;

        firebase.database().ref().on('value',(snap) => {
            if(this._isMount){
                console.log(snap.val().length);
            this.setState({indiceUsuario:snap.val().length});
            }            
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.nombre || !/^[A-Za-z]+$/.test(this.state.nombre) ){
            alert('Rellene el nombre correctamente');
        }
        else if(!this.state.apellido || !/^[A-Za-z]+$/.test(this.state.apellido) ){
            alert('Rellene el apellido correctamente');
        }
        else if(!this.state.fecha){
            alert('Rellene la fecha correctamente');
        }
        else if(!this.state.correo){
            alert('Rellene el correo correctamente');
        }
        else if(!this.state.clave){
            alert('Rellene la clave correctamente');
        }
        else if(!this.state.clave2 || this.state.clave2 !== this.state.clave){
            alert('Repita la clave correctamente');
        }
        else if(!this.state.foto){
            alert('Escoja la foto');
        }
        else{
            //estorage de firebase en la carpeta /imagenes que emos creado y el nombre de la foto
            var storage = firebase.storage().ref(`/imagenes/${this.state.foto.name}`);
            storage.put(this.state.foto)
            .then(res => {
                storage.getDownloadURL().then(ruta => {
                    let datos = 
                        {
                            nombre:this.state.nombre,
                            apellido:this.state.apellido,
                            fecha:this.state.fecha,
                            correo:this.state.correo,
                            clave:this.state.clave,
                            foto:ruta
                        }
                
                    firebase.database().ref(`${this.state.indiceUsuario}`).set(datos);
                })
            })            
            alert('Ingresado correctamente');
            //llamamos a la fucionque esta en app.js para cerrar esta ventana cuado este logueado
            const funcionRegistro = this.props.funcionRegistro;
            funcionRegistro();
            
            //llamamos a la funcion qeu esta en app.js para que se carge la ventana para loguearse
            const funcionLogin = this.props.funcionLogin;
            funcionLogin();
        }       

        this.setState({nombre:'', apellido:'', fecha:'', correo:'', clave:'', clave2:''});
    }


    render(){
        return(
            <div className='divRegistroContenedor'>

                <div className='divRegistroContendorCentro'>

                    <div className='divRegistroTitulo'>
                        <h2>Registro</h2>
                    </div>

                    <div className='divRegistroBotonAtras'>
                        <input type='button' value='X' onClick={this.props.funcionRegistro}></input>
                    </div>

                    <form id='FormRegistro' onSubmit={this.handleSubmit} className='divRegistroFormulario' action='' method='' encType='enctype="multipart/form-data'>
                        <input type='text' value={this.state.nombre} name='nombre' placeholder='nombre...' onChange={ (params) => {this.setState({nombre:params.target.value})} } ></input>
                        <br></br>
                        <input type='text' value={this.state.apellido} name='apellido' placeholder='apellido...' onChange={ (params) => {this.setState({apellido:params.target.value})} } ></input>
                        <br></br>
                        <input type='date' value={this.state.fecha} name='fecha' placeholder='fecha de nacimiento...' onChange={ (params) => {this.setState({fecha:params.target.value})} } ></input>
                        <br></br>
                        <input type='email' value={this.state.correo} name='email' placeholder='email...' onChange={ (params) => {this.setState({correo:params.target.value})} } ></input>
                        <br></br>
                        <input type='password' value={this.state.clave} name='clave' placeholder='clave...' onChange={ (params) => {this.setState({clave:params.target.value})} } ></input>
                        <br></br>
                        <input type='password' value={this.state.clave2} name='clave2' placeholder='repetir clave...' onChange={ (params) => {this.setState({clave2:params.target.value})} } ></input>
                        <br></br>
                        <input type='file' name='foto' onChange={ (params) => {this.setState({foto:params.target.files[0]})} } ></input>
                        <br></br>
                        <br></br>
                        <input type='submit' value='Registrarse'></input>
                    </form>
                   
                </div>

            </div>
        )
    }
}

export default VentanaRegistro