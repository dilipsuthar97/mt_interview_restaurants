import React from 'react';
import TouchableOpacity from '_components/atoms/TouchableOpacity';
import Text from '_components/atoms/Text';
import {colors, fontSizes, scale} from '_theme';

const NavLink = ({
  label,
  onPress,
  fontSize,
  color,
  textDecorationColor,
  textDecorationType,
  textAlign,
  fontWeight,
  style,
  font,
}) => {
  return (
    <TouchableOpacity
      delayPressIn={0}
      onPress={onPress}
      activeOpacity={0.5}
      style={style}>
      <Text
        style={{
          fontSize,
          color,
          textDecorationLine: textDecorationType,
          textDecorationColor,
          textAlign,
          fontWeight,
        }}
        font={font}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

NavLink.defaultProps = {
  fontSize: fontSizes.FONT15,
  color: colors.black,
  textDecorationType: 'underline',
  textDecorationColor: colors.black,
  textAlign: 'center',
};
export default NavLink;
