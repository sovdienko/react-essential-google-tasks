import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class TaskCreateModal extends Component {

  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    isOpen: PropTypes.bool
  }

  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

    this.state = {
      text : ''
    };
  }

  handleClose() {
    const { onClose } = this.props;

    this.setState({ text: '' });

    if (onClose) {
      onClose();
    }
  }

  handleSubmit() {
    console.log('start');

    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        text: this.state.text
      });
    }
    this.setState({ text: '' });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }


  render() {
    const { text } = this.state;
    const { isOpen } = this.props;

    return (
      <Dialog
        className='TaskCreateModal'
        contentStyle={{ maxWidth: 400 }}
        actions={[
          <FlatButton
            key='1'
            label='Cancel'
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            key='2'
            primary
            label='Submit'
            disabled={!text}
            onTouchTap={this.handleSubmit}
          />
        ]}
        open={isOpen}
        onRequestClose={this.handleClose}
      >
        <h3 className='TaskCreateModal__modal-title'>Add task</h3>
        <TextField
          fullWidth
          ref={c => this.taskInput = c}
          value={text}
          onChange={this.handleTextChange}
          hintText='e.g. to buy a bottle of milk'
          floatingLabelText='Enter task description'
        />
      </Dialog>
    );
  }
}
