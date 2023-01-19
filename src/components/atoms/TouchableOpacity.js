import React from 'react';
import {TouchableOpacity as BaseTouchableOpacity} from 'react-native';
import {Tools} from '_utils';

const TouchableOpacity = props => {
  return (
    <BaseTouchableOpacity activeOpacity={0.5} {...props}>
      {props.children}
    </BaseTouchableOpacity>
  );
};

TouchableOpacity.defaultProps = {
  hitSlop: Tools.getHitSlop(10),
};
export default TouchableOpacity;
