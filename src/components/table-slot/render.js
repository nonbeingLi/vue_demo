export default {
  functional: true,
  props: {
    row: Object, //当前行的数据；
    column: Object, //当前列的数据；
    index: Number, //当前是第几行；
    render: Function  //具体的 render 函数内容。
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index
    };
    //这里的 `render` 选项并没有渲染任何节点，而是直接返回 props 中定义的 render，
    //并将 h 和当前的行、列、序号作为参数传递出去
    return ctx.props.render(h, params);
  }
};