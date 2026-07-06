import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, snapPoints = ['55%'] }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const points = useMemo(() => snapPoints, [snapPoints]);

    useImperativeHandle(ref, () => ({
      open() {
        bottomSheetRef.current?.present();
      },

      close() {
        bottomSheetRef.current?.dismiss();
      },
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={points}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.35}
          />
        )}
      >
        <BottomSheetView style={styles.content}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});