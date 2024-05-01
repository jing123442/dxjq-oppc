module.exports = file => () => import(/* webpackChunkName:"weboppc-router", webpackPrefetch: true */ '@/views/' + file + '.vue')
