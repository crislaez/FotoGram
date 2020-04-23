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

    constructor(props){
        super(props);
        this.state = 
            {
                botonLogin:true,            //si no esta logueado que aparezca el boton Login en el componete Nav, si SI esta logeado aparecera el boton Cerrar sesion
                ventanasArticulos:'bVerTodo', //para mostrar los componentes principales del Section
                ventanaLoing:false,     //para mostrar o no el componente VentanaLogin
                ventanaRegistro:true,  //para mostrar o no el componente VentanaRegistro
                ventanaPerfiles:false,  //para mostrar o no el boton perfil del componente Nav
                ventanaSidebar:false
            };
    }
    
    //esta funcion es la pasamos a Nav->botones y dependiendo que boton del menu demos
    //pasaremos las props a Section para cargar un componente Articulo 
    handleClick = (event) => {
        console.log(event.target.id);
        this.setState({ventanasArticulos:event.target.id})
    }

    //esta funcion es para que apareca la ventana login al dar click en nav->boton login
    //o desaparezca cuando damos a Section->VentanaLogin->boton atras
    funcionLogin = () => {
        if(!this._VLogin){
            this.setState({ventanaLoing:true});            
            this._VLogin = true;
        }else{
            this.setState({ventanaLoing:false});
            this._VLogin = false;
        }
    }

    //esta funcion es para que apareca la ventana Registro all dar click en nav->boton Regisro
    //o desaparezca cuando damos a Section->VentanaRegistro->boton atras
    funcionRegistro = () => {
        if(this._VRegistro){
            this.setState({ventanaRegistro:false});
            this._VRegistro = false;
        }else{
            this.setState({ventanaRegistro:true});
            this._VRegistro = true;
        }
    }

    //esta fucion hace aparecer el sidebar
    functionSidebar = () => {
        if(this._VSideBar){
            this.setState({ventanaSidebar:false});
            this._VSideBar = false;
        }else{
            this.setState({ventanaSidebar:true});
            this._VSideBar = true;
        }
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
                functionSidebar={this.functionSidebar}></Nav>

                <Section 
                ventanaSidebar={this,this.state.ventanaSidebar}
                ventanasArticulos={this.state.ventanasArticulos} 
                ventanaLoing={this.state.ventanaLoing} 
                ventanaRegistro={this.state.ventanaRegistro} 
                funcionLogin={this.funcionLogin} 
                funcionRegistro={this.funcionRegistro}></Section>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;