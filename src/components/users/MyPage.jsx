import React from 'react';
import { Redirect } from 'react-router-dom';

import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent } from '../../utils';
import UploadImage from '../posts/UploadImage';
import { ProfilePic, ProfileName } from './User';

const MyPage = (props) => {
  const { myInfo, lastVisitedCategoryId } = props;

  if (myInfo.isGuest) {
    return <Redirect to={`/posts?category=${lastVisitedCategoryId}`} />;
  }

  return (
    <div className="MyPage">
      마이 페이지!
      <br/>
      <div>
        <ProfileName userId={myInfo._id}/>
      </div>
      <ProfilePic userId={myInfo._id} height="200" width="200"/>
      <UploadImage path="profilePic">
        프사 변경!
      </UploadImage>
    </div>
  );
};

MyPage.propTypes = {
  myInfo: myInfoPropType.type.isRequired,
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.isRequired,
};

export default connectComponent(MyPage,
  [
    withMyInfo,
    withLastVisitedCategoryId,
  ]);
