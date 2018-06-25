import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import promiseFinally from 'promise.prototype.finally';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

// Importing all react views
import Test from './views/Test';

// Configure our routes
const RouteConfig = {
  Test: { screen: Test },
};

// Initialize our navigator stack
const StackNavigatorConfig = {
  initialRouteName: 'Test',
  headerMode: 'none',
};


// Import all stores
import commonStore from './stores/commonStore';

// Global Store Provider Configuration
const stores = {
  commonStore
};
window._____APP_STATE_____ = stores;
useStrict(true);




const AppNavigator = createStackNavigator(RouteConfig, StackNavigatorConfig);

export default () =>
  <Provider {...stores}>
    <Root>
      <AppNavigator />
    </Root>
  </Provider>
