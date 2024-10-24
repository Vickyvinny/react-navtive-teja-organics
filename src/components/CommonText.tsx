import React, {Component} from 'react';
import {Text} from 'react-native';

interface IProps {
  text: string;
  color: string;
  fontSize: number;
  align: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontFamily?: string;
  noOfLines?:number
}

class CommonText extends Component<IProps> {
  render() {
    const {text, color, fontSize, align, fontFamily,noOfLines} = this.props;
    return (
      <Text numberOfLines={noOfLines} style={[{color, fontSize, textAlign: align, fontFamily}]}>
        {text}
      </Text>
    );
  }
}

export default CommonText;
