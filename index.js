const forEach = require('lodash').forEach;
const set = require('lodash').set;
const get = require('lodash').get;
const assign = require('lodash').assign;
const cloneDeep = require('lodash').cloneDeep;

/**
 * 映射vuex字段到组件内部
 * @param router 页面vuex路由
 * @param stateArr 需要映射的数组
 * @returns {{}}
 */
function mapStateToProps(router, stateArr) {
    let obj = {};
    forEach(stateArr, (item) => {
        set(obj, item, (state) => get(state, [router, item], ''));
    });
    return obj;
}

/**
 * 公共的mutation方法 提供setData与init
 *
 * @param initState 初始state 用户初始化
 * @returns {{init(*=): void, setData(*=, [*, *]): void}}
 */
function commonMutations(initState) {
    return {
        /**
         * 更新state数据 请看源码和页面中使用方法
         * @param state
         * @param route 可更新一个数据或多个数据 传空串或空数组 批量更新state数据
         * @param data
         */
        setData(state, [route, data]) {
            if (route.length === 0) {
                assign(state, data);
            } else {
                set(state, route, data);
            }
        },
        init(state) {
            assign(state, cloneDeep(initState));
        }
    }
}

module.exports = {
    mapStateToProps,
    commonMutations,
    cloneDeep
}

