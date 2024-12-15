import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faCarrot, faPenToSquare, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Listdata from './Listdata';
import Editdata from './Editdata';
import Order from './Order';
import Profile from './Profile';

function HomeScreen() {
  return <Home />;
}

function SettingsScreen() {
  return <Listdata />;
}

function EditScreen() {
  return <Editdata />;
}

function OrderScreen() {
  return <Order />;
}

function ProfileScreen() {
  return <Profile />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'green', // Ganti warna tab yang aktif menjadi hijau
          tabBarInactiveTintColor: 'gray', // Warna tab yang tidak aktif (opsional)
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouse} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Produk Saya"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCarrot} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faPenToSquare} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Pesanan"
          component={OrderScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faCartShopping} color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} size={20} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
