import { categoryList, priorityList } from '../constants'
import './todo-items.css'

export default function TodoList({markAsDone, handleOnChange}) {
    const todoList = props.todoList.map(item => (
        <div className="todo-item" key={item.id}>
            <div className="item-header">
                <h3 className="todo-title">
                    {
                        <div className="input-group">
                            {!item?.isDone && <input type="checkbox" onChange={(event) => markAsDone(event, item.id)} />}
                            <input
                                type="text"
                                name="itemName"
                                disabled={item?.isDone}
                                className={item?.isDone ? 'text-linethrough' : ''}
                                value={item.itemName}
                                onChange={($event) => handleOnChange($event, item.id)}
                                placeholder="Add note..." />
                        </div>
                    }
                </h3>
                {
                    !item?.isDone &&
                    <div className="action-btns">
                        <button className="btn" onClick={(event) => props.deleteItem(event, item.id)}>
                            <img src="/trash.svg" className="action-icon" alt="Delete Icon" />
                        </button>
                    </div>
                }
            </div>
            <div className="item-footer">
                {
                    !item?.isDone ?
                        <select
                            disabled={item?.isDone}
                            name="priority"
                            onChange={(event) => handleOnChange(event, item.id)}
                            defaultValue={item.priority}
                            className="todo-select">
                            <option value="">--Select--</option>
                            {
                                priorityList.map(priority => (
                                    <option key={priority} value={priority.toLowerCase()}>{priority}</option>
                                ))
                            }
                        </select> :
                        <img src={`/priority-${item.priority}.svg`} alt="Prioroty icon" className="priority-icon" />
                }
                {
                    !item?.isDone ?
                        <select
                            disabled={item?.isDone}
                            name="category"
                            defaultValue={item.category}
                            onChange={($event) => handleOnChange($event, item.id)}
                            className="todo-select">
                            <option value="">--Select--</option>
                            {
                                categoryList.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))
                            }
                        </select> :
                        <h3 className='todo-select'>{item.category}</h3>
                }
            </div>
        </div>
    ))

    return (
        <div className="card-content">
            {todoList}
        </div>

    )
}