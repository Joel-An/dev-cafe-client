import { connect } from 'react-redux';

import { selectMyInfo } from '../store/selectors/auth';
import { userPropType } from './WithUser';

const mapStateToProps = (state) => {
  const myInfo = selectMyInfo(state);

  return { myInfo };
};

export default function withMyInfo(Component) {
  return connect(mapStateToProps)(Component);
}

export const myInfoPropType = {
  type: userPropType.type,
  default: undefined,
};
