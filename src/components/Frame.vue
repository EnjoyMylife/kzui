<template>
<div>
  <div class="kz-layout">
      <kz-aside  @isload="loaded"  :test="test" :fold="fold" :current-position="currentPosition" :current-tab="currentTab" :tab-data="tabData" :tab-index="tabIndex" @left-change="leftChange" @add-tabs="addTabs" :toggle="toggle"></kz-aside>
      <kz-head   @tab-change="tabChange" @changecompont="changecompont" @changestyle="changestyle" :enterprise-list="enterpriseList" :fault-com="faultCom" :nav-list="navList" :current-position="currentPosition"></kz-head>
        <div class="kz-content" :style="'left:'+left+'px'">
            <slot></slot>
        </div>   
  </div>
</div>
   
</template>

<script>
import Aside from "./com/Aside.vue";
import Head from "./com/Head.vue";
export default {
  name:'kz-frame',
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("业务类型名称不能为空"));
      }
      const reg = /^[a-zA-Z\u4e00-\u9fa5]{2,15}$/g;
      if (reg.test(value) === false) {
        callback(new Error("长度必须为2~15个字符，不包含数字或特殊字符"));
      } else {
        callback();
      }
    };
    return {
      load: true,
      left:180,
      toggle:false
    };
  },
  props: ["test", "fold", "enterpriseList", "faultCom","navList","currentPosition","tabData","tabIndex","currentTab"],
  components: {
    "kz-aside": Aside,
    "kz-head": Head
  },
  beforeCreate() {
    var head = document.getElementsByTagName("HEAD").item(0);
    var style = document.createElement("link");
    style.href = "https://at.alicdn.com/t/font_631484_7rhb9hylr5r60f6r.css";
    style.rel = "stylesheet";
    style.type = "text/css";
    head.appendChild(style);
  },
  mounted() {},
  methods: {
    loaded() {
      this.load = false;
    },
    changecompont(i) {
      //console.log(i);
      this.$emit("changecompont", i);
    },
    changestyle(i){
     // console.log(i);
      this.$emit("changestyle", i);
    },
    tabChange(index){
      //  console.log(index);
        this.$emit('tab-change', index);
    },
    leftChange(leftMsg){
     // console.log(leftMsg);
      this.left=leftMsg.left;
      this.toggle=leftMsg.toggle;
    },
    addTabs(tabId){
      this.$emit("add-tabs",tabId);
    }
  }
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
}
.lqb-afclear {
  zoom: 1;
}
.lqb-afclear:after {
  content: "\20";
  display: block;
  height: 0;
  clear: both;
}
.kz-content {
  position: absolute;
  border-radius: 3px;
  top: 50px;
  bottom: 0;
  right: 0;
  z-index: 666;
  width: auto;
  background: #ecf0f5;
  border-top: 3px solid #d2d6de;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 15px;
  margin-top:0;
  margin-left: 1px;
}
</style>
