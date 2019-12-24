<template>
  <div class="container">
    <div v-for="(project, index) in projects" :key="index" class="projectClass" @click="showDetail(index)">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="project.projectLogoURL" class="image">
        <div style="padding: 14px;">
          <span>{{ project.projectName }}</span>
          <div class="bottom clearfix">
            <el-tooltip effect="dark" content="最后更新时间" placement="bottom">
              <time class="time">{{ currentDate }}</time>
            </el-tooltip>
            <el-button type="text" class="button" @click.stop="deleteProject(project,index)">删除项目</el-button>
          </div>
        </div>
      </el-card>

    </div>
    <div class="projectClass add" @click="createProject">
      <i class="el-icon-plus projects-el-icon-plus" />
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="New Project">
      <el-form :model="createForm" label-position="top">
        <el-form-item label="Project name">
          <el-input v-model="createForm.projectName" auto-complete="off" />
        </el-form-item>

        <el-form-item label="Project describe">
          <el-input
            v-model="createForm.projectDescribe"
            :autosize="{ minRows: 4, maxRows: 6}"
            type="textarea"
            auto-complete="off"
          />
        </el-form-item>

        <el-form-item label="Project logo">
          <div class="uploadContainer">
            <ElementUpload @child="getUrlByChild" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .container{
  margin: 100px auto 0 auto;
  max-width: 1200px;
  }
  .projectClass{
    float: left;
    cursor: pointer;
    margin:0 20px 30px 0;
  }
  .projectClass:hover .el-card{
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
    transform: translate3d(0,-2px,0);
  }
  .add{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #EBEEF5;
    width: 252px;
    height: 352px;
    border-radius: 5px;
    position: relative;
  }
  .add:hover .el-icon-plus{
    color: black;
  }
  .add:hover{
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
    transform: translate3d(0,-2px,0);
  }
  .projects-el-icon-plus{
    color: lightgray;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 250px;
    height: 273px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>

<script>
import ElementUpload from '@/components/ElementUpload'
export default {
  components: {
    ElementUpload
  },
  data() {
    return {
      currentDate: '2019-12-06 11:06',
      projects: [],
      dialogFormVisible: false,
      createForm: {
        projectName: '',
        projectDescribe: '',
        projectLogoURL: ''
      }
    }
  },
  created() {
    this.$api.projects.getProjectList()
      .then(res => {
        console.log('getProjectList:', res)
        if (res.code === 200) {
          this.projects = res.data
        } else {
          this.$message.error('ss')
        }
      })
      .catch(err => console.log(err))
  },
  methods: {
    createProject() {
      this.dialogFormVisible = true
    },
    showDetail(index) {
      this.$router.push({
        path: '/project/' + this.projects[index].id
      })
    },
    getUrlByChild(imgUrl) {
      console.log('getUrlByChild:', imgUrl)
      this.createForm.projectLogoURL = imgUrl
    },
    handleDialogSubmit() {
      this.dialogFormVisible = false
      this.createForm['userId'] = sessionStorage.getItem('userId')
      this.$api.projects.postProject(this.createForm)
        .then(res => {
          if (res.code === 200) {
            this.projects.push(res.data)
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
      this.createForm = {
        projectName: '',
        projectDescribe: '',
        projectLogoURL: ''
      }
    },
    deleteProject(project, index) {
      this.$api.projects.deleteProject(project.id)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message)
            this.projects.splice(index, 1)
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => this.$message.error(err))
    }

  }
}
</script>
