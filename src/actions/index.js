import { createAction } from 'redux-actions';
import axios from 'axios';
import * as routes from '../routes';
import logger from '../../lib/logger';

const log = logger('actions');

export const addChannel = createAction('ADD_CHANNEL');

export const addMessage = createAction('ADD_MESSAGE');

export const setActiveCahnnel = createAction('SET_ACTIVE_CHANNEL');


export const sendMessageRequest = (message, author, channelId) => async (dispatch) => {
  const url = routes.messages(channelId);
  const data = {
    attributes: {
      message, author,
    },
  };
  log('Sending message to %s', url);
  const { data: response } = await axios.post(url, { data });
  log('Message was sent, received data is %o', response);
  dispatch(addMessage(response));
};

export const addChannelRequset = name => async (dispatch) => {
  const url = routes.channels();
  const data = {
    attributes: {
      name,
    },
  };
  log('Sending new channel name to %s', url);
  const { data: response } = await axios.post(url, { data });
  log('Channel was sent, received data is %o', response);
  dispatch(addChannel(response));
};
