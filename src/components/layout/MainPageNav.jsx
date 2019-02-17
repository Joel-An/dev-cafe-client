import React from 'react';

class MainPageNav extends React.Component {
  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  scrollToBottom = () => {
    const { scrollHeight, offsetHeight } = document.body;
    window.scrollTo(0, scrollHeight - offsetHeight);
  }

  render() {
    return (
      <div className="main-nav-container">
        <div className="main-nav-button-groups">
          <button type="button" onClick={this.scrollToTop}>
            Top
          </button>
          <div id="post-list-page-nav"/>

          <button type="button" onClick={this.scrollToBottom}>
            Bottom
          </button>
        </div>
      </div>
    );
  }
}


export default MainPageNav;
