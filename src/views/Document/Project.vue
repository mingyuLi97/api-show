<!--
 * @Author: 李明宇
 * @Date: 2019-12-06 15:59:33
 * @LastEditTime : 2019-12-26 17:26:45
 * @LastEditors  : Please set LastEditors
 * @Description: 显示项目的基础界面
 * @FilePath: \APIShow\APIShow\src\views\Document\Project.vue
 -->
<template>
  <div @click="menuShow='None'">
    <div class="header">
      <ElementUpload :img-u-r-l="projectDetail.projectLogoURL" class="logo" @child="getUrlByChild" />
      <!-- <img v-if="projectDetail.projectLogoURL!==''" class="logo" :src="projectDetail.projectLogoURL" alt=""> -->
      <div>
        <el-input v-model="projectDetail.projectName" @blur="updateProjectDetail" />
        <el-input
          v-model="projectDetail.projectDescribe"
          type="textarea"
          autosize
          @blur="updateProjectDetail"
        />
      </div>
    </div>
    <div class="projectContainer">

      <div class="sideBar">
        <!-- {{ modelList[0].functionList[0].functionName }} -->
        <el-menu
          ref="menu"
          class="el-menu-vertical-demo"
          default-active="0-0"
          @select="index => curActiveFunction = index"
        >
          <el-submenu
            v-for="(item, index) in modelList"
            :key="index"
            :index="index+''"
            @contextmenu.native.prevent="handleContextmenu($event,'module',index)"
          >
            <template slot="title">
              <span v-show="index!==isEdit">{{ item.moduleName }}</span>
              <el-input
                v-show="index===isEdit"
                ref="editModuleName"
                v-model="item.moduleName"
                :value="item.moduleName"
                @blur="editModuleNameSubmit"
                @keydown.enter.native="$refs.editModuleName[index].blur()"
              />
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(funcItem,funcIndex) in item.functionList"
                :key="funcIndex"
                :index="index+'-'+funcIndex"
                @contextmenu.native.prevent.stop="handleContextmenu($event,'file',index, funcIndex)"
              >
                <span v-show="!equal([index,funcIndex],isEditFunction)"> {{ funcItem.functionName }}</span>

                <el-input
                  v-show="equal([index,funcIndex],isEditFunction)"
                  :ref="'editFunctionName' + index"
                  v-model="funcItem.functionName"
                  :value="funcItem.functionName"
                  @blur="editFunctionNameSubmit"
                  @keydown.enter.native="$refs['editFunctionName'+index][funcIndex].blur()"
                />
              </el-menu-item>
              <el-menu-item v-show="addFunctionVisible===index">
                <el-input
                  ref="editFileName"
                  v-model="temporaryFileName"
                  @blur="editFileNameSubmit"
                  @keydown.enter.native="editFileNameSubmit"
                />
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-input
            v-show="!addModuleShow"
            ref="content"
            v-model="addModuleNameInput"
            class="addModuleNameInput"
            placeholder="请输入模块名称"
            @keydown.enter.native="$refs.content.blur()"
            @blur="addModuleNameInputSubmit"
            @contextmenu="addModuleShow=true"
          />

          <div v-show="addModuleShow" class="addModel" @click="addModel">
            <i class="el-icon-plus" />
          </div>
        </el-menu>
      </div>

      <div class="detailContainer">
        <doc-show
          :model-path="modelPath"
          :function-path="functionPath"
          :md-text="mdText"
          @set-md-text="setMdText"
          @on-save="handlerSaveMdText"
        />
      </div>

      <div :style="{display: menuShow,left: menuLeft,top: menuTop}" class="menuContainer">
        <ul v-show="selectMode===0">
          <li @click="addModel">new module</li>
          <li @click="addFunction">new file</li>
          <li @click="deleteModule">delete</li>
          <li @click="editModuleName">rename</li>
        </ul>
        <ul v-show="selectMode===1">
          <li @click="addFunction">new file</li>
          <li @click="deleteFunction">delete</li>
          <li @click="editFunctionName">rename</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DocShow from './DocShow'
import ElementUpload from '@/components/ElementUpload'

