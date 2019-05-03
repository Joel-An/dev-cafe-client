import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withComment, { commentPropInfo } from '../../containers/WithComment';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddToastNotification, { addToastNotificationProp } from '../toastNotifications/WithAddToastNotification';
import { connectComponent, isAuthor } from '../../utils';

import * as Api from '../../api/comments';

import { selectPostAuthorIdByCommentId } from '../../store/selectors/posts';

import './GiveHeartButton.scss';

class GiveHeartButton extends React.Component {
  constructor(props) {
    super(props);
    this.isProcessing = false;
  }

  giveHeart = () => {
    this.isProcessing = true;
    const {
      commentId, token, addToastNotification, openAlert,
    } = this.props;


    return Api.postAuthorHeart(commentId, token)
      .then(() => {
        addToastNotification({
          message: '댓글에 하트를 줬어요!',
        });
      })
      .catch((err) => {
        openAlert({
          message: err.response.data.message,
        });
      })
      .finally(() => {
        this.isProcessing = false;
      });
  };

  takeHeartBack = () => {
    this.isProcessing = true;
    const {
      commentId, token, addToastNotification, openAlert,
    } = this.props;

    Api.deleteAuthorHeart(commentId, token)
      .then(() => {
        addToastNotification({
          message: '하트를 회수했습니다ㅠㅠ',
        });
      })
      .catch((err) => {
        openAlert({
          message: err.response.data.message,
        });
      })
      .finally(() => {
        this.isProcessing = false;
      });
  };

  handleClick = () => {
    const { isProcessing } = this;

    if (isProcessing) {
      return null;
    }

    const { comment } = this.props;

    return comment && comment.authorHeart ? this.takeHeartBack() : this.giveHeart();
  };

  render() {
    const { myInfo, postAuthorId, comment } = this.props;
    const amIAuthor = isAuthor(myInfo, postAuthorId);
    const hearted = comment.authorHeart
      ? <FontAwesomeIcon icon="heartbeat" title="댓글에 준 ♥ 회수하기"/>
      : <FontAwesomeIcon icon={['far', 'heart']} title="댓글에 ♥주기"/>;

    return amIAuthor
      ? <button className="GiveHeartButton" type="button" onClick={this.handleClick}>{hearted}</button>
      : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { commentId } = ownProps;
  const postAuthorId = selectPostAuthorIdByCommentId(state, commentId);

  return { postAuthorId, ...ownProps };
};

export default connectComponent(GiveHeartButton,
  [
    withComment,
    withToken,
    withMyInfo,
    withAddToastNotification,
    withOpenAlert,
    connect(mapStateToProps),
  ]);
