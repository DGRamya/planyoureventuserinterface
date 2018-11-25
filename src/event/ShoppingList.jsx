import React, { Component } from "react";
import Sidebar from "./Sidebar";

class ShoppingList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          item: ""
        }
        
    }
    componentWillMount() {
        console.log(this.props.match.params.itemname);
        //this.setState({item: this.props.params.itemname});
        //console.log("componentWillmount -- child --"+this.state.item);
    }
    
    update = (e) => {
        console.log("update -- child");
        this.props.onUpdate(this.state.item);
    };

    onChange = (e) => {
        console.log("onChange -- child");
        this.setState({item: e.target.value});
       // this.props.onUpdate(this.state.fieldVal)
    }
    

    render() {
       return(
            <div>
                <div>
                   <Sidebar />
                </div><br />
            <div>
                 Shopping List : <br />
                 <input
                        type="text"
                        value={this.state.item}
                        onChange={this.onChange}
                    />
                    <button onClick={this.update} > Update </button>
            </div>
        </div>
        );
      }

}

export default ShoppingList;

