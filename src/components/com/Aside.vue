<style scoped>
.kz-side {
  position: fixed;
  top: 50px;
  bottom: 0;
  z-index: 99;
  width: 180px;
  overflow-x: hidden;
}
.kz-bg-black {
  background-color: #393d49 !important;
}
.kz-side-scroll {
  width: 180px;
  height: 100%;
  overflow-x: hidden;
}
.kz-nav-toggle,
.kz-nav-tree {
  position: relative;
  background-color: #393d49;
  color: #fff;
  border-radius: 2px;
  font-size: 0;
  box-sizing: border-box;
  width: 180px;
  padding: 0;
}
.kz-nav-toggle {
  text-align: center;
  height: 25px;
  line-height: 25px;
  background-color: #565a65;
}
.kz-nav-tree * {
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s;
  -moz-transition: all 0.3s; /* Firefox 4 */
  -webkit-transition: all 0.3s; /* Safari 和 Chrome */
  -o-transition: all 0.3s; /* Opera */
}

.kz-nav-item {
  line-height: 40px;
  display: block;
  width: 100%;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 1px;
}

.kz-nav-tree .kz-nav-item a {
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 20px;
  padding-left: 37px;
  color: #fff;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
.kz-nav-tree .kz-nav-child a {
  padding-left: 20px;
}
.kz-nav-child {
  left: 0;
  top: 65px;
  min-width: 100%;
  line-height: 36px;
  background-color: #393d49;
  border: 1px solid #d2d2d2;
  z-index: 100;
  border-radius: 2px;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  top: 0;
  border: none;
  box-shadow: none;
}
.kz-nav-title {
  display: block;
  background-color: #2b2e37;
  cursor: pointer;
}
.kz-nav-title:hover {
  background: rgba(177, 178, 179, 0.1);
}
.kz-nav-tree .kz-nav-child {
  margin: 0;
}
.kz-nav-tree .kz-nav-child a {
  height: 40px;
  line-height: 40px;
  color: #fff;
  color: rgba(255, 255, 255, 0.7);
}
.kz-nav-tree .kz-nav-child a:hover {
  color: #ffffff;
}
.kz-nav-icon {
  position: absolute;
  right: 10px;
  top: 0px;
}
.kz-nav-item i.kz-nav-icon {
  left: 20px;
}
.kz-nav-child i.kz-nav-icon {
  position: static;
}
.kz-nav-toggle .kz-nav-icon {
  right: 45%;
  top: auto;
}
</style>
<template>
  <div class="kz-side kz-bg-black"> 
   <div class="kz-side-scroll"> 
    <div class="kz-nav-toggle" :style="toggle?'width:50px':'width:180px'" @click='leftMove()'><span class="kz-nav-icon icon iconfont icon-xiangxiajiantou"></span></div>
    <ul class="kz-nav-tree"> 
     <li :key="index" v-for="(item,index) in position[currentPosition]" class="kz-nav-item"> 
            <span @click='toggleFold(index)' class="kz-nav-title"><i :class="'kz-nav-icon icon iconfont '+item.icon"></i>
            <a :style="(locPath==item.path.replace(' ',''))?'color: #72feff':''"  :href="item.path">{{item.name}}</a><span v-if="item.child.length" :class="'kz-nav-icon icon iconfont '+(item.fold?'icon-shangjiantou':'icon-xiajiantou')"></span>
            </span> 
            <dl v-show="item.fold" v-if="item.child.length" class="kz-nav-child"> 
            <dd :key="index1" v-for="(item1,index1) in item.child" @click="contentChange(currentPosition,index1,item1.tabId,item1.name)" :style="tabStyle[currentPosition][index1]">
                <a :style="(locPath==item1.path.replace(' ',''))?((item.fold=true)&&'color: #72feff'):''" :href="item1.path"><i :class="'kz-nav-icon icon iconfont '+item1.icon"  ></i> {{item1.name}}<span v-show="item1.notice" style="border: 4px solid red;border-radius:4px;position: absolute;z-index: 1000;margin-top: 4%;"></span></a> 
            </dd>  
            </dl> 
      </li> 
    </ul> 
   </div> 
  </div>
</template>

<script>
import utils from "../../lib/utils.js";
import fn from "../../lib/fn.js";
let ajax = require("ajax");
(window.userInfo = window.userInfo || {}), //userId, systemId, auth_token, sso_token
  (window.auth_token = ""),
  (window.systemId = "");
export default {
  name:'kz-aside',
  props: ["test", "fold", "currentPosition","toggle","tabData","tabIndex","currentTab"],
  data() {
    return {
      position: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
      },
      tabStyle: { 0: [], 1: [],2: [],3:[],4:[],5:[] },
      defalut: false,
      locPath:
        location.pathname + location.hash == "/"
          ? "/entreprise.html"
          : location.pathname + location.hash
    };
  },
  mounted() {
    let _this = this;
    if (this.test) {
      userInfo = {};
      // console.log(this.currentPosition);
      let data = {
        0: [
          {
            id: 1,
            parentId: 0,
            name: "快准采购",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: "icon-gouwuche"
          },
          {
            id: 2,
            parentId: 0,
            name: "快准活动",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: "icon-shezhi"
          },
          {
            id: 3,
            parentId: 0,
            name: "采购入库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:4,
            name: "采购订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou",
            notice:true
          },
          {
            id: 5,
            parentId: 1,
            tabId:5,
            name: "采购订单查询",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ],
        1: [
          {
            id: 1,
            parentId: 0,
            name: "快准商城订单",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: ""
          },
          {
            id: 2,
            parentId: 0,
            name: "快准销售",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: ""
          },
          {
            id: 3,
            parentId: 0,
            name: "销售出库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:6,
            name: "销售订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ],
        2:[
          {
            id: 1,
            parentId: 0,
            name: "快准仓库",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: ""
          },
          {
            id: 2,
            parentId: 0,
            name: "快准销售",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: ""
          },
          {
            id: 3,
            parentId: 0,
            name: "销售出库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:7,
            name: "销售订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ],
        3:[
          {
            id: 1,
            parentId: 0,
            name: "快准资金",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: ""
          },
          {
            id: 2,
            parentId: 0,
            name: "快准销售",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: ""
          },
          {
            id: 3,
            parentId: 0,
            name: "销售出库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:8,
            name: "销售订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ],
        4:[
          {
            id: 1,
            parentId: 0,
            name: "快准资料",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: ""
          },
          {
            id: 2,
            parentId: 0,
            name: "快准销售",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: ""
          },
          {
            id: 3,
            parentId: 0,
            name: "销售出库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:9,
            name: "销售订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ],
        5:[
          {
            id: 1,
            parentId: 0,
            name: "快准设置",
            nickname: "栏目一",
            description: "栏目一",
            path: "#/entreprise.html",
            icon: ""
          },
          {
            id: 2,
            parentId: 0,
            name: "快准销售",
            nickname: "栏目二",
            description: "栏目二",
            path: "#/property_all.html",
            icon: ""
          },
          {
            id: 3,
            parentId: 0,
            name: "销售出库",
            nickname: "栏目三",
            description: "栏目三",
            path: "#/property_bag.html",
            icon: ""
          },
          {
            id: 4,
            parentId: 1,
            tabId:10,
            name: "销售订单",
            nickname: "子栏目",
            description: "子栏目",
            path: "#/property.html",
            icon: "icon-xiangyoujiantou"
          }
        ]
      };
     // console.log(this.currentPosition);
      for(let i=0;i<6;i++){
        this.position[i] = this.setMenuData(data[i]);
      }
      // this.position.trade = this.setMenuData();
    } else {
      this.getUserMenu();
    }
    window.addEventListener("popstate", function() {
      _this.locPath =
        location.pathname + location.hash == "/"
          ? "/entreprise.html"
          : location.pathname + location.hash;
    });
  },
  methods: {
    setMenuData(data) {
      let menu = [],
        temp = {};
      for (let k = 0; k < data.length; k++) {
        data[k].fold = this.fold ? this.fold : !this.defalut;
        if (data[k].parentId == 0 || !temp[data[k].parentId]) {
          menu.push(data[k]);
          temp[data[k].id] = data[k];
          temp[data[k].id].child = [];
        } else {
          temp[data[k].parentId].child.push(data[k]);
        }
      }
      return menu;
    },
    getUserMenu() {
      var _this = this;
      userInfo =
        utils.getItem("userInfo") && JSON.parse(utils.getItem("userInfo"));
      if (userInfo) {
        auth_token = userInfo.auth_token;
        systemId = userInfo.systemId;
        ajax.get(
          fn.urlAuth +
            "ams/api/user/getUserMenus/" +
            userInfo.userId +
            "/" +
            userInfo.systemId +
            "?auth_token=" +
            userInfo.auth_token, // 跳转到 action
          {},
          function(res) {
            _this.$emit("isload");
            if (!res) {
              console.log("异常！");
              return;
            }
            if (res.code == 200) {
              //console.log("菜单目录：", res);
              _this.menu = _this.setMenuData(res.data);
            } else {
              if ((res.code = "A400600")) {
                location.href = fn.localUrl + "/ams/login.html";
              }
              try {
                fn.commonWindowWarn(res.message);
              } catch (error) {
                alert(res.message);
              }
            }
          }
        );
      } else {
        //登录页面地址
        location.href = fn.localUrl + "/ams/login.html";
      }
    },
    toggleFold(i) {
      this.position[this.currentPosition][i].fold = !this.position[this.currentPosition][i].fold;
    },
    contentChange(currentPosition, i,tabId,tabTitle) {
      this.tabStyle = { 0: [], 1: [] ,2: [],3:[],4:[],5:[]};
      Vue.set(this.tabStyle[currentPosition], i, {
        "background-color": "#ff5d6e"
      });
      // console.log(this.tabStyle[currentPosition][i])
      //tab栏联动
      var flag = false;
      this.tabData.forEach(item => {
        if (item.name == tabId) {
          flag = true;
          return true;
        }
      });
      if (!flag) {
        this.tabData.push({
          title: tabTitle,
          name: tabId
        });
      }
      // this.tabIndex = tabId.toString();
      this.$emit("add-tabs",tabId);
      return this.tabData;
    },
    leftMove(){
        var leftMsg={
          'toggle':!this.toggle,
          'left':!this.toggle?50:180
        }
        //console.log(leftMsg.left);
      this.$emit('left-change', leftMsg)
    }
  }
};
</script>


