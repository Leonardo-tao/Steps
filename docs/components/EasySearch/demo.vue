<template>
  <div class="multi-condition">
    <el-form class="searchForm" :model="queryParams" ref="queryForm" inline label-width="auto">
      <slot></slot>
      <el-form-item v-for="(item, index) in exposedFields" :key="index" :label="item.label" :prop="item.field">
        <el-input v-model="item.value" :placeholder="item.label" clearable @keyup.enter="easySearch" />
      </el-form-item>
      <el-form-item>
        <el-popover placement="bottom" width="auto" trigger="click">
          <el-table :data="conditions" :show-header="false" max-height="280px">
            <el-table-column prop="field" label="字段" width="150" align="center">
              <template v-slot="scope">
                <el-select v-model="scope.row.field" placeholder="字段" :clearable="false"
                  @change="handleFieldChange(scope.row)">
                  <el-option v-for="item in fields" :key="item.field" :label="item.label" :value="item.field" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="operator" label="比较" width="100" align="center">
              <template v-slot="scope">
                <el-select v-model="scope.row.operator" placeholder="比较" :clearable="false"
                  :disabled="!scope.row.modifiable" @change="handleOpChange(scope.row)">
                  <el-option v-for="op in operators" :key="op.value" :label="op.label" :value="op.value" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="值" width="280" align="center">
              <template v-slot="scope" v-if="scope.row.style !== 'none'">
                <el-date-picker v-if="scope.row.style == 'datetime'" v-model="scope.row.value" type="daterange"
                  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :clearable="false" />
                <el-input-number v-else-if="scope.row.style == 'number'" v-model="scope.row.value" :min="0" />
                <el-input v-else v-model="scope.row.value" clearable />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50" align="center">
              <template v-slot="scope">
                <el-button type="danger" icon="el-icon-delete" circle plain size="mini"
                  @click="removeCondition(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="opts">
            <el-link icon="el-icon-plus" :underline="false" @click="addCondition">添加条件</el-link>
            <el-link icon="el-icon-refresh" :underline="false" @click="resetConditions">重置条件</el-link>
            <el-link icon="el-icon-magic-stick" :underline="false" @click="addAllConditions">一键生成</el-link>
          </div>
          <template #reference>
            <el-button icon="el-icon-s-operation">更多搜索条件({{ conditions.length }})</el-button>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="easySearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EasySearch",
  async created() {
    // 初始化字段列表
    this.initFields();
  },
  data() {
    return {
      // 查询参数
      queryParams: {},
      // 字段列表
      fields: [{
        label: "姓名",
        field: "name",
        type: "input"
      },{
        label: "年龄",
        field: "age",
        type: "number"
      },{
        label: "性别",
        field: "gender",
        type: "select",
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
      },{
        label: "状态",
        field: "status",
        type: "select",
        options: [
          { label: "启用", value: "enabled" },
          { label: "禁用", value: "disabled" },
        ],
      }, {
        label: "创建时间",
        field: "createTime",
        type: "date",
      }, {
        label: "更新时间",
        field: "updateTime",
        type: "date",
      }, {
        label: "备注",
        field: "remark",
        type: "input",
      }],
      // 添加字段索引
      addIndex: 0, 
      // 条件列表
      conditions: [], 
      // 默认显示字段数
      exposeNum: 3, 
      // 初始化字段列表
      exposedFields: [], 
      // 操作符列表
      operators: [
        { label: "等于", value: "eq" },
        { label: "不等于", value: "ne" },
        { label: "大于", value: "gt" },
        { label: "小于", value: "lt" },
        { label: "大于等于", value: "ge" },
        { label: "小于等于", value: "le" },
        { label: "包含", value: "ct" },
        { label: "不包含", value: "nc" },
        { label: "为空", value: "nu" },
        { label: "不为空", value: "nn" },
        { label: "在...之间", value: "bt" }
      ]
    };
  },
  methods: {
    // 初始化字段列表
    async initFields() {
      this.fields.push(
        {
          label: "创建时间",
          prop: "createTime",
          visible: true,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          visible: true,
        },
        {
          label: "报工数量",
          prop: "reportNum",
          visible: true,
        }
      );


      // 初始化 operator 和 value
      this.exposedFields = this.exposedFields.map((field) => ({
        label: field.label,
        field: field.prop,
        operator: "ct",
        value: "",
      }));
    },
    // 新增条件
    addCondition() {
      try {
        const field = this.fields[this.addIndex]?.field ?? "";
        const style = this.getFieldStyle(field);

        if (style == "datetime") {
          this.conditions.push({
            field,
            operator: "bt",
            modifiable: false,
            value: [],
            style,
          });
        } else {
          this.conditions.push({
            field, // 字段名
            operator: "ct", // 比较方式
            modifiable: true, // 比较方式是否可修改
            value: "", // 值
            style, // 输入框显示样式('string', 'number', 'datetime', 'none')
          });
        }
        this.addIndex = (this.addIndex + 1) % this.fields.length;
      } catch (err) {
        this.$modal.msgError(err);
      }
    },
    // 删除条件
    removeCondition(index) {
      this.conditions.splice(index, 1);
    },
    // 重置高级筛选项
    resetConditions() {
      this.conditions = [];
    },
    // 一键生成筛选项
    addAllConditions() {
      for (let i = 0; i < this.fields.length; i++) {
        this.addCondition();
      }
    },
    // 字段更改
    handleFieldChange(row) {
      row.style = this.getFieldStyle(row.field);
      if (row.style == "datetime") {
        row.operator = "bt";
        row.modifiable = false;
        row.value = [];
      } else if (row.style == "number") {
        row.value = "";
      } else {
        row.operator = "ct";
        row.modifiable = true;
        row.value = "";
      }
    },
    // 操作项更改
    handleOpChange(row) {
      if (row.operator == "nn" || row.operator == "nu") {
        row.style = "none";
      } else {
        row.style = this.getFieldStyle(row.field);
      }
    },
    // 生成查询参数
    generateParams() {
      this.queryParams = {};
      const result = this.exposedFields
        .concat(this.conditions)
        .filter(
          (item) =>
            item.value?.toString().trim() ||
            item.operator == "nn" ||
            item.operator == "nu"
        );
      console.log("result", result);

      result.forEach((item) => {
        const { field, operator, value } = item;

        if (!field) return;

        if (!this.queryParams[field]) {
          this.queryParams[field] = [];
        }

        this.queryParams[field].push({ operator, value });
      });
    },
    // 重置表单所有筛选项
    handleReset() {
      this.resetForm("queryForm");
      this.resetConditions();
    },
    // 搜索
    easySearch() {
      this.generateParams();
      //输出错误
      console.log("easySearch", this.queryParams);
      console.log("search success");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
