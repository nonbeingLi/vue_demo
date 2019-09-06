// 方案3 新增文件
export default {
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  //使用 `inject` 注入了父级组件 table.vue（下文改写） 中提供的实例 `tableRoot`
  render: (h, ctx) => {
    return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    }));
  }
};