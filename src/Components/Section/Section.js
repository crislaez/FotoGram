import React from 'react'

//CSS
import './Section.css'

//components
import ArticuloVerTodo from '../ArticuloVerTodo/ArticuloVerTodo'
import VentanaLogin from '../VentanaLogin/VentanaLogin'
import VentanaRegistro from '../VentanaRegistro/VentanaRegistro'
import Sidebar from '../Sidebar/Sidebar'
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
                <div></div>
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
                <VentanaLogin funcionLogin={this.props.funcionLogin}></VentanaLogin>
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