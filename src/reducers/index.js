import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.addChannel]: state => ({ state }),
  },
  { byId: {}, allId: [] },
);

const messages = handleActions(
  {
    [actions.addMessage]: (state, { payload }) => {
      const { data: { attributes: newMessage } } = payload;
      const newMessageId = newMessage.id;
      if (state.byId[newMessageId]) {
        return state;
      }
      return {
        byId: { ...state.byId, [newMessageId]: newMessage },
        allIds: [...state.allIds, newMessageId],
      };
    },
  },
  { byId: {}, allId: [] },
);

const activeChannelId = handleActions(
  {
    [actions.setActiveCahnnel]: (_state, { payload: channelId }) => (channelId),
  },
  1,
);

export default combineReducers({
  channels,
  messages,
  activeChannelId,
  form: formReducer,
});
