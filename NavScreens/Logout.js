import * as React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Colors, Button, withTheme, Paragraph, Portal, Dialog } from 'react-native-paper';
import type { Theme } from 'react-native-paper/types';

const DialogWithCustomColors = ({navigation, close, visible}) => {
  _cancel = () => {
    close()
    navigation.navigate('Welcome')
  }
  _logout = () => {
    AsyncStorage.removeItem('response.id_token', (err, result) => {
        navigation.navigate('Welcome')
    })
  }

  return (
  <Portal>
    <Dialog
      onDismiss={close}
      style={{ backgroundColor: Colors.purple900 }}
      visible={visible}
    >
      <Dialog.Title style={{ color: Colors.white }}>Alert</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={{ color: Colors.white }}>
          This is a dialog with custom colors
        </Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button color={Colors.white} onPress={_cancel}>
          Cancel
        </Button>
        <Button color={Colors.white} onPress={_logout}>
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  )
};

type State = {
  visible5: boolean,
};

type Props = {
  theme: Theme,
};

class Logout extends React.Component<Props, State> {
  static title = 'Dialog';

  state = {
    visible5: true
  };

  _openDialog5 = () => this.setState({ visible5: true });

  _closeDialog5 = () => this.setState({ visible5: false });

  render() {
    console.log("class component", this.props)
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    const { visible1, visible2, visible3, visible4, visible5 } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <DialogWithCustomColors visible={visible5} close={this._closeDialog5} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    padding: 16,
  },
});

export default withTheme(Logout);