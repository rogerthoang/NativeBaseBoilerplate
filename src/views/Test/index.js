import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Button, Text, Header, Body, Title } from "native-base";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { inject, observer } from "mobx-react";

@inject("commonStore")
@observer
class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { usStates } = this.props.commonStore;

    return (
        <Container style={styles.header}>
          <Header>
            <Body>
              <Title>Test Page</Title>
            </Body>
          </Header>
          <Button>
            <Text>Click Me!</Text>
          </Button>
          <Text> {usStates[34]["name"]}</Text>
          <Text> {usStates[35]["name"]}</Text>
          <Text> {usStates[36]["name"]}</Text>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight()
  }
});

export default Test;
