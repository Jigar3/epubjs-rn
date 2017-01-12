import React, { Component } from "react";

import { StyleSheet, View, ActivityIndicator, AsyncStorage, Dimensions } from "react-native";

import Orientation from "react-native-orientation";

import RNFetchBlob from "react-native-fetch-blob";

import { join } from "path-webpack";

if (!global.Blob) {
  global.Blob = RNFetchBlob.polyfill.Blob;
}

global.JSZip = global.JSZip || require("jszip");

global.URL = require("epubjs/libs/url/url.js");

if (!global.btoa) {
  global.btoa = require("base-64").encode;
}

import ePub, { Rendition, Layout } from "epubjs";

const core = require("epubjs/lib/utils/core");

const EpubViewManager = require("./EpubViewManager");

const EPUBJS = "(function(s,u){'object'==typeof exports&&'object'==typeof module?module.exports=u(require('xmldom')):'function'==typeof define&&define.amd?define(['xmldom'],u):'object'==typeof exports?exports.EPUBJSContents=u(require('xmldom')):s.EPUBJSContents=u(s.xmldom)})(this,function(t){return function(s){function u(f){if(p[f])return p[f].exports;var g=p[f]={exports:{},id:f,loaded:!1};return s[f].call(g.exports,g,g.exports,u),g.loaded=!0,g.exports}var p={};return u.m=s,u.c=p,u.p='',u(0)}([function(s,u,p){var f=p(1);s.exports=f},function(s,u,p){'use strict';function f(L){return L&&L.__esModule?L:{default:L}}function g(L,P){if(!(L instanceof P))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(u,'__esModule',{value:!0});var y=function(){function L(P,A){for(var O=0;O<A.length;O++){var B=A[O];B.enumerable=B.enumerable||!1,B.configurable=!0,'value'in B&&(B.writable=!0),Object.defineProperty(P,B.key,B)}}return function(P,A,O){return A&&L(P.prototype,A),O&&L(P,O),P}}(),x=p(2),v=f(x),k=p(17),C=p(19),S=f(C),E=p(20),T=f(E),_=p(21),N=['keydown','keyup','keypressed','mouseup','mousedown','click','touchend','touchstart'],R=function(){function L(P,A,O){g(this,L),this.epubcfi=new S.default,this.document=P,this.documentElement=this.document.documentElement,this.content=A||this.document.body,this.window=this.document.defaultView,this._size={width:0,height:0},this.cfiBase=O||'',this.listeners()}return y(L,[{key:'width',value:function(A){var O=this.content;return A&&(0,k.isNumber)(A)&&(A=A+'px'),A&&(O.style.width=A),this.window.getComputedStyle(O).width}},{key:'height',value:function(A){var O=this.content;return A&&(0,k.isNumber)(A)&&(A=A+'px'),A&&(O.style.height=A),this.window.getComputedStyle(O).height}},{key:'contentWidth',value:function(A){var O=this.content||this.document.body;return A&&(0,k.isNumber)(A)&&(A=A+'px'),A&&(O.style.width=A),this.window.getComputedStyle(O).width}},{key:'contentHeight',value:function(A){var O=this.content||this.document.body;return A&&(0,k.isNumber)(A)&&(A=A+'px'),A&&(O.style.height=A),this.window.getComputedStyle(O).height}},{key:'textWidth',value:function(){var A,O=this.document.createRange(),B=this.content||this.document.body;return O.selectNodeContents(B),A=O.getBoundingClientRect().width,A}},{key:'textHeight',value:function(){var A,O=this.document.createRange(),B=this.content||this.document.body;return O.selectNodeContents(B),A=O.getBoundingClientRect().height,A}},{key:'scrollWidth',value:function(){var A=this.documentElement.scrollWidth;return A}},{key:'scrollHeight',value:function(){var A=this.documentElement.scrollHeight;return A}},{key:'overflow',value:function(A){return A&&(this.documentElement.style.overflow=A),this.window.getComputedStyle(this.documentElement).overflow}},{key:'overflowX',value:function(A){return A&&(this.documentElement.style.overflowX=A),this.window.getComputedStyle(this.documentElement).overflowX}},{key:'overflowY',value:function(A){return A&&(this.documentElement.style.overflowY=A),this.window.getComputedStyle(this.documentElement).overflowY}},{key:'css',value:function(A,O){var B=this.content||this.document.body;return O&&(B.style[A]=O),this.window.getComputedStyle(B)[A]}},{key:'viewport',value:function(A){var O,B,z,W,M=this.document.querySelector('meta[name=\\'viewport\\']'),U='';if(M&&M.hasAttribute('content')){var D=M.getAttribute('content'),I=D.split(/\\s*,\\s*/);I[0]&&(O=I[0].replace('width=','').trim()),I[1]&&(B=I[1].replace('height=','').trim()),I[2]&&(z=I[2].replace('initial-scale=','').trim()),I[3]&&(W=I[3].replace('user-scalable=','').trim())}return A&&(U+='width='+(A.width||O),U+=', height='+(A.height||B),(A.scale||z)&&(U+=', initial-scale='+(A.scale||z)),(A.scalable||W)&&(U+=', user-scalable='+(A.scalable||W)),!M&&(M=this.document.createElement('meta'),M.setAttribute('name','viewport'),this.document.querySelector('head').appendChild(M)),M.setAttribute('content',U)),{width:parseInt(O),height:parseInt(B)}}},{key:'expand',value:function(){this.emit('expand')}},{key:'listeners',value:function(){this.imageLoadListeners(),this.mediaQueryListeners(),this.addEventListeners(),this.addSelectionListeners(),this.resizeListeners(),this.linksHandler()}},{key:'removeListeners',value:function(){this.removeEventListeners(),this.removeSelectionListeners()}},{key:'resizeListeners',value:function(){var A,O;clearTimeout(this.expanding),A=this.scrollWidth(),O=this.scrollHeight(),(A!=this._size.width||O!=this._size.height)&&(this._size={width:A,height:O},this.emit('resize',this._size)),this.expanding=setTimeout(this.resizeListeners.bind(this),350)}},{key:'mediaQueryListeners',value:function(){var A=this.document.styleSheets,O=function(U){U.matches&&!this._expanding&&setTimeout(this.expand.bind(this),1)}.bind(this);for(var B=0;B<A.length;B+=1){var z;try{z=A[B].cssRules}catch(U){return}if(!z)return;for(var W=0;W<z.length;W+=1)if(z[W].media){var M=this.window.matchMedia(z[W].media.mediaText);M.addListener(O)}}}},{key:'observe',value:function(A){var O=this,B=new MutationObserver(function(){O._expanding&&O.expand()});return B.observe(A,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),B}},{key:'imageLoadListeners',value:function(){var O,A=this.document.querySelectorAll('img');for(var B=0;B<A.length;B++)O=A[B],'undefined'!=typeof O.naturalWidth&&0===O.naturalWidth&&(O.onload=this.expand.bind(this))}},{key:'fontLoadListeners',value:function(){this.document&&this.document.fonts&&this.document.fonts.ready.then(function(){this.expand()}.bind(this))}},{key:'root',value:function(){return this.document?this.document.documentElement:null}},{key:'locationOf',value:function(A,O){var B,z={left:0,top:0};if(this.document){if(this.epubcfi.isCfiString(A)){var W=new S.default(A).toRange(this.document,O);W&&(W.startContainer.nodeType===Node.ELEMENT_NODE?(B=W.startContainer.getBoundingClientRect(),z.left=B.left,z.top=B.top):W.collapsed?B=W.getClientRects()[0]:B=W.getBoundingClientRect())}else if('string'==typeof A&&-1<A.indexOf('#')){var M=A.substring(A.indexOf('#')+1),U=this.document.getElementById(M);U&&(B=U.getBoundingClientRect())}return B&&(z.left=B.left,z.top=B.top),z}}},{key:'addStylesheet',value:function(A){return new Promise(function(O){var B,z=!1;return this.document?(B=this.document.querySelector('link[href=\\''+A+'\\']'),B?void O(!0):void(B=this.document.createElement('link'),B.type='text/css',B.rel='stylesheet',B.href=A,B.onload=B.onreadystatechange=function(){z||this.readyState&&'complete'!=this.readyState||(z=!0,setTimeout(function(){O(!0)},1))},this.document.head.appendChild(B))):void O(!1)}.bind(this))}},{key:'addStylesheetRules',value:function(A){var O,B,z='epubjs-inserted-css';if(this.document){O=this.document.getElementById('#'+z),O||(O=this.document.createElement('style'),O.id=z),this.document.head.appendChild(O),B=O.sheet;for(var W=0,M=A.length;W<M;W++){var U=1,D=A[W],I=A[W][0],H='';'[object Array]'===Object.prototype.toString.call(D[1][0])&&(D=D[1],U=0);for(var F=D.length;U<F;U++){var X=D[U];H+=X[0]+':'+X[1]+(X[2]?' !important':'')+';\\n'}B.insertRule(I+'{'+H+'}',B.cssRules.length)}}}},{key:'addScript',value:function(A){return new Promise(function(O){var B,z=!1;return this.document?void(B=this.document.createElement('script'),B.type='text/javascript',B.async=!0,B.src=A,B.onload=B.onreadystatechange=function(){z||this.readyState&&'complete'!=this.readyState||(z=!0,setTimeout(function(){O(!0)},1))},this.document.head.appendChild(B)):void O(!1)}.bind(this))}},{key:'addClass',value:function(A){var O;this.document&&(O=this.content||this.document.body,O.classList.add(A))}},{key:'removeClass',value:function(A){var O;this.document&&(O=this.content||this.document.body,O.classList.remove(A))}},{key:'addEventListeners',value:function(){this.document&&N.forEach(function(A){this.document.addEventListener(A,this.triggerEvent.bind(this),!1)},this)}},{key:'removeEventListeners',value:function(){this.document&&N.forEach(function(A){this.document.removeEventListener(A,this.triggerEvent,!1)},this)}},{key:'triggerEvent',value:function(A){this.emit(A.type,A)}},{key:'addSelectionListeners',value:function(){this.document&&this.document.addEventListener('selectionchange',this.onSelectionChange.bind(this),!1)}},{key:'removeSelectionListeners',value:function(){this.document&&this.document.removeEventListener('selectionchange',this.onSelectionChange,!1)}},{key:'onSelectionChange',value:function(){this.selectionEndTimeout&&clearTimeout(this.selectionEndTimeout),this.selectionEndTimeout=setTimeout(function(){var A=this.window.getSelection();this.triggerSelectedEvent(A)}.bind(this),500)}},{key:'triggerSelectedEvent',value:function(A){var O,B;A&&0<A.rangeCount&&(O=A.getRangeAt(0),!O.collapsed&&(B=new S.default(O,this.cfiBase).toString(),this.emit('selected',B),this.emit('selectedRange',O)))}},{key:'range',value:function(A,O){var B=new S.default(A);return B.toRange(this.document,O)}},{key:'map',value:function(A){var P=new T.default(A);return P.section()}},{key:'size',value:function(A,O){0<=A&&this.width(A),0<=O&&this.height(O),this.css('margin','0'),this.css('boxSizing','border-box')}},{key:'columns',value:function(A,O,B,z){var W=(0,k.prefixed)('columnAxis'),M=(0,k.prefixed)('columnGap'),U=(0,k.prefixed)('columnWidth'),D=(0,k.prefixed)('columnFill');this.width(A),this.height(O),this.viewport({width:A,height:O,scale:1}),this.css('overflowY','hidden'),this.css('margin','0'),this.css('boxSizing','border-box'),this.css('maxWidth','inherit'),this.css(W,'horizontal'),this.css(D,'auto'),this.css(M,z+'px'),this.css(U,B+'px')}},{key:'scaler',value:function(A,O,B){var z='';this.css('transformOrigin','top left'),(0<=O||0<=B)&&(z=' translate('+(O||0)+'px, '+(B||0)+'px )'),this.css('transform','scale('+A+')'+z)}},{key:'fit',value:function(A,O){var B=this.viewport(),z=A/B.width,W=O/B.height,M=z<W?z:W,U=(O-B.height*M)/2;this.width(A),this.height(O),this.overflow('hidden'),this.viewport({scale:1}),this.scaler(M,0,U),this.css('backgroundColor','transparent')}},{key:'mapPage',value:function(A,O,B){var z=new T.default;return z.page(this,A,O,B)}},{key:'linksHandler',value:function(){var A=this;(0,_.replaceLinks)(this.content,function(O){A.emit('link',O)})}},{key:'destroy',value:function(){this.observer&&this.observer.disconnect(),this.removeListeners()}}],[{key:'listenedEvents',get:function(){return N}}]),L}();(0,v.default)(R.prototype),u.default=R,s.exports=u['default']},function(s,u,p){'use strict';var T,_,N,R,L,P,A,f=p(3),g=p(16),y=Function.prototype.apply,x=Function.prototype.call,v=Object.create,k=Object.defineProperty,C=Object.defineProperties,S=Object.prototype.hasOwnProperty,E={configurable:!0,enumerable:!1,writable:!0};T=function(O,B){var z;return g(B),S.call(this,'__ee__')?z=this.__ee__:(z=E.value=v(null),k(this,'__ee__',E),E.value=null),z[O]?'object'==typeof z[O]?z[O].push(B):z[O]=[z[O],B]:z[O]=B,this},_=function(O,B){var z,W;return g(B),W=this,T.call(this,O,z=function(){N.call(W,O,z),y.call(B,this,arguments)}),z.__eeOnceListener__=B,this},N=function(O,B){var z,W,M,U;if(g(B),!S.call(this,'__ee__'))return this;if(z=this.__ee__,!z[O])return this;if(W=z[O],'object'==typeof W)for(U=0;M=W[U];++U)(M===B||M.__eeOnceListener__===B)&&(2===W.length?z[O]=W[U?0:1]:W.splice(U,1));else(W===B||W.__eeOnceListener__===B)&&delete z[O];return this},R=function(O){var B,z,W,M,U;if(S.call(this,'__ee__')&&(M=this.__ee__[O],M))if('object'==typeof M){for(z=arguments.length,U=Array(z-1),B=1;B<z;++B)U[B-1]=arguments[B];for(M=M.slice(),B=0;W=M[B];++B)y.call(W,this,U)}else switch(arguments.length){case 1:x.call(M,this);break;case 2:x.call(M,this,arguments[1]);break;case 3:x.call(M,this,arguments[1],arguments[2]);break;default:for(z=arguments.length,U=Array(z-1),B=1;B<z;++B)U[B-1]=arguments[B];y.call(M,this,U);}},L={on:T,once:_,off:N,emit:R},P={on:f(T),once:f(_),off:f(N),emit:f(R)},A=C({},P),s.exports=u=function(O){return null==O?v(A):C(Object(O),P)},u.methods=L},function(s,u,p){'use strict';var v,f=p(4),g=p(11),y=p(12),x=p(13);v=s.exports=function(k,C){var S,E,T,_,N;return 2>arguments.length||'string'!=typeof k?(_=C,C=k,k=null):_=arguments[2],null==k?(S=T=!0,E=!1):(S=x.call(k,'c'),E=x.call(k,'e'),T=x.call(k,'w')),N={value:C,configurable:S,enumerable:E,writable:T},_?f(g(_),N):N},v.gs=function(k,C,S){var E,T,_,N;return'string'==typeof k?_=arguments[3]:(_=S,S=C,C=k,k=null),null==C?C=void 0:y(C)?null==S?S=void 0:!y(S)&&(_=S,S=void 0):(_=C,C=S=void 0),null==k?(E=!0,T=!1):(E=x.call(k,'c'),T=x.call(k,'e')),N={get:C,set:S,configurable:E,enumerable:T},_?f(g(_),N):N}},function(s,u,p){'use strict';s.exports=p(5)()?Object.assign:p(6)},function(s){'use strict';s.exports=function(){var p,u=Object.assign;return!('function'!=typeof u)&&(p={foo:'raz'},u(p,{bar:'dwa'},{trzy:'trzy'}),'razdwatrzy'===p.foo+p.bar+p.trzy)}},function(s,u,p){'use strict';var f=p(7),g=p(10),y=Math.max;s.exports=function(x,v){var k,C,E,S=y(arguments.length,2);for(x=Object(g(x)),E=function(T){try{x[T]=v[T]}catch(_){k||(k=_)}},C=1;C<S;++C)v=arguments[C],f(v).forEach(E);if(k!==void 0)throw k;return x}},function(s,u,p){'use strict';s.exports=p(8)()?Object.keys:p(9)},function(s){'use strict';s.exports=function(){try{return Object.keys('primitive'),!0}catch(u){return!1}}},function(s){'use strict';var u=Object.keys;s.exports=function(p){return u(null==p?p:Object(p))}},function(s){'use strict';s.exports=function(u){if(null==u)throw new TypeError('Cannot use null or undefined');return u}},function(s){'use strict';var u=Array.prototype.forEach,p=Object.create,f=function(g,y){for(var x in g)y[x]=g[x]};s.exports=function(){var g=p(null);return u.call(arguments,function(y){null==y||f(Object(y),g)}),g}},function(s){'use strict';s.exports=function(u){return'function'==typeof u}},function(s,u,p){'use strict';s.exports=p(14)()?String.prototype.contains:p(15)},function(s){'use strict';var u='razdwatrzy';s.exports=function(){return!('function'!=typeof u.contains)&&!0===u.contains('dwa')&&!1===u.contains('foo')}},function(s){'use strict';var u=String.prototype.indexOf;s.exports=function(p){return-1<u.call(this,p,arguments[1])}},function(s){'use strict';s.exports=function(u){if('function'!=typeof u)throw new TypeError(u+' is not a function');return u}},function(s,u,p){'use strict';function f(){var S=new Date().getTime(),E='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(T){var _=0|(S+16*Math.random())%16;return S=Math.floor(S/16),('x'==T?_:8|7&_).toString(16)});return E}function g(S){return!isNaN(parseFloat(S))&&isFinite(S)}function y(S,E,T,_,N){var A,R=_||0,L=N||E.length,P=parseInt(R+(L-R)/2);return(T||(T=function(B,z){return B>z?1:B<z?-1:B==z?0:void 0}),0>=L-R)?P:(A=T(E[P],S),1==L-R?0<A?P:P+1:0===A?P:-1===A?y(S,E,T,P,L):y(S,E,T,R,P))}function x(S,E,T,_,N){var A,R=_||0,L=N||E.length,P=parseInt(R+(L-R)/2);return(T||(T=function(B,z){return B>z?1:B<z?-1:B==z?0:void 0}),0>=L-R)?-1:(A=T(E[P],S),1==L-R?0===A?P:-1:0===A?P:-1===A?x(S,E,T,P,L):x(S,E,T,R,P))}function v(S,E){return'undefined'==typeof S.querySelector?S.getElementsByTagName(E):S.querySelectorAll(E)}function k(S,E,T){for(var _=document.createTreeWalker(S,T,null,!1),N=void 0;N=_.nextNode();)E(N)}function C(S,E){if(E(S))return!0;if(S=S.firstChild,S)do{var T=C(S,E);if(T)return!0;S=S.nextSibling}while(S)}Object.defineProperty(u,'__esModule',{value:!0}),u.isElement=function(E){return!!(E&&1==E.nodeType)},u.uuid=f,u.documentHeight=function(){return Math.max(document.documentElement.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight)},u.isNumber=g,u.isFloat=function(E){return g(E)&&Math.floor(E)!==E},u.prefixed=function(E){var T=['Webkit','Moz','O','ms'],_=E[0].toUpperCase()+E.slice(1),N=T.length;if('undefined'==typeof document||'undefined'!=typeof document.body.style[E])return E;for(var R=0;R<N;R++)if('undefined'!=typeof document.body.style[T[R]+_])return T[R]+_;return E},u.defaults=function(E){for(var T=1,_=arguments.length;T<_;T++){var N=arguments[T];for(var R in N)void 0===E[R]&&(E[R]=N[R])}return E},u.extend=function(E){var T=[].slice.call(arguments,1);return T.forEach(function(_){_&&Object.getOwnPropertyNames(_).forEach(function(N){Object.defineProperty(E,N,Object.getOwnPropertyDescriptor(_,N))})}),E},u.insert=function(E,T,_){var N=y(E,T,_);return T.splice(N,0,E),N},u.locationOf=y,u.indexOfSorted=x,u.bounds=function(E){var T=window.getComputedStyle(E),_=0,N=0;return['width','paddingRight','paddingLeft','marginRight','marginLeft','borderRightWidth','borderLeftWidth'].forEach(function(R){_+=parseFloat(T[R])||0}),['height','paddingTop','paddingBottom','marginTop','marginBottom','borderTopWidth','borderBottomWidth'].forEach(function(R){N+=parseFloat(T[R])||0}),{height:N,width:_}},u.borders=function(E){var T=window.getComputedStyle(E),_=0,N=0;return['paddingRight','paddingLeft','marginRight','marginLeft','borderRightWidth','borderLeftWidth'].forEach(function(R){_+=parseFloat(T[R])||0}),['paddingTop','paddingBottom','marginTop','marginBottom','borderTopWidth','borderBottomWidth'].forEach(function(R){N+=parseFloat(T[R])||0}),{height:N,width:_}},u.windowBounds=function(){var E=window.innerWidth,T=window.innerHeight;return{top:0,left:0,right:E,bottom:T,width:E,height:T}},u.cleanStringForXpath=function(E){var T=E.match(/[^'\"]+|['\"]/g);return T=T.map(function(_){return'\\''===_?'\"\\'\"':'\"'===_?'\\'\"\\'':'\\''+_+'\\''}),'concat(\\'\\','+T.join(',')+')'},u.indexOfTextNode=function(E){var T=E.parentNode,_=T.childNodes,N,R=-1;for(var L=0;L<_.length&&(N=_[L],N.nodeType===Node.TEXT_NODE&&R++,N!=E);L++);return R},u.isXml=function(E){return-1<['xml','opf','ncx'].indexOf(E)},u.createBlob=function(E,T){return new Blob([E],{type:T})},u.createBlobUrl=function(E,T){var N,_=window.URL||window.webkitURL||window.mozURL,R=this.createBlob(E,T);return N=_.createObjectURL(R),N},u.createBase64Url=function(E,T){var _,N;if('string'==typeof E)return _=btoa(E),N='data:'+T+';base64,'+_,N},u.type=function(E){return Object.prototype.toString.call(E).slice(8,-1)},u.parse=function(E,T,_){var N,R;return R='undefined'==typeof DOMParser||_?p(18).DOMParser:DOMParser,N=new R().parseFromString(E,T),N},u.qs=function(E,T){var _;if(!E)throw new Error('No Element Provided');return'undefined'==typeof E.querySelector?(_=E.getElementsByTagName(T),_.length)?_[0]:void 0:E.querySelector(T)},u.qsa=v,u.qsp=function(E,T,_){var N,R;if('undefined'!=typeof E.querySelector){for(var L in T+='[',_)T+=L+'=\\''+_[L]+'\\'';return T+=']',E.querySelector(T)}return(N=E.getElementsByTagName(T),R=Array.prototype.slice.call(N,0).filter(function(P){for(var A in _)if(P.getAttribute(A)===_[A])return!0;return!1}),R)?R[0]:void 0},u.sprint=function(E,T){var _=E.ownerDocument||E;'undefined'==typeof _.createTreeWalker?C(E,function(N){N&&3===N.nodeType&&T(N)},!0):k(E,T,NodeFilter.SHOW_TEXT)},u.treeWalker=k,u.walk=C,u.blob2base64=function(E,T){var _=new FileReader;_.readAsDataURL(E),_.onloadend=function(){T(_.result)}},u.defer=function(){var E=this;this.resolve=null,this.reject=null,this.id=f(),this.promise=new Promise(function(T,_){E.resolve=T,E.reject=_}),Object.freeze(this)},u.querySelectorByType=function(E,T,_){var N;if('undefined'!=typeof E.querySelector&&(N=E.querySelector(T+'[*|type=\"'+_+'\"]')),!N||0===N.length){N=v(E,T);for(var R=0;R<N.length;R++)if(N[R].getAttributeNS('http://www.idpf.org/2007/ops','type')===_)return N[R]}else return N},u.findChildren=function(E){var T=[],_=E.parentNode.childNodes;for(var N=0;N<_.length;N++){var R=_[N];1===R.nodeType&&T.push(R)}return T},u.requestAnimationFrame='undefined'!=typeof window&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)},function(s){s.exports=t},function(s,u,p){'use strict';function f(S,E){if(!(S instanceof E))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(u,'__esModule',{value:!0});var g='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(S){return typeof S}:function(S){return S&&'function'==typeof Symbol&&S.constructor===Symbol&&S!==Symbol.prototype?'symbol':typeof S},y=function(){function S(E,T){for(var _=0;_<T.length;_++){var N=T[_];N.enumerable=N.enumerable||!1,N.configurable=!0,'value'in N&&(N.writable=!0),Object.defineProperty(E,N.key,N)}}return function(E,T,_){return T&&S(E.prototype,T),_&&S(E,_),E}}(),x=p(17),v=1,k=3,C=function(){function S(E,T,_){f(this,S);var N;if(this.str='',this.base={},this.spinePos=0,this.range=!1,this.path={},this.start=null,this.end=null,!(this instanceof S))return new S(E,T,_);if('string'==typeof T?this.base=this.parseComponent(T):'object'===('undefined'==typeof T?'undefined':g(T))&&T.steps&&(this.base=T),N=this.checkType(E),'string'===N)return this.str=E,(0,x.extend)(this,this.parse(E));if('range'===N)return(0,x.extend)(this,this.fromRange(E,this.base,_));if('node'===N)return(0,x.extend)(this,this.fromNode(E,this.base,_));if('EpubCFI'===N&&E.path)return E;if(!E)return this;throw new TypeError('not a valid argument for EpubCFI')}return y(S,[{key:'checkType',value:function(T){return this.isCfiString(T)?'string':'object'===('undefined'==typeof T?'undefined':g(T))&&('Range'===(0,x.type)(T)||'undefined'!=typeof T.startContainer)?'range':'object'===('undefined'==typeof T?'undefined':g(T))&&'undefined'!=typeof T.nodeType?'node':'object'===('undefined'==typeof T?'undefined':g(T))&&T instanceof S&&'EpubCFI'}},{key:'parse',value:function(T){var N,R,L,_={spinePos:-1,range:!1,base:{},path:{},start:null,end:null};return'string'==typeof T?(0===T.indexOf('epubcfi(')&&')'===T[T.length-1]&&(T=T.slice(8,T.length-1)),N=this.getChapterComponent(T),!N)?{spinePos:-1}:(_.base=this.parseComponent(N),R=this.getPathComponent(T),_.path=this.parseComponent(R),L=this.getRange(T),L&&(_.range=!0,_.start=this.parseComponent(L[0]),_.end=this.parseComponent(L[1])),_.spinePos=_.base.steps[1].index,_):{spinePos:-1}}},{key:'parseComponent',value:function(T){var L,_={steps:[],terminal:{offset:null,assertion:null}},N=T.split(':'),R=N[0].split('/');return 1<N.length&&(L=N[1],_.terminal=this.parseTerminal(L)),''===R[0]&&R.shift(),_.steps=R.map(function(P){return this.parseStep(P)}.bind(this)),_}},{key:'parseStep',value:function(T){var _,N,R,L,P;if(L=T.match(/\\[(.*)\\]/),L&&L[1]&&(P=L[1]),N=parseInt(T),!isNaN(N))return 0==N%2?(_='element',R=N/2-1):(_='text',R=(N-1)/2),{type:_,index:R,id:P||null}}},{key:'parseTerminal',value:function(T){var _,N,R=T.match(/\\[(.*)\\]/);return R&&R[1]?(_=parseInt(T.split('[')[0])||null,N=R[1]):_=parseInt(T)||null,{offset:_,assertion:N}}},{key:'getChapterComponent',value:function(T){var _=T.split('!');return _[0]}},{key:'getPathComponent',value:function(T){var _=T.split('!');if(_[1]){var N=_[1].split(',');return N[0]}}},{key:'getRange',value:function(T){var _=T.split(',');return 3===_.length&&[_[1],_[2]]}},{key:'getCharecterOffsetComponent',value:function(T){var _=T.split(':');return _[1]||''}},{key:'joinSteps',value:function(T){return T?T.map(function(_){var N='';return'element'===_.type&&(N+=2*(_.index+1)),'text'===_.type&&(N+=1+2*_.index),_.id&&(N+='['+_.id+']'),N}).join('/'):''}},{key:'segmentString',value:function(T){var E='/';return E+=this.joinSteps(T.steps),T.terminal&&null!=T.terminal.offset&&(E+=':'+T.terminal.offset),T.terminal&&null!=T.terminal.assertion&&(E+='['+T.terminal.assertion+']'),E}},{key:'toString',value:function(){var T='epubcfi(';return T+=this.segmentString(this.base),T+='!',T+=this.segmentString(this.path),this.start&&(T+=',',T+=this.segmentString(this.start)),this.end&&(T+=',',T+=this.segmentString(this.end)),T+=')',T}},{key:'compare',value:function(T,_){var N,R,L,P;if('string'==typeof T&&(T=new S(T)),'string'==typeof _&&(_=new S(_)),T.spinePos>_.spinePos)return 1;if(T.spinePos<_.spinePos)return-1;T.range?(N=T.path.steps.concat(T.start.steps),L=T.start.terminal):(N=T.path.steps,L=T.path.terminal),_.range?(R=_.path.steps.concat(_.start.steps),P=_.start.terminal):(R=_.path.steps,P=_.path.terminal);for(var A=0;A<N.length;A++){if(!N[A])return-1;if(!R[A])return 1;if(N[A].index>R[A].index)return 1;if(N[A].index<R[A].index)return-1}return N.length<R.length?1:L.offset>P.offset?1:L.offset<P.offset?-1:0}},{key:'step',value:function(T){var _=T.nodeType===k?'text':'element';return{id:T.id,tagName:T.tagName,type:_,index:this.position(T)}}},{key:'filteredStep',value:function(T,_){var R,N=this.filter(T,_);if(N)return R=N.nodeType===k?'text':'element',{id:N.id,tagName:N.tagName,type:R,index:this.filteredPosition(N,_)}}},{key:'pathTo',value:function(T,_,N){for(var P,R={steps:[],terminal:{offset:null,assertion:null}},L=T;L&&L.parentNode&&9!=L.parentNode.nodeType;)P=N?this.filteredStep(L,N):this.step(L),P&&R.steps.unshift(P),L=L.parentNode;return null!=_&&0<=_&&(R.terminal.offset=_,'text'!=R.steps[R.steps.length-1].type&&R.steps.push({type:'text',index:0})),R}},{key:'equalStep',value:function(T,_){return T&&_&&T.index===_.index&&T.id===_.id&&T.type===_.type}},{key:'fromRange',value:function(T,_,N){var R={range:!1,base:{},path:{},start:null,end:null},L=T.startContainer,P=T.endContainer,A=T.startOffset,O=T.endOffset,B=!1;if(N&&(B=null!=L.ownerDocument.querySelector('.'+N)),'string'==typeof _?(R.base=this.parseComponent(_),R.spinePos=R.base.steps[1].index):'object'===('undefined'==typeof _?'undefined':g(_))&&(R.base=_),T.collapsed)B&&(A=this.patchOffset(L,A,N)),R.path=this.pathTo(L,A,N);else{R.range=!0,B&&(A=this.patchOffset(L,A,N)),R.start=this.pathTo(L,A,N),B&&(O=this.patchOffset(P,O,N)),R.end=this.pathTo(P,O,N),R.path={steps:[],terminal:null};var W,z=R.start.steps.length;for(W=0;W<z&&this.equalStep(R.start.steps[W],R.end.steps[W]);W++)W===z-1?R.start.terminal===R.end.terminal&&(R.path.steps.push(R.start.steps[W]),R.range=!1):R.path.steps.push(R.start.steps[W]);R.start.steps=R.start.steps.slice(R.path.steps.length),R.end.steps=R.end.steps.slice(R.path.steps.length)}return R}},{key:'fromNode',value:function(T,_,N){var R={range:!1,base:{},path:{},start:null,end:null};return'string'==typeof _?(R.base=this.parseComponent(_),R.spinePos=R.base.steps[1].index):'object'===('undefined'==typeof _?'undefined':g(_))&&(R.base=_),R.path=this.pathTo(T,null,N),R}},{key:'filter',value:function(T,_){var N,R,L,P,A,O=!1;return(T.nodeType===k?(O=!0,L=T.parentNode,N=T.parentNode.classList.contains(_)):(O=!1,N=T.classList.contains(_)),N&&O)?(P=L.previousSibling,A=L.nextSibling,P&&P.nodeType===k?R=P:A&&A.nodeType===k&&(R=A),R)?R:T:N&&!O?!1:T}},{key:'patchOffset',value:function(T,_,N){if(T.nodeType!=k)throw new Error('Anchor must be a text node');var R=T,L=_;for(T.parentNode.classList.contains(N)&&(R=T.parentNode);R.previousSibling;){if(R.previousSibling.nodeType!==v)L+=R.previousSibling.textContent.length;else if(R.previousSibling.classList.contains(N))L+=R.previousSibling.textContent.length;else break;R=R.previousSibling}return L}},{key:'normalizedMap',value:function(T,_,N){var P,O,B,R={},L=-1,A=T.length;for(P=0;P<A;P++)O=T[P].nodeType,O===v&&T[P].classList.contains(N)&&(O=k),0<P&&O===k&&B===k?R[P]=L:_===O&&(L=L+1,R[P]=L),B=O;return R}},{key:'position',value:function(T){var _,N;return T.nodeType===v?(_=T.parentNode.children,!_&&(_=(0,x.findChildren)(T.parentNode)),N=Array.prototype.indexOf.call(_,T)):(_=this.textNodes(T.parentNode),N=_.indexOf(T)),N}},{key:'filteredPosition',value:function(T,_){var N,R,L;return T.nodeType===v?(N=T.parentNode.children,L=this.normalizedMap(N,v,_)):(N=T.parentNode.childNodes,T.parentNode.classList.contains(_)&&(T=T.parentNode,N=T.parentNode.childNodes),L=this.normalizedMap(N,k,_)),R=Array.prototype.indexOf.call(N,T),L[R]}},{key:'stepsToXpath',value:function(T){var _=['.','*'];return T.forEach(function(N){var R=N.index+1;N.id?_.push('*[position()='+R+' and @id=\\''+N.id+'\\']'):'text'===N.type?_.push('text()['+R+']'):_.push('*['+R+']')}),_.join('/')}},{key:'stepsToQuerySelector',value:function(T){var _=['html'];return T.forEach(function(N){var R=N.index+1;N.id?_.push('#'+N.id):'text'!==N.type&&_.push('*:nth-child('+R+')')}),_.join('>')}},{key:'textNodes',value:function(T,_){return Array.prototype.slice.call(T.childNodes).filter(function(N){return N.nodeType===k||_&&N.classList.contains(_)})}},{key:'walkToNode',value:function(T,_,N){var P,O,R=_||document,L=R.documentElement,A=T.length;for(O=0;O<A;O++)P=T[O],'element'===P.type?L=L.children[P.index]:'text'===P.type&&(L=this.textNodes(L,N)[P.index]);return L}},{key:'findNode',value:function(T,_,N){var L,P,R=_||document;return N||'undefined'==typeof R.evaluate?N?L=this.walkToNode(T,R,N):L=this.walkToNode(T,R):(P=this.stepsToXpath(T),L=R.evaluate(P,R,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),L}},{key:'fixMiss',value:function(T,_,N,R){var O,B,L=this.findNode(T.slice(0,-1),N,R),P=L.childNodes,A=this.normalizedMap(P,k,R),z=T[T.length-1].index;for(var W in A){if(!A.hasOwnProperty(W))return;if(A[W]===z)if(O=P[W],B=O.textContent.length,_>B)_=_-B;else{L=O.nodeType===v?O.childNodes[0]:O;break}}return{container:L,offset:_}}},{key:'toRange',value:function(T,_){var L,P,A,O,z,W,U,N=T||document,R=N.createRange(),B=this,M=!!_&&null!=N.querySelector('.'+_);if(B.range?(L=B.start,z=B.path.steps.concat(L.steps),A=this.findNode(z,N,M?_:null),P=B.end,W=B.path.steps.concat(P.steps),O=this.findNode(W,N,M?_:null)):(L=B.path,z=B.path.steps,A=this.findNode(B.path.steps,N,M?_:null)),A)try{null==L.terminal.offset?R.setStart(A,0):R.setStart(A,L.terminal.offset)}catch(D){U=this.fixMiss(z,L.terminal.offset,N,M?_:null),R.setStart(U.container,U.offset)}else return null;if(O)try{null==P.terminal.offset?R.setEnd(O,0):R.setEnd(O,P.terminal.offset)}catch(D){U=this.fixMiss(W,B.end.terminal.offset,N,M?_:null),R.setEnd(U.container,U.offset)}return R}},{key:'isCfiString',value:function(T){return'string'==typeof T&&0===T.indexOf('epubcfi(')&&')'===T[T.length-1]}},{key:'generateChapterComponent',value:function(T,_,N){var R=parseInt(_),L='/'+(T+1)+'/';return L+=2*(R+1),N&&(L+='['+N+']'),L}}]),S}();u.default=C,s.exports=u['default']},function(s,u,p){'use strict';function f(k,C){if(!(k instanceof C))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(u,'__esModule',{value:!0});var g=function(){function k(C,S){for(var E=0;E<S.length;E++){var T=S[E];T.enumerable=T.enumerable||!1,T.configurable=!0,'value'in T&&(T.writable=!0),Object.defineProperty(C,T.key,T)}}return function(C,S,E){return S&&k(C.prototype,S),E&&k(C,E),C}}(),y=p(19),x=function(C){return C&&C.__esModule?C:{default:C}}(y),v=function(){function k(C){f(this,k),this.layout=C}return g(k,[{key:'section',value:function(S){var E=this.findRanges(S),T=this.rangeListToCfiList(S.section.cfiBase,E);return T}},{key:'page',value:function(S,E,T,_){var N=S&&S.document&&S.document.body;return N?this.rangePairToCfiPair(E,{start:this.findStart(N,T,_),end:this.findEnd(N,T,_)}):void 0}},{key:'walk',value:function(S,E){for(var _,N,T=document.createTreeWalker(S,NodeFilter.SHOW_TEXT,{acceptNode:function(L){return 0<L.data.trim().length?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}},!1);(_=T.nextNode())&&(N=E(_),!N););return N}},{key:'findRanges',value:function(S){var L,P,E=[],T=S.contents.scrollWidth(),_=this.layout.count(T),N=this.layout.column,R=this.layout.gap;for(var A=0;A<_.pages;A++)L=(N+R)*A,P=N*(A+1)+R*A,E.push({start:this.findStart(S.document.body,L,P),end:this.findEnd(S.document.body,L,P)});return E}},{key:'findStart',value:function(S,E,T){for(var N,R,_=[S],L=S;_.length;)if(N=_.shift(),R=this.walk(N,function(P){var A,O,B,z;return(P.nodeType==Node.TEXT_NODE?(z=document.createRange(),z.selectNodeContents(P),B=z.getBoundingClientRect()):B=P.getBoundingClientRect(),A=B.left,O=B.right,A>=E&&A<=T)?P:O>E?P:void(L=P,_.push(P))}),R)return this.findTextStartRange(R,E,T);return this.findTextStartRange(L,E,T)}},{key:'findEnd',value:function(S,E,T){for(var N,L,_=[S],R=S;_.length;)if(N=_.shift(),L=this.walk(N,function(P){var A,O,B,z;return(P.nodeType==Node.TEXT_NODE?(z=document.createRange(),z.selectNodeContents(P),B=z.getBoundingClientRect()):B=P.getBoundingClientRect(),A=B.left,O=B.right,A>T&&R)?R:O>T?P:void(R=P,_.push(P))}),L)return this.findTextEndRange(L,E,T);return this.findTextEndRange(R,E,T)}},{key:'findTextStartRange',value:function(S,E){var _,N,T=this.splitTextNodeIntoRanges(S);for(var R=0;R<T.length;R++)if(_=T[R],N=_.getBoundingClientRect(),N.left>=E)return _;return T[0]}},{key:'findTextEndRange',value:function(S,E,T){var N,R,L,_=this.splitTextNodeIntoRanges(S);for(var P=0;P<_.length;P++){if(R=_[P],L=R.getBoundingClientRect(),L.left>T&&N)return N;if(L.right>T)return R;N=R}return _[_.length-1]}},{key:'splitTextNodeIntoRanges',value:function(S,E){var R,T=[],_=S.textContent||'',N=_.trim(),L=S.ownerDocument,P=E||' ',A=N.indexOf(P);if(-1===A||S.nodeType!=Node.TEXT_NODE)return R=L.createRange(),R.selectNodeContents(S),[R];for(R=L.createRange(),R.setStart(S,0),R.setEnd(S,A),T.push(R),R=!1;-1!=A;)A=N.indexOf(P,A+1),0<A&&(R&&(R.setEnd(S,A),T.push(R)),R=L.createRange(),R.setStart(S,A+1));return R&&(R.setEnd(S,N.length),T.push(R)),T}},{key:'rangePairToCfiPair',value:function(S,E){var T=E.start,_=E.end;T.collapse(!0),_.collapse(!0);var N=new x.default(T,S).toString(),R=new x.default(_,S).toString();return{start:N,end:R}}},{key:'rangeListToCfiList',value:function(S,E){var _,T=[];for(var N=0;N<E.length;N++)_=this.rangePairToCfiPair(S,E[N]),T.push(_);return T}}]),k}();u.default=v,s.exports=u['default']},function(s,u,p){'use strict';Object.defineProperty(u,'__esModule',{value:!0}),u.replaceBase=function(v,k){var C,S;v&&(S=(0,f.qs)(v,'head'),C=(0,f.qs)(S,'base'),!C&&(C=v.createElement('base'),S.insertBefore(C,S.firstChild)),C.setAttribute('href',k.url))},u.replaceCanonical=function(v,k){var C,S,E=k.url;v&&(C=(0,f.qs)(v,'head'),S=(0,f.qs)(C,'link[rel=\\'canonical\\']'),S?S.setAttribute('href',E):(S=v.createElement('link'),S.setAttribute('rel','canonical'),S.setAttribute('href',E),C.appendChild(S)))},u.replaceLinks=function(v,k){var C=v.querySelectorAll('a[href]'),S=(0,f.qs)(v.ownerDocument,'base'),E=S?S.href:void 0,T=function(N){var R=N.getAttribute('href');if(0!==R.indexOf('mailto:')){var L=-1<R.indexOf('://'),P=new y.default(R,E);L?N.setAttribute('target','_blank'):N.onclick=function(){return P&&P.hash?k(P.Path.path+P.hash):P?k(P.Path.path):k(R),!1}}}.bind(this);for(var _=0;_<C.length;_++)T(C[_])},u.substitute=function(v,k,C){return k.forEach(function(S,E){S&&C[E]&&(v=v.replace(new RegExp(S,'g'),C[E]))}),v};var f=p(17),g=p(22),y=function(v){return v&&v.__esModule?v:{default:v}}(g)},function(s,u,p){'use strict';function f(E){return E&&E.__esModule?E:{default:E}}function g(E,T){if(!(E instanceof T))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(u,'__esModule',{value:!0});var y=function(){function E(T,_){for(var N=0;N<_.length;N++){var R=_[N];R.enumerable=R.enumerable||!1,R.configurable=!0,'value'in R&&(R.writable=!0),Object.defineProperty(T,R.key,R)}}return function(T,_,N){return _&&E(T.prototype,_),N&&E(T,N),T}}(),x=p(23),v=f(x),k=p(24),C=f(k),S=function(){function E(T,_){g(this,E);var N=-1<T.indexOf('://'),R=T;if(this.Url=void 0,this.href=T,this.protocol='',this.origin='',this.hash='',this.hash='',this.search='',this.base=_,!N&&!1!==_&&'string'!=typeof _&&window&&window.location&&(this.base=window.location.href),N||this.base)try{this.Url=this.base?new URL(T,this.base):new URL(T),this.href=this.Url.href,this.protocol=this.Url.protocol,this.origin=this.Url.origin,this.hash=this.Url.hash,this.search=this.Url.search,R=this.Url.pathname}catch(L){this.Url=void 0}this.Path=new v.default(R),this.directory=this.Path.directory,this.filename=this.Path.filename,this.extension=this.Path.extension}return y(E,[{key:'path',value:function(){return this.Path}},{key:'resolve',value:function(_){var R,N=-1<_.indexOf('://');return N?_:(R=C.default.resolve(this.directory,_),this.origin+R)}},{key:'relative',value:function(_){return C.default.relative(_,this.directory)}},{key:'toString',value:function(){return this.href}}]),E}();u.default=S,s.exports=u['default']},function(s,u,p){'use strict';function f(k,C){if(!(k instanceof C))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(u,'__esModule',{value:!0});var g=function(){function k(C,S){for(var E=0;E<S.length;E++){var T=S[E];T.enumerable=T.enumerable||!1,T.configurable=!0,'value'in T&&(T.writable=!0),Object.defineProperty(C,T.key,T)}}return function(C,S,E){return S&&k(C.prototype,S),E&&k(C,E),C}}(),y=p(24),x=function(C){return C&&C.__esModule?C:{default:C}}(y),v=function(){function k(C){f(this,k);var S,E;S=C.indexOf('://'),-1<S&&(C=new URL(C).pathname),E=this.parse(C),this.path=C,this.directory=this.isDirectory(C)?C:E.dir+'/',this.filename=E.base,this.extension=E.ext.slice(1)}return g(k,[{key:'parse',value:function(S){return x.default.parse(S)}},{key:'isAbsolute',value:function(S){return x.default.isAbsolute(S||this.path)}},{key:'isDirectory',value:function(S){return'/'===S.charAt(S.length-1)}},{key:'resolve',value:function(S){return x.default.resolve(this.directory,S)}},{key:'relative',value:function(S){return x.default.relative(this.directory,S)}},{key:'splitPath',value:function(S){return this.splitPathRe.exec(S).slice(1)}},{key:'toString',value:function(){return this.path}}]),k}();u.default=v,s.exports=u['default']},function(s,u,p){(function(f){'use strict';function g(k){if('string'!=typeof k)throw new TypeError('Path must be a string. Received '+k)}function y(k,C){var S='',E=-1,T=0,_;for(var N=0;N<=k.length;++N){if(N<k.length)_=k.charCodeAt(N);else if(47===_)break;else _=47;if(47===_){if(E==N-1||1==T);else if(E!=N-1&&2==T){if(2>S.length||46!==S.charCodeAt(S.length-1)||46!==S.charCodeAt(S.length-2))if(2<S.length){for(var R=S.length-1,L=R;0<=L&&47!==S.charCodeAt(L);--L);if(L!==R){S=-1===L?'':S.slice(0,L),E=N,T=0;continue}}else if(2===S.length||1===S.length){S='',E=N,T=0;continue}C&&(0<S.length?S+='/..':S='..')}else 0<S.length?S+='/'+k.slice(E+1,N):S=k.slice(E+1,N);E=N,T=0}else 46===_&&-1!=T?++T:T=-1}return S}function x(k,C){var S=C.dir||C.root,E=C.base||(C.name||'')+(C.ext||'');return S?S===C.root?S+E:S+k+E:E}var v={resolve:function(){var E,C='',S=!1;for(var T=arguments.length-1;-1<=T&&!S;T--){var _;(0<=T?_=arguments[T]:(void 0==E&&(E=f.cwd()),_=E),g(_),0!==_.length)&&(C=_+'/'+C,S=47===_.charCodeAt(0))}return(C=y(C,!S),S)?0<C.length?'/'+C:'/':0<C.length?C:'.'},normalize:function(C){if(g(C),0===C.length)return'.';var S=47===C.charCodeAt(0),E=47===C.charCodeAt(C.length-1);return C=y(C,!S),0!==C.length||S||(C='.'),0<C.length&&E&&(C+='/'),S?'/'+C:C},isAbsolute:function(C){return g(C),0<C.length&&47===C.charCodeAt(0)},join:function(){if(0===arguments.length)return'.';var C;for(var S=0;S<arguments.length;++S){var E=arguments[S];g(E),0<E.length&&(C==void 0?C=E:C+='/'+E)}return void 0===C?'.':v.normalize(C)},relative:function(C,S){if(g(C),g(S),C===S)return'';if(C=v.resolve(C),S=v.resolve(S),C===S)return'';for(var E=1;E<C.length&&47===C.charCodeAt(E);++E);for(var T=C.length,_=T-E,N=1;N<S.length&&47===S.charCodeAt(N);++N);for(var R=S.length,L=R-N,P=_<L?_:L,A=-1,O=0;O<=P;++O){if(O===P){if(L>P){if(47===S.charCodeAt(N+O))return S.slice(N+O+1);if(0==O)return S.slice(N+O)}else _>P&&(47===C.charCodeAt(E+O)?A=O:0===O&&(A=0));break}var B=C.charCodeAt(E+O),z=S.charCodeAt(N+O);if(B!==z)break;else 47===B&&(A=O)}var W='';for(O=E+A+1;O<=T;++O)(O===T||47===C.charCodeAt(O))&&(W+=0===W.length?'..':'/..');return 0<W.length?W+S.slice(N+A):(N+=A,47===S.charCodeAt(N)&&++N,S.slice(N))},_makeLong:function(C){return C},dirname:function(C){if(g(C),0===C.length)return'.';var S=C.charCodeAt(0),E=47===S,T=-1,_=!0;for(var N=C.length-1;1<=N;--N)if(S=C.charCodeAt(N),47!==S)_=!1;else if(!_){T=N;break}return-1===T?E?'/':'.':E&&1===T?'//':C.slice(0,T)},basename:function(C,S){if(S!==void 0&&'string'!=typeof S)throw new TypeError('\"ext\" argument must be a string');g(C);var E=0,T=-1,_=!0,N;if(void 0!==S&&0<S.length&&S.length<=C.length){if(S.length===C.length&&S===C)return'';var R=S.length-1,L=-1;for(N=C.length-1;0<=N;--N){var P=C.charCodeAt(N);if(47!==P)-1==L&&(_=!1,L=N+1),0<=R&&(P===S.charCodeAt(R)?-1==--R&&(T=N):(R=-1,T=L));else if(!_){E=N+1;break}}return E===T?T=L:-1===T&&(T=C.length),C.slice(E,T)}for(N=C.length-1;0<=N;--N)if(47!==C.charCodeAt(N))-1==T&&(_=!1,T=N+1);else if(!_){E=N+1;break}return-1===T?'':C.slice(E,T)},extname:function(C){g(C);var S=-1,E=0,T=-1,_=!0,N=0;for(var R=C.length-1;0<=R;--R){var L=C.charCodeAt(R);if(47===L){if(!_){E=R+1;break}continue}-1==T&&(_=!1,T=R+1),46===L?-1==S?S=R:1!=N&&(N=1):-1!=S&&(N=-1)}return-1===S||-1===T||0==N||1==N&&S===T-1&&S===E+1?'':C.slice(S,T)},format:function(C){if(null===C||'object'!=typeof C)throw new TypeError('Parameter \"pathObject\" must be an object, not '+typeof C);return x('/',C)},parse:function(C){g(C);var S={root:'',dir:'',base:'',ext:'',name:''};if(0===C.length)return S;var _,E=C.charCodeAt(0),T=47===E;T?(S.root='/',_=1):_=0;for(var N=-1,R=0,L=-1,P=!0,A=C.length-1,O=0;A>=_;--A){if(E=C.charCodeAt(A),47===E){if(!P){R=A+1;break}continue}-1==L&&(P=!1,L=A+1),46===E?-1==N?N=A:1!=O&&(O=1):-1!=N&&(O=-1)}return-1==N||-1==L||0==O||1==O&&N==L-1&&N==R+1?-1!=L&&(0==R&&T?S.base=S.name=C.slice(1,L):S.base=S.name=C.slice(R,L)):(0==R&&T?(S.name=C.slice(1,N),S.base=C.slice(1,L)):(S.name=C.slice(R,N),S.base=C.slice(R,L)),S.ext=C.slice(N,L)),0<R?S.dir=C.slice(0,R-1):T&&(S.dir='/'),S},sep:'/',delimiter:':',posix:null};s.exports=v}).call(u,p(25))},function(s){function u(){throw new Error('setTimeout has not been defined')}function p(){throw new Error('clearTimeout has not been defined')}function f(L){if(S===setTimeout)return setTimeout(L,0);if((S===u||!S)&&setTimeout)return S=setTimeout,setTimeout(L,0);try{return S(L,0)}catch(P){try{return S.call(null,L,0)}catch(A){return S.call(this,L,0)}}}function g(L){if(E===clearTimeout)return clearTimeout(L);if((E===p||!E)&&clearTimeout)return E=clearTimeout,clearTimeout(L);try{return E(L)}catch(P){try{return E.call(null,L)}catch(A){return E.call(this,L)}}}function y(){_&&N&&(_=!1,N.length?T=N.concat(T):R=-1,T.length&&x())}function x(){if(!_){var L=f(y);_=!0;for(var P=T.length;P;){for(N=T,T=[];++R<P;)N&&N[R].run();R=-1,P=T.length}N=null,_=!1,g(L)}}function v(L,P){this.fun=L,this.array=P}function k(){}var C=s.exports={},S,E;(function(){try{S='function'==typeof setTimeout?setTimeout:u}catch(L){S=u}try{E='function'==typeof clearTimeout?clearTimeout:p}catch(L){E=p}})();var T=[],_=!1,N,R=-1;C.nextTick=function(L){var P=Array(arguments.length-1);if(1<arguments.length)for(var A=1;A<arguments.length;A++)P[A-1]=arguments[A];T.push(new v(L,P)),1!==T.length||_||f(x)},v.prototype.run=function(){this.fun.apply(null,this.array)},C.title='browser',C.browser=!0,C.env={},C.argv=[],C.version='',C.versions={},C.on=k,C.addListener=k,C.once=k,C.off=k,C.removeListener=k,C.removeAllListeners=k,C.emit=k,C.binding=function(){throw new Error('process.binding is not supported')},C.cwd=function(){return'/'},C.chdir=function(){throw new Error('process.chdir is not supported')},C.umask=function(){return 0}}])});";

