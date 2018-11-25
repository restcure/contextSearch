/*!
 * icojs v0.12.1
 * (c) egy186
 * https://github.com/egy186/icojs/blob/master/LICENSE
 */
!function(t,e){var r,n;"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(r=t.ICO,n=e(),(t.ICO=n).noConflict=function(){return t.ICO=r,n})}(this,function(){"use strict";function t(t,e){return t(e={exports:{}},e.exports),e.exports}var n="image/png",r=t(function(t){var e=n,r={decode:function(e){return new Promise(function(a){var t=URL.createObjectURL(new Blob([e])),o=document.createElement("img");o.src=t,o.onload=function(){var t=o.naturalHeight,e=o.naturalWidth,r=document.createElement("canvas");r.width=e,r.height=t;var n=r.getContext("2d");n.drawImage(o,0,0);var i=n.getImageData(0,0,e,t).data;a({data:i,height:t,width:e})}})},encode:function(u){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:e;return new Promise(function(t){var e=u.data,r=u.height,n=u.width,i=document.createElement("canvas");i.width=n,i.height=r;for(var a=i.getContext("2d"),o=a.createImageData(n,r),h=o.data,f=0;f<h.length;f++)h[f]=e[f];a.putImageData(o,0,0),t(function(t){for(var e=atob(t.replace(/.+,/,"")),r=new Uint8Array(e.length),n=0;n<e.length;n++)r[n]=e.charCodeAt(n);return r.buffer}(i.toDataURL(s)))})}};t.exports=r}),e=function(t){if(t instanceof Uint8Array)return new DataView(t.buffer,t.byteOffset,t.byteLength);if(t instanceof ArrayBuffer)return new DataView(t);throw new TypeError("Expected `data` to be an ArrayBuffer or Uint8Array")},i=Object.freeze({default:e,__moduleExports:e}),a=i&&e||i,o=t(function(t){t.exports=function(t){var e=a(t);return 0===e.getUint16(0,!0)&&1===e.getUint16(2,!0)}}),h=function(){function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}();var p=function(){function a(t,e,r){var n,i;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),this.format=r.format,this.offset=e,this.depth=r.colorDepth,this.stride=(n=r.width*this.depth/8,(i=n%4)?n+4-i:n),this.size=this.stride*r.height,this.data=t.slice(this.offset,this.offset+this.size),this.size!==this.data.byteLength)throw new Error("Truncated bitmap data")}return h(a,[{key:"get",value:function(t,e,r){var n=this.format.indexOf(r);return 1===this.depth?(this.data[e*this.stride+(t/8|0)]&1<<7-t%8*1)>>7-t%8*1:2===this.depth?(this.data[e*this.stride+(t/4|0)]&3<<6-t%4*2)>>>6-t%4*2:4===this.depth?(this.data[e*this.stride+(t/2|0)]&15<<4-t%2*4)>>>4-t%2*4:this.data[e*this.stride+t*(this.depth/8)+n]}}]),a}();function w(t,e,r){var n=t.getUint32(0,!0),i=t.getUint32(4,!0)/1|0,a=t.getUint32(8,!0)/2|0,o=t.getUint16(14,!0),h=t.getUint32(32,!0);0===h&&o<=8&&(h=1<<o);var f=0===i?e:i,u=0===a?r:a,s=new Uint8Array(t.buffer,t.byteOffset+n,t.byteLength-n);return{width:f,height:u,data:h?function(t,e){var r=e.colorCount,n=e.colorDepth,i=e.height,a=e.width;if(8!==n&&4!==n&&2!==n&&1!==n)throw new Error("A color depth of "+n+" is not supported");for(var o=new p(t,0,{width:r,height:1,colorDepth:32,format:"BGRA"}),h=new p(t,o.offset+o.size,{width:a,height:i,colorDepth:n,format:"C"}),f=new p(t,h.offset+h.size,{width:a,height:i,colorDepth:1,format:"A"}),u=new Uint8Array(a*i*4),s=0,c=0;c<i;c++)for(var d=0;d<a;d++){var g=h.get(d,i-c-1,"C");u[s++]=o.get(g,0,"R"),u[s++]=o.get(g,0,"G"),u[s++]=o.get(g,0,"B"),u[s++]=f.get(d,i-c-1,"A")?0:255}return u}(s,{width:f,height:u,colorDepth:o,colorCount:h}):function(t,e){var r=e.colorDepth,n=e.height,i=e.width;if(32!==r&&24!==r)throw new Error("A color depth of "+r+" is not supported");for(var a=new p(t,0,{width:i,height:n,colorDepth:r,format:"BGRA"}),o=24===r?new p(t,a.offset+a.size,{width:i,height:n,colorDepth:1,format:"A"}):null,h=new Uint8Array(i*n*4),f=0,u=0;u<n;u++)for(var s=0;s<i;s++)h[f++]=a.get(s,n-u-1,"R"),h[f++]=a.get(s,n-u-1,"G"),h[f++]=a.get(s,n-u-1,"B"),h[f++]=32===r?a.get(s,n-u-1,"A"):o.get(s,n-u-1,"A")?0:255;return h}(s,{width:f,height:u,colorDepth:o}),colorDepth:o}}var f=function(t){var p=a(t);if(p.byteLength<6)throw new Error("Truncated header");if(0!==p.getUint16(0,!0))throw new Error("Invalid magic bytes");var l=p.getUint16(2,!0);if(1!==l&&2!==l)throw new Error("Invalid image type");var e=p.getUint16(4,!0);if(p.byteLength<6+16*e)throw new Error("Truncated image list");return Array.from({length:e},function(t,e){var r,n,i,a,o,h,f=p.getUint8(6+16*e+0),u=p.getUint8(6+16*e+1),s=p.getUint32(6+16*e+8,!0),c=p.getUint32(6+16*e+12,!0),d=2!==l?null:{x:p.getUint16(6+16*e+4,!0),y:p.getUint16(6+16*e+6,!0)};if(h=c,2303741511===(o=p).getUint32(h+0)&&218765834===o.getUint32(h+4))return{bpp:function(t,e){var r=t.getUint8(e+24),n=t.getUint8(e+25);if(0===n)return 1*r;if(2===n)return 3*r;if(3===n)return 1*r;if(4===n)return 2*r;if(6===n)return 4*r;throw new Error("Invalid PNG colorType")}(p,c),data:new Uint8Array(p.buffer,p.byteOffset+c,s),height:(i=p,a=c,i.getUint32(a+20,!1)),hotspot:d,type:"png",width:(r=p,n=c,r.getUint32(n+16,!1))};var g=w(new DataView(p.buffer,p.byteOffset+c,s),f,u);return{bpp:g.colorDepth,data:g.data,height:g.height,hotspot:d,type:"bmp",width:g.width}})},u=t(function(t){var a=n;t.exports=function(t,r,n){var e=null;try{e=f(t)}catch(t){return Promise.reject(t)}var i=function(e){return n.encode(e,r).then(function(t){return Object.assign(e,{buffer:t,type:r.replace("image/","")})})};return Promise.all(e.map(function(t){return r===a&&"png"===t.type?Promise.resolve(Object.assign({buffer:t.data.buffer.slice(t.data.byteOffset,t.data.byteOffset+t.data.byteLength)},t)):(e=t,"png"!==e.type?Promise.resolve(e):n.decode(e.data).then(function(t){return Object.assign(e,{data:t.data,type:"bmp"})})).then(i);var e}))}}),s=n;return{isICO:o,parse:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:s;return u(t,e,r)}}});
//# sourceMappingURL=ico.js.map