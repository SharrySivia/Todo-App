import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "./TodoList.css";
// import uuid from "uuid";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleComplition = this.toggleComplition.bind(this);
  }

  addTodo(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(td => td.id !== id)
    });
  }

  updateTodo(id, updatedTask) {
    let updatedTodos = this.state.todos.map(td => {
      if (td.id === id) {
        return { ...td, task: updatedTask };
      }
      return td;
    });

    this.setState({ todos: updatedTodos });
  }

  toggleComplition(id) {
    let updatedTodos = this.state.todos.map(td => {
      if (td.id === id) {
        return { ...td, completed: !td.completed };
      }
      return td;
    });

    this.setState({ todos: updatedTodos });
  }

  componentDidMount() {
    let storedTodos = JSON.parse(localStorage.getItem("Todos"));
    if (storedTodos) {
      this.setState({ todos: storedTodos });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("Todos", JSON.stringify(this.state.todos));
  }

  render() {
    const todo = this.state.todos.map(td => (
      <Todo
        key={td.id}
        id={td.id}
        task={td.task}
        deleteTodo={this.deleteTodo}
        update={this.updateTodo}
        completed={td.completed}
        toggleTodo={this.toggleComplition}
      />
    ));

    return (
      <div className="TodoList">
        <h2 className="TodoList-heading">Todo List</h2>
        <TodoForm addTodo={this.addTodo} />
        <ul className="TodoList-list">
          <CSSTransitionGroup
            transitionName="task"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}
          >
            {todo}
          </CSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

export default TodoList;
