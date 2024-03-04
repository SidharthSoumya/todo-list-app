import { nanoid } from 'nanoid'
import './App.css'
import TodoList from './components/TodoList'
import { useState } from 'react'

function App() {
	const [todoList, setToDoList] = useState([])
	const [listDone, setListDone] = useState([])

	/**
	 * Add item to the List
	 */
	function addTodoList() {
		const newTodoItem = {
			id: nanoid(),
			priority: "",
			category: "",
			itemName: "",
			isDone: false
		}
		setToDoList(prevList => (
			[...prevList, newTodoItem]
		))
	}

	/**
	 * Move item from todo list to done list
	 */
	function markAsDone(event, itemId) {
		event.stopPropagation()
		const itemDone = todoList.find(item => item.id === itemId)
		setToDoList(prevList => prevList.filter(item => item.id !== itemId))
		setListDone(prevDoneList => [...prevDoneList, { ...itemDone, isDone: true }])
	}

	/**
	 * Delete Item
	 */
	function deleteItem(event, itemId) {
		event.stopPropagation()
		setToDoList(prevList => prevList.filter(item => item.id !== itemId))
	}

	/**
	 * Manage value change in Todo Item
	 */
	function handleOnChange(event, itemId) {
		event.stopPropagation()
		const {name, value} = event.target;
		setToDoList(prevList => prevList.map(item => {
			return item.id === itemId ? { ...item, [name]: [value] } : item
		}))
	}

	return (
		<main className="main-container">
			<div className="todo-card">
				<div className="card-header">
					<img src="/todo.svg" className="todo-icon" alt="To Do Icon" />
					<h2 className="card-title">To-Do</h2>
					<button className="add-btn" onClick={addTodoList}>
						<img src="/add-icon.svg" className="add-icon" alt="Add Button" />
					</button>
				</div>
				{
					todoList.length > 0 ?
					<TodoList
						todoList={todoList}
						markAsDone={markAsDone}
						handleOnChange={handleOnChange} 
						deleteItem={deleteItem}
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
					listDone.length > 0 ?
					<TodoList todoList={listDone} /> :
					<img src="/empty.svg" className="empty-img" alt="Empty Image" />
				}
			</div>
		</main>
	)
}

export default App
