import PropTypes from 'prop-types';
import { Component } from 'react';

const CLOUDNAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = import.meta.env.VITE_APP_CLOUDINARY_PRESET;
const WIDGET_SRC = 'https://widget.cloudinary.com/v2.0/global/all.js';

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const init = () => {
      if (!CLOUDNAME || !UPLOADPRESET) {
        console.error('[Cloudinary] Missing env');
        return;
      }
      if (!window.cloudinary?.createUploadWidget) {
        console.error('[Cloudinary] Widget API not available');
        return;
      }
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
    };
    if (window.cloudinary?.createUploadWidget) {
      init();
    } else {
      let script = document.querySelector(`script[src="${WIDGET_SRC}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = WIDGET_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', init, { once: true });
      script.addEventListener(
        'error',
        () => console.error('[Cloudinary] Failed to load widget script'),
        { once: true },
      );
    }
  }
  componentWillUnmount() {
    try {
      this.widget?.close?.();
    } catch {
      // do nothing
    }
    this.widget = null;
  }
  openWidget = () => {
    if (!this.widget) {
      console.warn('[Cloudinary] Widget is not ready yet');
      return;
    }
    this.widget.open();
  };

  render() {
    const { children } = this.props;
    return children ? children(this.openWidget) : null;
  }
}

export default CloudinaryUploadWidget;
CloudinaryUploadWidget.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  children: PropTypes.func,
};
