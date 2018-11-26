import React, { Component } from "react";

class ShoppingList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          item: ""
        }
        
    }

    componentWillMount() {
        console.log(this.props.match.params.list);
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
                 Shopping List : <br />
                 {this.props.match.params.list}
            </div>
        </div>
        );
      }

}

export default ShoppingList;

