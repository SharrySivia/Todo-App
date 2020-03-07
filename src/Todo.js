import React, { Component, Fragment } from "react";
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
    if (this.state.task) {
      this.props.update(this.props.id, this.state.task);
    } else {
      this.setState({ task: this.props.task });
    }
    this.toggleForm();
  }

  handleToggle() {
    this.props.toggleTodo(this.props.id);
  }

  renderForm(task) {
    return (
      <form onSubmit={this.handleUpdate}>
        <input
          type="text"
          name="task"
          value={task}
          onChange={this.handleChange}
          autoFocus
        />
        <button>Save</button>
      </form>
    );
  }

  renderTask(task, completed) {
    return (
      <Fragment>
        <div>
          <i
            className={` far fa-${completed ? "check-circle" : "circle"}`}
            onClick={this.handleToggle}
          ></i>
          <li className={completed ? "completed" : ""}>{task}</li>
        </div>
        <div>
          <i
            className={`fas fa-pen ${completed ? "disabled" : ""}`}
            onClick={completed ? null : this.toggleForm}
            style={{ marginRight: "1rem" }}
          ></i>
          <i className="fas fa-trash-alt" onClick={this.handleRemove}></i>
        </div>
      </Fragment>
    );
  }

  render() {
    const { isEditing, task } = this.state;
    const { completed } = this.props;
    return (
      <div className="Todo">
        {isEditing ? this.renderForm(task) : this.renderTask(task, completed)}
      </div>
    );
  }
}

export default Todo;
