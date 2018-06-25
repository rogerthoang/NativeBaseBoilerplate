import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import { inject, observer } from 'mobx-react';


@inject('commonStore')
@observer
class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { usStates } = this.props.commonStore;

    return (
      <Container>
        <Button>
          <Text>Click Me! </Text>
        </Button>
        <Text> {usStates[6]["name"]}</Text>
        <Text> This is a test page !</Text>
      </Container>
    );
  }
}

export default Test;
