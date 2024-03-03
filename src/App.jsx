import { nanoid } from 'nanoid'
import './App.css'
import TodoList from './components/TodoList'
import { Component } from 'react'

export default class App extends Component {
	state = {
		todoList: [],
		listDone: []
	}

	/**
	 * Add item to the List
	 */
	addTodoList = () => {
		const newTodoItem = {
			id: nanoid(),
			priority: "",
			category: "",
			itemName: "",
			isDone: false
		}
		this.setState(prevState => ({ todoList: [...prevState.todoList, newTodoItem] }))
	}

	/**
	 * Move item from todo list to done list
	 */
	markAsDone = (event, itemId) => {
		event.stopPropagation()
		const itemDone = this.state.todoList.find(item => item.id === itemId)
		this.setState(prevState => ({todoList: prevState.todoList.filter(item => item.id !== itemId)}))
		this.setState(prevState => ({listDone: [...prevState.listDone, { ...itemDone, isDone: true }]}))
	}

	/**
	 * Delete Item
	 */
	deleteItem = (event, itemId) => {
		event.stopPropagation()
		this.setState(prevState => ({todoList: prevState.todoList.filter(item => item.id !== itemId)}))
	}

	/**
	 * Manage value change in Todo Item
	 */
	handleOnChange = (event, itemId) => {
		event.stopPropagation()
		const { name, value } = event.target;
		this.setState(prevState => ({
			todoList: prevState.todoList.map(item => {
				return item.id === itemId ? { ...item, [name]: [value] } : item
			})
		}))
	}

	render() {
		return (
			<main className="main-container">
				<div className="todo-card">
					<div className="card-header">
						<img src="/todo.svg" className="todo-icon" alt="To Do Icon" />
						<h2 className="card-title">To-Do</h2>
						<button className="add-btn" onClick={this.addTodoList}>
							<img src="/add-icon.svg" className="add-icon" alt="Add Button" />
						</button>
					</div>
					{
						this.state.todoList.length > 0 ?
							<TodoList
								todoList={this.state.todoList}
								markAsDone={this.markAsDone}
								handleOnChange={this.handleOnChange}
								deleteItem={this.deleteItem}
							/> :
							<img src="/empty.svg" className="empty-img" alt="Empty Image" />
					}
				</div>
				<div className="todo-card">
					<div className="card-header">
						<img src="/todo-done.svg" className="todo-icon" alt="To Do Done Icon" />
						<h2 className="card-title">Done</h2>
					</div>
					{
						this.state.listDone.length > 0 ?
							<TodoList todoList={this.state.listDone} /> :
							<img src="/empty.svg" className="empty-img" alt="Empty Image" />
					}
				</div>
			</main>
		)
	}

}
