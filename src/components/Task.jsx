import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NoteIcon from 'material-ui/svg-icons/communication/message';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;
let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');

  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/fa-IR');
}

/**
 *  `DatePicker` can be localised using the `locale` property. The first example is localised in French.
 *  Note that the buttons must be separately localised using the `cancelLabel` and `okLabel` properties.
 *
 *  The second example shows `firstDayOfWeek` set to `0`, (Sunday), and `locale` to `en-US` which matches the
 *  behavior of the Date Picker prior to 0.15.0. Note that the 'en-US' locale is built in, and so does not require
 *  `DateTimeFormat` to be supplied.
 *
 *  The final example displays the resulting date in a custom format using the `formatDate` property.
 */


export default class  extends Component {
  static propTypes = {
    isCompleted: PropTypes.bool,
    text: PropTypes.string,
    notes: PropTypes.string,
    due: PropTypes.object,
    onStatusChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
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
    this.text.focus();
  }

  saveTask() {
    this.props.onUpdate({
      text: this.text.value,
      notes: this.notes.value,
      due: this.due.state.date
    });

    this.setState({ isEditing: false });
  }

  cancelTask() {
    this.setState({ isEditing: false });
  }


  render() {
    const { text, notes, due, isCompleted, onDelete } = this.props;

    return (
      this.state.isEditing
      ?
        <div className='Task editing'>
          <input
            className='Task__text-input'
            type='text'
            defaultValue={text}
            onKeyDown={this.handleKeyDown}
            ref={c => this.text = c}
          />
          <DatePicker
            className='Task__due-input'
            autoOk
            fullWidth
            floatingLabelText= 'Change due time'
            mode='landscape'
            container='inline'
            defaultDate={due}
            firstDayOfWeek={0}
            formatDate={new DateTimeFormat('uk-UA', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            ref={c => this.due = c}
          />
          <textarea
            className='Task__note-input'
            type='text'
            defaultValue={notes}
            onKeyDown={this.handleKeyDown}
            ref={c => this.notes = c}
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
          checked={isCompleted}
          onCheck={this.handleCheck}
        />

        <div className='Task__text' onClick={this.handleEdit}>
          <div className='Task__title'>
            {text}
            {notes
            ?
              <span title={notes}>
                <NoteIcon className='Task__note' />
              </span>
            :
              null
            }
          </div>
          {due
          ?
            <div className='Task__due'>
              due {moment(due).fromNow()}
            </div>
          :
            null
          }
        </div>

        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </IconMenu>
      </div>
    );
  }
}
