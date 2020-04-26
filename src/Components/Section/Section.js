import React from 'react'

//CSS
import './Section.css'

//components
import ArticuloVerTodo from '../ArticuloVerTodo/ArticuloVerTodo'
import VentanaLogin from '../VentanaLogin/VentanaLogin'
import VentanaRegistro from '../VentanaRegistro/VentanaRegistro'
import Sidebar from '../Sidebar/Sidebar'
import Perfil from '../Perfil/Perfil'
//this.props.ventanasArticulos == 'bMenu'

class Section extends React.Component{

    render(){
        return(
            <section>   

            {
                this.props.ventanasArticulos == 'bVerTodo'
                ?
                <ArticuloVerTodo></ArticuloVerTodo>
                :
                this.props.ventanasArticulos == 'bPerfil'
                ?
                <Perfil></Perfil>
                :
                <div></div>
            }

            {
                this.props.ventanaSidebar
                ?
                <Sidebar widthSidebar= '20%'></Sidebar>
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