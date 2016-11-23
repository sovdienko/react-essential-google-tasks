import React, { Component, PropTypes } from 'react';

import TaskListsActions from '../actions/TaskListsActions';
import TaskListsStore from '../stores/TaskListsStore';
import TaskListCreateModal from '../components/TaskListCreateModal';
import TasklistsPage from '../components/TasklistsPage';


function getStateFromFlux() {
  return {
    taskLists: TaskListsStore.getTaskLists()
  };
}

export default class TasklistsPageContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object
  }

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.handleTaskListSubmit = this.handleTaskListSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleTaskListCreateModalClose = this.handleTaskListCreateModalClose.bind(this);
    this.handleAddTaskList = this.handleAddTaskList.bind(this);

    this.state = {
      ...getStateFromFlux(),
      isCreatingTaskList: false
    };
  }

  componentWillMount() {
    TaskListsActions.loadTaskLists();
  }

  componentDidMount() {
    TaskListsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TaskListsStore.removeChangeListener(this._onChange);
  }

  handleAddTaskList() {
    this.setState({ isCreatingTaskList: true });
  }

  handleTaskListSubmit(taskList) {
    TaskListsActions.createTaskList(taskList);
    this.setState({ isCreatingTaskList: false });
  }

  handleTaskListCreateModalClose() {
    this.setState({ isCreatingTaskList: false });
  }


  handleLogOut() {
    console.log('Log out');
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }
  render() {
    return (
      <div>
        <TasklistsPage
          taskLists={this.state.taskLists}
          selectedListId={this.props.params.id}
          page={this.props.children}
          onAddTaskList={this.handleAddTaskList}
          onLogOut={this.handleLogOut}
        />

        <TaskListCreateModal
          isOpen={this.state.isCreatingTaskList}
          onSubmit={this.handleTaskListSubmit}
          onClose={this.handleTaskListCreateModalClose}
        />
      </div>
    );
  }
}
