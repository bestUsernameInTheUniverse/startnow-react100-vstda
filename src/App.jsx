import React, { Component } from 'react';


class ListItem extends Component {
  constructor(props) {
    super(props);

    //component variables
  }
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      todoList: [],
      task: "",
      priority: 0
    }

    this.highID = 0;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getNewId = this.getNewId.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }


  componentWillMount() {
    const initialItem = <li key="0" className="list-group-item list-group-item-primary">
      <h5>Welcome to Very Simple Todo App!</h5>
      <p>Get started now by adding a new todo on the left.</p>
    </li>
    const myList = this.state.todoList;

    myList.push(initialItem);

    this.setState({ todoList: myList });
  }


  * getNewId() { yield (++this.highID).toString(); }


  addListItem(task, priority) {
    var classString = "";
    switch(priority) {
      case "1":
        classString = "list-group-item list-group-item-success toDo";
        break;

      case "2":
        classString = "list-group-item list-group-item-warning toDo";
        break;

      case "3":
        classString = "list-group-item list-group-item-danger toDo";
        break;

      default:
        console.log("panic!")
        return;
    }

    const newListItem = (
      <li key={this.getNewId().next().value} className={classString}>
        <span>
          <input type="checkbox" />
          {task} 
        </span>
        
        <span>
          <i className="edit fas fa-edit"></i>
          <i className="delete fas fa-trash-alt" onClick={this.handleDeleteClick}></i>
        </span>
      </li>
    );

    const myList = this.highID == 1 ? [] : this.state.todoList;

    myList.push(newListItem);

    this.setState({
      todoList: myList
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.addListItem(this.state.task, this.state.priority);
  }


  handleChange(event) {
    console.log(event.target);
    this.setState({ [event.name.value]: event.target.value });
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleDeleteClick(event) {

  }


  render() {
    return (
      <div className='container'>

        {/* --TITLE BLOCK-- */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-light">Very Simple Todo App</h1>
            <tagline className="text-light">Track all of the things</tagline>
            <hr className="bg-white" />
          </div>
        </div>

        <div className="row">
          {/* --INPUT FORM-- */}
          <div className="col-md-4">
            <form onSubmit={this.handleSubmit}>
              <div className="card">
                <div className="card-header">Add New Todo</div>

                <div className="card-body row">
                  <label className="form-group font-weight-bold col-md-12">
                    I want to...

                    <textarea 
                      name="task" 
                      className="form-control create-todo-text" 
                      rows="3" 
                      value = {this.state.task}
                      onChange={this.handleInputChange}
                    ></textarea>
                  </label>

                  <label className="form-group font-weight-bold col-md-12">
                    How much of a priority is this?

                    <select 
                      name="priority"
                      className="form-control create-todo-priority"
                      value={this.state.priority}
                      onChange={this.handleInputChange}
                    >
                      <option value="0">Select a Priority</option>
                      <option value="1">Low Priority</option>
                      <option value="2">Medium Priority</option>
                      <option value="3">High Priority</option>
                    </select>
                  </label>
                </div>
                
                <div className="card-footer">
                  <button className="btn-block btn-success rounded" type="submit">Add</button>
                </div>
              </div>
            </form>
          </div>

          {/* --TODO LIST-- */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">View Todos</div>

              <ul className="list-group">
                  {this.state.todoList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
