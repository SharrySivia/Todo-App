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

  render() {
    return (
      <div className="Todo">
        {this.state.isEditing ? (
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
        ) : (
          <Fragment>
            <div>
              <i
                className={`${
                  this.props.completed ? "fas" : "far"
                } fa-check-circle`}
                onClick={this.handleToggle}
              ></i>
              <li className={this.props.completed ? "completed" : ""}>
                {this.props.task}
              </li>
            </div>
            <div>
              <i
                className="fas fa-pen"
                onClick={this.toggleForm}
                style={{ marginRight: "1rem" }}
              ></i>
              <i className="fas fa-trash-alt" onClick={this.handleRemove}></i>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Todo;
