import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Searchbar = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchDeals = useCallback(
    debounce((searchTerm) => props.searchDeals(searchTerm), 300), []
  );

  const handleChange = (term) => {
    setSearchTerm(term);
  };
  
  useEffect(() => {
    debouncedSearchDeals(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <TextInput 
        style={styles.input}
        placeholder="Search for deals"
        onChangeText={handleChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  }
});

Searchbar.propTypes = {
  searchDeals: PropTypes.func.isRequired,
};

export default Searchbar;
