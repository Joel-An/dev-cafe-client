import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectUserById } from '../store/selectors/users';

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  const user = selectUserById(state, userId);

  return { user };
};

export default function withUser(Component) {
  return connect(mapStateToProps)(Component);
}

export const userPropType = {
  type: PropTypes.shape({
    _id: PropTypes.string,
    profileName: PropTypes.string,
  }),
};
