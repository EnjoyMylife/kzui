import Card from '@/components/Card'
import Fuzzy from '@/components/Fuzzy'
import EditableFuzzy from '@/components/EditableFuzzy'
import EditableInput from '@/components/EditableInput'
import Frame from '@/components/Frame';
import FrameWarp from '@/components/FrameWarp';
import Aside from '@/components/com/Aside';
import Head from '@/components/com/Head';
import KzTabs from './components/Tabs/src/tabs.vue'
import KzNav from './components/Tabs/src/tab-nav.vue'
import KzTabPanel from './components/Tabs/src/tab-panel.vue'
import querystring from "@/lib/querystring";
import http from "@/lib/http";
import cookie from "@/lib/cookie";
import object from "@/lib/object";
require("@/lib/string");
require("@/lib/date");


let kzui = { Card, Fuzzy, EditableFuzzy, EditableInput, Frame, FrameWarp, Aside, Head, KzTabs, KzNav, KzTabPanel }
const install = () => {
  for (let k in kzui) {
    window.Vue.component(kzui[k].name, kzui[k]);
    // console.log(kzui[k])
  }
  window.kzPublicApi={
    http,querystring,cookie,object
  }
}
// export default kzui;
(typeof window !== 'undefined' && window.Vue && install()) || (kzui.install = install)
export default kzui;