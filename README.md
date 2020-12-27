对Vuex进行简单的封装，提供更友好全局状态管理。

```shell
npm install happy-vuex --save
```

## 使用方法

#### 组件内使用

```js
// 更新 a 为 2
this.setData(['a', 2])
// 整体更新该模块下数据
this.setData(['', {a: 2, b: 2}])
// 整体还原该模块下数据
this.init();
```

#### action内使用

```js
// 更新 a 为 2，其他同上
commit("setData", ["a", 2]);
```

#### Vuex模块内的写法

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
    state: cloneDeep(initstate), // 深克隆，切断引用关联
    getters,
    actions,
    mutations
}
```

#### 模块化命名

```js
const store = new Vuex.Store({
    modules: {
        home: home,
    }
})
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
        init: 'home/init', // 如不需要init方法可省略
    }),
}

// 组件内更新状态，即可调用setData
this.setData(["a", 2]); // 更新a值为2
```




