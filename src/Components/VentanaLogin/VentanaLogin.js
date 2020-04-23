import React from 'react'

//css
import './VentanaLogin.css'

class VentanaLogin extends React.Component{

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

                    <form className='divLoginFormulario'>
                    
                    </form>
                   
                </div>

            </div>
        )
    }
}

export default VentanaLogin;