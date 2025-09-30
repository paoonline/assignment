/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import QuizWithLeaderboard from './modules/QuizWithLeaderboard/QuizWithLeaderboard';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {

  return (
      <SafeAreaView style={styles.container}>
       <QuizWithLeaderboard/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
