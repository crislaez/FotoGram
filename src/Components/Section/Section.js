import React from 'react'

//CSS
import './Section.css'
//components
import ArticuloVerTodo from '../ArticuloVerTodo/ArticuloVerTodo';
import VentanaLogin from '../VentanaLogin/VentanaLogin';
import VentanaRegistro from '../VentanaRegistro/VentanaRegistro';
import VentanaComentarios from '../VentanaComentarios/VentanaComentarios';
import ArticuloBuscarPerfil from '../ArticuloBuscarPerfil/ArticuloBuscarPerfil';
import Sidebar from '../Sidebar/Sidebar';
import Perfil from '../Perfil/Perfil';

class Section extends React.Component{

    componentDidMount(){
            //si esisten en el localStorage esas variableres     
            if(localStorage.getItem('indiceUsuario') && localStorage.getItem('usuario')){
                //aparecera el boton de perfiles
                const funcionBotonPerfiles = this.props.funcionBotonPerfiles;
                funcionBotonPerfiles();
                //desaparecera el boton loguin y aparecera el boton cerrar sesion
                const funcionBotonLogin = this.props.funcionBotonLogin;
                funcionBotonLogin();
                //y cerramos la ventana de registro
                const cerrarVentanaRegistro = this.props.cerrarVentanaRegistro;
                cerrarVentanaRegistro();
            }    
    }

    render(){
        return(
            <section>   

            {
                this.props.ventanasArticulos === 'bVerTodo'
                ?
                <ArticuloVerTodo funcionVentanaComentarios={this.props.funcionVentanaComentarios}></ArticuloVerTodo>
                :
                this.props.ventanasArticulos === 'bPerfil'
                ?
                <Perfil></Perfil>
                :
                this.props.ventanasArticulos === 'bComentarios'
                ?
                <VentanaComentarios datosParaVentanaComentarios={this.props.datosParaVentanaComentarios} funcionVentanaComentarios={this.props.funcionVentanaComentarios}></VentanaComentarios>
                :
                this.props.ventanasArticulos === 'bBuscadorPerfil' 
                ?
                <ArticuloBuscarPerfil datoUsuarioBuscador={this.props.datoUsuarioBuscador}></ArticuloBuscarPerfil>
                :
                <div></div>
            }

            {
                this.props.ventanaSidebar
                ?
                <Sidebar widthSidebar= '20%' funcionBuscadorUsuario={this.props.funcionBuscadorUsuario} functionSidebar={this.props.functionSidebar}></Sidebar>
                :
                <Sidebar widthSidebar = '0%'></Sidebar>
            }

            {
                this.props.ventanaLoing
                ?
                <VentanaLogin funcionLogin={this.props.funcionLogin} funcionBotonPerfiles={this.props.funcionBotonPerfiles} funcionBotonLogin={this.props.funcionBotonLogin}></VentanaLogin>
                :
                <div></div>
            }

            {
                this.props.ventanaRegistro
                ?
                <VentanaRegistro funcionRegistro={this.props.funcionRegistro} funcionLogin={this.props.funcionLogin}></VentanaRegistro>
                :
                <div></div>
            }
            </section>
        )
    }
}

export default Section;