class Epub extends Component {

  constructor(props) {
    super(props);

    var bounds = Dimensions.get("window");

    this.book_url = this.props.src;
    this.state = {
      title: "",
      modalVisible: false,
      toc: [],
      page: 0,
      show: false,
      width: bounds.width,
      height: bounds.height
    };

    this.book = ePub({
      replacements: "base64"
    });
  }

  componentDidMount() {

    Orientation.addOrientationListener(this._orientationDidChange.bind(this));

    // fetch(EPUBJS_LOCATION)
    //   .then((response) => response.text())
    //   .then((text) => {
    //     this._epubjsLib = text;

    this._loadBook(this.book_url);

    //   return text;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.orientation !== this.props.orientation) {
      _orientationDidChange(nextProps.orientation);
    } else if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.redisplay();
    } else if (nextProps.flow !== this.props.flow) {
      this.rendition.flow(nextProps.flow || "paginated");
      this.redisplay();
    }

    if (nextProps.location !== this.props.location) {
      this.rendition.display(nextProps.location);
    }

    if (nextProps.theme !== this.props.theme) {
      this.rendition.themes.apply(nextProps.theme);
    }

    if (nextProps.fontSize !== this.props.fontSize) {
      this.rendition.themes.fontSize(nextProps.fontSize);
    }
  }

  _orientationDidChange(orientation) {
    var location = this._visibleLocation ? this._visibleLocation.start : this.props.location;
    var bounds = Dimensions.get("window");
    var width = bounds.width;
    var height = bounds.height;

    console.log("orientation", orientation, location);

    this.setState({ width, height }, () => {
      this.redisplay(location);
    });
  }

  redisplay(location) {
    var _location = location;
    if (!_location) {
      _location = this._visibleLocation ? this._visibleLocation.start : this.props.location;
    }

    if (this.rendition) {
      this.rendition.manager.clear(() => {
        this.rendition.layout(this.rendition.settings.globalLayoutProperties);
        this.rendition.display(_location);
      });
    }
  }

  _loadBook(bookUrl) {
    console.log("loading book: ", bookUrl);
    var type = this.book.determineType(bookUrl);

    global.book = this.book;

    if (type === "directory" || type === "opf") {
      return this._openBook(bookUrl);
    }

    // this.book.settings.encoding = "base64";

    return RNFetchBlob.config({
      fileCache: true
    }).fetch("GET", bookUrl).then(res => {

      return res.base64().then(content => {
        // new_zip.loadAsync(content, {"base64" : true });
        this._openBook(content, true);

        // remove the temp file
        res.flush();
      });
    }).catch(err => {
      console.error(err);
    });
  }

  _openBook(bookArrayBuffer, useBase64) {
    var type = useBase64 ? "base64" : null;
    this.book.open(bookArrayBuffer, type).catch(err => {
      console.error(err);
    });

    // Load the epubjs library into a hook for each webview
    book.spine.hooks.content.register(function (doc, section) {
      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.textContent = EPUBJS;
      // script.src = EPUBJS_DATAURL;
      doc.getElementsByTagName("head")[0].appendChild(script);
    }.bind(this));

    // load epubjs in views
    /*
    book.spine.hooks.content.register(function(doc, section) {
      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", EPUBJS_LOCATION);
       doc.getElementsByTagName("head")[0].appendChild(script);
    });
    */

    this.manager = this.refs["manager"];

    this.rendition = new Rendition(this.book, {
      flow: this.props.flow || "paginated",
      minSpreadWidth: 600,
      manager: this.manager
    });

    // this.rendition.setManager(this.manager);

    if (this.props.themes) {
      this.rendition.themes.register(this.props.themes);
    }

    if (this.props.theme) {
      this.rendition.themes.apply(this.props.theme);
    }

    if (this.props.fontSize) {
      this.rendition.themes.fontSize(this.props.fontSize);
    }

    if (this.props.location) {
      this.rendition.display(this.props.location);
    } else {
      this.rendition.display(0);
    }

    this.rendition.on("locationChanged", visibleLocation => {

      this._visibleLocation = visibleLocation;

      if (this.props.onLocationChange) {
        this.props.onLocationChange(visibleLocation);
      }
    });

    this.book.ready.then(() => {
      this.props.onReady && this.props.onReady(this.book);
    });

    this.book.loaded.navigation.then(nav => {
      this.setState({ toc: nav.toc });
      this.props.onNavigationReady && this.props.onNavigationReady(nav.toc);
    });

    this.loadLocations();
  }

  loadLocations() {
    this.book.ready.then(() => {
      // Load in stored locations from json or local storage
      var key = this.book.key() + "-locations";

      return AsyncStorage.getItem(key).then(stored => {
        if (stored !== null) {
          return this.book.locations.load(stored);
        } else {
          return this.book.locations.generate(600).then(locations => {
            // Save out the generated locations to JSON
            AsyncStorage.setItem(key, this.book.locations.save());
          });
        }
      });
    }).then(() => {
      this.props.onLocationsReady && this.props.onLocationsReady(this.book.locations);
    });
  }

  visibleLocation() {
    return this._visibleLocation;
  }

  _onShown(shouldShow) {
    this.setState({ show: shouldShow });
  }

  render() {

    var loader;
    if (!this.state.show) {
      loader = <View style={styles.loadScreen}>
          <ActivityIndicator color={this.props.color || "black"} size={this.props.size || "large"} style={{ flex: 1 }} />
        </View>;
    }

    return <View style={styles.container}>

        <EpubViewManager ref="manager" style={styles.manager} flow={this.props.flow || "paginated"} request={this.book.load.bind(this.book)} onPress={this.props.onPress} onShow={this._onShown.bind(this)} bounds={{ width: this.props.width || this.state.width,
        height: this.props.height || this.state.height }} />
        {loader}
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  manager: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#F8F8F8"
  },
  rowContainer: {
    flex: 1
  },
  loadScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

module.exports = Epub;