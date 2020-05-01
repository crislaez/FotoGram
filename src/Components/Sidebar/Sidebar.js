import React from 'react';
//css
import './Sidebar.css';
//firebase
import firebase from 'firebase';

class Sidebar extends React.Component{

    constructor(props){
        super(props);
        this.state = 
            {
                usuario:''              
            };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.usuario);
        if(!this.state.usuario || !/^[A-Za-z]+$/.test(this.state.usuario.value)){
            alert('Rellene el campo correctamente')
        }
        else{
            let usuario;
            firebase.database().ref().on('value',snap => {
                // console.log(snap.val());
                snap.val().forEach((dato, key) => {
                    if(dato.nombre === this.state.usuario){
                        usuario = dato;
                    }
                });
            })            
            
            if(usuario){
                // llamamos a la funcion qeu esta en el section para pasarle el usuario buscador
                const funcionBuscadorUsuario = this.props.funcionBuscadorUsuario;
                funcionBuscadorUsuario(usuario);

                //llamamos a la funcion de app.js para que se cierre el sidebar
                const functionSidebar = this.props.functionSidebar;
                functionSidebar();

                this.setState({usuario:''})
            }else{
                alert('usuario no encontrado');
            }
        }      
    }

    render(){

        return(
            <aside style={{width:this.props.widthSidebar}}>
                <form onSubmit={this.handleSubmit} action='' method='' encType='multipart/form-data'>                
                    <input type='text' value={this.state.usuario} placeholder='usuario...' onChange={(params) => {this.setState({usuario:params.target.value})}}></input>
                    <input type='submit' value='Buscar'></input>
                </form>
            </aside>
        )
    }
}

export default Sidebar;