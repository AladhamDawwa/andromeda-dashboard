import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { OrderDetails } from "@/components";

const { height } = Dimensions.get("window");

const BottomSheet = ({
  visible,
  setVisible,
  selectedOrderCode,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  selectedOrderCode: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsMounted(false));
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  if (!isMounted) return null;
  return (
    <Modal transparent visible={isMounted} animationType="none">
      <TouchableOpacity
        style={styles.backdrop}
        onPress={handleClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={[styles.sheetContainer, { transform: [{ translateY }] }]}
          >
            <OrderDetails selectedOrderCode={selectedOrderCode} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: height * 0.9,
    zIndex: 101,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeText: {
    color: "blue",
    marginTop: 10,
  },
});

export default BottomSheet;
