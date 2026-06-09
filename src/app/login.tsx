import React from 'react';
import { StyleSheet, View, Text, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  // Responsive values
  const isSmallDevice = height < 700;

  return (
    <View style={styles.container}>
      {/* 1. Base Background */}
      <Image 
        source={require('../../assets/images/background.png')} 
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />
      {/* Overlay to create the deep teal gradient look */}
      <View style={styles.overlay} />

      {/* 2. Seaweed and bubbles */}
      <Image 
        source={require('../../assets/images/taobien.png')} 
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* TOP SECTION: Shark */}
          <View style={styles.topSection}>
            <Image 
              source={require('../../assets/images/shark.png')} 
              style={styles.topShark}
              contentFit="contain"
            />
          </View>

          {/* BOTTOM SECTION: Panel */}
          <View style={styles.bottomSection}>
            <View style={[styles.panel, { width: width > 500 ? 400 : '88%' }]}>
              
              {/* Avatar overlapping panel */}
              <View style={styles.avatarWrapper}>
                <View style={styles.cyanSquare} />
                <Image 
                  source={require('../../assets/images/shark2.png')} 
                  style={styles.avatar}
                  contentFit="contain"
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable style={styles.loginButton} onPress={() => console.log('Login')}>
                  <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </Pressable>
                
                <Pressable style={styles.registerButton} onPress={() => console.log('Register')}>
                  <Text style={styles.registerButtonText}>Đăng kí</Text>
                </Pressable>
                
                <Pressable style={styles.helpButton} onPress={() => console.log('Help')}>
                  <Text style={styles.helpText}>cần hỗ trợ</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b5673',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 80, 108, 0.85)', // Teal overlay for exact color match
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    flex: 0.35, // 35% of the screen height
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topShark: {
    width: '75%', 
    height: '80%', 
    maxWidth: 280,
  },
  bottomSection: {
    flex: 0.65, // 65% of the screen height
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 50, // Ensures panel is pushed down slightly
  },
  panel: {
    backgroundColor: 'rgba(17, 72, 95, 0.95)', // Solid teal with slight transparency
    borderRadius: 35, 
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 85, // Space for avatar
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -75, // Pull it up so it overlaps the border
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    zIndex: 10,
  },
  cyanSquare: {
    position: 'absolute',
    width: 90,
    height: 90,
    backgroundColor: '#8ce2d9',
    top: 45,
    borderRadius: 6,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#1db2bc',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1db2bc',
    alignItems: 'center',
    marginBottom: 25,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  helpButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingBottom: 2,
  },
  helpText: {
    color: '#ffffff',
    fontSize: 15,
  },
});
