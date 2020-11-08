import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "native-base";
import { Modal, Portal } from "react-native-paper";

import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

const window = Dimensions.get("window");

export default class Drawer extends React.Component {
  render() {
    let { onDismiss, navigation, visible } = this.props;
    let index = navigation.canGoBack();

    return (
      <Portal>
        <Modal
          onDismiss={onDismiss}
          contentContainerStyle={styles.modalWrapper}
          visible={visible}
        >
          <View>
            {Platform.OS === "ios" && index && (
              <TouchableOpacity
                style={styles.configItem}
                onPress={() => {
                  onDismiss();
                  navigation.goBack();
                }}
              >
                <Icon
                  style={styles.configIcon}
                  type="MaterialIcons"
                  name="arrow-back"
                />
                <Text style={styles.configText}>Voltar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.configItem}
              onPress={() => {
                onDismiss();
                navigation.navigate("Config");
              }}
            >
              <Icon style={styles.configIcon} type="FontAwesome5" name="cog" />
              <Text style={styles.configText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.configItem}
              onPress={() => {
                onDismiss();
                navigation.navigate("LeaveApp", { type: "logout" });
              }}
            >
              <Icon
                style={styles.configIcon}
                type="MaterialIcons"
                name="close"
              />
              <Text style={styles.configText}>Sair da Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.configItem}
              onPress={() => {
                onDismiss();
                navigation.navigate("Report");
              }}
            >
              <Icon
                style={styles.configIcon}
                type="MaterialIcons"
                name="error"
              />
              <Text style={styles.configText}>Denunciar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    );
  }
}

Drawer.defaultProps = {
  onDismiss: () => {},
  visible: false,
};

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: Colors.white,
    height: window.height,
    marginRight: Theme.relativeWidth(30),
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  configItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: Colors.input,
    borderBottomWidth: 1,
  },
  configIcon: {
    flex: 0.15,
    color: Colors.tintColor,
    fontSize: 22,
  },
  configText: {
    flex: 0.85,
    color: Colors.black,
    fontSize: 15,
    lineHeight: 22,
  },
});
