import React from 'react';
import PropTypes from 'prop-types';

import withToken, { tokenPropType } from '../../containers/WithToken';
import withOpenAlert, { openAlertPropType } from '../../containers/WithOpenAlert';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { connectComponent } from '../../utils';

import * as Api from '../../api/images';
import './UploadImage.scss';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const isValidImageType = fileType => !validImageTypes.includes(fileType);

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.file = null;
  }

  shouldComponentUpdate() {
    return false;
  }

  resetFile = () => {
    this.file.value = '';
  }

  onSelectFile = (event) => {
    event.preventDefault();
    const [selectedImage] = event.target.files;
    const imageName = selectedImage.name;

    const {
      token, addNotification, openAlert, updateUploadedImageLink, path,
    } = this.props;

    const fileType = selectedImage.type;

    if (isValidImageType(fileType)) {
      openAlert({
        message: 'gif, jpeg, png 파일만 업로드 가능합니다!',
      });
      this.resetFile();

      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    Api.postImage(token, formData, path)
      .then((response) => {
        const { imageUrl } = response.data;
        addNotification({
          message: `[${imageName}] 이미지가 등록되었습니다!`,
        });

        const markdownLink = `![${imageName}](${imageUrl} "${imageName}")\n`;

        updateUploadedImageLink(markdownLink);
        this.resetFile();
      })
      .catch((err) => {
        openAlert({
          message: err.response.data.message,
        });
      });
  }

  render() {
    const { children } = this.props;
    return (
      <div className="UploadImage">
        <label htmlFor="image-upload">
          <input type="file" id="image-upload" onChange={this.onSelectFile} ref={(el) => { this.file = el; }}/>
          {children || 'Upload Image'}
        </label>
      </div>
    );
  }
}

UploadImage.propTypes = {
  token: tokenPropType.type,
  openAlert: openAlertPropType.type.isRequired,
  addNotification: addNotificationPropType.type.isRequired,
  updateUploadedImageLink: PropTypes.func.isRequired,
  path: PropTypes.string,
  children: PropTypes.string,
};

UploadImage.defaultProps = {
  token: tokenPropType.default,
  path: undefined,
  children: undefined,
};

export default connectComponent(UploadImage,
  [
    withToken,
    withOpenAlert,
    withAddNotification,
  ]);
