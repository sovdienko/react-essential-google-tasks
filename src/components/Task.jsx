import React, { Component, PropTypes } from 'react';

import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class  extends Component {
  static propTypes = {
    isCompleted: PropTypes.bool,
    text: PropTypes.string,
    onStatusChange: PropTypes.func,
    onUpdate: PropTypes.func
  }

  constructor() {
    super();
    this.focusInput = this.focusInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      isEditing: false
    };
  }

  handleCheck() {
    this.props.onStatusChange({
      isCompleted: !this.props.isCompleted
    });
  }


  handleEdit() {
    this.setState({ isEditing: true }, this.focusInput);
  }

  handleCancel() {
    this.cancelTask();
  }

  handleSave() {
    this.saveTask();
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveTask();
    }

    if (e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
  }

  focusInput() {
    this.inputEdit.focus();
  }

  saveTask() {
    this.props.onUpdate({ text: this.inputEdit.value });

    this.setState({ isEditing: false });
  }

  cancelTask() {
    this.setState({ isEditing: false });
  }


  render() {
    return (
      this.state.isEditing
      ?
        <div className='Task editing'>
          <input
            className='Task__input'
            type='text'
            defaultValue={this.props.text}
            onKeyDown={this.handleKeyDown}
            ref={c => this.inputEdit = c}
          />
          <div className='Task__toolbar'>
            <div>
              <RaisedButton primary onClick={this.handleSave} label='Save' />
              <FlatButton onClick={this.handleCancel} label='Cancel' />
            </div>
          </div>
        </div>
      :
      <div className='Task'>
        <Checkbox
          className='Task__checkbox'
          checked={this.props.isCompleted}
          onCheck={this.handleCheck}
        />

        <div className='Task__text' onClick={this.handleEdit}>
          <div className='Task__title'>{this.props.text}</div>
        </div>

        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </IconMenu>
      </div>
    );
  }
}
