function b(){}const J=t=>t;function wt(t,e){for(const n in e)t[n]=e[n];return t}function st(t){return t()}function Z(){return Object.create(null)}function E(t){t.forEach(st)}function S(t){return typeof t=="function"}function Jt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let D;function Kt(t,e){return D||(D=document.createElement("a")),D.href=e,t===D.href}function $t(t){return Object.keys(t).length===0}function ot(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Qt(t){let e;return ot(t,n=>e=n)(),e}function Ut(t,e,n){t.$$.on_destroy.push(ot(e,n))}function Vt(t,e,n,i){if(t){const r=ct(t,e,n,i);return t[0](r)}}function ct(t,e,n,i){return t[1]&&i?wt(n.ctx.slice(),t[1](i(e))):n.ctx}function Xt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)c[o]=e.dirty[o]|r[o];return c}return e.dirty|r}return e.dirty}function Yt(t,e,n,i,r,c){if(r){const s=ct(e,n,i,c);t.p(s,r)}}function Zt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function te(t){return t??""}function ee(t){return t&&S(t.destroy)?t.destroy:b}function ne(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}const lt=typeof window<"u";let K=lt?()=>window.performance.now():()=>Date.now(),Q=lt?t=>requestAnimationFrame(t):b;const T=new Set;function ut(t){T.forEach(e=>{e.c(t)||(T.delete(e),e.f())}),T.size!==0&&Q(ut)}function U(t){let e;return T.size===0&&Q(ut),{promise:new Promise(n=>{T.add(e={c:t,f:n})}),abort(){T.delete(e)}}}let W=!1;function Et(){W=!0}function vt(){W=!1}function Nt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Tt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const d=e[u];d.claim_order!==void 0&&l.push(d)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,d=(r>0&&e[n[r]].claim_order<=u?r+1:Nt(1,r,h=>e[n[h]].claim_order,u))-1;i[l]=n[d]+1;const a=d+1;n[a]=l,r=Math.max(a,r)}const c=[],s=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<c.length&&s[l].claim_order>=c[u].claim_order;)u++;const d=u<c.length?c[u]:null;t.insertBefore(s[l],d)}}function at(t,e){t.appendChild(e)}function ft(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function At(t){const e=F("style");return kt(ft(t),e),e.sheet}function kt(t,e){return at(t.head||t,e),e.sheet}function Mt(t,e){if(W){for(Tt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){t.insertBefore(e,n||null)}function Ct(t,e,n){W&&!n?Mt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function k(t){t.parentNode&&t.parentNode.removeChild(t)}function ie(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function F(t){return document.createElement(t)}function dt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t){return document.createTextNode(t)}function re(){return V(" ")}function se(){return V("")}function tt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function oe(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ht(t){return Array.from(t.childNodes)}function _t(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ht(t,e,n,i,r=!1){_t(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function mt(t,e,n,i){return ht(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function ce(t,e,n){return mt(t,e,n,F)}function le(t,e,n){return mt(t,e,n,dt)}function Lt(t,e){return ht(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>V(e),!0)}function ue(t){return Lt(t," ")}function et(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function ae(t,e){const n=et(t,"HTML_TAG_START",0),i=et(t,"HTML_TAG_END",n);if(n===i)return new nt(void 0,e);_t(t);const r=t.splice(n,i-n+1);k(r[0]),k(r[r.length-1]);const c=r.slice(1,r.length-1);for(const s of c)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new nt(c,e)}function fe(t,e){e=""+e,t.data!==e&&(t.data=e)}function de(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let P;function jt(){if(P===void 0){P=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{P=!0}}return P}function _e(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=F("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=jt();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=tt(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=tt(i.contentWindow,"resize",e),e()}),at(t,i),()=>{(r||c&&i.contentWindow)&&c(),k(i)}}function Dt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function he(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const c=r.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(r)):c===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}class Pt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=dt(n.nodeName):this.e=F(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)St(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(k)}}class nt extends Pt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Ct(this.t,this.n[n],e)}}function me(t,e){return new t(e)}const O=new Map;let R=0;function zt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ot(t,e){const n={stylesheet:At(e),rules:{}};return O.set(t,n),n}function q(t,e,n,i,r,c,s,o=0){const l=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=l){const y=e+(n-e)*c(p);u+=p*100+`%{${s(y,1-y)}}
`}const d=u+`100% {${s(n,1-n)}}
}`,a=`__svelte_${zt(d)}_${o}`,h=ft(t),{stylesheet:f,rules:_}=O.get(h)||Ot(h,t);_[a]||(_[a]=!0,f.insertRule(`@keyframes ${a} ${d}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${r}ms 1 both`,R+=1,a}function B(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),R-=r,R||Rt())}function Rt(){Q(()=>{R||(O.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&k(e)}),O.clear())})}let j;function L(t){j=t}function pt(){if(!j)throw new Error("Function called outside component initialization");return j}function pe(t){pt().$$.on_mount.push(t)}function ye(t){pt().$$.after_update.push(t)}const N=[],it=[];let A=[];const rt=[],yt=Promise.resolve();let I=!1;function gt(){I||(I=!0,yt.then(bt))}function ge(){return gt(),yt}function M(t){A.push(t)}const G=new Set;let v=0;function bt(){if(v!==0)return;const t=j;do{try{for(;v<N.length;){const e=N[v];v++,L(e),qt(e.$$)}}catch(e){throw N.length=0,v=0,e}for(L(null),N.length=0,v=0;it.length;)it.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];G.has(n)||(G.add(n),n())}A.length=0}while(N.length);for(;rt.length;)rt.pop()();I=!1,G.clear(),L(t)}function qt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}function Bt(t){const e=[],n=[];A.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),A=e}let H;function X(){return H||(H=Promise.resolve(),H.then(()=>{H=null})),H}function $(t,e,n){t.dispatchEvent(Dt(`${e?"intro":"outro"}${n}`))}const z=new Set;let g;function be(){g={r:0,c:[],p:g}}function xe(){g.r||E(g.c),g=g.p}function Wt(t,e){t&&t.i&&(z.delete(t),t.i(e))}function we(t,e,n,i){if(t&&t.o){if(z.has(t))return;z.add(t),g.c.push(()=>{z.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Y={duration:0};function $e(t,e,n){const i={direction:"in"};let r=e(t,n,i),c=!1,s,o,l=0;function u(){s&&B(t,s)}function d(){const{delay:h=0,duration:f=300,easing:_=J,tick:m=b,css:p}=r||Y;p&&(s=q(t,0,1,f,h,_,p,l++)),m(0,1);const y=K()+h,C=y+f;o&&o.abort(),c=!0,M(()=>$(t,!0,"start")),o=U(x=>{if(c){if(x>=C)return m(1,0),$(t,!0,"end"),u(),c=!1;if(x>=y){const w=_((x-y)/f);m(w,1-w)}}return c})}let a=!1;return{start(){a||(a=!0,B(t),S(r)?(r=r(i),X().then(d)):d())},invalidate(){a=!1},end(){c&&(u(),c=!1)}}}function Ee(t,e,n){const i={direction:"out"};let r=e(t,n,i),c=!0,s;const o=g;o.r+=1;function l(){const{delay:u=0,duration:d=300,easing:a=J,tick:h=b,css:f}=r||Y;f&&(s=q(t,1,0,d,u,a,f));const _=K()+u,m=_+d;M(()=>$(t,!1,"start")),U(p=>{if(c){if(p>=m)return h(0,1),$(t,!1,"end"),--o.r||E(o.c),!1;if(p>=_){const y=a((p-_)/d);h(1-y,y)}}return c})}return S(r)?X().then(()=>{r=r(i),l()}):l(),{end(u){u&&r.tick&&r.tick(1,0),c&&(s&&B(t,s),c=!1)}}}function ve(t,e,n,i){const r={direction:"both"};let c=e(t,n,r),s=i?0:1,o=null,l=null,u=null;function d(){u&&B(t,u)}function a(f,_){const m=f.b-s;return _*=Math.abs(m),{a:s,b:f.b,d:m,duration:_,start:f.start,end:f.start+_,group:f.group}}function h(f){const{delay:_=0,duration:m=300,easing:p=J,tick:y=b,css:C}=c||Y,x={start:K()+_,b:f};f||(x.group=g,g.r+=1),o||l?l=x:(C&&(d(),u=q(t,s,f,m,_,p,C)),f&&y(0,1),o=a(x,m),M(()=>$(t,f,"start")),U(w=>{if(l&&w>l.start&&(o=a(l,m),l=null,$(t,o.b,"start"),C&&(d(),u=q(t,s,o.b,o.duration,0,p,c.css))),o){if(w>=o.end)y(s=o.b,1-s),$(t,o.b,"end"),l||(o.b?d():--o.group.r||E(o.group.c)),o=null;else if(w>=o.start){const xt=w-o.start;s=o.a+o.d*p(xt/o.duration),y(s,1-s)}}return!!(o||l)}))}return{run(f){S(c)?X().then(()=>{c=c(r),h(f)}):h(f)},end(){d(),o=l=null}}}function Ne(t){t&&t.c()}function Te(t,e){t&&t.l(e)}function Ft(t,e,n,i){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),i||M(()=>{const s=t.$$.on_mount.map(st).filter(S);t.$$.on_destroy?t.$$.on_destroy.push(...s):E(s),t.$$.on_mount=[]}),c.forEach(M)}function Gt(t,e){const n=t.$$;n.fragment!==null&&(Bt(n.after_update),E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function It(t,e){t.$$.dirty[0]===-1&&(N.push(t),gt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ae(t,e,n,i,r,c,s,o=[-1]){const l=j;L(t);const u=t.$$={fragment:null,ctx:[],props:c,update:b,not_equal:r,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Z(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let d=!1;if(u.ctx=n?n(t,e.props||{},(a,h,...f)=>{const _=f.length?f[0]:h;return u.ctx&&r(u.ctx[a],u.ctx[a]=_)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](_),d&&It(t,a)),h}):[],u.update(),d=!0,E(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){Et();const a=Ht(e.target);u.fragment&&u.fragment.l(a),a.forEach(k)}else u.fragment&&u.fragment.c();e.intro&&Wt(t.$$.fragment),Ft(t,e.target,e.anchor,e.customElement),vt(),bt()}L(l)}class ke{$destroy(){Gt(this,1),this.$destroy=b}$on(e,n){if(!S(n))return b;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!$t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ie as $,Ft as A,Gt as B,dt as C,le as D,Mt as E,b as F,te as G,tt as H,Vt as I,he as J,Yt as K,Zt as L,Xt as M,Ut as N,J as O,ne as P,Kt as Q,M as R,ke as S,$e as T,Ee as U,Qt as V,_e as W,ve as X,nt as Y,ae as Z,ee as _,re as a,E as a0,Ct as b,ue as c,we as d,se as e,xe as f,Wt as g,k as h,Ae as i,ye as j,F as k,ce as l,Ht as m,oe as n,pe as o,de as p,V as q,Lt as r,Jt as s,ge as t,fe as u,be as v,it as w,me as x,Ne as y,Te as z};