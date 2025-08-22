import { Button } from '@mui/material';
import { Image } from 'lucide-react';
import React, { Component } from 'react';

const CLOUDNAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

const UPLOADPRESET = import.meta.env.VITE_APP_CLOUDINARY_CLOUDINARY_PRESET;

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
    return (
      <Button
        id="upload_widget"
        disableRipple
        onClick={this.openWidget}
        sx={{
          minWidth: '40px',
          height: '40px',
          padding: 0,
          borderRadius: '30px',
        }}
      >
        <Image color="#737373" size={20} strokeWidth={1.5} />
      </Button>
    );
  }
}

export default CloudinaryUploadWidget;
