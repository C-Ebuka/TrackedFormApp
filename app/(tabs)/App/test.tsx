import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { View, Text, StyleSheet } from 'react-native';

interface Item {
  // Define the structure of your item here
  // For example:
  name: string;
  age: number;
}

const MyComponent = () => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const dataCollection = collection(db, 'your_collection_name');
        const querySnapshot = await getDocs(dataCollection);

        const fetchedData: Item[] = [];
        querySnapshot.forEach((doc) => {
          // Assuming each document has a structure like { name: string, age: number }
          fetchedData.push(doc.data() as Item);
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Retrieved Data:</Text>
      <View style={styles.listContainer}>
        {data.map((item, index) => (
          <Text style={styles.listItem} key={index}>{JSON.stringify(item)}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MyComponent;
