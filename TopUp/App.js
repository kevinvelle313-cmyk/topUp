import { useRef } from 'react';
import { Linking, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import topupHtml from './topupHtml';

// Origine fixe : localStorage (suivi des gains, préférences) persiste entre les lancements.
const BASE_URL = 'https://app.topup.local/';

export default function App() {
  const webRef = useRef(null);

  // Les liens « Ouvrir → » partent vers le navigateur du téléphone,
  // l'app elle-même reste sur la page TopUp.
  const handleRequest = (req) => {
    const url = req.url || '';
    if (url.startsWith(BASE_URL) || url === 'about:blank' || url.startsWith('data:')) return true;
    if (/^(https?|mailto|tel):/.test(url)) {
      Linking.openURL(url).catch(() => {});
      return false;
    }
    return true;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F6F1" />
        <View style={styles.root}>
          <WebView
            ref={webRef}
            originWhitelist={['*']}
            source={{ html: topupHtml, baseUrl: BASE_URL }}
            onShouldStartLoadWithRequest={handleRequest}
            setSupportMultipleWindows={false}
            domStorageEnabled
            javaScriptEnabled
            overScrollMode="never"
            style={styles.root}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#F8F6F1' } });
