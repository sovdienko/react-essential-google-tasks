import React, { Component, PropTypes } from 'react';

import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import TaskCreateModal from './TaskCreateModal';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Task from './Task';


import './TasksPage.less';

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks(),
    isCreatingTask: false
  };
}

export default class TaskPage extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }


  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      ...getStateFromFlux()
    };
  }

  componentWillMount() {
    TasksActions.loadTasks(this.props.params.id);
  }

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      TasksActions.loadTasks(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange);
  }

  handleStatusChange(taskId, { isCompleted }) {
    TasksActions.updateTaskStatus({
      taskListId: this.props.params.id,
      taskId,
      isCompleted
    });
  }

  handleAddTask() {
    this.setState({ isCreatingTask : true });
  }

  handleClose() {
    this.setState({ isCreatingTask : false });
  }

  handleTaskSubmit(task) {
    const taskListId = this.props.params.id;

    TasksActions.createTask({ taskListId, ...task });
    this.setState({ isCreatingTask : false });
  }

  handleTaskUpdate(taskId, { text }) {
    TasksActions.updateTask({
      taskListId: this.props.params.id,
      taskId,
      text
    });
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    return (
      <div className = 'TasksPage'>
        <div className='TasksPage__header'>
          <h2 className='TasksPage__title'>List name</h2>
          <div className='TasksPage__tools'>
            <IconButton onClick={this.handleAddTask}>
              <ContentAdd/>
            </IconButton>
          </div>
        </div>
        <div className='TasksPage__tasks'>
          {this.state.tasks.map(task =>
            <Task
              key={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              onStatusChange={this.handleStatusChange.bind(this, task.id)}
              onUpdate={this.handleTaskUpdate.bind(this, task.id)}
            />
          )}
        </div>
        <TaskCreateModal
          isOpen={this.state.isCreatingTask}
          onSubmit={this.handleTaskSubmit}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
