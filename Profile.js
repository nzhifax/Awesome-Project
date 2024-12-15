import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

// Example farmer profile data
const farmerProfile = {
  name: 'Ahmad Prasetyo',
  phone: '081234567890',
  email: 'ahmad.p@gmail.com',
  location: 'Desa Sidomulyo, Yogyakarta',
  status: 'Aktif',
  profilePicture: require('./assets/x.jpg'), // Profile picture from assets
  farmingHistory: [
    { crop: 'Cabe', date: 'Januari 2024', result: 'Panen berhasil, 3 ton' },
    { crop: 'Jagung', date: 'Agustus 2024', result: 'Panen berhasil, 2 ton' },
  ],
};

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState(farmerProfile);

  // Toggle editing mode for profile and farming history
  const handleEdit = () => {
    setEditing(!editing);
  };

  // Save profile data (you can add logic to save to a database)
  const handleSave = () => {
    setEditing(false);
    // Logic to save profile changes (e.g., to a database or API)
  };

  // Handle input changes for profile and farming history
  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  // Handle changes in farming history
  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...profileData.farmingHistory];
    updatedHistory[index] = { ...updatedHistory[index], [field]: value };
    setProfileData({ ...profileData, farmingHistory: updatedHistory });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <Image source={profileData.profilePicture} style={styles.profilePicture} />

      {/* Farmer Name */}
      <Text style={styles.name}>{profileData.name}</Text>

      {/* Contact Info */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Nomor Telepon: {profileData.phone}</Text>
        <Text style={styles.contactText}>Email: {profileData.email}</Text>
      </View>

      {/* Location */}
      <Text style={styles.location}>Lokasi: {profileData.location}</Text>

      {/* Status */}
      <Text style={styles.status}>Status: <Text style={styles.statusActive}>{profileData.status}</Text></Text>

      {/* Farming History */}
      <View style={styles.farmingHistory}>
        <Text style={styles.historyTitle}>Riwayat Pertanian:</Text>
        {profileData.farmingHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            {editing ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={item.crop}
                  onChangeText={(text) => handleHistoryChange(index, 'crop', text)}
                  placeholder="Nama Tanaman"
                />
                <TextInput
                  style={styles.input}
                  value={item.date}
                  onChangeText={(text) => handleHistoryChange(index, 'date', text)}
                  placeholder="Tanggal Tanam"
                />
                <TextInput
                  style={styles.input}
                  value={item.result}
                  onChangeText={(text) => handleHistoryChange(index, 'result', text)}
                  placeholder="Hasil Panen"
                />
              </View>
            ) : (
              <View>
                <Text style={styles.historyText}>{item.crop} ({item.date})</Text>
                <Text style={styles.historyResult}>Hasil: {item.result}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
        <Text style={styles.editButtonText}>{editing ? 'Simpan' : 'Edit Profil'}</Text>
      </TouchableOpacity>

      {/* Profile Edit Form */}
      {editing && (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Edit Nama"
          />
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            placeholder="Edit Nomor Telepon"
          />
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Edit Email"
          />
          <TextInput
            style={styles.input}
            value={profileData.location}
            onChangeText={(text) => handleInputChange('location', text)}
            placeholder="Edit Lokasi"
          />
        </View>
      )}
    </ScrollView>
  );
};

// Styling for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  contactContainer: {
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto',
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
    fontFamily: 'Roboto',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    fontFamily: 'Poppins',
  },
  statusActive: {
    color: '#4CAF50',
  },
  farmingHistory: {
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  historyItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#555',
  },
  historyResult: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editForm: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontFamily: 'Roboto',
  },
  saveButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
