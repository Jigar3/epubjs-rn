var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _react=_interopRequireWildcard(require("react"));var _lodash=require("lodash");var _reactNative=require("react-native");var _propTypes=_interopRequireDefault(require("prop-types"));var _jsxFileName="/Users/jigar.chavada/Jigar/personal/jigar-epubjs-rn/epubjs-rn/src/TouchableDebounce.js";var TouchableDebounce=function(_React$PureComponent){(0,_inherits2.default)(TouchableDebounce,_React$PureComponent);function TouchableDebounce(props){var _this;(0,_classCallCheck2.default)(this,TouchableDebounce);_this=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(TouchableDebounce).call(this,props));_this.handlePress=function(){var _this$props=_this.props,onPress=_this$props.onPress,debounceTime=_this$props.debounceTime,handleFirstTap=_this$props.handleFirstTap;(0,_lodash.debounce)(onPress,debounceTime,handleFirstTap);};return _this;}(0,_createClass2.default)(TouchableDebounce,[{key:"render",value:function render(){return _react.default.createElement(_react.TouchableOpacity,(0,_extends2.default)({},this.props,{onPress:this.handlePress,__self:this,__source:{fileName:_jsxFileName,lineNumber:17}}),this.props.children);}}]);return TouchableDebounce;}(_react.default.PureComponent);TouchableDebounce.propTypes={onPress:_propTypes.default.func.isRequired,style:_reactNative.ViewPropTypes.style,handleFirstTap:_propTypes.default.bool,debounceTime:_propTypes.default.number};TouchableDebounce.defaultProps={style:{},handleFirstTap:true,debounceTime:750};var _default=TouchableDebounce;exports.default=_default;