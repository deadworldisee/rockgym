import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { RNHikvisionSdk } from 'react-native-hikvision-sdk';

class HikvisionCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: ''
    };
  }

  componentDidMount() {
    const sdk = new RNHikvisionSdk({
      ipAddress: '5.2.188.47',
      port: '8000',
      username: 'admin',
      password: '12345678q'
    });

    sdk.init().then(() => {
      sdk.startLiveStream(11).then((data) => {
        this.setState({ imageBase64: data });
      });
    }).catch((error) => {
      console.log('Error initializing SDK: ', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.cameraView}
          source={{ uri: `data:image/png;base64,${this.state.imageBase64}` }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraView: {
    width: '100%',
    height: '100%'
  }
});

export default HikvisionCamera;
