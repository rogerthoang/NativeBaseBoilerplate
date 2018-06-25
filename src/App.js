import React, { Component } from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';

/* importing all react views */
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

const AppNavigator = createStackNavigator(RouteConfig, StackNavigatorConfig);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
