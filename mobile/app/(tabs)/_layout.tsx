import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#D97706', headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerTitle: '⚖️ Aequitas Zone',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="credit-card" color={color} />,
          headerTitle: '$REPAR Wallet',
        }}
      />
      <Tabs.Screen
        name="governance"
        options={{
          title: 'Governance',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gavel" color={color} />,
          headerTitle: 'Governance',
        }}
      />
      <Tabs.Screen
        name="node"
        options={{
          title: 'Node',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="server" color={color} />,
          headerTitle: 'My Sovereign Node',
        }}
      />
      <Tabs.Screen
        name="claims"
        options={{
          title: 'Claims',
          tabBarIcon: ({ color}) => <FontAwesome size={28} name="file-text" color={color} />,
          headerTitle: 'File Claim',
        }}
      />
    </Tabs>
  );
}
