import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// Data contoh
const orders = [
  {
    id: 'ORD12345',
    buyerName: 'Budi Hartono',
    date: '15 Desember 2024',
    time: '10:30',
    products: [
      { name: 'Tomat', quantity: 10, price: 5000 },
      { name: 'Wortel', quantity: 5, price: 4000 },
    ],
    total: 10 * 5000 + 5 * 4000, // 50000 + 20000 = 70000
    status: 'Selesai',
  },
  {
    id: 'ORD12346',
    buyerName: 'Siti Aminah',
    date: '16 Desember 2024',
    time: '14:15',
    products: [
      { name: 'Bayam', quantity: 10, price: 3000 },
      { name: 'Brokoli', quantity: 5, price: 6000 },
    ],
    total: 10 * 3000 + 5 * 6000, // 30000 + 30000 = 60000
    status: 'Diproses',
  },
  {
    id: 'ORD12347',
    buyerName: 'Henfi Yuni',
    date: '17 Desember 2024',
    time: '10:25',
    products: [
      { name: 'Kubis', quantity: 8, price: 3500 },
      { name: 'Kangkung', quantity: 12, price: 2500 },
    ],
    total: 8 * 3500 + 12 * 2500, // 28000 + 30000 = 58000
    status: 'Menunggu Konfirmasi',
  },
  {
    id: 'ORD12348',
    buyerName: 'Agus Santoso',
    date: '18 Desember 2024',
    time: '09:10',
    products: [
      { name: 'Terong', quantity: 10, price: 4000 },
      { name: 'Kol', quantity: 15, price: 3000 },
    ],
    total: 10 * 4000 + 15 * 3000, // 40000 + 45000 = 85000
    status: 'Selesai',
  },
  {
    id: 'ORD12349',
    buyerName: 'Lina Kartika',
    date: '18 Desember 2024',
    time: '11:40',
    products: [
      { name: 'Cabe', quantity: 20, price: 2500 },
      { name: 'Jagung', quantity: 10, price: 2000 },
    ],
    total: 20 * 2500 + 10 * 2000, // 50000 + 20000 = 70000
    status: 'Diproses',
  },
  {
    id: 'ORD12350',
    buyerName: 'Tina Marwiyah',
    date: '19 Desember 2024',
    time: '13:00',
    products: [
      { name: 'Tomat', quantity: 15, price: 5000 },
      { name: 'Brokoli', quantity: 5, price: 6000 },
    ],
    total: 15 * 5000 + 5 * 6000, // 75000 + 30000 = 105000
    status: 'Selesai',
  },
  {
    id: 'ORD12351',
    buyerName: 'Joko Susanto',
    date: '20 Desember 2024',
    time: '15:30',
    products: [
      { name: 'Bayam', quantity: 10, price: 3000 },
      { name: 'Kubis', quantity: 8, price: 3500 },
    ],
    total: 10 * 3000 + 8 * 3500, // 30000 + 28000 = 58000
    status: 'Menunggu Konfirmasi',
  },
  {
    id: 'ORD12352',
    buyerName: 'Dina Wati',
    date: '21 Desember 2024',
    time: '08:45',
    products: [
      { name: 'Kangkung', quantity: 10, price: 2500 },
      { name: 'Terong', quantity: 15, price: 4000 },
    ],
    total: 10 * 2500 + 15 * 4000, // 25000 + 60000 = 85000
    status: 'Selesai',
  },
  {
    id: 'ORD12353',
    buyerName: 'Zulfa Rahmawati',
    date: '22 Desember 2024',
    time: '16:20',
    products: [
      { name: 'Kol', quantity: 12, price: 3000 },
      { name: 'Cabe', quantity: 10, price: 2500 },
    ],
    total: 12 * 3000 + 10 * 2500, // 36000 + 25000 = 61000
    status: 'Diproses',
  },
  {
    id: 'ORD12354',
    buyerName: 'Fajar Prasetyo',
    date: '23 Desember 2024',
    time: '12:00',
    products: [
      { name: 'Jagung', quantity: 20, price: 2000 },
      { name: 'Tomat', quantity: 15, price: 5000 },
    ],
    total: 20 * 2000 + 15 * 5000, // 40000 + 75000 = 115000
    status: 'Selesai',
  },
];


// Komponen Daftar Pesanan
const OrderListScreen = ({ onOrderSelect }) => {
  const [search, setSearch] = useState('');

  // Filter data berdasarkan input pencarian
  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(search) || order.buyerName.toLowerCase().includes(search.toLowerCase())
  );

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => onOrderSelect(item)} // Pass the selected order to parent
    >
      <Text style={styles.orderId}>Pesanan: {item.id}</Text>
      <Text style={styles.buyerName}>Pembeli: {item.buyerName}</Text>
      <Text style={styles.orderDate}>Tanggal: {item.date} {item.time}</Text>
      <Text style={styles.total}>Total: Rp {item.total.toLocaleString()}</Text>
      <View style={[styles.statusBadge, styles[item.status.replace(/\s/g, '')]]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari pesanan..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList data={filteredOrders} keyExtractor={(item) => item.id} renderItem={renderOrder} />
    </View>
  );
};

// Komponen Detail Pesanan
const OrderDetailScreen = ({ order, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
      <Text style={styles.detailTitle}>Detail Pesanan</Text>
      <View style={styles.orderDetailCard}>
        <Text style={styles.orderDetail}>Nomor Pesanan: {order.id}</Text>
        <Text style={styles.orderDetail}>Pembeli: {order.buyerName}</Text>
        <Text style={styles.orderDetail}>Tanggal Pesanan: {order.date} {order.time}</Text>
        <Text style={styles.orderDetail}>Status: {order.status}</Text>
      </View>

      <Text style={styles.detailSubTitle}>Produk yang Dipesan:</Text>
      <FlatList
        data={order.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetail}>
              {item.quantity} x Rp {item.price.toLocaleString()} = Rp {(item.quantity * item.price).toLocaleString()}
            </Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: Rp {order.total.toLocaleString()}</Text>
    </View>
  );
};

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null); // Kembali ke daftar pesanan
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedOrder ? (
        <OrderDetailScreen order={selectedOrder} onBack={handleBackToList} />
      ) : (
        <OrderListScreen onOrderSelect={handleOrderSelect} />
      )}
    </View>
  );
}

// Gaya CSS untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buyerName: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statusBadge: {
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  MenungguKonfirmasi: {
    backgroundColor: '#FFC107',
  },
  Diproses: {
    backgroundColor: '#007BFF',
  },
  Selesai: {
    backgroundColor: '#28A745',
  },
  backButton: {
    padding: 12,
    backgroundColor: '#DDD',
    borderRadius: 6,
    marginBottom: 20,
  },
  backText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  orderDetailCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  orderDetail: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  detailSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});
