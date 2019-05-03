import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Clickable from '../common/Clickable';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withToastAddNotification, { addToastNotificationPropInfo } from '../toastNotifications/WithAddToastNotification';
import { connectComponent } from '../../utils';

import * as Api from '../../api/comments';

class CommentLikesButton extends React.Component {
  canLike = () => {
    const { comment, myInfo } = this.props;

    return comment && !comment.likes.includes(myInfo._id);
  }

  likeOrCancel = () => {
    const { token, commentId } = this.props;

    return this.canLike()
      ? Api.likeComment(commentId, token)
      : Api.deleteCommentLikes(commentId, token);
  }

  onSuccess = () => {};

  onFailure = (err) => {
    const { openAlert } = this.props;

    return openAlert({
      message: err.response.data.message,
    });
  }

  render() {
    const color = this.canLike() ? 'grey' : 'black';

    return (
      <Clickable
        handleClick={this.likeOrCancel}
        onSuccess={this.onSuccess}
        onFailure={this.onFailure}
      >
        <FontAwesomeIcon icon="thumbs-up" color={color}/>
      </Clickable>
    );
  }
}

export default connectComponent(CommentLikesButton,
  [
    withComment,
    withToken,
    withMyInfo,
    withToastAddNotification,
    withOpenAlert,
  ]);
