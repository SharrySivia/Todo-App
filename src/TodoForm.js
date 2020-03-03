import React, { Component } from "react";
import uuid from "uuid/v4";
import "./TodoForm.css";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      task: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.task) {
      const newTodo = { ...this.state, id: uuid() };
      this.props.addTodo(newTodo);
      this.setState({ task: "" });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="TodoForm">
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.task}
          placeholder="Enter todo"
        />
        <button>Add Task</button>
      </form>
    );
  }
}

export default TodoForm;
