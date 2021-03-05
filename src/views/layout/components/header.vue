<template>
  <div class="header">
    <el-row :gutter="10">
      <!--Logo area-->
      <el-col :xs="16" :sm="18" :md="{span:22,offset:0}">
        <div class="logo">
          <span class="logo_prefix">{{prefix}}</span>
          <span class="logo_suffix">{{suffix}}</span>
        </div>
      </el-col>
      <el-col :xs="4" :sm="3" :md="1">
        <div class="download-header">
          <div class="avatar-wrapper-down" @click="userInfoUpdate('download')">
            <img class="download-avatar" src="@/assets/images/home/download.png">
          </div>
        </div>
      </el-col>
      <el-col :xs="4" :sm="3" :md="1">
        <div class="user-header">
          <el-dropdown trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar" src="@/assets/images/home/user.png">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <div class="setting-div" @click="userInfoUpdate('user')">
                  <span class="setting-icon"><i class="icon iconfont el-icon-user"></i></span>
                  <span class="setting-string"> 个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div class="setting-div" @click="userInfoUpdate('pwd')">
                  <span class="setting-icon"><i class="icon iconfont el-icon-lock"></i></span>
                  <span class="setting-string"> 修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div class="setting-div" @click="logout">
                  <span class="setting-icon"><i class="icon iconfont el-icon-switch-button"></i></span>
                  <span class="setting-string"> 退出登录</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: 'header',
      tasks: [
        { id: 1, rank: 1, content: '完成JSPangAdmin头部头部组件的编写。', overTime: '2017/3/9' },
        { id: 2, rank: 2, content: '完成GitHub仓库的初始化工作。', overTime: '2017/3/15' },
        { id: 3, rank: 3, content: '在阿里云进行网站备案，完成后通知组长。', overTime: '2017/3/20' }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    userInfoUpdate(evt) {
      let path = '/mine/mineIndex'

      if (evt === 'pwd') {
        path = '/mine/mineEditPassword'
      } else if (evt === 'download') {
        this.$setSessionStorage('curr_auth_button', 'query$reset$down')
        path = '/settlement/orderDownload'
      }

      if (path !== this.$route.path) {
        this.$router.push({ path: path })
      }
    }
  },
  computed: {
    ...mapGetters([
      'prefix',
      'suffix'
    ])
  }
}

</script>
<style lang="scss" scoped>
  @import "../../../assets/styles/variables.scss";
  .header {
    //logo标题
    .logo {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      cursor: pointer;
      font-size: 22px;
      padding-left: 50px;
      background-size: 40px;
      background-position: center left;
      background-repeat: no-repeat;
      background-image: url(../../../assets/images/logo.png);
      .logo_prefix {
        color: $headerLogoTextColor;
      }
      .logo_suffix {
        color: $headerLogoTextColor;
      }
    } //中间下拉框
    .header-right {
      span {
        display: inline-block;
        margin-left: 14px;
        font-size: 18px;
        color: #fff;
        line-height: 1px;
        height: 18px;
        cursor: pointer;
      }
      span:hover {
        color: $navRightHover;
      }
    }
    .user-header, .download-header {
      line-height: 10px;
      padding-top: 7px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .user-name {
        font-size: 16px;
        padding-right: 10px;
      }
      img {
        cursor: pointer;
      }
    }
  }

  .task-div {
    clear: both;
    height: 55px;
    .task-span {
      display: block;
      float: left;
      font-size: 12px
    }
    .task-content {
      width: 160px;
      line-height: 16px;
      margin-left: 10px;
      padding: 5px;
      .task-time {
        clear: both;
        float: right;
        color: #ccc;
      }
    }
  }

  //用户设置
  .setting-div {
    height: 30px;
    line-height: 30px;
    clear: both;
    span {
      display: block;
      float: left;
      font-size: 12px;
    }
    .setting-icon {
      padding-top: 0px;
      padding-right: 5px;
    }
  }

  //小标题
  .pop-title {
    font-size: 12px;
    color: $navRightHover;
  }

  //头像
  .avatar-wrapper, .avatar-wrapper-down {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar, .download-avatar {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }
    }
    i {
      position: absolute;
      padding: 29px 5px 5px 44px;
      left: -0;
      top: 0;
      font-size: 12px;
      color: $avatarIColor;
    }
    i:hover {
      color: $avatarIHoverColor;
    }
  }

  //国际化
  .international {
    cursor: pointer;
  }

</style>
