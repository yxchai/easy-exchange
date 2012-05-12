var category = [
    {name: '小说', subtag:[
        {name: '小说', count: 0},
        {name: '外国文学', count: 0},
        {name: '文学', count: 0},
        {name: '随笔', count: 0},
        {name: '中国文学', count: 0},
        {name: '散文', count: 0},
        {name: '经典', count: 0},
        {name: '日本文学', count: 0},
        {name: '童话', count: 0},
        {name: '诗歌', count: 0},
        {name: '杂文', count: 0},
        {name: '名著', count: 0},
        {name: '儿童文学', count: 0},
        {name: '古典文学', count: 0},
        {name: '外国名著', count: 0},
        {name: '当代文学', count: 0},
        {name: '诗词', count: 0},
        {name: '港台', count: 0}
    ]},
    {name: '流行', subtag:[
        {name: '漫画', count: 0},
        {name: '绘本', count: 0},
        {name: '推理', count: 0},
        {name: '青春', count: 0},
        {name: '言情', count: 0},
        {name: '科幻', count: 0},
        {name: '武侠', count: 0},
        {name: '日本漫画', count: 0},
        {name: '悬疑', count: 0},
        {name: '奇幻', count: 0},
        {name: '穿越', count: 0},
        {name: '网络小说', count: 0},
        {name: '轻小说', count: 0},
        {name: '推理小说', count: 0},
        {name: '魔幻', count: 0},
        {name: '青春文学', count: 0}
    ]},
    {name: '文化', subtag:[
        {name: '历史', count: 0},
        {name: '哲学', count: 0},
        {name: '心理学', count: 0},
        {name: '传记', count: 0},
        {name: '文化', count: 0},
        {name: '社会学', count: 0},
        {name: '设计', count: 0},
        {name: '艺术', count: 0},
        {name: '政治', count: 0},
        {name: '建筑', count: 0},
        {name: '社会', count: 0},
        {name: '宗教', count: 0},
        {name: '电影', count: 0},
        {name: '数学', count: 0},
        {name: '政治学', count: 0},
        {name: '思想', count: 0},
        {name: '回忆录', count: 0},
        {name: '国学', count: 0},
        {name: '中国历史', count: 0},
        {name: '人文', count: 0},
        {name: '音乐', count: 0},
        {name: '戏剧', count: 0},
        {name: '人物传记', count: 0},
        {name: '佛教', count: 0},
        {name: '绘画', count: 0},
        {name: '艺术史', count: 0},
        {name: '西方哲学', count: 0},
        {name: '军事', count: 0},
        {name: '自由主义', count: 0},
        {name: '二战', count: 0},
        {name: '近代史', count: 0},
        {name: '考古', count: 0},
        {name: '美术', count: 0}
    ]},
    {name: '生活', subtag:[
        {name: '爱情', count: 0},
        {name: '旅行', count: 0},
        {name: '生活', count: 0},
        {name: '励志', count: 0},
        {name: '摄影', count: 0},
        {name: '心理', count: 0},
        {name: '成长', count: 0},
        {name: '职场', count: 0},
        {name: '游记', count: 0},
        {name: '女性', count: 0},
        {name: '教育', count: 0},
        {name: '美食', count: 0},
        {name: '灵修', count: 0},
        {name: '情感', count: 0},
        {name: '健康', count: 0},
        {name: '手工', count: 0},
        {name: '养生', count: 0},
        {name: '两性', count: 0},
        {name: '家居', count: 0},
        {name: '人际关系', count: 0},
        {name: '自助游', count: 0}
    ]},
    {name: '经管', subtag:[
        {name: '经济学', count: 0},
        {name: '管理', count: 0},
        {name: '经济', count: 0},
        {name: '金融', count: 0},
        {name: '商业', count: 0},
        {name: '投资', count: 0},
        {name: '营销', count: 0},
        {name: '广告', count: 0},
        {name: '理财', count: 0},
        {name: '创业', count: 0},
        {name: '股票', count: 0},
        {name: '企业史', count: 0},
        {name: '策划', count: 0}
    ]},
    {name: '科技', subtag:[
        {name: '科普', count: 0},
        {name: '互联网', count: 0},
        {name: '编程', count: 0},
        {name: '科学', count: 0},
        {name: '交互设计', count: 0},
        {name: '用户体验', count: 0},
        {name: '算法', count: 0},
        {name: 'web', count: 0},
        {name: 'UE', count: 0},
        {name: 'UCD', count: 0},
        {name: '科技', count: 0},
        {name: '通信', count: 0},
        {name: '程序', count: 0},
        {name: '神经网络', count: 0}
    ]}
];

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easytest');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Mixed = Schema.Types.Mixed;
var Category = new Schema({
    category: Mixed
});
var Tag = mongoose.model('Category', Category);
module.exports = Tag;

var run = function() {
    var tmp = new Tag({category: category});
    tmp.save();
};

//run();

















