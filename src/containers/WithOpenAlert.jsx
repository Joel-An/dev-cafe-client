import { connect } from 'react-redux';

import { openAlert as openAlertAction } from '../store/actions/popups';

const mapDispatchToProps = { openAlert: openAlertAction };

export default function withOpenAlert(Component) {
  return connect(null, mapDispatchToProps)(Component);
}
