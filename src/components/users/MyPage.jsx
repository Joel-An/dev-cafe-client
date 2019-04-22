import React from 'react';

import withMyInfo, { myInfoPropType } from '../../containers/WithMyInfo';
import { connectComponent } from '../../utils';
import UploadImage from '../posts/UploadImage';

const MyPage = (props) => {
  const { myInfo } = props;

  return (
    <div className="MyPage">
      마이 페이지!
      <br/>
      {myInfo.profileName}!!
      <UploadImage path="profilePic">
        프사 변경!
      </UploadImage>
    </div>
  );
};

MyPage.propTypes = {
  myInfo: myInfoPropType.type.isRequired,
};

export default connectComponent(MyPage,
  [
    withMyInfo,
  ]);