export default {
  components: {
    DocShow,
    ElementUpload
  },
  inject: ['reload'],
  data() {
    return {
      // 右键菜单
      menuShow: 'none',
      menuTop: '100px',
      menuLeft: '300px',

      isEdit: undefined, // 通过该变量控制 el-input 的显示
      isEditFunction: [],

      curEditModuleIndex: undefined, // 鼠标右击的模块在 modelList 的索引值
      curEditModuleName: '', // 当前编辑的模块名称（原）

      curEditFunctionIndex: undefined,
      curEditFunctionObj: {},
      curEditFunctionName: '',

      addFunctionVisible: undefined,
      temporaryFileName: '',

      originDetail: {}, // 获取数据后深拷贝 通过对比查看数据是否更改
      projectDetail: {
        id: undefined,
        projectLogoURL: '',
        projectDescribe: '',
        projectName: ''
      },

      selectMode: 0, // 0: 选择模块  1: 选择功能
      addModuleNameInput: '',
      addModuleShow: true,
      modelList: [],

      functionPath: '',
      modelPath: '',
      mdText: '',
      putFunctionId: undefined,
      curActiveFunction: '0-0'

    }
  },
  watch: {
    projectDetail: {
      handler(newValue, oldValue) {
        console.log('1111--->', newValue)
      },
      deep: true
    },
    curActiveFunction: function(newVal, oldVal) {
      const [moduleIndex, functionIndex] = this.curActiveFunction.split('-')
      this.functionPath = this.modelList[moduleIndex].functionList[functionIndex].functionName
      this.modelPath = this.modelList[moduleIndex].moduleName
      this.putFunctionId = this.modelList[moduleIndex].functionList[functionIndex].id
      this.mdText = this.modelList[moduleIndex].functionList[functionIndex].mdText
    }

  },
  created() {
    this.getDataList()
  },
  methods: {
    // 判断传入的两个数组是否相等
    equal(a, b) {
      if (a.length !== b.length) {
        return false
      } else {
        // 循环遍历数组的值进行比较
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false
          }
        }
        return true
      }
    },
    getDataList() {
      this.$api.projectDetail.getProjectDetail(this.$route.params.id)
        .then(res => {
          console.log('获取数据列表:', res)

          // 初始化 - id name imgUrl describe
          this.projectDetail = res.data.curProjectDetail

          this.originDetail = JSON.parse(JSON.stringify(this.projectDetail))

          this.modelList = res.data.dataList

          // 初始化 - modelPath、functionPath、putFunctionId
          this.modelPath = this.modelList[0].moduleName
          if (this.modelList[0].functionList.length > 0) {
            this.functionPath = this.modelList[0].functionList[0].functionName
            this.putFunctionId = this.modelList[0].functionList[0].id
            this.mdText = this.modelList[0].functionList[0].mdText
          }
        })
    },
    // 图片上传回调函数
    getUrlByChild(url) {
      this.projectDetail.projectLogoURL = url
      this.updateProjectDetail()
    },

    // 当属性发生更改后向服务器发送请求
    updateProjectDetail() {
      delete this.projectDetail.imgUpdated
      if (this.originDetail.projectName !== this.projectDetail.projectName ||
      this.originDetail.projectDescribe !== this.projectDetail.projectDescribe) {
        this.$api.projects.putProject(this.projectDetail)
          .then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
      }
    },
    // 增加模块
    addModel() {
      // 隐藏 添加按钮 UI
      this.addModuleShow = false
      setTimeout(() => {
        this.$refs.content.focus()
      }, 1)
    },
    addModuleNameInputSubmit() {
      if (this.addModuleNameInput !== '') {
        const addData = {
          moduleName: this.addModuleNameInput,
          projectId: this.$route.params.id
        }
        this.$api.projectDetail.addModule(addData)
          .then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.getDataList()
              this.addModuleNameInput = ''
            } else {
              this.$message.error(res.message)
            }
          })
      }
      this.addModuleShow = true
    },

    // ------------------右键菜单模块---------------------------
    /**
     * @description: 响应鼠标右击事件
     * @param {Object} e: $event
     * @param {String} type: 判断右击的对象是模块还是文件
     * @param {Number} index: for 循环渲染时的 index (当前编辑的模块)
     */
    handleContextmenu(e, type, moduleIndex, funcIndex = undefined) {
      console.log('select mode:', type)
      this.curEditModuleIndex = moduleIndex
      if (type === 'module') {
        this.selectMode = 0
      } else {
        this.curEditFunctionObj = this.modelList[moduleIndex].functionList[funcIndex]
        this.curEditFunctionIndex = funcIndex
        this.selectMode = 1
      }
      this.menuShow = 'block'
      this.menuTop = e.clientY + 'px'
      this.menuLeft = e.clientX + 'px'
    },
    /**
     * @description
     * 更改模块名称 UI 为 input,并获取焦点
     * 当模块名称变动且不为空的时候发起请求
     */
    editModuleName() {
      this.isEdit = this.curEditModuleIndex
      setTimeout(() => {
        this.$refs.editModuleName[this.curEditModuleIndex].focus()
      }, 1)
      this.curEditModuleName = this.modelList[this.curEditModuleIndex].moduleName
    },
    editModuleNameSubmit() {
      console.log('editModuleNameSubmit')
      const editItem = this.modelList[this.curEditModuleIndex]
      console.log(editItem)
      if (editItem.moduleName !== '' && editItem.moduleName !== this.curEditModuleName) {
        const editData = {
          moduleName: editItem.moduleName,
          id: editItem.id
        }
        this.$api.projectDetail.putModule(editData)
          .then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
              this.getDataList()
              // this.modelList[this.curEditModuleIndex].moduleName = this.curEditModuleName
            }
          })
      }
      this.isEdit = undefined
    },

    deleteModule() {
      /**
     * 通过当前正在编辑的模块索引
     * 获取到模块 id
     * 根据 id 发起请求
     * 成功后再根据索引删除列表中的项
     */
      this.$api.projectDetail.deleteModule(this.modelList[this.curEditModuleIndex].id)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.modelList.splice(this.curEditModuleIndex, 1)
          }
        })
    },

    // --------------------------------Function-----------------------------------------

    // ---------------- add function --------------//
    addFunction() {
      console.log('添加功能')
      // 展开选中的模块菜单
      this.$refs.menu.open(this.curEditModuleIndex + '')

      // 当前模块显示输入框
      this.addFunctionVisible = this.curEditModuleIndex

      // 输入框获取焦点
      console.log(this.$refs.editFileName)
      setTimeout(() => {
        this.$refs.editFileName[this.curEditModuleIndex].focus()
      }, 1)
    },
    editFileNameSubmit() {
      if (this.temporaryFileName !== '') {
        const addFunctionData = {
          functionName: this.temporaryFileName,
          moduleId: this.modelList[this.curEditModuleIndex].id,
          mdText: this.temporaryFileName
        }
        this.$api.projectDetail.addFunction(addFunctionData)
          .then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
              this.getDataList()
            } else {
              this.$message.error(res.message)
            }
          })
      }
      this.addFunctionVisible = undefined
      this.temporaryFileName = ''
    },

    // ---------------- delete function --------------//
    deleteFunction() {
      this.$api.projectDetail.deleteFunction(this.curEditFunctionObj.id)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.modelList[this.curEditModuleIndex].functionList.splice(this.curEditFunctionIndex, 1)
          }
        })
    },

    // ---------------- edit function name --------------//
    editFunctionName() {
      this.isEditFunction = [this.curEditModuleIndex, this.curEditFunctionIndex]
      setTimeout(() => {
        console.log(this.$refs.editFunctionName, this.curEditFunctionIndex)
        this.$refs['editFunctionName' + this.curEditModuleIndex][this.curEditFunctionIndex].focus()
      }, 1)
      this.curEditFunctionName = this.curEditFunctionObj.functionName
    },
    editFunctionNameSubmit() {
      const obj = this.curEditFunctionObj
      if (obj.functionName !== '' && obj.functionName !== this.curEditFunctionName) {
        const editData = {
          functionName: obj.functionName,
          id: obj.id
        }
        this.$api.projectDetail.putFunction(editData)
          .then(res => {
            if (res.code === 200) {
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
              this.getDataList()
            }
          })
      }
      this.isEditFunction = []
    },

    // ----------------- update markdown text --------------//
    setMdText(val) {
      this.mdText = val
    },

    handlerSaveMdText(val) {
      const _data = {
        id: this.putFunctionId,
        mdText: val
      }
      this.$api.projectDetail.putFunction(_data)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            const [moduleIndex, functionIndex] = this.curActiveFunction.split('-')
            this.modelList[moduleIndex].functionList[functionIndex].mdText = val
            this.mdText = val
          } else {
            this.$message.error(res.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.projectContainer{
  /* border: 1px solid black; */
  display: flex;
}
.sideBar{
  min-width: 200px;
}
.header {
  display: flex;
  height: 180px;
  border: 1px solid black;
}

.logo {
  display: inline-block;
  margin: 15px 20px auto 20px;
  width: 150px;
  height: 165px;
}
.nameDiv {
  height: 90px;
}

/* 添加模块 */
.addModel {
  border: 1px solid #e6e6e6;
  border-right: 0px;
  height: 40px;
  position: relative;
  border-radius: 4px;
}
.addModel .el-icon-plus{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.addModel:hover{
  cursor: pointer;
  background-color: #ecf5ff;
}
.addModuleNameInput{
  width: 200px;
  /* margin-bottom: 2px; */
}

/* 右键菜单 */
  .menuContainer{
      position: absolute;
      width: 200px;
      border: 1px solid black;
      background-color: #fff;
  }
  .menuContainer li {
      list-style: none;
      line-height: 30px;
      padding-left: 20px;
      cursor: pointer;

  }
  .menuContainer li:hover{
      background-color: lightgrey;
  }
</style>
