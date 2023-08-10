import{N as Te,O as te,S as R,i as z,s as X,e as W,b as A,H as _e,g as H,v as Z,d as O,f as F,h as b,o as J,k as I,l as M,m as N,n as E,P as ne,E as C,Q as U,R as se,T as re,U as V,M as le,a as P,c as q,V as He,W as ie,X as j,q as Le,y as ye,Y as G,r as Ce,z as ge,A as pe,Z as oe,_ as Se,B as ve,$ as Ie,w as Me}from"../chunks/index.7ff5f637.js";import{w as x}from"../chunks/index.9aebe0c3.js";function we(s){const e=s-1;return e*e*e+1}function ae(s,{delay:e=0,duration:n=400,easing:t=Te}={}){const r=+getComputedStyle(s).opacity;return{delay:e,duration:n,easing:t,css:l=>`opacity: ${l*r}`}}function K(s,{delay:e=0,duration:n=400,easing:t=we,x:r=0,y:l=0,opacity:i=0}={}){const a=getComputedStyle(s),o=+a.opacity,f=a.transform==="none"?"":a.transform,_=o*(1-i),[h,y]=te(r),[c,g]=te(l);return{delay:e,duration:n,easing:t,css:(w,k)=>`
			transform: ${f} translate(${(1-w)*h}${y}, ${(1-w)*c}${g});
			opacity: ${o-_*k}`}}function ce(s){let e,n,t,r,l,i,a,o,f,_;return{c(){e=I("button"),n=I("img"),this.h()},l(h){e=M(h,"BUTTON",{class:!0});var y=N(e);n=M(y,"IMG",{class:!0,src:!0,alt:!0}),y.forEach(b),this.h()},h(){E(n,"class","detail-image svelte-17ms1nj"),ne(n.src,t=s[3])||E(n,"src",t),E(n,"alt",s[2]),E(e,"class","image-detail-mask svelte-17ms1nj")},m(h,y){A(h,e,y),C(e,n),o=!0,f||(_=_e(e,"click",s[9]),f=!0)},p(h,y){s=h,(!o||y&8&&!ne(n.src,t=s[3]))&&E(n,"src",t),(!o||y&4)&&E(n,"alt",s[2])},i(h){o||(U(()=>{o&&(l&&l.end(1),r=se(n,s[5],{}),r.start())}),U(()=>{o&&(a&&a.end(1),i=se(e,ae,{duration:100}),i.start())}),o=!0)},o(h){r&&r.invalidate(),l=re(n,K,s[4]),i&&i.invalidate(),a=re(e,ae,{duration:s[1]}),o=!1},d(h){h&&b(e),h&&l&&l.end(),h&&a&&a.end(),f=!1,_()}}}function Ae(s){let e,n,t,r,l=s[0]&&ce(s);return{c(){l&&l.c(),e=W()},l(i){l&&l.l(i),e=W()},m(i,a){l&&l.m(i,a),A(i,e,a),n=!0,t||(r=_e(window,"keydown",s[6]),t=!0)},p(i,[a]){i[0]?l?(l.p(i,a),a&1&&H(l,1)):(l=ce(i),l.c(),H(l,1),l.m(e.parentNode,e)):l&&(Z(),O(l,1,1,()=>{l=null}),F())},i(i){n||(H(l),n=!0)},o(i){O(l),n=!1},d(i){l&&l.d(i),i&&b(e),t=!1,r()}}}const ue="image-detail-button";function Ne(s,e,n){let t,r,{element:l}=e,{visible:i=!1}=e,{durationIn:a=250}=e,{durationOut:o=500}=e;const f={duration:o,y:50};J(()=>{const c=l.parentElement;if(!c||c.tagName==="BUTTON"&&c.className===ue)return;const g=document.createElement("button");g.addEventListener("click",()=>n(0,i=!0)),g.className=ue,c.insertBefore(g,l),g.appendChild(l)});const _=c=>{const g=l.getBoundingClientRect(),w=c.getBoundingClientRect(),k=g.x-w.x,p=g.y-w.y,S=g.width/w.width,L=g.height/w.height;return{css:(T,m)=>`
				translate: ${m*k}px ${m*p}px;
				scale: ${S+T*(1-S)} ${L+T*(1-L)};
			`,duration:a,easing:we}},h=c=>{i&&c.key==="Escape"&&n(0,i=!1)},y=()=>n(0,i=!1);return s.$$set=c=>{"element"in c&&n(7,l=c.element),"visible"in c&&n(0,i=c.visible),"durationIn"in c&&n(8,a=c.durationIn),"durationOut"in c&&n(1,o=c.durationOut)},s.$$.update=()=>{s.$$.dirty&128&&n(3,t=l.src),s.$$.dirty&128&&n(2,r=l.alt)},[i,o,r,t,f,_,h,l,a,y]}class Oe extends R{constructor(e){super(),z(this,e,Ne,Ae,X,{element:7,visible:0,durationIn:8,durationOut:1})}}function Be(s,e,n){let t,{mathContainer:r}=e,l=1;const i=()=>{l!==1?n(1,l=1):(n(1,l=r.clientWidth/r.scrollWidth),r.scrollTo({left:0,top:0,behavior:"smooth"}))};return J(()=>{n(0,r.onclick=()=>i(),r),i()}),s.$$set=a=>{"mathContainer"in a&&n(0,r=a.mathContainer)},s.$$.update=()=>{s.$$.dirty&1&&(t=r.firstElementChild),s.$$.dirty&3&&r.classList.toggle("fit",l!==1),s.$$.dirty&2&&(t.style.scale=l.toString())},[r,l]}class De extends R{constructor(e){super(),z(this,e,Be,null,X,{mathContainer:0})}}const Pe=s=>{const e=s.querySelectorAll('a[href^="#"]:not([data-is-citation])'),n=Array.from(e.values()).map(t=>{const r=()=>{try{var l=s.querySelector(t.getAttribute("href")??"_")}catch{return}l&&($.set(l),be.set(t))};return t.addEventListener("mouseenter",r),r});return{destroy:()=>{e.forEach((t,r)=>t.removeEventListener("mouseenter",n[r]))}}},$=x(null),be=(()=>{const s=x(null),e=()=>{s.set(null),$.set(null)};return{subscribe:s.subscribe,set:n=>{const t=V(s);t&&t.removeEventListener("mouseleave",e),n==null||n.addEventListener("mouseleave",e),s.set(n)}}})();function fe(s){let e,n,t,r,l,i,a;return{c(){e=I("div"),n=I("div"),t=P(),r=I("div"),this.h()},l(o){e=M(o,"DIV",{style:!0,class:!0});var f=N(e);n=M(f,"DIV",{class:!0});var _=N(n);_.forEach(b),t=q(f),r=M(f,"DIV",{class:!0}),N(r).forEach(b),f.forEach(b),this.h()},h(){E(n,"class","content"),E(r,"class","gradient"),E(e,"style",s[5]),E(e,"class","preview svelte-46vjkm"),U(()=>s[13].call(e))},m(o,f){A(o,e,f),C(e,n),n.innerHTML=s[3],C(e,t),C(e,r),l=He(e,s[13].bind(e)),a=!0},p(o,f){(!a||f&8)&&(n.innerHTML=o[3]),(!a||f&32)&&E(e,"style",o[5])},i(o){a||(U(()=>{a&&(i||(i=ie(e,K,{y:20},!0)),i.run(1))}),a=!0)},o(o){i||(i=ie(e,K,{y:20},!1)),i.run(0),a=!1},d(o){o&&b(e),l(),o&&i&&i.end()}}}function qe(s){let e,n,t=s[4]&&s[2]&&fe(s);return{c(){t&&t.c(),e=W()},l(r){t&&t.l(r),e=W()},m(r,l){t&&t.m(r,l),A(r,e,l),n=!0},p(r,[l]){r[4]&&r[2]?t?(t.p(r,l),l&20&&H(t,1)):(t=fe(r),t.c(),H(t,1),t.m(e.parentNode,e)):t&&(Z(),O(t,1,1,()=>{t=null}),F())},i(r){n||(H(t),n=!0)},o(r){O(t),n=!1},d(r){t&&t.d(r),r&&b(e)}}}function Ve(s,e,n){let t,r,l,i,a,o,f;le(s,be,p=>n(11,o=p)),le(s,$,p=>n(12,f=p));let _=0,h=0,y,c,g=!1,w;function k(){y=this.clientWidth,c=this.clientHeight,n(0,y),n(1,c)}return s.$$.update=()=>{if(s.$$.dirty&4096&&n(2,t=f),s.$$.dirty&2048&&n(10,r=o),s.$$.dirty&516&&(t?n(9,w=setTimeout(()=>n(8,g=!0),500)):(n(8,g=!1),clearTimeout(w))),s.$$.dirty&260&&n(4,l=g&&t),s.$$.dirty&1235&&l&&r){const p=r.getBoundingClientRect();n(6,_=p.x+window.scrollX+p.width/2-y/2),p.y<window.innerHeight/2?n(7,h=p.y+p.height):n(7,h=p.y-p.height-c),n(6,_=Math.max(0,Math.min(window.innerWidth-y,_))),n(7,h=Math.max(0,Math.min(window.innerHeight-c,h))),n(6,_+=window.scrollX),n(7,h+=window.scrollY)}s.$$.dirty&192&&n(5,i=`--x: ${_}px; top: ${h}px;`),s.$$.dirty&12&&n(3,a=(()=>{let S="",L=t;for(let T=0;L&&T<3;T++)S+=L.outerHTML,L=L.nextElementSibling;return S})())},[y,c,t,a,l,i,_,h,g,w,r,o,f,k]}class We extends R{constructor(e){super(),z(this,e,Ve,qe,X,{})}}const Ue=s=>typeof s.scrollPosition=="number"&&typeof s.toHash=="string",D=x([]),Ee=s=>{let e=null;try{if(e=document.querySelector(s),!e)return!1}catch{return!1}return e.scrollIntoView({behavior:"smooth"}),!0},Re=s=>{window.scrollTo({top:s,behavior:"smooth"})},ze=s=>e=>{e.preventDefault(),Ee(s.hash);const n={scrollPosition:window.scrollY,toHash:s.hash};history.pushState(n,s.hash,s.hash),D.update(t=>t.concat(n))},Q=s=>{const e=V(D).length;if(e){for(;s<0;)s+=e;Re(V(D)[s].scrollPosition),D.update(n=>[...n.slice(0,s),...n.slice(s+1)])}},he=s=>Q(s.detail),Xe=s=>{window.addEventListener("popstate",t=>{const{state:r}=t;Ue(r)?(D.update(l=>[...l,r]),Ee(r.toHash)):V(D).length&&(Q(-1),t.preventDefault())}),window.addEventListener("",t=>{V(D).length&&(Q(-1),t.preventDefault())}),s.addEventListener("history:restore",he);const e=s.querySelectorAll('a[href^="#"]'),n=Array.from(e.values()).map(t=>{const r=ze(t);return t.addEventListener("click",r),r});return{destroy:()=>{e.forEach((t,r)=>t.removeEventListener("click",n[r])),s.removeEventListener("history:restore",he)}}};function me(s,e,n){const t=s.slice();return t[10]=e[n],t}function de(s){let e,n;return e=new Oe({props:{element:s[10]}}),{c(){ye(e.$$.fragment)},l(t){ge(e.$$.fragment,t)},m(t,r){pe(e,t,r),n=!0},p(t,r){const l={};r&2&&(l.element=t[10]),e.$set(l)},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){O(e.$$.fragment,t),n=!1},d(t){ve(e,t)}}}function Ye(s){let e,n,t,r,l=`<style scoped>${s[3]}</style>`,i,a,o,f,_,h,y,c,g=s[4].html+"",w,k,p,S,L,T=s[1],m=[];for(let u=0;u<T.length;u+=1)m[u]=de(me(s,T,u));const ke=u=>O(m[u],1,1,()=>{m[u]=null});return k=new We({}),{c(){e=I("div");for(let u=0;u<m.length;u+=1)m[u].c();n=P(),t=I("div"),r=new j(!1),i=P(),a=new j(!1),o=P(),f=I("section"),_=I("h2"),h=Le("Bibliography"),y=P(),c=new j(!1),w=P(),ye(k.$$.fragment),this.h()},l(u){e=M(u,"DIV",{class:!0});var v=N(e);for(let Y=0;Y<m.length;Y+=1)m[Y].l(v);v.forEach(b),n=q(u),t=M(u,"DIV",{class:!0});var d=N(t);r=G(d,!1),i=q(d),a=G(d,!1),o=q(d),f=M(d,"SECTION",{class:!0});var B=N(f);_=M(B,"H2",{});var ee=N(_);h=Ce(ee,"Bibliography"),ee.forEach(b),y=q(B),c=G(B,!1),B.forEach(b),d.forEach(b),w=q(u),ge(k.$$.fragment,u),this.h()},h(){E(e,"class","image-details"),r.a=i,a.a=o,c.a=null,E(f,"class","bibliography svelte-um1gdn"),E(t,"class","container svelte-um1gdn")},m(u,v){A(u,e,v);for(let d=0;d<m.length;d+=1)m[d]&&m[d].m(e,null);A(u,n,v),A(u,t,v),r.m(l,t),C(t,i),a.m(s[2],t),C(t,o),C(t,f),C(f,_),C(_,h),C(f,y),c.m(g,f),s[6](t),A(u,w,v),pe(k,u,v),p=!0,S||(L=[oe(Xe.call(null,t)),oe(Pe.call(null,t))],S=!0)},p(u,[v]){if(v&2){T=u[1];let d;for(d=0;d<T.length;d+=1){const B=me(u,T,d);m[d]?(m[d].p(B,v),H(m[d],1)):(m[d]=de(B),m[d].c(),H(m[d],1),m[d].m(e,null))}for(Z(),d=T.length;d<m.length;d+=1)ke(d);F()}},i(u){if(!p){for(let v=0;v<T.length;v+=1)H(m[v]);H(k.$$.fragment,u),p=!0}},o(u){m=m.filter(Boolean);for(let v=0;v<m.length;v+=1)O(m[v]);O(k.$$.fragment,u),p=!1},d(u){u&&b(e),Se(m,u),u&&b(n),u&&b(t),s[6](null),u&&b(w),ve(k,u),S=!1,Ie(L)}}}function je(s,e,n){let{data:t}=e;const{html:r,css:l,headings:i,bibliography:a}=t;let o,f=[];const _=()=>{const c=o.querySelectorAll(".math.math-display");for(const g of c)g.scrollWidth<=g.clientWidth||new De({target:g,props:{mathContainer:g}})},h=()=>{n(1,f=Array.from(o.querySelectorAll("img")))};J(()=>{_(),h()});function y(c){Me[c?"unshift":"push"](()=>{o=c,n(0,o)})}return s.$$set=c=>{"data"in c&&n(5,t=c.data)},[o,f,r,l,a,t,y]}class Qe extends R{constructor(e){super(),z(this,e,je,Ye,X,{data:5})}}export{Qe as component};