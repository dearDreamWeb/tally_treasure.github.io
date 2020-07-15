// 格式化时间，val是new Date().getTime()的数值 格式以后的样式是 2020-5-2
const filterDate = val => {
    return new Date(val).toLocaleDateString().replace(/\//g, "-");
}
export { filterDate }