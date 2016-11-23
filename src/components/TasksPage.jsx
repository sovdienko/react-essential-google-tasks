import React, { Component, PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import ImageEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';


import Task from './Task';


import './TasksPage.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class TaskPage extends Component {

  static propTypes = {
    onAddTask: PropTypes.func,
    onTaskStatusChange: PropTypes.func,
    onTaskUpdate: PropTypes.func,
    onTaskDelete: PropTypes.func,
    onDeleteTaskList: PropTypes.func,
    onUpdateTaskList: PropTypes.func,
    tasks: PropTypes.array,
    taskList: PropTypes.object,
    error: PropTypes.string,
    isLoadingTasks: PropTypes.bool
  }

  constructor() {
    super();
    this.handleEditTaskList = this.handleEditTaskList.bind(this);
    this.handleTaskListEditKeyDown = this.handleTaskListEditKeyDown.bind(this);
    this.handleCancelTaskListEdit = this.handleCancelTaskListEdit.bind(this);

    this.state = {
      isEditingTaskList: false
    };
  }

  handleEditTaskList() {
    this.setState({
      isEditingTaskList: true
    }, () => this.taskList.focus());
  }

  handleTaskListEditKeyDown(event) {
    if (event.keyCode === ENTER_KEY) {
      this.saveTaskList();
    } else
    if (event.keyCode === ESC_KEY) {
      this.cancelEditingTaskList();
    }
  }

  handleCancelTaskListEdit() {
    this.setState({ isEditingTaskList: false });
  }

  saveTaskList() {
    this.props.onUpdateTaskList({
      name: this.taskList.value
    });
    this.handleCancelTaskListEdit();
  }

  renderTasks() {
    return (
      <div className='TasksPage__tasks'>
        {this.props.tasks.map(task =>
          <Task
            key={task.id}
            text={task.text}
            notes={task.notes}
            due={task.due}
            isCompleted={task.isCompleted}
            onDelete={this.props.onTaskDelete.bind(this, task.id)}
            onStatusChange={this.props.onTaskStatusChange.bind(this, task.id)}
            onUpdate={this.props.onTaskUpdate.bind(this, task.id)}
          />
        )}
      </div>
    );
  }

  render() {
    if (this.props.error) {
      return (
        <div className='TasksPage'>
          <div className='TasksPage__error'>
            {this.props.error}
          </div>
        </div>
      );
    }

    return (
      <div className = 'TasksPage'>
        <div className='TasksPage__header'>
          {this.state.isEditingTaskList
          ?
            <input
              ref={c => this.taskList = c}
              className='TasksPage__title-input'
              defaultValue={this.props.taskList.name}
              onKeyDown={this.handleTaskListEditKeyDown}
              onBlur={this.handleCancelTaskListEdit}
            />
          :
          <h2
            className='TasksPage__title'
            onClick={this.handleEditTaskList}
          >
            {this.props.taskList.name}
          </h2>
          }
          <div className='TasksPage__tools'>
            <IconButton onClick={this.props.onAddTask}>
              <ContentAdd/>
            </IconButton>
            <IconButton onClick={this.props.onDeleteTaskList}>
              <ActionDelete/>
            </IconButton>
          </div>
        </div>
        {this.props.isLoadingTasks
          ? <CircularProgress />
          : this.renderTasks()
        }
      </div>
    );
  }
}
