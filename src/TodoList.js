import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.addTodo = this.addTodo.bind(this);
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

  render() {
    const todo = this.state.todos.map(td => (
      <Todo
        key={td.id}
        task={td.task}
        deleteTodo={() => this.deleteTodo(td.id)}
      />
    ));

    return (
      <div className="TodoList">
        <h2 className="TodoList-heading">Todo List</h2>
        <TodoForm addTodo={this.addTodo} />
        <ul className="TodoList-gg">{todo}</ul>
      </div>
    );
  }
}

export default TodoList;
