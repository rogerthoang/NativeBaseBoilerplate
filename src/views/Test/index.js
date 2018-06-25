import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';

class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Button>
          <Text>Click Me! </Text>
        </Button>
      </Container>
    );
  }
}

export default Test;
