import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';
const LANGUAGES = [
  {code: 'en', label: 'English', isRtl: false},
  {code: 'fr', label: 'Français', isRtl: false},
  {code: 'fa', label: 'فارسی', isRtl: true},
];

const Selector = () => {
  const [loading, setLoading] = useState();
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;
  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  // const changeRtl = isRtl => {
  //   I18nManager.forceRTL(isRtl);
  // };

  const changeRtl = async isRtl => {
    //changing language based on what was chosen
    if (isRtl) {
      if (!I18nManager.isRTL) {
        await I18nManager.forceRTL(true);
      }
    } else {
      if (I18nManager.isRTL) {
        await I18nManager.forceRTL(false);
      }
    }

    if (I18nManager.isRTL !== isRtl) {
      RNRestart.Restart();
      setLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{t('common:languageSelector')}</Text>
          <Ionicons color="#444" size={28} name="ios-language-outline" />
        </View>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => {
                setLanguage(language.code);
                changeRtl(language.isRtl);
              }}>
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {language.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={'#ffff'} size={'large'} />
          <Text style={[styles.text, {color: '#fff'}]}>
            در حال اعمال تغییرات
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});

export default Selector;
