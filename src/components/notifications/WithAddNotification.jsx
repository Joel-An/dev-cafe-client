import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addNotification } from '../../store/actions/notifications';

const mapDispatchToProps = { addNotification };

export default function WithAddNotification(Component) {
  return connect(null, mapDispatchToProps)(Component);
}

export const addNotificationPropType = {
  type: PropTypes.func,
};
