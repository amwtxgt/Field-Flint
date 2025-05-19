export default {
   semi: true, // 在语句末尾使用分号
   singleQuote: true, // 使用单引号而不是双引号
   printWidth: 100, // 一行代码的最大宽度
   trailingComma: 'all', // 在多行对象、数组等末尾添加逗号
   arrowParens: 'avoid', // 当箭头函数只有一个参数时，省略括号
   tabWidth: 3, // 使用3个空格缩进
   endOfLine: 'auto', // 自动识别并保持文件的换行符格式
   vueIndentScriptAndStyle: true, // 缩进Vue文件中的<script>和<style>标签内容
   bracketSpacing: true, // 在对象字面量的括号之间添加空格
   jsxBracketSameLine: false, // JSX结束标签单独成行
   useTabs: false, // 使用空格而不是制表符进行缩进
   quoteProps: 'as-needed', // 仅在必要时为对象属性添加引号
   jsxSingleQuote: false, // 在JSX中使用双引号
   proseWrap: 'preserve', // 不自动换行markdown等文本内容
   htmlWhitespaceSensitivity: 'css', // 根据CSS显示属性决定空白处理方式
};
