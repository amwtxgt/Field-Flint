import js from '@eslint/js'; // 引入 ESLint 官方的 JavaScript 规则配置
import typescript from '@typescript-eslint/eslint-plugin'; // 引入 TypeScript 的 ESLint 插件
import typescriptParser from '@typescript-eslint/parser'; // 引入 TypeScript 专用的解析器
import vue from 'eslint-plugin-vue'; // 引入 Vue.js 的 ESLint 插件，用于检查 Vue 文件
import prettier from 'eslint-config-prettier'; // 关闭 ESLint 中与 Prettier 冲突的规则
import globals from 'globals';
export default [
   ...vue.configs['flat/recommended'], // 使用 Vue 推荐的 ESLint 配置
   {
      ignores: [
         // 指定需要忽略的文件/目录
         'dist/**',
         'release/**',
         'node_modules/**',
         '*.log',
         '.env',
         '.env.*',
         '.idea/**',
         '.vscode/**',
         '*.suo',
         '*.ntvs*',
         '*.njsproj',
         '*.sln',
         '*.sw?',
         '.DS_Store',
         'Thumbs.db',
         'coverage/**',
         'build/**',
      ],
   },
   js.configs.recommended, // 使用 ESLint 的推荐 JavaScript 规则配置
   {
      // 为 Vue 文件设置全局变量
      files: ['**/*.vue'],
      languageOptions: {
         globals: {
            ...globals.browser, // 添加浏览器全局变量，包含 window
            // Electron 环境
            electronAPI: 'readonly',
         },
      },
   },
   {
      files: ['**/*.ts', '**/*.tsx'], // 仅对 TypeScript 文件生效的配置
      languageOptions: {
         parser: typescriptParser, // 使用 TypeScript 解析器
         parserOptions: {
            ecmaVersion: 'latest', // 支持最新的 ECMAScript 版本
            sourceType: 'module', // 使用模块化语法
         },
         globals: {
            // 设置全局变量为只读
            ...globals.node, // 添加 Node.js 全局变量，包含 process
            ...globals.browser, // 添加浏览器全局变量，包含 window
            // Electron 环境
            electronAPI: 'readonly',
         },
      },
      plugins: {
         '@typescript-eslint': typescript, // 加载 TypeScript 插件
      },
      rules: {
         // 自定义 TypeScript 相关的规则
         // TypeScript rules
         '@typescript-eslint/no-explicit-any': 'warn', // 不允许使用 any 类型，但只是警告而不是报错
         '@typescript-eslint/explicit-function-return-type': 'off', // 不强制要求函数显式返回类型
         '@typescript-eslint/no-unused-vars': 'warn', // 不允许未使用的变量，警告级别
      },
   },
   // 为类型声明文件（.d.ts）设置特殊规则
   {
      files: ['**/*.d.ts'],
      languageOptions: {
         parser: typescriptParser,
      },
      rules: {
         'no-unused-vars': 'off', // 关闭未使用变量的检查
         '@typescript-eslint/no-unused-vars': 'off', // 关闭 TypeScript 特有的未使用变量检查
      },
   },
   prettier, // 应用 Prettier 配置以避免冲突
];
