import React from 'react';
import { Redirect } from 'react-router-dom';

import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';
import { connectComponent } from '../../utils';
import UploadImage from '../posts/UploadImage';

const MyPage = (props) => {
  const { myInfo, lastVisitedCategoryId } = props;

  if (myInfo.isGuest) {
    return <Redirect to={`/posts?category=${lastVisitedCategoryId}`} />;
  }

  return (
    <div className="MyPage">
      마이 페이지!
      <br/>
      <img alt={`@${myInfo.profileName}`} height="200" width="200" src={myInfo.profilePic}/>
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
