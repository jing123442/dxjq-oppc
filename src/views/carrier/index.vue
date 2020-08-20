<template>
  <div class="template-main">
    <em-table-list :tableListName="'carrier'" :axios="axios" :queryCustURL="queryCustURL" :responseSuccess="response_success" :queryParam="queryParams" :mode_list="mode_list" :page_status="page_status" :page_column="page_column" :select_list="select_list" @onListEvent="onListEvent" @onReqParams="onReqParams"></em-table-list>

    <!-- 添加车辆 -->
    <el-dialog title="添加车辆" :visible.sync="dialogAddCarVisible" :width="add_edit_dialog">
      <!-- <el-form :model="formAddCar" :rules="rules" ref="formAddCar"  size="small">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="formAddCar.orgName" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="卡车名称" :label-width="formLabelWidth" prop="truckName">
          <el-input v-model="formAddCar.truckName" placeholder="请输入卡车名称"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" :label-width="formLabelWidth" prop="carNumber">
          <el-input v-model="formAddCar.carNumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="车架号" :label-width="formLabelWidth" prop="frameNumber">
          <el-input v-model="formAddCar.frameNumber" placeholder="请输入车架号"></el-input>
        </el-form-item>
        <el-form-item label="挂车牌号" :label-width="formLabelWidth">
          <el-input v-model="formAddCar.trailerNumber" placeholder="请输入挂车牌号"></el-input>
        </el-form-item>
        <el-form-item label="购车日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formAddCar.purchaseDate"
            type="date"
            size="large"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="颜色" :label-width="formLabelWidth" prop="color">
          <el-input v-model="formAddCar.color" placeholder="请输入车辆颜色"></el-input>
        </el-form-item>
         <el-form-item label="载重量" :label-width="formLabelWidth" prop="deadWeight">
          <el-input v-model="formAddCar.deadWeight" placeholder="请输入车辆载重量"></el-input>
        </el-form-item>
         <el-form-item label="储气罐容量" :label-width="formLabelWidth" prop="capacity">
          <el-input v-model="formAddCar.capacity" placeholder="请输入车辆储气罐容量"></el-input>
        </el-form-item>
         <el-form-item label="生产厂家" :label-width="formLabelWidth" prop="manufacturer">
          <el-input v-model="formAddCar.manufacturer" placeholder="请输入车辆生产厂家"></el-input>
        </el-form-item>
      </el-form> -->
      <Form :rules="rules" :formArr="formAddCar" :mode="formAddCar" :ref="addCarRef" :addCarRef="addCarRef"></Form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCarVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddCarConfirm('formAddCar')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->

    <el-dialog title="物流公司详情" :visible.sync="dialogDetailVisible" :width="add_edit_dialog">
      <el-form :model="formDetail" :rules="rules" ref="formAddCar">
        <el-form-item label="公司名称：">
          {{formDetail.orgName}}
        </el-form-item>
        <el-form-item label="联系人：" prop="name">
          {{formDetail.contacts}}
        </el-form-item>
        <el-form-item label="联系电话：">
          {{formDetail.mobile}}
        </el-form-item>
        <el-form-item label="地址：">
          {{formDetail.address}}
        </el-form-item>
        <el-form-item label="邮箱：">
          {{formDetail.email}}
        </el-form-item>
        <el-form-item label="法人姓名：">
          {{formDetail.legalperson}}
        </el-form-item>
        <el-form-item label="法人身份证号码：">
          {{formDetail.idCardNo}}
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          {{formDetail.bank}}
        </el-form-item>
        <el-form-item label="银行账户" prop="account">
          {{formDetail.account}}
        </el-form-item>
        <el-form-item label="纳税人识别号：">
          {{formDetail.taxpayer}}
        </el-form-item>
        <el-form-item label="账号状态：" prop="status">
          {{formDetail.status == 0 ? "启用":"未启用"}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddCarConfirm('formAddCar')">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>
<script>
import { axiosRequestParams, queryDefaultParams } from '@/utils/tools'
import { mapGetters } from 'vuex'
import {
  $carrierTruckAdd
} from '@/service/carrier.js'
import Form from '@/components/Form/form'

export default {
  name: 'carrier',
  components: {
    Form
  },
  data() {
    return {
      isShow: false,
      queryCustURL: {
        edit: {
          url: '/user/org/edit',
          method: 'post'
        },
        list: {
          url: 'user/org/list',
          method: 'post',
          parse: {
            tableData: ['data', 'records'],
            totalCount: ['data', 'total']
          }
        },
        name: '物流公司'
      },
      axios: axiosRequestParams(this),
      queryParams: queryDefaultParams(this, { type: 2, key: 'param', value: { orgType: 0 } }),
      dialogAddCarVisible: false,
      // formAddCar: {
      //   orgId: '',
      //   orgName: '',
      //   truckName: '',
      //   carNumber: '',
      //   frameNumber: '',
      //   trailerNumber: '',
      //   purchaseDate: '',
      //   color: '',
      //   deadWeight: '',
      //   capacity: '',
      //   manufacturer: ''
      // },
      formLabelWidth: '120px',
      addCarRef: 'formAddCar',
      formAddCar: [
        { filed: 'orgId', value: '', type: '', placeholder: '', label: '', width: '', disabled: false },
        { filed: 'orgName', value: '', type: 'input', placeholder: '请输入公司名称', label: '公司名称', width: '120px', disabled: true },
        { filed: 'truckName', value: '', type: 'input', placeholder: '请输入卡车名称', label: '卡车名称', width: '120px', disabled: false },
        { filed: 'carNumber', value: '', type: 'input', placeholder: '请输入车牌号', label: '车牌号', width: '120px', disabled: false },
        { filed: 'frameNumber', value: '', type: 'input', placeholder: '请输入车架号', label: '车架号', width: '120px', disabled: false }
      ],
      rules: {
        orgId: [{}],
        orgName: [{}],
        truckName: [{ required: true, message: '卡车名称不能为空', trigger: 'blur' }],
        carNumber: [{ required: true, message: '车牌号不能为空', trigger: 'blur' }],
        frameNumber: [{ required: true, message: '车架号不能为空', trigger: 'blur' }],
        trailerNumber: [{}],
        purchaseDate: [{}],
        color: [{ required: true, message: '车辆颜色不能为空', trigger: 'blur' }],
        deadWeight: [{ required: true, message: '车辆载重量不能为空', trigger: 'blur' }],
        capacity: [{ required: true, message: '车辆储气罐容量不能为空', trigger: 'blur' }],
        manufacturer: [{ required: true, message: '车辆生产厂家不能为空', trigger: 'blur' }]
      },
      dialogDetailVisible: false,
      formDetail: {}
    }
  },
  computed: {
    ...mapGetters({
      mode_list: 'carrier_logistics_mode_list',
      page_status: 'carrier_logistics_page_status',
      page_column: 'carrier_logistics_column',
      select_list: 'carrier_logistics_select_list',
      add_edit_dialog: 'add_edit_dialog_form',
      del_dialog: 'del_dialog_form',
      response_success: 'response_success'
    })
  },
  created: function () {},
  methods: {
    onListEvent(type, row) {
      console.log(type, row)
      if (type === 'addCar') {
        // 添加车辆
        this.formAddCar.orgId = row.orgId
        this.formAddCar.orgName = row.orgName
        this.dialogAddCarVisible = true
      } else if (type === 'detail') {
        this.dialogDetailVisible = true
        this.formDetail = { ...row }
        console.log(this.formDetail)
      }
    },
    onReqParams(type, _this, callback) {
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        page: 1,
        size: 10,
        param: {
          orgType: 0
        }
      })
    },
    dialogAddCarConfirm(formData) {
      var self = this
      console.log(this.$refs.formAddCar.$refs.formAddCar)
      this.$refs.formAddCar.$refs.formAddCar.validate((valid) => {
        if (valid) {
          console.log('添加成功', this.formAddCar)
          this.dialogAddCarVisible = false
          $carrierTruckAdd(this.formAddCar).then((res) => {
            if (res.code == 0) {
              self.$message({
                message: res.message,
                type: 'success'
              })
            } else {
              self.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
