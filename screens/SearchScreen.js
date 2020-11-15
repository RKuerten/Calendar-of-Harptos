import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

import { years } from "../data/Years";
import { ListItem, Searchbar } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      data: [...years.slice(0, 50)],
      loaded: 50,
      text: "",
    };
    this.flatRef = null;
  }

  _handleClearText = () => {
    this.setState({ changed: true, data: [...years.slice(0, 50)], text: "" });
    this.flatRef.scrollToOffset({ animated: true, offset: 0 });
  };

  _handleLoading = () => {
    let { data, loaded, text } = this.state;
    if (text.length === 0) {
      if (loaded <= 2297) {
        this.setState({
          data: [...data, ...years.slice(loaded, loaded + 50)],
          loaded: loaded + 50,
        });
      }
    }
  };

  _handleOnItemPress = (item, index) => {
    let { navigation } = this.props;
    let { text } = this.state;
    if (text.length === 0) {
      navigation.navigate("Calendar", { year: index });
    } else {
      let newIndex = years.findIndex((yearz) => yearz.year === item.year);
      navigation.navigate("Calendar", { year: newIndex });
    }
  };

  _handleSearch = (text) => {
    this.setState({ text });
    let newData = years.filter((year) => {
      if (
        year.name.toLowerCase().includes(text.toLowerCase()) ||
        year.year === text.trim()
      ) {
        return year;
      }
    });
    this.setState({ data: newData, loaded: 50 });
  };

  _handleScrollToTop = () => {
    let { text } = this.state;
    if (text.length === 0) {
      this.flatRef.scrollToOffset({ animated: true, offset: 0 });
      this.setState({ changed: false, data: [...years.slice(0, 50)], loaded: 50 });
    } else {
      this.flatRef.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  _renderFooter = () => {
    let { text, loaded } = this.state;
    if (loaded <= 2297 && text.trim().length === 0) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.dayBorder} size="large" />
        </View>
      );
    } else {
      return <View style={styles.separator} />;
    }
  };

  render() {
    let { changed, data, text } = this.state;
    const HEIGHT =
      Theme.responsiveFontSize(16) + Theme.responsiveFontSize(15) + 25;

    return (
      <View style={styles.container}>
        <Searchbar
          onChangeText={(text) => this._handleSearch(text)}
          onClearText={() => this._handleClearText()}
          value={text}
        />
        <FlatList
          ref={(ref) => (this.flatRef = ref)}
          data={data}
          getItemLayout={(data, index) => ({
            length: HEIGHT,
            offset: HEIGHT * index,
            index,
          })}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={20}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._handleLoading}
          onEndReachedThreshold={25}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              onPress={() => this._handleOnItemPress(item, index)}
              shouldUpdate={text.length > 0 || changed}
            />
          )}
          showsVerticalScrollIndicator={false}
          windowSize={41}
        />
        <FAB
          style={styles.fab}
          icon="arrow-up"
          onPress={() => this._handleScrollToTop()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: "100%",
  },
  searchBar: {
    borderBottomWidth: 1,
    borderColor: Colors.dayBorder,
    height: 65,
    elevation: 0,
    shadowOpacity: 0,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: Colors.dayBorder,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  loading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: Colors.dayBorder,
  },
});
