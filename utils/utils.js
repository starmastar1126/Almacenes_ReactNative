// obtained from react native tutorials

import React from 'react';
import {PixelRatio, Alert, Image, View} from 'react-native';
import Dimensions from 'Dimensions';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: screenWidth,
    height: screenHeight,
  },
  test(funcResult) {
    funcResult();
  },
  showAlertWithOKButton(title, msg, func) {
    Alert.alert(title, msg, [{text: 'OK', onPress: () => func}], {
      cancelable: false,
    });
  },
  post(url, data) {
    var formBody = [];
    for (var key in data) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(data[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    };

    return fetch(url, fetchOptions);
  },
  get(url) {
    // if (params) {
    //   let paramsArray = [];
    //   //拼接参数
    //   Object.keys(params).forEach(key =>
    //     paramsArray.push(key + "=" + params[key])
    //   );
    //   if (url.search(/\?/) === -1) {
    //     url += "?" + paramsArray.join("&");
    //   } else {
    //     url += "&" + paramsArray.join("&");
    //   }
    // }
    //fetch请求
    return fetch(url, {
      method: 'GET',
    });
  },

  getcolorofgrid(row, col) {
    var colors = [
      ['#477cae', '#eacc6a', '#f95b42'],
      ['#ea8334', '#a160ba', '#eacc6a'],
      ['#f75b44', '#477baa', '#ea8334'],
    ];
    col = col % 3;
    return colors[row][col];
  },

  // 1. Pendiente 2. Procesando 3. En Recolección 4. Recolectada 5. En Camino 6. Entregado, 7: completed
  getstatuscolor(status) {
    switch (status) {
      case 1:
        return 'red';
      case 2:
        return 'green';
      case 3:
        return 'blue';
      case 4:
        return 'deeppink';
      case 5:
        return 'deeppink';
      case 6:
        return 'cyan';
      case 7:
        return 'cyan';
    }
  },

  getstatustitle(status) {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Procesando';
      case 3:
        return 'En Recolección';
      case 4:
        return 'Recolectada';
      case 5:
        return 'En Camino';
      case 6:
        return 'Entregado';
      case 7:
        return 'completed';
    }
  },
  getLoadingView(visible) {
    return (
      <OrientationLoadingOverlay visible={visible}>
        <View>
          <Image
            source={require('../assets/loading.gif')}
            style={{width: screenWidth / 4, height: screenWidth / 4}}
          />
        </View>
      </OrientationLoadingOverlay>
    );
  },
  splitString(text) {
    return text.split(' ');
  },
};
export default Util;
