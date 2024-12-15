import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faLeaf, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';

const Createdata = () => {
  const jsonUrl = 'http://172.20.10.6:3000/sayur';  // URL API data sayuran
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedVegetable, setSelectedVegetable] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [dataVegetable, setDataVegetable] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(jsonUrl);
      const json = await response.json();
      setDataVegetable(json);  // Menyimpan data sayuran
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectItem = (item) => {
    setSelectedVegetable(item);
    setName(item.name);
    setStock(item.stock.toString());
    setPrice(item.price.toString());
    setDescription(item.description);
  };

  const submit = async () => {
    if (!name || !stock || !price || !description) {
      alert('Semua field harus diisi!');
      return;
    }

    const data = { name, stock: parseInt(stock), price: parseFloat(price), description };
    try {
      const response = await fetch(`http://172.20.10.6:3000/sayur/${selectedVegetable.id}`, {
        method: 'PATCH',  // Menggunakan PATCH untuk update parsial
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      alert('Data sayuran tersimpan');
      resetForm();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setStock('');
    setPrice('');
    setDescription('');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Edit Produk</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Nama Sayuran"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Stok Sayuran"
                  value={stock}
                  onChangeText={setStock}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Harga Sayuran"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Deskripsi Sayuran"
                  value={description}
                  onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.button} onPress={submit}>
                  <Text style={styles.buttonText}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={dataVegetable}
          onRefresh={fetchData}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => selectItem(item)}>
              <View style={styles.avatar}>
                {/* Menampilkan gambar jika ada */}
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                ) : (
                  <FontAwesomeIcon icon={faSeedling} size={45} color="#4CAF50" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardtitle}>{item.name}</Text>
                <Text>Stok: {item.stock}</Text>
                <Text>Harga: Rp {item.price}</Text>
              </View>
              <FontAwesomeIcon icon={faPenToSquare} size={20} color="black" />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
    marginVertical: 7,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
