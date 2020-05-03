import React from 'react'

//css
import './App.css';
//componentes
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Section from '../Section/Section';
import Footer from '../Footer/Footer';

class App extends React.Component{

    _VLogin = false;
    _VRegistro = true;
    _VSideBar = false;
    _BPerfiles = false;
    _BLogin = true;
    _VComentarios = false;

    constructor(props){
        super(props);
        this.state = 
            {
                botonLogin:true,            //si no esta logueado que aparezca el boton Login en el componete Nav, si SI esta logeado aparecera el boton Cerrar sesion
                ventanasArticulos:'bVerTodo', //para mostrar los componentes principales del Section
                ventanaLoing:false,     //para mostrar o no el componente VentanaLogin
                ventanaRegistro:true,  //para mostrar o no el componente VentanaRegistro
                ventanaPerfiles:false,  //para mostrar o no el boton perfil del componente Nav
                ventanaSidebar:false,
                datosParaVentanaComentarios:{},
                datoUsuarioBuscador:{},
                indiceUsuario:''
            };
    }
    
    /**
     * esta funcion es la pasamos a Nav->botones y dependiendo que boton del menu demos
     * pasaremos las props a Section para cargar un componente Articulo     *
     */ 
    handleClick = (event) => {
        console.log(event.target.id);
        this.setState({ventanasArticulos:event.target.id})
    }

    /**
     * sta funcion es para que apareca la ventana login al dar click en nav->boton login
     * o desaparezca cuando damos a Section->VentanaLogin->boton atras
     */
    funcionLogin = () => {
        if(!this._VLogin){
            this.setState({ventanaLoing:true});            
            this._VLogin = true;
        }else{
            this.setState({ventanaLoing:false});
            this._VLogin = false;
        }
    }

    /**
     * esta funcion es para que apareca la ventana Registro all dar click en nav->boton Regisro
     * o desaparezca cuando damos a Section->VentanaRegistro->boton atras
     */
    funcionRegistro = () => {
        if(this._VRegistro){
            this.setState({ventanaRegistro:false});
            this._VRegistro = false;
        }else{
            this.setState({ventanaRegistro:true});
            this._VRegistro = true;
        }
    }

    cerrarVentanaRegistro = () => {
        this.setState({ventanaRegistro:false});
        this._VRegistro = false;
    }

    //esta fucion hace aparecer el sidebar
    functionSidebar = () => {
        if(!this._VSideBar){
            this.setState({ventanaSidebar:true});
            this._VSideBar = true;
        }else{
            this.setState({ventanaSidebar:false});
            this._VSideBar = false;
        }
    }

    //funcion para el boton de perfiles que se mostrara cuando estemos logueados
    funcionBotonPerfiles = () => {
        if(!this._BPerfiles){
            this.setState({ventanaPerfiles:true});
            this._BPerfiles = true;
        }else{
            this.setState({ventanaPerfiles:false});
            this._BPerfiles = false;
        }
    }
    
    //funcion para que el boton login del nab desaparezca, y aparezca el boton registo
    funcionBotonLogin = () => {
        if(this._BLogin){
            this.setState({botonLogin:false});
            this._BLogin = false;
        }else{
            //pedimos la confirmacion de que quiere cerrar sesion
            let confirmacion = window.confirm('Estas seguro qeu quieres cerrar sesion?');
            if(confirmacion){
                //borrarmos las varaibles del usuario dle localStorage
                localStorage.removeItem('indiceUsuario');
                localStorage.removeItem('usuario');
                //llamamos a la funcion de arriva para qeu desaparezca el boton de perfil en el nav
                this.funcionBotonPerfiles();
                //cambiamos el estado para qeu aparezca el boton loguin en el nav
                this.setState({botonLogin:true});
                this._BLogin = true;
                //mostramos la ventana Ver todo
                this.setState({ventanasArticulos:'bVerTodo'})
            }            
        }
    }

    /**
     * esta funcion es para cuando pinchemos en uno de los articulos de el compenente ver todo
     * en el componente section se cargara el componente VentanaComentarios y le pasamos
     * el objeto de estado con lo que se escogio
     */
    funcionVentanaComentarios = (event) => {
        
        if(event.target.value === 'Borrar'){
            console.log(event.target.value)
        }else{
            if(!this._VComentarios){
                let datos = 
                {
                    indiceusuario:event.target.dataset.indiceusuario,
                    indiceimagen:event.target.dataset.indiceimagen,
                    foto:event.target.dataset.foto,
                    mensaje:event.target.dataset.mensaje,
                    usuario:event.target.dataset.usuario
                };
    
                this.setState({datosParaVentanaComentarios:datos});
                
                this.setState({ventanasArticulos:'bComentarios'});
                this._VComentarios = true;
            }else{
                this.setState({ventanasArticulos:'bVerTodo'});
                this._VComentarios = false;
            }     
        }
           
    }

    /**
     * funcion para obtener el objeto del usuario que se busca en el aside
     * guardamos el parametro que recibimos en una variable del estad datoUsuarioBuscador
     * y se la pasamos al componente section para que este a su vez se la pasemos al 
     * componente ArticuloBuscarPerfil
     */
    funcionBuscadorUsuario = (usuario, indice) => {
        console.log(indice)
        this.setState({datoUsuarioBuscador:usuario, ventanasArticulos:'bBuscadorPerfil',indiceUsuario:indice});
    }

    render(){
        return(
            <div>
                <Header></Header>
                <Nav  
                botonLogin={this.state.botonLogin} 
                ventanaPerfiles={this.state.ventanaPerfiles} 
                handleClick={this.handleClick} 
                funcionLogin={this.funcionLogin} 
                funcionRegistro={this.funcionRegistro} 
                functionSidebar={this.functionSidebar}
                funcionBotonLogin={this.funcionBotonLogin}
                ></Nav>

                <Section 
                ventanaSidebar={this.state.ventanaSidebar}
                ventanasArticulos={this.state.ventanasArticulos} 
                ventanaLoing={this.state.ventanaLoing} 
                ventanaRegistro={this.state.ventanaRegistro} 
                funcionLogin={this.funcionLogin} 
                funcionRegistro={this.funcionRegistro}
                funcionBotonPerfiles={this.funcionBotonPerfiles}
                funcionBotonLogin={this.funcionBotonLogin}
                cerrarVentanaRegistro={this.cerrarVentanaRegistro}
                funcionVentanaComentarios={this.funcionVentanaComentarios}
                datosParaVentanaComentarios={this.state.datosParaVentanaComentarios}
                funcionBuscadorUsuario={this.funcionBuscadorUsuario}
                datoUsuarioBuscador={this.state.datoUsuarioBuscador}
                indiceUsuario={this.state.indiceUsuario}
                functionSidebar={this.functionSidebar}
                ></Section>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;