
1. 模糊查询组件
    范例
    <kz-fuzzy @end="handlerEnd" :match="serchFilter" :set-val="setVal" @keydown="handlerKeydown" :options="options"
    v-model="selVal2" :data="serchList">
    <el-button tabindex="-1" @end="handleClick(scope)" class="kz-mini-size" slot="btn" size="mini" type="success">选择</el-button>
    </kz-fuzzy>

   <kz-editable-fuzzy @end="handlerEnd" :match="serchFilter" :set-val="setVal" @keydown="handlerKeydown" :options="options"
    v-model="selVal2" :data="serchList">
    <el-button tabindex="-1" @end="handleClick(scope)" class="kz-mini-size" slot="btn" size="mini" type="success">选择</el-button>
    </kz-editable-fuzzy>

    options: [{label: "名称", prop: "name", width: "180px",}, { label: "规格", prop: "number", width: "280px"}, {label: "折扣", prop: "discountRate", width: "60px",}]
    serchList: [{id: "22", barCode: "", categoryId: "110200",categoryName: "汽机油",carModel: "111",discountRate: 0,name: "壳牌 1102000002 汽机油",number: "超凡喜力（SN） 5W-40/1L"}]

组件：kz-fuzzy   
    1. data 被模糊的数据对象 数组类型 可以是 字符串数组也可以是 对象数组。
    2. option 组件设置 用来设置多列的模糊查询项。
       每个item包括 label 表头
                   prop 对应项属性
                   width 项宽度     
    3. keydown 当keydown时触发
    4. change  当某一模糊查询项目被选中时触发。
    5. end     当组件失去焦点时候被触发
    6. match   当前数据的过滤方法
    7.v-model  输入框要绑定的值 

 组件： kz-editable-fuzzy 
    参数同上 默认不展示编辑框    

2.可编辑的输入框
 <kz-editable-input @end="handlerEnd" @keydown="handlerKeydown" v-model="selVal1"></kz-editable-input>
属性：
    1.end   当组件失去焦点时候被触发
    2.keydown    当keydown时触发
    3.v-model  输入框要绑定的值   

3.顶部与侧边导航栏
    <kz-aside  @isload="loaded"  :test="test" :fold="fold" :current-position="currentPosition" @left-change="leftChange" :toggle="toggle"></kz-aside>
    <kz-head   @tab-change="tabChange" @changecompont="changecompont" @changestyle="changestyle" :enterprise-list="enterpriseList" :fault-com="faultCom" :nav-list="navList" :current-position="currentPosition"></kz-head>
组件：kz-aside
    1.侧边导航栏
    2.currentPosition 侧边栏当前停留位置
    3.leftChange 点击侧边栏某一栏目时触发

组件：kz-head
    1.navList 顶部导航栏数据选项
    2.enterpriseList 顶部登录账号数据
    3.currentPosition 当前停留位置
    4.tabChange 点击tab栏切换时触发