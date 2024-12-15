import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Contoh data pesanan
  const orders = [
    { id: 1, name: 'Pesanan #1', details: '10 kg Kol' },
    { id: 2, name: 'Pesanan #2', details: '5 kg Jagung' },
    { id: 3, name: 'Pesanan #3', details: '3 kg Kacang' },
    { id: 4, name: 'Pesanan #4', details: '7 kg Brokoli' },
    { id: 5, name: 'Pesanan #5', details: '3 kg Cabe' },
    { id: 6, name: 'Pesanan #6', details: '6 kg Kubis' },
    { id: 7, name: 'Pesanan #7', details: '3 kg Terong' },
  ];

  // Contoh data grafik
  const salesData = [
    { day: 'Senin', sales: 200 },
    { day: 'Selasa', sales: 300 },
    { day: 'Rabu', sales: 250 },
    { day: 'Kamis', sales: 400 },
    { day: 'Jumat', sales: 350 },
  ];

  // Contoh data notifikasi
  const notifications = [
    'Update terbaru: Harga Jagung naik 10%.',
    'Tips: Pastikan stok produk selalu tersedia.',
    'Peringatan: Cuaca buruk diprediksi minggu depan.',
  ];

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  // Fungsi untuk menghitung tinggi batang berdasarkan data
  const calculateBarHeight = (sales) => {
    const maxSales = Math.max(...salesData.map((data) => data.sales));
    return (sales / maxSales) * 200; // Tinggi maksimum grafik 200
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Halo, Petani Cerdas! 👩‍🌾</Text>
      </View>

      {/* Quick Summary */}
      <View style={styles.quickSummary}>
        <Text style={styles.quickSummaryText}>Pesanan Cepat:</Text>
        <Text style={styles.quickSummaryText}>7 Pesanan Baru 🎉</Text>
        <TouchableOpacity
          style={styles.quickSummaryButton}
          onPress={() => openModal('orders')}
        >
          <Text style={styles.quickSummaryButtonText}>Lihat Pesanan</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Grafik Penjualan Mingguan 📈</Text>
        <Text style={styles.chartDescription}>
          Penjualan Anda meningkat 20% dibandingkan minggu lalu!
        </Text>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => openModal('sales')}
        >
          <Text style={styles.detailButtonText}>Detail Penjualan</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Section */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>Notifikasi Penting 🛎️</Text>
        {notifications.map((note, index) => (
          <Text key={index} style={styles.notificationText}>
            {index + 1}. {note}
          </Text>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {modalType === 'orders' && (
              <View>
                <Text style={styles.modalTitle}>Data Pesanan</Text>
                {orders.map((order) => (
                  <Text key={order.id} style={styles.modalText}>
                    {order.name}: {order.details}
                  </Text>
                ))}
              </View>
            )}
            {modalType === 'sales' && (
              <View>
                <Text style={styles.modalTitle}>Grafik Penjualan</Text>
                <View style={styles.barChart}>
                  {salesData.map((data, index) => (
                    <View key={index} style={styles.barContainer}>
                      <View
                        style={[
                          styles.bar,
                          { height: calculateBarHeight(data.sales) },
                        ]}
                      />
                      <Text style={styles.barLabel}>{data.day}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f6ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b7bec',
  },
  quickSummary: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  quickSummaryText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  quickSummaryButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#00cec9',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  quickSummaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d98da',
    marginBottom: 15,
  },
  chartDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  detailButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationContainer: {
    marginBottom: 20,
    backgroundColor: '#fff8e1',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b7bec',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 200,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f7f9fb',
    padding: 10,
    borderRadius: 10,
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 20,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#eb4d4b',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
