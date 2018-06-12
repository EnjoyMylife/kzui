import Card from '@/components/Card'
import Fuzzy from '@/components/Fuzzy'
import EditableFuzzy from '@/components/EditableFuzzy'
import EditableInput from '@/components/EditableInput'
import Frame from '@/components/Frame';
import FrameWarp from '@/components/FrameWarp';
import Aside from '@/components/com/Aside';
import Head from '@/components/com/Head';

import  querystring from "@/lib/querystring";
import  http from "@/lib/http";

import KzTabs from './components/Tabs/src/tabs.vue'
import KzNav from './components/Tabs/src/tab-nav.vue'
import KzTabPanel from './components/Tabs/src/tab-panel.vue'



let kzui = { Card,Fuzzy,EditableFuzzy,EditableInput,Frame,FrameWarp,Aside,Head,KzTabs,KzNav,KzTabPanel }
// const install = () => {
//   for (let k in kzui) {
//     window.Vue.component(kzui[k].name, kzui[k]);
//     console.log(kzui[k])
//   }
// }
// (typeof window !== 'undefined' && window.Vue && install()) || (kzui.install = install)
// export default kzui;

if (typeof window !== 'undefined' && window.Vue) {
  // Vue.use(Element)
  window.Vue.component('kz-frame', Frame);
  window.Vue.component('kz-card', Card);
  window.Vue.component('kz-frame-warp', FrameWarp);
  window.Vue.component('kz-editable-fuzzy', EditableFuzzy)
  window.Vue.component('kz-editable-input', EditableInput)
  window.Vue.component('kz-tabs', KzTabs)
  window.Vue.component('kz-tab-nav', KzNav)
  window.Vue.component('kz-tab-panel', KzTabPanel)
  window.Vue.component('kz-fuzzy', Fuzzy)
  window.Vue.component('kz-aside', Aside)
  window.Vue.component('kz-head', Head)
}
(typeof window !== 'undefined' && window.Vue && install()) || (kzui.install = install)
kzui.querystring=querystring;
kzui.http=http;

export default kzui;