import React, { useState, useEffect } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Listdata = () => {
  const jsonUrl = 'http://172.20.10.6:3000/sayur'; // URL API data sayuran
  const [isLoading, setLoading] = useState(true);
  const [vegetablesData, setVegetablesData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState(null);

  // Fetch data sayuran dari server
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setVegetablesData(json)) // Menyimpan data sayuran
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // Jalankan fetchData saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh halaman
  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  // Fungsi untuk melihat detail sayuran
  const viewDetail = (vegetable) => {
    setSelectedVegetable(vegetable);
    setIsModalVisible(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedVegetable(null);
  };

  // Render item data sayuran dalam grid
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      {/* Gambar sayuran */}
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => viewDetail(item)} // Melihat detail sayuran
        >
          <Text style={styles.buttonText}>Lihat Detail</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.cardTitle}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={vegetablesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Menampilkan dalam 2 kolom grid
          columnWrapperStyle={styles.columnWrapperStyle} // Menambah jarak antar kolom
          onRefresh={refreshPage}
          refreshing={refresh}
        />
      )}

      {/* Modal untuk menampilkan detail sayuran */}
      {selectedVegetable && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedVegetable.name}</Text>
              <Image source={{ uri: selectedVegetable.image }} style={styles.modalImage} />
              <Text style={styles.modalDescription}>{selectedVegetable.description}</Text>
              <Text style={styles.modalPrice}>Harga: Rp {selectedVegetable.price}</Text>
              <Text style={styles.modalStock}>Stok Tersedia: {selectedVegetable.stock}</Text> {/* Menampilkan stok sayuran */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    elevation: 2,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between', // Jarak antar kolom
  },
  buttonContainer: {
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: '#28a745', // Hijau button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  modalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  modalStock: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#dc3545', // Red close button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Listdata;
