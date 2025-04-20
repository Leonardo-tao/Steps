<template>
	<div class="demo-container">
		<el-card>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="显示类型">
					<el-select v-model="config.type">
						<el-option label="date" value="date" />
						<el-option label="time" value="time" />
						<el-option label="datetime" value="datetime" />
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :span="8">
				<el-form-item label="日期样式">
					<el-select v-model="config.dateStyle">
						<el-option label="full" value="full" />
						<el-option label="long" value="long" />
						<el-option label="medium" value="medium" />
						<el-option label="short" value="short" />
					</el-select>
				</el-form-item>
			</el-col>

			<el-col :span="8">
				<el-form-item label="时间样式">
					<el-select v-model="config.timeStyle">
						<el-option label="full" value="full" />
						<el-option label="long" value="long" />
						<el-option label="medium" value="medium" />
						<el-option label="short" value="short" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		</el-card>
		<el-col :span="24">
			<div class="demo-area">
				<el-row :gutter="20">
					<el-col v-for="(example, i) in dynamicExamples" :key="i">
						<el-card>
							<pre><code>{{ example.code }}</code></pre>
							<template #footer>
								<p class="result">➜ {{ example.result }}</p>
							</template>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { easyTime } from './easyTime'
// 配置参数
const config = reactive({
  type: 'datetime',
  dateStyle: 'medium',
  timeStyle: 'medium',
  lang: 'zh',
  customDate: new Date().toISOString()
})

// 更新示例生成逻辑
const dynamicExamples = computed(() => [{
  code: `easyTime(${JSON.stringify({
    type: config.type,
    dateStyle: config.dateStyle,
    timeStyle: config.timeStyle,
    lang: config.lang
  }, null, 2)})`,
  result: easyTime({
    type: config.type,
    dateStyle: config.dateStyle,
    timeStyle: config.timeStyle,
    lang: config.lang,
    date: new Date(config.customDate)
  })
}])
</script>
