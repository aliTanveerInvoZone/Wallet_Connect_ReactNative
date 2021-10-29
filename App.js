/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './shim';
import React from 'react';
import Web3 from 'web3';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  withWalletConnect,
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  console.log('web3===>', Web3);
  const connector = useWalletConnect(); // valid
  console.log('connector', connector);

  if (!connector._connected) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            connector.connect();
          }}>
          <Text>{'Connect'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            connector.killSession();
          }}>
          <Text>{'Kill Session'}</Text>
        </TouchableOpacity>
        {connector._accounts.map(item => {
          return <Text>{item}</Text>;
        })}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default withWalletConnect(App, {
  clientMeta: {
    description: 'Connect with WalletConnect',
  },
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
