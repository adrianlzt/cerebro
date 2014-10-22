/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * See the source code here:
 *     http://code.google.com/p/episodes/
 */
(function(){function d(){return(new Date).getTime()}function f(){g&&clearTimeout(g);g=setTimeout(function(){h()},5E3)}
function h(){function a(a){if(void 0!==i[a]){var e=escape(escape(a)+"="+i[a]);e.length+3<=c?(c-=e.length+3,b.push(e),delete i[a]):D=!0}}g&&(clearTimeout(g),g=null);var b=[],c=1800,e=[],D=!1;if(!j){if(!i.winload){f();return}var o=escape(512<location.href.length?location.href.substring(0,512):location.href);e.push("url="+o);c-=o.length+4;a("navigation");a("domload");a("winload");j=!0}for(var L in i)a(L);b.length&&(o=b.join("%26"),e.push("v="+k.version),e.push("xt="+k.xt),e.push("vid="+l),e.push("ets="+
o),img=new Image,img.src=("http:"===document.location.protocol?"http:":"https:")+"//beacon.tracelytics.com/"+k.cid+"/__tl.gif?"+e.join("&"));D&&f()}this._tly||(this._tly={});var k=this._tly;k.version="0.3";for(var m=document.location,n=m.protocol+"//"+m.hostname+":"+m.port,p=this.postMessage||function(){},g,q={},i={},l="",r=0;16>r;r++)var s=Math.floor(64*Math.random()),l=l+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".substring(s,s+1);
k.mark=function(a,b){a?(q[a]=parseInt(b||d()),p("_tly:mark:"+a+":"+b,n),"firstbyte"===a&&k.measure("navigation","firstbyte","starttime")):t()};
k.measure=function(a,b,c){if(a){a.push&&(a=a.join(" "));a=512<a.length?a.substring(0,512):a;if(void 0===b)b="number"===typeof q[a]?q[a]:q.firstbyte;else if("number"===typeof q[b])b=q[b];else if("number"!==typeof b){t();return}if(void 0===c)c=d();else if("number"===typeof q[c])c=q[c];else if("number"!==typeof c){t();return}i[a]=parseInt(c-b);p("_tly:measure:"+a+":"+b+":"+c,n);"winload"===a?h():f()}else t()};k.done=function(a){k.mark("done");p("_tly:done",n);a&&a()};var j=!1,t;t=function(){};
var u,v=this.performance||this.mozPerformance||this.msPerformance||this.webkitPerformance;
if(!(u=v&&v.timing&&v.timing.navigationStart)){var w;this.external&&this.external.pageT?w=d()-this.external.pageT:this.gtbExternal&&this.gtbExternal.pageT?w=d()-this.gtbExternal.pageT():this.chrome&&this.chrome.csi&&(w=d()-this.chrome.csi().a);w&&t();var x;if(!(x=w))a:{for(var y=document.cookie.split(" "),z=0;z<y.length;z++)if(0===y[z].indexOf("_tly=")){for(var A=y[z].substring(5).split("&"),B,C,E=0;E<A.length;E++)0===A[E].indexOf("s=")?B=A[E].substring(2):0===A[E].indexOf("r=")&&(C=escape(document.referrer)==
A[E].substring(2));if(C&&B){t();x=B;break a}}x=void 0}u=x}var F=u;F&&k.mark("starttime",F);var G=function(){document.cookie="_tly=s="+Number(new Date)+"&r="+escape(document.location)+"; path=/"};"undefined"!=typeof this.attachEvent?this.attachEvent("onbeforeunload",G):this.addEventListener&&this.addEventListener("beforeunload",G,!1);for(var H=k.q,I=H.length,J=0;J<I;J++){var K=H[J],M=K[0];"mark"===M?k.mark(K[1],K[2]):"measure"===M?k.measure(K[1],K[2],K[3]):"done"===M&&k.done(K[1])};}());