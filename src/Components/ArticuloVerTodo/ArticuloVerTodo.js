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
                array:[],
                arrayActualizado:[]
            };
    }

    componentDidMount(){
        this._isMount = true;
        firebase.database().ref().on('value', snap => {
            if(this._isMount){
                 this.setState({array:snap.val()})               
            }            
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render(){
        let arrayAuxiliar = [];
        this.state.array.forEach( (data, key) => {
            data.contenido.forEach( (d,k) => {
                let contenido = 
                    {
                        indiceUsuario:key,
                        indiceImagen:k,
                        usuario:data.nombre,
                        foto:d.imagen,
                        mensaje:d.mensaje,
                    };
                arrayAuxiliar.push(contenido);
            })
        })
 
        console.log(arrayAuxiliar);
 
        return(
            <article className='aVerTodo'>
                <div className='divTitulo'>
                    <h2>VER TODO</h2>
                </div>

                <div className='divContenedorVerTodo'>
                    {
                        this._isMount && arrayAuxiliar
                        ?
                        arrayAuxiliar.map( (data, key) => {
                            return(
                                <div key={key} className='divContenidoVerTodo'>
                                    <div className='divFotoVerTodo'>
                                        <img src={data.foto} alt={data.foto}></img>
                                    </div>
                                    <div className='divUsuarioVerTodo'>
                                        <h3>{data.usuario}</h3>
                                    </div>
                                    <div className='divParrafoVerTodo'>
                                        <p>{data.mensaje}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div>Cargando...</div>
                        
                    }
                </div>
            </article>
        )
    }
}

export default ArticuloVerTodo;