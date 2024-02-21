import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import SearchBar from '../components/SearchBar';
const FiltersTab = ({isVisible, onClose, onApply, onReset}) => {
  const [selectedMenu, setSelectedMenu] = useState('Category');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const categoryOptions = {
    Category: ['Plastic', 'Metal', 'Wood', 'Paper', 'Fabric', 'Machinery'],
    'Sub-Category': [
      'Iron',
      'Steel',
      'Aluminum',
      'Copper',
      'Brass',
      'Plastic packaging',
      'Bottles',
    ],
    Condition: [
      'Baled',
      'Condition',
      'Fiber',
      'Film',
      'Flake',
      'Loose',
      'Lump',
    ],
    Country: [
      'Egypt',
      'Australia',
      'India',
      'United status',
      'United kingdom',
      'Japan',
      'Shri Lanka',
    ],
  };

  const handleCheckboxChange = (option, category) => {
    console.log('🚀 ~ handleCheckboxChange ~ category:', category);
    console.log('🚀 ~ handleCheckboxChange ~ option:', option);
    switch (category) {
      case 'Category':
        setSelectedCategory(prev => toggleSelected(prev, option));
        break;
      case 'Sub-Category':
        setSelectedSubCategory(prev => toggleSelected(prev, option));
        break;
      case 'Condition':
        setSelectedCondition(prev => toggleSelected(prev, option));
        break;
      case 'Country':
        setSelectedCountry(prev => toggleSelected(prev, option));
        break;
      default:
        break;
    }
  };

  const toggleSelected = (selectedArray, option) => {
    if (selectedArray.includes(option)) {
      return selectedArray.filter(item => item !== option);
    } else {
      return [...selectedArray, option];
    }
  };

  const renderCategoryOptions = () => {
    const options = categoryOptions[selectedMenu] || [];
    return options.map((option, index) => (
      <View key={`${selectedMenu}_${index}`} style={styles.checkboxItem}>
        <CheckBox
          value={getSelectedState(selectedMenu).includes(option)}
          onValueChange={() => handleCheckboxChange(option, selectedMenu)}
          boxType="square"
          style={{marginRight: 5}}
        />
        <Text style={{fontSize: 16}}>{option}</Text>
      </View>
    ));
  };

  const getSelectedState = category => {
    switch (category) {
      case 'Category':
        return selectedCategory;
      case 'Sub-Category':
        return selectedSubCategory;
      case 'Condition':
        return selectedCondition;
      case 'Country':
        return selectedCountry;
      default:
        return [];
    }
  };

  const handleMenuPress = menu => {
    setSelectedMenu(menu);
  };

  const applyFilters = () => {
    onApply(selectedMenu, {
      category: selectedCategory,
      sub_category: selectedSubCategory,
      condition: selectedCondition,
      country: selectedCountry,
    });
    onClose();
  };

  const resetFilters = () => {
    setSelectedCategory([]);
    setSelectedSubCategory([]);
    setSelectedCondition([]);
    setSelectedCountry([]);
    onReset();
    onClose();
  };
  //   const closeModal = () => {
  //     onClose(); // This will close the modal
  //   };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
        </View>

        <View style={styles.content}>
          <ScrollView style={styles.menuContainer}>
            {Object.keys(categoryOptions).map((menu, index) => {
              return (
                <TouchableOpacity
                  key={`${menu}_${index}`}
                  style={[
                    styles.menuItem,
                    menu === selectedMenu && {backgroundColor: '#674188'},
                  ]}
                  onPress={() => handleMenuPress(menu)}>
                  <Text
                    style={[
                      styles.menuTitle,
                      menu === selectedMenu && {color: '#fff'},
                    ]}>
                    {menu}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <ScrollView style={styles.checkboxContainer}>
            <Text style={styles.selectedMenuText}>{selectedMenu}</Text>
            <SearchBar placeholder="search..." showFilterIcon={false} />
            {renderCategoryOptions()}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
            <Text style={styles.applybuttonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
            <Text style={styles.restbuttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,

    backgroundColor: '#FFFBF5',
  },
  header: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  title: {
    fontSize: 22,

    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  menuContainer: {
    backgroundColor: '#F7EFE5',
    width: '34%',
    marginRight: 10,
    flexGrow: 0,
    paddingBottom: 10,
    fontFamily: 'Raleway',
    fontWeight: '100',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 10,
    height: '89%',
  },
  menuItem: {
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  checkboxContainer: {
    flex: 1,
    width: '65%',
    marginRight: 10,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
  },

  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    position: 'absolute',
    bottom: 25,
    paddingHorizontal: 20,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#674188',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FFFBF5',
    textColor: '#674188',
    borderBlockColor: '#674188',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },

  selectedMenuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#674188',
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 5,
  },
  applybuttonText: {
    color: '#FFFBF5',
    fontSize: 16,
    fontFamily: 'Raleway',
    fontWeight: 'semibold',
  },
  restbuttonText: {
    color: '#674188',
    fontSize: 16,
    fontFamily: 'Raleway',
    fontWeight: 'semibold',
  },
});

export default FiltersTab;
