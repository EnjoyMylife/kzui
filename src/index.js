import Card from '@/components/Card'
import Fuzzy from '@/components/Fuzzy'
import EditableFuzzy from '@/components/EditableFuzzy'
import EditableInput from '@/components/EditableInput'
import Frame from '@/components/Frame';
import FrameWarp from '@/components/FrameWarp';
import Aside from '@/components/com/Aside';
import Head from '@/components/com/Head';


let kzui = { Card,Fuzzy,EditableFuzzy,EditableInput,Frame,FrameWarp,Aside,Head }
const install = () => {
  for (let k in kzui) {
    window.Vue.component(kzui[k].name, kzui[k]);
  }
}
(typeof window !== 'undefined' && window.Vue && install()) || (kzui.install = install)
export default kzui;