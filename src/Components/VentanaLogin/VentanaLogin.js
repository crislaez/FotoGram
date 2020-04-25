import React from 'react';

//css
import './VentanaLogin.css'
//firebase
import firebase from 'firebase';

class VentanaLogin extends React.Component{

    _inMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                array:[],
                corre:'',
                clave:''
            }
    }

    componentDidMount(){
        this._inMount = true;
        firebase.database().ref().on('value',snap => {
            if(this._inMount ){
                console.log(snap.val());
                this.setState({array:snap.val()});
            }            
        })
    }

    componentWillUnmount(){
        this._inMount = false;
    }

    handelSubmit = (event) => {
        event.preventDefault();
        let aux = this.state.array;
        let logeado = false;
        
        if(!this.state.corre){
            alert('Ingrese el correo correctamente');
        }
        else if(!this.state.clave){
            alert('Ingrese la clave correctamente');
        }
        else{
            for(let valor in aux){
                // console.log(aux[valor]);
              
                if(aux[valor].correo == this.state.corre && aux[valor].clave == this.state.clave){
                    console.log(aux[valor].correo);
                    console.log(this.state.corre);
                    console.log(aux[valor].clave);
                    console.log(this.state.clave);
                    //guardamos en el localStorage el indice del array y el nombre del usuario
                    localStorage.setItem('indiceUsuario',valor);
                    localStorage.setItem('usuario',aux[valor].nombre);
                    logeado = true;
                }
            }

            if(logeado){
                alert('Logueado');
                //llamamos a la funcion que esta en app.js para que aparezca el boton de perfil
                const funcionBotonPerfiles = this.props.funcionBotonPerfiles;
                funcionBotonPerfiles();

                //llamamos a la funcion que esta en app.js para que que quite el boton login dle nav, y aparezca el boton cerrar sesion
                const funcionBotonLogin = this.props.funcionBotonLogin;
                funcionBotonLogin();

                //llamamos a la funcion para que se cierre la ventana de login
                const funcionLogin = this.props.funcionLogin;
                funcionLogin();
            }
            else{
                alert('Correo o clave incorrectos');
            }
        }
    }

    render(){
        return(
            <div className='divLoginContenedor'>
                
                <div className='divLoginContendorCentro'>

                    <div className='divLoginTitulo'>
                        <h2>LOGIN</h2>
                    </div>

                    <div className='divLoginBotonAtras'>
                        <input type='button' value='X' onClick={this.props.funcionLogin}></input>
                    </div>

                    <form className='divLoginFormulario' action='' method='' encType='multipart/form-data' onSubmit={this.handelSubmit}>
                            <input type='text' value={this.state.corre} onChange={(params) => {this.setState({corre:params.target.value})}} placeholder='correo...'></input>
                            <br></br>
                            <input type='password' value={this.state.clave} onChange={(params) => {this.setState({clave:params.target.value})}} placeholder='clave...'></input>
                            <br></br>
                            <br></br>
                            <input type='submit' value='LOGIN'></input>
                    </form>
                   
                </div>

            </div>
        )
    }
}

export default VentanaLogin;