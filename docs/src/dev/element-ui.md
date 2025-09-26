# element-ui 合集

## el-table 表格合计列优化

业务中，经常需要统计某一列的总数。elementUI​ 文档中，给出的 summary-method​ 会遍历表格中的一列，进行累加，然而有时候需要统计选中行的总数，因此对 getSummaries​ 方法做进一步的优化：

```js [utils/table.js]
/**
 * 表格合计方法
 * @param {{ columns: Array<Object>, data: Array<Object> }} param el-table 表格传入的参数
 * @param {string[]} summaryCols 需要统计的列字段名
 * @param {Object[]} selectedRows 选中的行数据
 * @returns {Array<*>} 返回合计结果数组
 */
export function getSummaries(param, summaryCols = param.columns.map(item => item.property), selectedRows = []) {
  const { columns, data } = param;
  const sums = [];

  let selectValues, selectTotal;

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计';
      return;
    }
    if (summaryCols.includes(column.property)) {
      if (selectedRows.length > 0) {
        selectValues = selectedRows.map(item => Number(item[column.property]));

        selectTotal = selectValues.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      }
      const values = data.map(item => Number(item[column.property]));
      const total = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);

      sums[index] = selectedRows.length > 0 ? `${selectTotal} / ${total}` : total;
    }
  });

  return sums;
}
```

在 vue​ 模板中：

```vue
<template>
  <el-table :data="data" @selection-change="handleSelectChange"
    show-summary :summary-method="params => getSummaries(params, summaryCols, selectedRows)">
  </el-table>
</template>
```

在 script​ 中，将选中的行数据传回：

```js
// methods
handleSelectChange(selectedRows) {
  this.selectedRows = selectedRows;
}
```