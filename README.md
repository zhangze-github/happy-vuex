> npm install happy-vuex --save

对Vuex进行简单的封装，提供更友好全局状态管理。

## 使用方法

#### 独立Vuex状态的写法如下

```js

import {cloneDeep, commonMutations} from "happy-vuex";

const initstate = {
    a: 1,
    b: 1,
};
const getters = {};
const actions = {
    setDataDemo({commit}) {
        // 更新值 a 为 2
        commit("setData", ["a", 2]);
    },
};
const mutations = {
    ...commonMutations(initstate),
};
export default {
    namespaced: true,
    state: cloneDeep(initstate), // 深克隆，切断引用值关联
    getters,
    actions,
    mutations
}
```

#### 组件内注册

```js
// 映射Vuex状态到组件内部，即可通过this.a调用
computed: mapState({
    ...mapStateToProps('home', ['a', 'b']),
}),
// 如果与其他计算属性共用，可用如下写法
computed: {
    ...mapState({
        ...mapStateToProps('home', ['a']),
    }),
}
// 在vue独立组件内注册，即可用setData和init方法
methods: {
    ...mapMutations({
        setData: 'home/setData',
        init: 'home/init'
    }),
}

// 组件内更新状态，即可调用setData
this.setData(["a", 2]); // 更新a值为2

```




