import React from 'react';

//css
import './Sidebar.css';

class Sidebar extends React.Component{

    render(){

        return(
            <aside style={{width:this.props.widthSidebar}}>
            </aside>
        )
    }
}

export default Sidebar;