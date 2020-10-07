import React, { Component } from "react";
import UserConsumer from'../context';
import posed from "react-pose";
import axios from 'axios';

const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      //Başta devreye soktuk.
      display: "block",
    },
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      //Sonda devreye soktuk.
      display: "none",
    },
  },
});
class AddUser extends Component {
  state = {
    visible: false,
    name: "",
    departman: "",
    salary: "",
    error:false
  };
  changeVisibility = (e) => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  validateForm=()=>{
    const{name,salary,departman}=this.state;
    if(name===""||salary===""||departman===""){
      return false;
    }
    return true;
  }
  //OnChangeEventini handle ettik.
  changeInput=(e)=>{
      this.setState({
          [e.target.name]:e.target.value
      })
  }
  //Kendi default davranışı engellendi.(Submit)
  addUser=async (dispatch,e)=>{
      e.preventDefault();
      const{name,departman,salary}=this.state;
      const newUser={
          
          name,
          salary,
          departman
      }
      if(!this.validateForm()){
        this.setState({
          error:true
        })
        return;
      }
      const response=await axios.post("http://localhost:3004/users",newUser);
      dispatch({type: "ADD_USER",payload:response.data});
      //Redirect
      this.props.history.push("/");
  }

  render() {
    const { visible,name,salary,departman,error } = this.state;
    return (
    <UserConsumer>
    {
        value=>{
            const {dispatch}=value;
            return (
                <div className="col-md-8 mb-4">
                  <button
                    onClick={this.changeVisibility}
                    className="btn btn-dark btn-block mb-2"
                  >
                    {visible ? "Hide Form" : "Show Form"}
                  </button>
                  <Animation pose={visible ? "visible" : "hidden"}>
                    <div className="card">
                      <div className="card-header">
                        <h4>Add User Form</h4>
                      </div>
          
                      <div className="card-body">
                      {
                        error?
                        <div className="alert alert-danger">
                           Lütfen bilgilerinizi kontrol ediniz.
                        </div>
                        :null
                      }
                        <form onSubmit={this.addUser.bind(this,dispatch)}>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              name="name"
                              id="id"
                              placeholder="Enter Name"
                              className="form-control"
                              value={name}
                              onChange={this.changeInput}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="departman">Departman</label>
                            <input
                              type="text"
                              name="departman"
                              id="departman"
                              placeholder="Enter departman"
                              className="form-control"
                              value={departman}
                              onChange={this.changeInput}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="salary">Maaş</label>
                            <input
                              type="text"
                              name="salary"
                              id="salary"
                              placeholder="Enter Salary"
                              className="form-control"
                              value={salary}
                              onChange={this.changeInput}
                            />
                          </div>
                          <button className="btn btn-danger btn-block" type="submit">
                            Add User
                          </button>
                        </form>
                      </div>
                    </div>
                  </Animation>
                </div>
              );
        }
    }
    </UserConsumer>
    )
  }
}
export default AddUser;
