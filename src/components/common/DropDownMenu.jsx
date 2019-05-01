import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Clickable from './Clickable';

import './DropDownMenu.scss';

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggled: false };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  showMenu = () => {
    const { onOpen } = this.props;

    this.setState({ isToggled: true }, () => {
      document.addEventListener('click', this.hideMenu);
    });

    return typeof onOpen === 'function' ? onOpen() : null;
  }

  hideMenu = () => {
    const { onClose } = this.props;

    this.setState({ isToggled: false }, () => {
      document.removeEventListener('click', this.hideMenu);
    });

    return typeof onClose === 'function' ? onClose() : null;
  }

  toggleMenu = () => {
    const { isToggled } = this.state;

    return isToggled ? this.hideMenu() : this.showMenu();
  }

  render() {
    const { isToggled } = this.state;
    const { className, toggleIcon, children } = this.props;


    return (
      <div className={classNames(className, 'dd-menu')}>
        <Clickable className={classNames(className, 'toggle-button', { toggled: isToggled })} handleClick={this.toggleMenu}>
          {toggleIcon}
        </Clickable>
        {isToggled && <div className="menu-list">
          {children}
        </div>}
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  toggleIcon: PropTypes.node.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

DropDownMenu.defaultProps = {
  className: '',
  onOpen: () => {},
  onClose: () => {},
};

export default DropDownMenu;
