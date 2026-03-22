export type People = 'solo' | 'small' | 'group';

export type Location = 'indoor' | 'outdoor' | 'both';

export interface Activity {
  name: string;
  location: Location;
  people: People[];
  apps?: string[];
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  activities: Activity[];
}

const groupPeople: People[] = ['group'];
const smallPeople: People[] = ['small'];
const soloPeople: People[] = ['solo'];
const soloSmallPeople: People[] = ['solo', 'small'];
const smallGroupPeople: People[] = ['small', 'group'];
const anyPeople: People[] = ['solo', 'small', 'group'];


export const categories: Category[] = [
  {
    id: 'food',
    name: '舌尖出走',
    subtitle: '唯有美食与爱不可辜负',
    icon: 'utensils',
    activities: [
      { name: '花式面包', location: 'both', people: soloSmallPeople, icon: 'croissant', apps: ['点评app', '外卖app'] },
      { name: '蛋挞甜点', location: 'both', people: soloSmallPeople, icon: 'cake-slice', apps: ['点评app', '外卖app'] },
      { name: '奶油蛋糕', location: 'both', people: soloSmallPeople, icon: 'cake', apps: ['点评app', '外卖app'] },
      { name: '生煎小笼', location: 'both', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '豆浆油条', location: 'both', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '特色面馆', location: 'both', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '饺子馄饨', location: 'both', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '螺蛳粉', location: 'both', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '沙县小吃', location: 'both', people: smallGroupPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '夜市大集', location: 'outdoor', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '特色早市', location: 'outdoor', people: soloSmallPeople, icon: 'soup', apps: ['点评app', '外卖app'] },
      { name: '汉堡薯条', location: 'both', people: anyPeople, icon: 'sandwich', apps: ['点评app', '外卖app'] },
      { name: '烧烤烤串', location: 'both', people: anyPeople, icon: 'flame', apps: ['点评app', '外卖app'] },
      { name: '热辣火锅', location: 'outdoor', people: smallGroupPeople, icon: 'flame', apps: ['点评app'] },
      { name: '八大菜系-鲁菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-川菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-粤菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-湘菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-徽菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-闽菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-苏菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '八大菜系-浙菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '本帮菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '东北菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '新疆菜', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '海鲜大餐', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '私房创意', location: 'outdoor', people: groupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '素食料理', location: 'both', people: anyPeople, icon: 'salad', apps: ['点评app'] },
      { name: '健康减脂', location: 'both', people: soloSmallPeople, icon: 'salad', apps: ['点评app', '外卖app'] },
      { name: '韩式烤肉', location: 'outdoor', people: smallGroupPeople, icon: 'flame', apps: ['点评app'] },
      { name: '日式料理', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '东南亚料理', location: 'outdoor', people: smallGroupPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '西式意面', location: 'outdoor', people: anyPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '西餐牛排', location: 'outdoor', people: anyPeople, icon: 'chef-hat', apps: ['点评app'] },
      { name: '来杯奶茶', location: 'both', people: soloSmallPeople, icon: 'cup-soda', apps: ['点评app', '外卖app'] },
      { name: '喝杯咖啡', location: 'both', people: soloSmallPeople, icon: 'coffee', apps: ['点评app', '外卖app'] },
      { name: '品鉴名茶', location: 'both', people: soloPeople, icon: 'glass-water', apps: ['点评app'] },
      { name: '中华小当家', location: 'indoor', people: soloSmallPeople, icon: 'chef-hat', apps: ['菜谱app'] },
    ]
  },
  {
    id: 'game',
    name: '全城撒欢',
    subtitle: '生活就是一场大型游戏',
    icon: 'gamepad-2',
    activities: [
      { name: '玩把电竞', location: 'indoor', people: anyPeople, icon: 'gamepad', apps: ['app'] },
      { name: '来把手游', location: 'indoor', people: anyPeople, icon: 'smartphone', apps: ['app'] },
      { name: 'Xbox', location: 'indoor', people: anyPeople, icon: 'gamepad', apps: ['app'] },
      { name: 'Playstation', location: 'indoor', people: anyPeople, icon: 'gamepad', apps: ['app'] },
      { name: 'Switch', location: 'indoor', people: anyPeople, icon: 'gamepad', apps: ['app'] },
      { name: '打麻将', location: 'indoor', people: groupPeople, icon: 'dices', apps: ['app'] },
      { name: '打扑克', location: 'indoor', people: groupPeople, icon: 'club', apps: ['app'] },
      { name: '下象棋', location: 'indoor', people: smallPeople, icon: 'chess-pawn', apps: ['app'] },
      { name: '玩飞镖', location: 'indoor', people: soloSmallPeople, icon: 'target', apps: ['app'] },
      { name: '拼拼图', location: 'indoor', people: soloSmallPeople, icon: 'puzzle', apps: ['app'] },
      { name: '叠叠乐', location: 'indoor', people: smallPeople, icon: 'brick-wall', apps: ['app'] },
      { name: '狼人杀', location: 'both', people: anyPeople, icon: 'swords', apps: ['app'] },
      { name: '三国杀', location: 'both', people: anyPeople, icon: 'swords', apps: ['app'] },
      { name: '桌游', location: 'both', people: anyPeople, icon: 'club', apps: ['app'] },
      { name: '剧本杀', location: 'outdoor', people: anyPeople, icon: 'book-open', apps: ['app'] },
      { name: '密室逃脱', location: 'outdoor', people: anyPeople, icon: 'door-open', apps: ['app'] },
      { name: '游乐场', location: 'outdoor', people: anyPeople, icon: 'ticket', apps: ['app'] },
      { name: '演唱会', location: 'outdoor', people: anyPeople, icon: 'mic', apps: ['app'] },
      { name: '二次元', location: 'outdoor', people: anyPeople, icon: 'mic', apps: ['app'] }
    ]
  },
  {
    id: 'rest',
    name: '灵魂马杀鸡',
    subtitle: '把时间浪费在美好事物上',
    icon: 'bath',
    activities: [
      { name: '听音乐', location: 'indoor', people: soloSmallPeople, icon: 'headphones', apps: ['app'] },
      { name: '听白噪音', location: 'indoor', people: soloPeople, icon: 'headphones', apps: ['app'] },
      { name: '冥想', location: 'indoor', people: soloPeople, icon: 'message-circle', apps: ['app'] },
      { name: '蒸桑拿', location: 'outdoor', people: soloSmallPeople, icon: 'bath', apps: ['app'] },
      { name: '按摩SPA', location: 'outdoor', people: soloSmallPeople, icon: 'bath', apps: ['app'] },
      { name: '做足浴', location: 'outdoor', people: soloSmallPeople, icon: 'bath', apps: ['app'] },
      { name: '泡个脚', location: 'indoor', people: soloPeople, icon: 'bath', apps: ['app'] },
      { name: '泡温泉', location: 'outdoor', people: soloSmallPeople, icon: 'bath', apps: ['app'] },
      { name: '采耳', location: 'outdoor', people: soloSmallPeople, icon: 'ear', apps: ['app'] },
      { name: '做脸', location: 'outdoor', people: soloSmallPeople, icon: 'smile', apps: ['app'] },
      { name: '理发', location: 'outdoor', people: soloPeople, icon: 'scissors', apps: ['app'] },
      { name: '美甲', location: 'both', people: soloSmallPeople, icon: 'hand', apps: ['app'] },
      { name: '瑜伽', location: 'both', people: soloSmallPeople, icon: 'person-standing', apps: ['app'] },
      { name: '普拉提', location: 'outdoor', people: soloSmallPeople, icon: 'person-standing', apps: ['app'] },
      { name: '晒太阳', location: 'outdoor', people: soloSmallPeople, icon: 'sun', apps: ['app'] },
      { name: '公园发呆', location: 'outdoor', people: soloPeople, icon: 'tree-pine', apps: ['app'] },
      { name: '湖边散步', location: 'outdoor', people: soloSmallPeople, icon: 'waves', apps: ['app'] },
      { name: '回笼觉', location: 'indoor', people: soloSmallPeople, icon: 'bed-double', apps: ['app'] },
      { name: '点香薰', location: 'indoor', people: soloPeople, icon: 'sparkles', apps: ['app'] },
      { name: '写日记', location: 'indoor', people: soloPeople, icon: 'file-text', apps: ['app'] },
      { name: '找朋友聊天', location: 'both', people: smallGroupPeople, icon: 'message-circle', apps: ['app'] },
      { name: '和宠物玩', location: 'indoor', people: soloPeople, icon: 'cat', apps: ['app'] },
      { name: '去拜拜', location: 'outdoor', people: soloSmallPeople, icon: 'building', apps: ['app'] },
      { name: '撸剧', location: 'indoor', people: soloPeople, icon: 'tv', apps: ['app'] },
      { name: '看综艺', location: 'indoor', people: soloPeople, icon: 'tv', apps: ['app'] },
      { name: '看动漫', location: 'indoor', people: soloPeople, icon: 'tv', apps: ['app'] },
      { name: '看电影', location: 'both', people: soloSmallPeople, icon: 'clapperboard', apps: ['app'] },
      { name: '看脱口秀', location: 'both', people: anyPeople, icon: 'mic', apps: ['app'] },
      { name: '看纪录片', location: 'both', people: soloSmallPeople, icon: 'tv', apps: ['app'] },
      { name: '听播客', location: 'indoor', people: soloSmallPeople, icon: 'headphones', apps: ['app'] },
      { name: '计划下一次旅行', location: 'indoor', people: soloSmallPeople, icon: 'plane', apps: ['app'] },
      { name: '整理房间', location: 'indoor', people: soloPeople, icon: 'home', apps: ['app'] }
    ]
  },
  {
    id: 'shopping',
    name: '钱包快乐屋',
    subtitle: '遇见心动好物快乐带回家',
    icon: 'shopping-cart',
    activities: [
      { name: '逛商场', location: 'outdoor', people: anyPeople, icon: 'store', apps: ['app'] },
      { name: '逛超市', location: 'outdoor', people: anyPeople, icon: 'shopping-bag', apps: ['app'] },
      { name: '买包包', location: 'outdoor', people: soloSmallPeople, icon: 'handbag', apps: ['app'] },
      { name: '首饰店', location: 'outdoor', people: soloSmallPeople, icon: 'gem', apps: ['app'] },
      { name: '逛花店', location: 'outdoor', people: soloSmallPeople, icon: 'flower', apps: ['app'] },
      { name: '文具店', location: 'outdoor', people: soloSmallPeople, icon: 'pencil', apps: ['app'] },
      { name: '家具店', location: 'outdoor', people: soloSmallPeople, icon: 'shelving-unit', apps: ['app'] },
      { name: '电器城', location: 'outdoor', people: soloSmallPeople, icon: 'tv', apps: ['app'] },
      { name: '服装店', location: 'outdoor', people: soloSmallPeople, icon: 'shirt', apps: ['app'] },
      { name: '买鞋子', location: 'outdoor', people: soloSmallPeople, icon: 'footprints', apps: ['app'] },
      { name: '运动户外', location: 'outdoor', people: anyPeople, icon: 'tent', apps: ['app'] },
      { name: '压马路', location: 'outdoor', people: anyPeople, icon: 'traffic-cone', apps: ['app'] },
      { name: '菜市场', location: 'outdoor', people: soloSmallPeople, icon: 'store', apps: ['app'] },
      { name: '逛淘宝', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛拼多多', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛京东', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛小红书', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛抖音', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛开市客', location: 'both', people: anyPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛山姆', location: 'both', people: anyPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛京东七鲜', location: 'both', people: anyPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛盒马', location: 'both', people: anyPeople, icon: 'shopping-cart', apps: ['app'] },
      { name: '逛亚马逊', location: 'indoor', people: soloSmallPeople, icon: 'shopping-cart', apps: ['app'] }
    ]
  },
  {
    id: 'adventure',
    name: '奇遇地图',
    subtitle: '收集城市里的每一次惊喜',
    icon: 'map-pinned',
    activities: [
      { name: '公园散步', location: 'outdoor', people: soloSmallPeople, icon: 'tree-pine', apps: ['app'] },
      { name: '看海', location: 'outdoor', people: anyPeople, icon: 'waves', apps: ['app'] },
      { name: '爬山', location: 'outdoor', people: anyPeople, icon: 'mountain', apps: ['app'] },
      { name: '逛商场', location: 'outdoor', people: soloSmallPeople, icon: 'store', apps: ['app'] },
      { name: '书店', location: 'outdoor', people: soloSmallPeople, icon: 'book-open', apps: ['app'] },
      { name: '随机游走', location: 'outdoor', people: soloPeople, icon: 'footprints', apps: ['app'] },
      { name: '图书馆', location: 'outdoor', people: soloPeople, icon: 'book-open', apps: ['app'] },
      { name: '大学校园', location: 'outdoor', people: soloSmallPeople, icon: 'university', apps: ['app'] },
      { name: '植物园', location: 'outdoor', people: soloSmallPeople, icon: 'flower-2', apps: ['app'] },
      { name: '动物园', location: 'outdoor', people: soloSmallPeople, icon: 'cat', apps: ['app'] },
      { name: '科技馆', location: 'outdoor', people: soloSmallPeople, icon: 'cpu', apps: ['app'] },
      { name: '天文馆', location: 'outdoor', people: soloSmallPeople, icon: 'star', apps: ['app'] },
      { name: '海洋馆', location: 'outdoor', people: soloSmallPeople, icon: 'waves', apps: ['app'] },
      { name: '博物馆', location: 'outdoor', people: soloSmallPeople, icon: 'landmark', apps: ['app'] },
      { name: '逛展览', location: 'outdoor', people: soloSmallPeople, icon: 'frame', apps: ['app'] },
      { name: '美术馆', location: 'outdoor', people: soloSmallPeople, icon: 'frame', apps: ['app'] },
      { name: '古镇老街', location: 'outdoor', people: soloSmallPeople, icon: 'fence', apps: ['app'] },
      { name: '露营野餐', location: 'outdoor', people: soloSmallPeople, icon: 'tent', apps: ['app'] },
      { name: '观鸟', location: 'outdoor', people: soloPeople, icon: 'bird', apps: ['app'] },
      { name: '钓鱼', location: 'outdoor', people: soloSmallPeople, icon: 'fish', apps: ['app'] },
      { name: '摄影', location: 'outdoor', people: soloPeople, icon: 'camera', apps: ['app'] },
      { name: '网红打卡', location: 'outdoor', people: soloSmallPeople, icon: 'camera', apps: ['app'] },
      { name: '花鸟市场', location: 'outdoor', people: soloSmallPeople, icon: 'flower', apps: ['app'] },
      { name: '跳蚤市场', location: 'outdoor', people: soloSmallPeople, icon: 'store', apps: ['app'] },
      { name: '家居店', location: 'outdoor', people: soloSmallPeople, icon: 'house-plus', apps: ['app'] },
      { name: '宠物店', location: 'outdoor', people: soloSmallPeople, icon: 'cat', apps: ['app'] }
    ]
  },
  {
    id: 'learning',
    name: '思维漫游',
    subtitle: '探索知识的无限可能',
    icon: 'book-open',
    activities: [
      { name: '读一本书', location: 'indoor', people: soloPeople, icon: 'book-open', apps: ['app'] },
      { name: '学几个单词', location: 'indoor', people: soloPeople, icon: 'languages', apps: ['app'] },
      { name: '学一门新语言', location: 'indoor', people: soloPeople, icon: 'languages', apps: ['app'] },
      { name: '看一节网课', location: 'indoor', people: soloPeople, icon: 'tv', apps: ['app'] },
      { name: '写点东西', location: 'indoor', people: soloPeople, icon: 'pencil', apps: ['app'] },
      { name: '学一道新菜', location: 'indoor', people: soloPeople, icon: 'cooking-pot', apps: ['app'] },
      { name: '学理财知识', location: 'indoor', people: soloPeople, icon: 'calculator', apps: ['app'] },
      { name: '学编程语言', location: 'indoor', people: soloPeople, icon: 'computer', apps: ['app'] },
      { name: '学一种乐器', location: 'indoor', people: soloPeople, icon: 'music', apps: ['app'] },
      { name: '学一种绘画', location: 'indoor', people: soloPeople, icon: 'palette', apps: ['app'] },
      { name: '学摄影技巧', location: 'indoor', people: soloPeople, icon: 'camera', apps: ['app'] },
      { name: '学修图', location: 'indoor', people: soloPeople, icon: 'film', apps: ['app'] },
      { name: '学剪辑视频', location: 'indoor', people: soloPeople, icon: 'file-play', apps: ['app'] },
      { name: '学PPT技巧', location: 'indoor', people: soloPeople, icon: 'file-text', apps: ['app'] },
      { name: '学Excel技巧', location: 'indoor', people: soloPeople, icon: 'table', apps: ['app'] },
      { name: '学咖啡拉花', location: 'indoor', people: soloSmallPeople, icon: 'coffee', apps: ['app'] },
      { name: '学茶文化', location: 'indoor', people: soloSmallPeople, icon: 'glass-water', apps: ['app'] },
      { name: '学酒知识', location: 'indoor', people: soloSmallPeople, icon: 'wine', apps: ['app'] },
      { name: '学穿搭化妆', location: 'indoor', people: soloPeople, icon: 'shirt', apps: ['app'] },
      { name: '学一个魔术', location: 'indoor', people: soloPeople, icon: 'wand-sparkles', apps: ['app'] },
      { name: '学说话之道', location: 'indoor', people: soloPeople, icon: 'message-circle-more', apps: ['app'] }
    ]
  },
  {
    id: 'creativity',
    name: '脑洞手作',
    subtitle: '让奇思妙想在指尖跳舞',
    icon: 'palette',
    activities: [
      { name: '画一幅画', location: 'both', people: soloPeople, icon: 'palette', apps: ['app'] },
      { name: '做手工', location: 'both', people: soloSmallPeople, icon: 'scissors', apps: ['app'] },
      { name: '做陶艺', location: 'both', people: soloSmallPeople, icon: 'cup-soda', apps: ['app'] },
      { name: '做木工', location: 'both', people: soloSmallPeople, icon: 'hammer', apps: ['app'] },
      { name: '做皮具', location: 'both', people: soloSmallPeople, icon: 'scissors', apps: ['app'] },
      { name: '做香熏蜡烛', location: 'both', people: soloSmallPeople, icon: 'flame', apps: ['app'] },
      { name: '做干花', location: 'indoor', people: soloSmallPeople, icon: 'flower-2', apps: ['app'] },
      { name: '做滴胶', location: 'indoor', people: soloSmallPeople, icon: 'sparkles', apps: ['app'] },
      { name: '做羊毛毡', location: 'indoor', people: soloPeople, icon: 'heart', apps: ['app'] },
      { name: '做拼豆', location: 'indoor', people: soloPeople, icon: 'puzzle', apps: ['app'] },
      { name: '做模型', location: 'both', people: soloSmallPeople, icon: 'building-2', apps: ['app'] },
      { name: '玩乐高', location: 'both', people: soloSmallPeople, icon: 'building-2', apps: ['app'] },
      { name: '玩拼图', location: 'indoor', people: soloSmallPeople, icon: 'puzzle', apps: ['app'] },
      { name: '绣十字绣', location: 'indoor', people: soloPeople, icon: 'scissors', apps: ['app'] },
      { name: '织围巾', location: 'indoor', people: soloPeople, icon: 'scissors', apps: ['app'] },
      { name: '钩针编织', location: 'indoor', people: soloPeople, icon: 'scissors', apps: ['app'] },
      { name: '做手账', location: 'indoor', people: soloPeople, icon: 'book-open', apps: ['app'] },
      { name: '做书签', location: 'indoor', people: soloPeople, icon: 'book-open', apps: ['app'] },
      { name: '写书法', location: 'indoor', people: soloPeople, icon: 'type', apps: ['app'] },
      { name: '刻橡皮章', location: 'indoor', people: soloSmallPeople, icon: 'hammer', apps: ['app'] },
      { name: '做热缩片', location: 'indoor', people: soloSmallPeople, icon: 'sparkles', apps: ['app'] },
      { name: '做微缩模型', location: 'indoor', people: soloSmallPeople, icon: 'building-2', apps: ['app'] },
      { name: 'DIY手机壳', location: 'indoor', people: soloSmallPeople, icon: 'smartphone', apps: ['app'] },
      { name: '改造旧衣服', location: 'indoor', people: soloPeople, icon: 'shirt', apps: ['app'] }
    ]
  },
  {
    id: 'sport',
    name: '多巴胺工厂',
    subtitle: '给身体来场痛快的充电',
    icon: 'dumbbell',
    activities: [
      { name: '打台球', location: 'outdoor', people: smallGroupPeople, icon: 'target', apps: ['app'] },
      { name: '打保龄球', location: 'outdoor', people: smallGroupPeople, icon: 'target', apps: ['app'] },
      { name: '开卡丁车', location: 'outdoor', people: anyPeople, icon: 'car', apps: ['app'] },
      { name: '玩飞盘', location: 'outdoor', people: smallGroupPeople, icon: 'target', apps: ['app'] },
      { name: '体验射箭', location: 'outdoor', people: soloSmallPeople, icon: 'target', apps: ['app'] },
      { name: '蹦床公园', location: 'outdoor', people: smallGroupPeople, icon: 'bed', apps: ['app'] },
      { name: '攀岩', location: 'outdoor', people: soloSmallPeople, icon: 'mountain', apps: ['app'] },
      { name: '打网球', location: 'outdoor', people: smallPeople, icon: 'target', apps: ['app'] },
      { name: '打羽毛球', location: 'outdoor', people: smallPeople, icon: 'target', apps: ['app'] },
      { name: '打乒乓球', location: 'outdoor', people: smallPeople, icon: 'circle-dot', apps: ['app'] },
      { name: '打匹克球', location: 'outdoor', people: smallPeople, icon: 'circle-dot', apps: ['app'] },
      { name: '打板球', location: 'outdoor', people: smallPeople, icon: 'circle', apps: ['app'] },
      { name: '踢足球', location: 'outdoor', people: groupPeople, icon: 'circle', apps: ['app'] },
      { name: '打篮球', location: 'outdoor', people: groupPeople, icon: 'circle', apps: ['app'] },
      { name: '打排球', location: 'outdoor', people: groupPeople, icon: 'circle', apps: ['app'] },
      { name: '滑雪滑冰', location: 'outdoor', people: anyPeople, icon: 'snowflake', apps: ['app'] },
      { name: '游泳划水', location: 'outdoor', people: soloSmallPeople, icon: 'waves', apps: ['app'] },
      { name: '打高尔夫', location: 'outdoor', people: soloSmallPeople, icon: 'target', apps: ['app'] },
      { name: '跑步', location: 'outdoor', people: soloSmallPeople, icon: 'footprints', apps: ['app'] },
      { name: '骑自行车', location: 'outdoor', people: soloSmallPeople, icon: 'bike', apps: ['app'] },
    ]
  }
];


export const loadingTexts = [
  '正在为你物色好去处...',
  '翻翻口袋里的有趣灵感...',
  '让幸运之神眨眨眼...',
  '悄悄问问骰子的意见...',
  '在愿望清单里挑挑拣拣...',
  '把无聊选项都筛掉...',
  '召唤周末的魔法...',
  '在地图上指指点点...',
  '偷瞄一眼好天气...',
  '把最棒的主意挑出来...'
];

export const easterEggs = [
  { count: 3, text: '你似乎有点犹豫呢，要相信自己的直觉~' },
  { count: 5, text: '刚才那个其实也不错哦，有时候第一感觉最准' },
  { count: 8, text: '要不让朋友帮你选？或者...听从命运的安排' },
  { count: 10, text: '我真的尽力了...但好的选择值得等待，不是吗？' },
  { count: 15, text: '你发现了隐藏成就：选择困难症晚期 😄' }
];
