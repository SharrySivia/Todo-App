import React, { Component } from "react";
import "./Todo.css";
class Todo extends Component {
  render() {
    return (
      <div className="Todo" onClick={this.props.deleteTodo}>
        <li>{this.props.task}</li>
      </div>
    );
  }
}

export default Todo;
