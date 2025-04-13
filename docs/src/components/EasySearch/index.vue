<template>
  <div class="easy-search">
    <el-form inline>
      <slot></slot>
      <el-form-item v-for="item in exposedFields" :key="item.field" :label="item.label" :prop="item.field">
        <el-input v-model="item.value" clearable style="width: 120px" />
      </el-form-item>

      <el-form-item>
        <el-popover placement="bottom" width="620px" trigger="click" ref="popover" :visible="popover_visible" @blur="popover_visible=false">
          <el-scrollbar class="condition-container" max-height="280px">
            <template v-if="conditions.length === 0">
              <div class="empty-placeholder">暂无搜索条件</div>
            </template>
            <template v-else>
              <el-form inline v-for="(condition, index) in conditions" :key="index">
                <el-form-item>
                  <el-select v-model="condition.field">
                    <el-option v-for="item in fields" :key="item.field" :label="item.label" :value="item.field" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="condition.operator">
                    <el-option v-for="op in operators" :key="op.value" :label="op.label" :value="op.value" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="condition.value" clearable />
                </el-form-item>

                <el-form-item>
                  <el-button type="danger" :icon="Delete" circle plain size="mini" @click="removeCondition(index)" />
                </el-form-item>
              </el-form>
            </template>
          </el-scrollbar>

          <div class="opts">
            <el-link :underline="false" @click="addCondition" :icon="Plus">添加条件</el-link>
            <el-link :underline="false" @click="resetConditions" :icon="Refresh">重置条件</el-link>
            <el-link :underline="false" @click="addAllConditions" :icon="MagicStick"> 一键生成</el-link>
          </div>

          <template #reference>
            <el-button :icon="Operation" @click="popover_visible = !popover_visible">更多({{ conditions.length }})</el-button>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" plain type="primary">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Refresh" plain type="danger" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EasySearch'
})
import { ref, reactive } from 'vue'
import { Delete, Plus, Refresh, MagicStick, Operation, Search } from '@element-plus/icons-vue'
import type { FieldItem, ConditionItem, OperatorItem } from './types'

// 响应式数据
const fields = reactive<FieldItem[]>([
  {
    label: "姓名",
    field: "name",
    type: "input"
  },
  {
    label: "年龄",
    field: "age",
    type: "number"
  },
  {
    label: "性别",
    field: "gender",
    type: "select",
    options: [
      { label: "男", value: "male" },
      { label: "女", value: "female" }
    ]
  },
  {
    label: "入职时间",
    field: "noHappyTime",
    type: "date"
  }
])

const conditions = reactive<ConditionItem[]>([])
const addIndex = ref(0)
const popover_visible = ref(false)

const exposedFields = reactive([
  {
    label: "姓名",
    field: "name",
    type: "input",
    operator: "ct",
    value: ""
  },
  {
    label: "年龄",
    field: "age",
    type: "number",
    operator: "ct",
    value: ""
  }
])

const operators = reactive<OperatorItem[]>([
  { label: "等于", value: "eq" },
  { label: "不等于", value: "ne" },
  { label: "包含", value: "ct" },
  { label: "不包含", value: "nc" },
  { label: "为空", value: "nu" },
  { label: "不为空", value: "nn" },
  { label: "在...之间", value: "bt" }
])

// 方法
const addCondition = () => {
  const field = fields[addIndex.value]?.field ?? ""
  conditions.push({
    field,
    operator: "ct",
    modifiable: true,
    value: "",
    type: fields[addIndex.value].type
  })
  addIndex.value = (addIndex.value + 1) % fields.length
}

const removeCondition = (index: number) => {
  conditions.splice(index, 1)
}

const resetConditions = () => {
  conditions.splice(0, conditions.length)
}

const addAllConditions = () => {
  fields.forEach(() => addCondition())
}

const handleReset = () => {
  resetConditions()
  exposedFields.forEach(item => item.value = "")
}
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>