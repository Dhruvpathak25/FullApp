import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text, Button} from 'react-native';
import Card from '../components/Card';
import axios from 'axios';

const HomeTab = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    setLoading(true);
    axios
      .post('https://uatapi.scrapc.com/post/get-post-list', {
        page: String(currentPage),
        type: 'web',
      })
      .then(function (response) {
        const newData = JSON.parse(response?.request?.response);
        console.log('Fetched Data:', newData);

        if (newData?.data?.postLists) {
          setData(prevData => [...prevData, ...newData.data.postLists]);
        }

        setLoading(false);
      })
      .catch(function (error) {
        console.log('API Error:', error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  if (loading && currentPage === 1) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 8}}>
      {data.length === 0 && !loading ? (
        <Text>No data available</Text>
      ) : (
        <>
          <FlatList
            style={{flexGrow: 1}}
            data={data}
            keyExtractor={(item, index) => `${index}`}
            numColumns={2}
            renderItem={({item}) => (
              <Card
                key={item.id}
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
    </View>
  );
};

export default HomeTab;
