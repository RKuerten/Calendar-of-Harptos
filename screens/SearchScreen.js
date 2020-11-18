import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

import { years } from "../data/Years";
import { ListItem, Searchbar } from "../components";
import Colors from "../constants/Colors";
import Theme from "../utils/Theme";

/**
 * Search year by name or value.
 *
 * Allows the user to search within the named years (the Roll of the Years)
 * through their name (doesn't need to match) or value (e.g. 1385). If the user
 * selects one of the listed years, they are redirected to the Calendar screen
 * with that year as the index.
 */
export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** The list of years in display. Starts with first 50 years of the named year database. */
      data: [...years.slice(0, 50)],
      /** Number of currently loaded years in display. */
      loaded: 50,
      /** Value of the Search bar input. */
      text: "",
    };
    /** React reference of the FlatList component. */
    this.flatRef = null;
  }

  /**
   * Clears the Search bar input.
   *
   * Clears the Search bar input, resets the data array to its initial state,
   * and scrolls the FlatList to the top.
   */
  _handleClearText = () => {
    this.setState({ data: [...years.slice(0, 50)], text: "" });
    this.flatRef.scrollToOffset({ animated: true, offset: 0 });
  };

  /**
   * Handles the loading of the FlatList data.
   *
   * Loads the next 50 entries of the named years database if the Search bar input is empty.
   */
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

  /**
   * Handles the user's press interaction on an item of the FlatList.
   *
   * Redirects the user to the Calendar screen with the tapped item (year) as a route parameter.
   */
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

  /**
   * Handles the Search bar input.
   *
   * Filters the year database based on the user's input.
   */
  _handleSearch = (text) => {
    this.setState({ text });
    let searchText = text.toLowerCase().trim();

    if (
      (searchText.toLowerCase() !== "the" ||
        searchText.toLowerCase() !== "or" ||
        searchText.toLowerCase() !== "year") &&
      searchText.length > 1
    ) {
      let newData = years.filter((year) => {
        if (
          year.name.toLowerCase().includes(searchText) ||
          year.year === searchText
        ) {
          return year;
        }
      });
      this.setState({ data: newData, loaded: 50 });
    } else if (searchText.length === 0) {
      this.setState({ data: [...years.slice(0, 50)], loaded: 50 });
    }
  };

  /**
   * Handles the FAB (floating action button).
   *
   * Scrolls to the top of the FlatList. If the Search bar input is empty,
   * resets the data array to its initial state, otherwise, simply scrolls to the top.
   */
  _handleScrollToTop = () => {
    let { text } = this.state;
    if (text.length === 0) {
      this.setState({ data: [...years.slice(0, 50)], loaded: 50 });
    }
    this.flatRef.scrollToOffset({ animated: true, offset: 0 });
  };

  /**
   * Renders the footer of the FlatList.
   *
   * Renders a loading spinner if the Search bar input is empty, otherwise renders a simple separator view.
   */
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
    let { data, text } = this.state;
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
              textLength={text.length}
            />
          )}
          showsVerticalScrollIndicator={false}
          windowSize={41}
        />
        <FAB
          accessibilityLabel="Scroll to Top"
          icon="arrow-up"
          onPress={() => this._handleScrollToTop()}
          style={styles.fab}
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
