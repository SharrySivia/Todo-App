import React, { Component } from "react";
import "./Todo.css";
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, task: this.props.task };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleRemove() {
    this.props.deleteTodo(this.props.id);
  }

  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleUpdate(evt) {
    evt.preventDefault();
    this.props.update(this.props.id, this.state.task);
    this.toggleForm();
  }

  handleToggle() {
    this.props.toggleTodo(this.props.id);
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form onSubmit={this.handleUpdate}>
            <input
              type="text"
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
              autoFocus
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo">
          <div>
            <i
              class={`${this.props.completed ? "fas" : "far"} fa-check-circle`}
              onClick={this.handleToggle}
            ></i>
            <li className={this.props.completed ? "completed" : ""}>
              {this.props.task}
            </li>
          </div>
          <div>
            <i
              class="fas fa-pen"
              onClick={this.toggleForm}
              style={{ marginRight: "1rem" }}
            ></i>
            <i class="fas fa-trash-alt" onClick={this.handleRemove}></i>
          </div>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
