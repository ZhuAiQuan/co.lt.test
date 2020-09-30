module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryName: "es", style: true }
    ]
  ],
};


// 配置antDesign按需加载 https://zhuanlan.zhihu.com/p/220424695
