import React, { Component } from 'react';

class Products extends Component {
  constructor(props) {

      super(props);
      this.state = {
          isOpen: false,
          levelOne:"",
          levelTwo:"",
          levelThree:""
      }
      this.showLevel = this.showLevel.bind(this);
  }

  componentDidMount(){
    let { id1, id2, id3 } = this.props.match.params;
    if(id1 === "0"){
      id1 = ""
    }
    if(id2 === "0"){
      id2 = ""
    }
    if(id3 === "0"){
      id3 = ""
    }

    this.setState({
      levelOne: id1 || "",
      levelTwo: id2 || "",
      levelThree: id3 || ""
    })
  }
 
  showLevel(){
    let {levelOne,levelTwo,levelThree}= this.state
    if(levelOne && levelTwo && levelThree){
      return <h1>You are inside the first level with identity {levelOne} and second level with identity {levelTwo} and third level with identity {levelThree}</h1>
    }
    if(levelOne && levelTwo){
      return <h1>You are inside the first level with identity {levelOne} and second level with identity {levelTwo}</h1>
    }
    if(levelOne){
      return <h1>You are inside the first level with identity {levelOne}</h1>
    }
    else{
      return <h1>You are inside the main page</h1>
    }
  }

  render() {
    return (
        <div>
          {this.showLevel()}
        </div>
    );
  }
}
export default Products;