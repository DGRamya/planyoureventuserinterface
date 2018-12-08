class CheckboxTxtInput extends React.Component{
	constructor(){
  	super();

    this.state = {
    	checkbox: false,
      inputValue: ""
    }
  }

  handleCheckbox(e){
  	let value = e.target.checked;
    this.setState({checkbox: value})
  }

  handleInput(e){
  	let value = e.target.value;
    this.setState({inputValue: value})
  }

	render(){
  	return (
    	<div>
      	<input type="checkbox" onChange={this.handleCheckbox.bind(this)}/>
        <input type="text" value={this.state.inputValue} disabled={this.state.checkbox} onChange={this.handleInput.bind(this)}/>
      </div>
    )
  }
}

export default CheckboxTxtInput;
