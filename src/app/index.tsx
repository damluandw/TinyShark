import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handTranslateX = useSharedValue(0);
  const handTranslateY = useSharedValue(0);

  // Dùng useSharedValue thay cho useState để không làm re-render component khi chạm vào
  const isDragging = useSharedValue(0);

  useEffect(() => {
    // Hand animation to suggest dragging
    handTranslateX.value = withRepeat(
      withTiming(60, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
    handTranslateY.value = withRepeat(
      withTiming(30, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, []);

  const pan = Gesture.Pan()
    .onBegin(() => {
      // Chạy mượt mà trên UI thread, không gây re-render
      isDragging.value = withTiming(1, { duration: 200 });
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // Kéo vào khu vực dưới bên phải để qua màn hình sau
      if (event.absoluteX > width * 0.4 && event.absoluteY > height * 0.5) {
        runOnJS(router.push)("/login");
      } else {
        // Trả về vị trí cũ
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        isDragging.value = withTiming(0, { duration: 200 });
      }
    });

  const sharkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const fadeOutStyle = useAnimatedStyle(() => ({
    opacity: 1 - isDragging.value,
  }));

  const handAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - isDragging.value,
    transform: [
      { translateX: handTranslateX.value },
      { translateY: handTranslateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/background.png")}
        style={styles.background}
        contentFit="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Animated Text ẩn đi khi bắt đầu kéo */}
        <Animated.Text
          style={[styles.instructionText, fadeOutStyle]}
          pointerEvents="none"
        >
          Điều khiển cá mập{"\n"}bằng cách di chuyển{"\n"}ngón tay
        </Animated.Text>

        <View style={styles.interactiveArea}>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.sharkContainer, sharkAnimatedStyle]}>
              <Image
                source={require("../../assets/images/shark.png")}
                style={styles.shark}
                contentFit="contain"
                pointerEvents="none" // Bỏ qua bắt chạm của Image, để View bọc ngoài xử lý
              />
            </Animated.View>
          </GestureDetector>

          <Animated.View
            style={[styles.handContainer, handAnimatedStyle]}
            pointerEvents="none"
          >
            <Image
              source={require("../../assets/images/hand1.png")}
              style={styles.hand}
              contentFit="contain"
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a2342",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
    paddingTop: 100,
  },
  instructionText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    top: height * 0.15,
    width: "100%",
    zIndex: 10,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    lineHeight: 28,
  },
  interactiveArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 30,
  },
  sharkContainer: {
    zIndex: 5,
    width: 140, // Cố định kích thước để bắt chạm (touch) chính xác
    height: 90,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  shark: {
    width: "100%",
    height: "100%",
  },
  handContainer: {
    position: "absolute",
    left: 80,
    top: height * 0.45 + 50,
    zIndex: 10,
  },
  hand: {
    width: 60,
    height: 80,
  },
});
