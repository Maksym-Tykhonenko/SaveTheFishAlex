import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Background from './Background';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';

const Loader = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  }, []);

  const loaderHTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.bars-loader{position:relative;display:block;width:150px;height:50px;text-align:center}.bar{position:relative;display:inline-block;margin:0 8px;width:10px;height:50px;border-radius:0px;background:#cdb682;box-shadow:0 4px 10px rgba(47,47,47,0.3);animation:swing 5s infinite cubic-bezier(0.955,-0.01,1,1);transform-origin:100% 100%}.bar::before{content:"";position:absolute;z-index:-1;bottom:0;display:block;width:10px;height:10px;background:transparent;box-shadow:0 4px rgba(29,29,29,0.3);animation:extend 5s infinite cubic-bezier(0.955,-0.01,1,1);opacity:0;transform-origin:0% 0%}.bar:nth-child(2),.bar:nth-child(2)::before{animation-delay:0.3s}.bar:nth-child(3),.bar:nth-child(3)::before{animation-delay:0.6s}.bar:nth-child(4),.bar:nth-child(4)::before{animation-delay:0.9s}.bar:nth-child(5),.bar:nth-child(5)::before{animation-delay:1.2s}.bar:last-of-type{animation-name:swing-last}.bar:last-of-type::before{animation-name:extend-last}@keyframes swing{10%{transform:rotate(70deg)}60%{transform:rotate(70deg)}70%{transform:rotate(0deg)}}@keyframes swing-last{10%{transform:rotate(90deg)}60%{transform:rotate(90deg)}70%{transform:rotate(0deg)}}@keyframes extend{10%{transform:rotate(-70deg);width:20px;opacity:1;left:0px;bottom:-1px}60%{transform:rotate(-70deg);width:20px;opacity:1}70%{width:10px;transform:rotate(0deg);opacity:0}}@keyframes extend-last{10%{transform:rotate(-90deg);width:20px;height:2px;opacity:0.5;left:3px;bottom:-1px}60%{transform:rotate(-90deg);width:20px;height:2px;opacity:0.5}70%{transform:rotate(0deg);width:10px;height:10px;opacity:0}}</style></head><body><div class="bars-loader"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div></body></html>`;

  return (
    <Background style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <ScrollView>
          {loader ? (
            <Image source={require('../assets/images/onb1.png')} />
          ) : (
            <WebView originWhitelist={['*']} source={{ html: loaderHTML }} />
          )}
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Loader;
