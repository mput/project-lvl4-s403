import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alert, Button } from 'react-bootstrap';
import { userNameView } from '../lib/valuesView';

import { activeChannelSelector, activeChannelMessages, usersByIdSelector } from '../selectors';
import { loadNextMessagesAction } from '../actions/thunkActions';

const Message = ({ message, author, ownMessage }) => (
  <Alert
    variant={ownMessage ? 'warning' : 'info'}
    className="mt-0 mb-4 px-3 shadow-sm"
  >
    <h3 className="h6 mb-1 alert-heading font-weight-bold">{userNameView(author.userName)}</h3>
    <p className="font-weight-normal mb-0">{message}</p>
  </Alert>
);

const mapStateToProps = state => ({
  messages: activeChannelMessages(state),
  activeChannel: activeChannelSelector(state),
  usersById: usersByIdSelector(state),
});

const mapActions = {
  loadNextMessages: loadNextMessagesAction,
};

@connect(mapStateToProps, mapActions)
class MessagesLits extends Component {
  constructor(props) {
    super(props);
    this.scrolTo = React.createRef();
  }

  componentDidMount() {
    this.scrolTo.current.scrollIntoView();
  }

  componentDidUpdate() {
    this.scrolTo.current.scrollIntoView();
  }

  handleLoadNextMessages = () => {
    const { loadNextMessages, activeChannel } = this.props;
    loadNextMessages(activeChannel.id);
  }

  render() {
    const { messages, usersById } = this.props;

    return (
      <div className="flex-column mt-auto px-4 overflow-auto">
        <Button
          block
          variant="dark"
          className="w-75 mx-auto my-3 p-0"
          onClick={this.handleLoadNextMessages}
        >
          LoadMessages
        </Button>
        {messages.map(({ message, id, author }, index) => (
          <Message
            message={message}
            first={index === 0}
            author={usersById[author]}
            key={id}
          />
        ))}
        <div ref={this.scrolTo} />
      </div>
    );
  }
}

export default MessagesLits;
