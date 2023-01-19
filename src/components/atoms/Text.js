import React, {useMemo} from 'react';
import {StyleSheet, Text as BaseText} from 'react-native';
import Animated from 'react-native-reanimated';
import {colors, fonts} from '_theme';
const ReanimatedText = Animated.createAnimatedComponent(BaseText);

const Text = ({style, font, ...props}) => {
  const fontFamily = useMemo(() => {
    switch (font) {
      case 'bold':
        return fonts.bold;
      case 'boldItalic':
        return fonts.boldItalic;
      case 'italic':
        return fonts.italic;
      case 'medium':
        return fonts.medium;
      case 'mediumItalic':
        return fonts.mediumItalic;
      case 'regular':
        return fonts.regular;
      default:
        return fonts.regular;
    }
  }, [font]);

  return (
    <ReanimatedText style={[styles.text, {fontFamily}, style]} {...props}>
      {props.children}
    </ReanimatedText>
  );
};

Text.defaultProps = {
  font: 'regular',
};
export default Text;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
  },
});
