import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withUser, { userPropType } from '../../containers/WithUser';
import { connectComponent } from '../../utils';

import './AuthorHeart.scss';

const AuthorHeart = (props) => {
  const { user: author } = props;

  if (!author) return null;

  return (
    <div className="AuthorHeart" title={`${author.profileName}님의 ♥`}>
      <img className="author-profile-pic" alt={`${author.profileName}님의 ♥`} height="30" width="30" src={author.profilePic}/>
      <div className="heart-container">
        <FontAwesomeIcon icon="heart" color="red"/>
      </div>
    </div>
  );
};

AuthorHeart.propTypes = {
  user: userPropType.type.isRequired,
};

export default connectComponent(AuthorHeart,
  [
    withUser,
  ]);
