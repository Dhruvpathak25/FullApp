import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({
  onSearch,
  onFilterPress,
  placeholder,
  showFilterIcon = true,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <Icon
        name="search"
        size={20}
        color="#9b9b9b"
        style={styles.icon}
        onPress={handleSearch}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9b9b9b"
        value={query}
        onChangeText={text => {
          setQuery(text);
          onSearch(text);
        }}
      />
      {showFilterIcon && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterIcon}>
          <Icon name="filter" size={20} color="#9b9b9b" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbf5',
    borderRadius: 8,
    margin: 8,
    paddingHorizontal: 12,
    borderColor: '#674188',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: '#9b9b9b',
    fontSize: 19,
  },
  icon: {
    marginHorizontal: 8,
  },
  filterIcon: {
    marginLeft: 8,
  },
});

export default SearchBar;
