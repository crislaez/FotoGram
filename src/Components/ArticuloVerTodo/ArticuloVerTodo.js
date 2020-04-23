import React from 'react'

//css
import './ArticuloVerTodo.css'

class ArticuloVerTodo extends React.Component{

    render(){

        return(
            <article className='aVerTodo'>
                <div className='divTitulo'>
                    <h2>VER TODO</h2>
                </div>

                <div className='divContenedorVerTodo'>
                </div>
            </article>
        )
    }
}

export default ArticuloVerTodo;