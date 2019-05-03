import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToastNotification } from '../../store/actions/toastNotifications';

const mapDispatchToProps = { addToastNotification };

export default function WithAddNotification(Component) {
  return connect(null, mapDispatchToProps)(Component);
}

export const addToastNotificationPropInfo = {
  type: PropTypes.func,
};
