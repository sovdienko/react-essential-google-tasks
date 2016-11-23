import React, { Component, PropTypes } from 'react';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';


import './TasklistsPage.less';

export default class TasklistsPage extends Component {

  static propTypes ={
    taskLists: PropTypes.array,
    onAddTaskList: PropTypes.func,
    selectedListId: PropTypes.string,
    onLogOut: PropTypes.func,
    page: PropTypes.node
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const { router } = this.context;

    return (
      <div className='TasklistsPage'>
        <div className='TasklistsPage__menu'>
          <List className='TasklistsPage__list'>
            <h3 className='TasklistsPage__title'>React Google Tasks</h3>
            <Divider/>
            <List className='TasklistsPage__list'>
              <ListItem
                leftIcon={<HomeIcon />}
                primaryText='Home'
                onClick={router.push.bind(null, '/lists')}
              />
              <ListItem
                leftIcon={<ListIcon />}
                primaryText='About'
                onClick={router.push.bind(null, '/about')}
              />
            </List>
            <Divider/>
            <List className='TasklistsPage__list'>
              <Subheader>Task Lists</Subheader>
              {this.props.taskLists.map(list =>
                <ListItem
                  key={list.id}
                  leftIcon={<FolderIcon />}
                  style={
                      this.props.selectedListId === list.id
                      ?
                        { backgroundColor: 'rgba(0,0,0,0.1)' }
                      :
                        null
                  }
                  primaryText={list.name}
                  onClick={router.push.bind(null, `/lists/${list.id}`)}
                />
              )}
              <ListItem
                leftIcon={<AddIcon />}
                primaryText='Create new list'
                onClick={this.props.onAddTaskList}
              />
            </List>
            <Divider/>
            <List className='TasklistsPage__list'>
              <ListItem
                leftIcon={<ExitIcon />}
                primaryText='Log out'
                onClick={this.props.onLogOut}
              />
            </List>
          </List>
        </div>
        <div className='TasklistsPage__tasks'>
          {this.props.page}
        </div>
      </div>
    );
  }
}
