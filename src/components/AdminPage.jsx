import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet-async';


import withOpenAlert, { openAlertPropType } from '../containers/WithOpenAlert';
import withMyInfo, { myInfoPropType } from '../containers/WithMyInfo';

import { connectComponent } from '../utils';

const AdminPage = (props) => {
  const { myInfo, openAlert } = props;

  if (!myInfo || !myInfo.isAdmin) {
    openAlert({
      title: 'Warning!!',
      message: '관리자가 아니라면 접근할 수 없...지 않아요',
    });
  }
  return (
    <Fragment>
      <Helmet>
        <title>Admin | Dev Cafe</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Link to="/admin/categoryManager">MANAGE CATEGORIES</Link>
    </Fragment>
  );
};

AdminPage.propTypes = {
  openAlert: openAlertPropType.type.isRequired,
  myInfo: myInfoPropType.type,
};

AdminPage.defaultProps = {
  myInfo: myInfoPropType.default,
};

export default connectComponent(AdminPage,
  [
    withOpenAlert,
    withMyInfo,
  ]);
