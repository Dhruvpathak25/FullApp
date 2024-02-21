import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text, Button} from 'react-native';
import Card from '../components/Card';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import FiltersTab from '../components/FiltersTab';

const HomeTab = ({navigation}) => {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    sub_category: [],
    condition: [],
    country: [],
  });

  const [pageLoader, setPageLoader] = useState(false);
  useEffect(() => {
    fetchData(1, selectedFilters);
  }, []);

  const fetchData = (page, filter) => {
    console.log('🚀 ~ fetchData ~ page:', page);
    if (page > 1) {
      setLoading(true);
    } else {
      setPageLoader(true);
    }

    const data = {
      page: page,
      type: 'web',
      category_name: filter?.category,
      // sub_category_name: Array.isArray(selectedFilters.sub_category)
      //   ? selectedFilters.sub_category.join(',')
      //   : '',
      condition_name: filter?.condition,
      countries: filter?.country,
    };
    console.log('🚀 ~ fetchData ~ data:', data);

    axios
      .post('https://uatapi.scrapc.com/post/get-post-list', data)
      .then(function (response) {
        const newData = JSON.parse(response?.request?.response);
        console.log('🚀 ~ newData:', JSON.stringify(newData?.data?.postLists));
        if (newData?.status) {
          if (newData?.data?.postLists) {
            if (page === 1) {
              setPagination(newData?.data?.pagination);
              setData(newData?.data?.postLists);
              setOriginalData(newData.data.postLists);
            } else {
              setOriginalData(prevData => [
                ...prevData,
                ...newData.data.postLists,
              ]);
              setData(prevData => [...prevData, ...newData.data.postLists]);
            }
          }
        } else {
          setPagination({});
          setOriginalData([]);
          setData([]);
        }
        setPageLoader(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('API Error:', error);
        setLoading(false);
        setPageLoader(false);
      });
  };

  const handleSearch = query => {};

  const handleLoadMore = () => {
    if (pagination?.isMore) {
      fetchData(currentPage + 1, selectedFilters);
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilters = (selectedMenu, selectedOptions) => {
    console.log('🚀 ~ applyFilters ~ selectedOptions:', selectedOptions);
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [selectedMenu.toLowerCase()]: selectedOptions,
    }));
    fetchData(1, selectedOptions);
    closeFilterModal();
  };

  const resetFilters = () => {
    setSelectedFilters({
      category: [],
      sub_category: [],
      condition: [],
      country: [],
    });
    setCurrentPage(1);
    fetchData(1, {});
    closeFilterModal();
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 8}}>
      <SearchBar
        onSearch={handleSearch}
        onFilterPress={openFilterModal}
        placeholder="Search Post..."
      />

      {pageLoader ? (
        <ActivityIndicator />
      ) : data.length === 0 && !loading ? (
        <Text>No data available</Text>
      ) : (
        <>
          <FlatList
            style={{flexGrow: 1}}
            data={data}
            keyExtractor={(item, index) => `${item.id}_${item.name}_${index}`}
            numColumns={2}
            renderItem={({item}) => (
              <Card
                key={`${item.id}_${item.name}`}
                imageSource={item?.url + 'THUMB' + item?.image_name}
                img={item?.url + item?.image_name}
                title={item.name}
                price={item.unit_price ? String(item.unit_price) : ''}
                unit={item.unit_price ? String(item?.unit) : ''}
                buy={item.type === 'Buy'}
                sell={item.type === 'Sell'}
                isVerified={item.isVerified}
                countryCode={item?.country_code}
                currencySymbol={item?.currency_symbol}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loading && currentPage > 1 ? (
                <ActivityIndicator size="small" color="black" />
              ) : null
            }
          />
          <Button title="Load More" onPress={handleLoadMore} />
        </>
      )}
      <FiltersTab
        isVisible={isFilterModalVisible}
        onClose={closeFilterModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

export default HomeTab;
