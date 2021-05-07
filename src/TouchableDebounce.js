import React, {PureComponent, TouchableOpacity } from "react";
import { debounce } from "lodash";
import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

//PureComponent handles shouldComponentUpdate for you.
class TouchableDebounce extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  handlePress = () => {
    const { onPress, debounceTime, handleFirstTap } = this.props;
    debounce(onPress, debounceTime, handleFirstTap);
  };
  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.handlePress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
TouchableDebounce.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  handleFirstTap: PropTypes.bool,
  debounceTime: PropTypes.number,
};
TouchableDebounce.defaultProps = {
  style: {},
  handleFirstTap: true,
  debounceTime: 750,
};
export default TouchableDebounce;
