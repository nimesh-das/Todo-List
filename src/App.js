import React from 'react';
import { Component } from 'react';
import Todos from './components/Todos';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import uuid from 'uuid'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About'
import axios from 'axios'

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState( {todos: res.data} ))
  }

    markComplete = (id) => {
      this.setState({todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo; 
      }) });
  }

  	delTodo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }));
  	}

  	addTodo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos?_limit=10',
      {
        title,
        completed: false
      }).then( res => this.setState({todos: 
        [...this.state.todos, res.data]} ));
  	}

    render() {
      return (
      	<Router>
        <div className="App">
        	<div className="container">
          		<Header />
          		<Route exact path="/" render={props => (
          			<React.Fragment>
          				<Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
          				<AddTodo addTodo={this.addTodo}/>
          			</React.Fragment>
          			)} /> 
          		<Route path="/About" component={About} />
          	</div>
        </div>
        </Router>
    );
  }
}

export default App;
