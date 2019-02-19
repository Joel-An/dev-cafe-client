import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectMyInfo } from '../store/selectors/auth';

const mapStateToProps = (state) => {
  const myInfo = selectMyInfo(state);

  return { myInfo };
};

export default function withMyInfo(Component) {
  return connect(mapStateToProps)(Component);
}

export const myInfoPropType = {
  type: PropTypes.shape({
    _id: PropTypes.string,
    profileName: PropTypes.string,
  }),
  default: {
    _id: null,
    profileName: null,
  },
};
