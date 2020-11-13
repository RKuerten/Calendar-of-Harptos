import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { FAB, Searchbar } from "react-native-paper";

import { years } from "../data/Years";
import { ListItem } from "../components";
import Colors from "../constants/Colors";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...years.slice(0, 50)],
      loaded: 50,
      text: "",
    };
    this.flatRef = null;
  }

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

  _handleSearch = (text) => {
    this.setState({ text });
  };

  _renderFooter = () => {
    let { data, loaded } = this.state;
    if (loaded <= 2297 || loaded < data.length) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.dayBorder} size="large" />
        </View>
      );
    } else {
      return <></>;
    }
  };

  render() {
    let { data, text } = this.state;
    let { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Search Year By Name"
          onChangeText={(text) => this._handleSearch(text)}
          style={styles.searchBar}
          value={text}
        />
        <FlatList
          ref={(ref) => (this.flatRef = ref)}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={20}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._handleLoading}
          onEndReachedThreshold={25}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => {
                console.log(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        <FAB
          style={styles.fab}
          icon="arrow-up"
          onPress={() =>
            this.flatRef.scrollToOffset({ animated: true, offset: 0 })
          }
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
    right: 16,
    bottom: 16,
  },
  loading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: Colors.dayBorder,
  },
});
