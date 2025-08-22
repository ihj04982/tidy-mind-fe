import { Component } from 'react';

const CLOUDNAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const UPLOADPRESET = import.meta.env.VITE_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    this.widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          this.props.uploadImage(result.info.secure_url);
        }
      },
    );
  }
  openWidget = () => {
    this.widget && this.widget.open();
  };

  render() {
    const { children } = this.props;
    return children ? children(this.openWidget) : null;
  }
}

export default CloudinaryUploadWidget;
