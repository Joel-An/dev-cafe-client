import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Clickable from '../common/Clickable';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { connectComponent } from '../../utils';

import * as Api from '../../api/comments';

class CommentDislikesButton extends React.Component {
  canDislike = () => {
    const { comment, myInfo } = this.props;

    return comment && !comment.dislikes.includes(myInfo._id);
  }

  dislikeOrCancel = () => {
    const { token, commentId } = this.props;

    return this.canDislike()
      ? Api.dislikeComment(commentId, token)
      : Api.deleteCommentDisLikes(commentId, token);
  }

  onSuccess = () => {};

  onFailure = (err) => {
    const { openAlert } = this.props;

    return openAlert({
      message: err.response.data.message,
    });
  }

  render() {
    const color = this.canDislike() ? 'grey' : 'black';

    return (
      <Clickable
        handleClick={this.dislikeOrCancel}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
        className="CommentDislikeButton"
      >
        <FontAwesomeIcon icon="thumbs-down" color={color}/>
      </Clickable>
    );
  }
}

export default connectComponent(CommentDislikesButton,
  [
    withComment,
    withToken,
    withMyInfo,
    withAddNotification,
    withOpenAlert,
  ]);
