import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const YourComponent = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://uatapi.scrapc.com/post/get-post-list',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              page: '1',
              type: 'web',
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Post Data:', JSON.stringify(data));
        setPostData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Post Data:</Text>
      <Text>{JSON.stringify(postData, null, 2)}</Text>
    </View>
  );
};

export default YourComponent;
