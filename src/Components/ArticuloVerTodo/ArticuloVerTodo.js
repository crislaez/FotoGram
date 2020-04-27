import React from 'react'

//css
import './ArticuloVerTodo.css'
//firebase
import firebase from 'firebase';

class ArticuloVerTodo extends React.Component{

    _isMount = false;

    constructor(props){
        super(props);
        this.state = 
            {
                array:[]
            };
    }

    componentDidMount(){
        this.isMount = true;
        firebase.database().ref().on('value', snap => {
            if(this.isMount == true){
                 this.setState({array:snap.val()})
            }            
        })
    }

    componentWillUnmount(){
        this.isMount = false;
    }

    render(){

        return(
            <article className='aVerTodo'>
                <div className='divTitulo'>
                    <h2>VER TODO</h2>
                </div>

                <div className='divContenedorVerTodo'>
                    {
                        // this._isMount && this.state.array
                        // ?
                        // this.state.array.map((data, key) => {
                        //     return(
                        //         <div key={key}>
                                    
                        //         </div>
                        //     )
                        // })
                        // :
                        // <div></div>
                    }
                </div>
            </article>
        )
    }
}

export default ArticuloVerTodo;