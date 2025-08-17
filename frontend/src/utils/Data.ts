import { GraphData, NodeData, EdgeData } from '@/types/graph'
import { NODE_TYPE_CONFIGS, EDGE_TYPE_CONFIGS } from '@/constants/graph'

// 凡人修仙传主要人物数据
const MAIN_CHARACTERS = [
  { id: 'hanli', label: '韩立', type: 'person', desc: '主角，从凡人一步步修炼成仙的传奇人物。他勤奋修炼，获得各种秘术和法宝，最终成为修仙界举足轻重的人物.' },
  { id: 'modaifu', label: '墨大夫', type: 'person', desc: '韩立的师父，传授其无名口诀，并提供药物辅佐其修炼。对韩立表现出特别的重视和关心，但也有贪婪和渴望的神情。他的酒楼属于七玄门所有。他利用尸虫丸和韩立家人的安全来控制韩立。他利用一只黄羽小鸟监视韩立。他试图夺舍余子童。他最后被韩立击杀.' },
  { id: 'zhangtie', label: '张铁', type: 'person', desc: '韩立的好友兼同门，修炼“象甲功”。他抱怨修炼过程的痛苦，但意志坚强。他最后失踪，韩立怀疑是害怕“象甲功”的后续修炼.' },
  { id: 'lifeyu', label: '厉飞雨', type: 'person', desc: '韩立的好友，最初因伤病向韩立求药，后与韩立互相传授武功和药物。他机警过人，识破野狼帮奸细并立下大功，被七玄门任命为护法。他曾是“厉师兄”。' },
  { id: 'nangongwan', label: '南宫婉', type: 'person', desc: '韩立的双修伴侣。韩立在后来将其传送到了乱星海并安顿下来.' },
  { id: 'quhun', label: '曲魂', type: 'person', desc: '韩立的傀儡分身，由韩立用自身鲜血和魂魄炼化控制。他战斗力强大，后来随韩立闯荡修仙界，并协助韩立进行战斗和侦察.' },
  { id: 'yuzitong', label: '余子童', type: 'person', desc: '一个元神状态的古修，墨大夫试图夺舍的对象。他向墨大夫传授了夺舍之法.' },
  { id: 'sanshu', label: '三叔', type: 'person', desc: '韩立的亲戚，在七玄门酒楼担任大掌柜，后成为七玄门外门弟子。他引荐韩立参加七玄门内门弟子招募考核.' },
  { id: 'hanfu', label: '韩父', type: 'person', desc: '韩立的父亲，老实巴交，最初犹豫是否让韩立加入江湖门派，后因每月一两银子和体面身份而同意.' },
  { id: 'hanmu', label: '韩母', type: 'person', desc: '韩立的母亲，临别时嘱咐韩立注意身体.' },
  { id: 'dage', label: '大哥', type: 'person', desc: '韩立的兄长，经三叔介绍在城里当铁匠学徒，是韩家的骄傲.' },
  { id: 'wangdapang', label: '王大胖', type: 'person', desc: '在比试中击败对手，表现得意.' },
  { id: 'zhangchanggui', label: '张长贵', type: 'person', desc: '在比试中，其一方的弟子昏倒后被其拖回.' },
  { id: 'xiaosuapan', label: '小算盘', type: 'person', desc: '七玄门内门弟子，询问韩立的师承和功力进展.' },
  { id: 'tienu', label: '铁奴', type: 'person', desc: '墨大夫手下的巨汉，被墨大夫命令去抓韩立，力大无穷.' },
  { id: 'madamli', label: '李氏', type: 'person', desc: '李长老的夫人，对韩立救治李长老表示感谢.' },
  { id: 'elderli', label: '李长老', type: 'person', desc: '被韩立从余毒中救治的老者.' },
  { id: 'elderzhao', label: '赵长老', type: 'person', desc: '在李长老被救治时显得急躁不安.' },
  { id: 'rusheng', label: '儒生', type: 'person', desc: '在比试中被灰衣人斩首.' },
  { id: 'huiyiren', label: '灰衣人', type: 'person', desc: '在比试中展现高超武功，斩杀儒生.' },
  { id: 'sunergou', label: '孙二狗', type: 'person', desc: '嘉元城码头上的帮派小头目，擅长察言观色、溜须拍马。后被韩立收服并协助管理“四平帮”。' },
  { id: 'heixiong', label: '黑熊', type: 'person', desc: '孙二狗的同伴.' },
  { id: 'yanjiashi', label: '严氏', type: 'person', desc: '墨大夫的妻室之一，在墨大夫遗书中被提及。她与韩立交换“暖阳宝玉”。' },
  { id: 'ouyangfeitian', label: '欧阳飞天', type: 'person', desc: '独霸山庄庄主，修炼有顶级硬功“霸王甲”，被韩立使用剑符斩首.' },
  { id: 'yeshishu', label: '叶师叔', type: 'person', desc: '一位师叔，曾给韩立一些法器和符箓，但韩立怀疑他私吞了不少东西.' },
  { id: 'chenshimei', label: '陈师妹', type: 'person', desc: '韩立的同门师妹，与陆师兄有情感纠葛。曾被韩立施法定神符救治.' },
  { id: 'lushixiong', label: '陆师兄', type: 'person', desc: '韩立的同门师兄，风属性法术强大。后与韩立发生激战，被韩立击败.' },
  { id: 'wufeng', label: '吴风', type: 'person', desc: '韩立的师兄，曾教授韩立“敛气术”和瞬发法术的技巧.' },
  { id: 'lishizu', label: '李师祖', type: 'person', desc: '黄枫谷高层人物，建议韩立拜师。他也是七派之一的结丹期修士.' },
  { id: 'daoshi', label: '道士', type: 'person', desc: '清虚门领队，向弟子们训话鼓舞士气。他是七派之一的结丹期修士.' },
  { id: 'ni_shang_xian_zi', label: '霓裳仙子', type: 'person', desc: '掩月宗的美貌少妇，门下弟子多为女性，且容貌出众.' },
  { id: 'yanjialaozu', label: '燕家老祖', type: 'person', desc: '燕家的高人，将鬼灵门少主带入密室.' },
  { id: 'guilingmenshaozhu', label: '鬼灵门少主', type: 'person', desc: '与燕家老祖一同进入密室.' },
  { id: 'lutianmeng', label: '吕天蒙', type: 'person', desc: '使用“日月袋”生擒妖兽，但法器随后被妖兽撑破.' },
  { id: 'mengmiannvzi', label: '蒙面女子', type: 'person', desc: '被韩立和蒙山五友擒获，韩立为其解除了血咒，并施加了禁制.' },
  { id: 'mengshanwuyou', label: '蒙山五友', type: 'person', desc: '协助韩立擒获蒙面女子.' },
  { id: 'xiaowangye', label: '小王爷', type: 'person', desc: '被韩立用迷魂法术审问，透露了修炼魔功并血祭修士的秘密，后被韩立用“断魂丹”毒杀.' },
  { id: 'wangzongguan', label: '王总管', type: 'person', desc: '曾与小王爷在一起，也被蒙山四友审问.' },
  { id: 'mengsansiyou', label: '蒙山四友', type: 'person', desc: '审问王总管并与韩立商讨口供.' },
  { id: 'liujing', label: '刘靖', type: 'person', desc: '拥有“真宝”，为除恶而使用.' },
  { id: 'xuehongshijie', label: '雪虹师姐', type: 'person', desc: '刘靖的双修伴侣.' },
  { id: 'yuehuang', label: '越皇', type: 'person', desc: '越国皇帝，筑基后期修士，隐藏修为.' },
  { id: 'lanpaoren', label: '蓝袍人', type: 'person', desc: '与越皇一同行动，筑基后期修士.' },
  { id: 'wusemenzhu', label: '五色门主', type: 'person', desc: '李府的人，被韩立审问，墨玉珠的相公.' },
  { id: 'moyuzhu', label: '墨玉珠', type: 'person', desc: '墨凤舞的姐姐，墨大夫的女儿，为五色门主求情.' },
  { id: 'mofengwu', label: '墨凤舞', type: 'person', desc: '墨大夫的女儿，韩立承诺为其报仇.' },
  { id: 'baizhizhu', label: '白蜘蛛', type: 'person', desc: '韩立培育的灵兽之一.' },
  { id: 'tihunshou', label: '啼魂兽', type: 'person', desc: '韩立收服的奇兽，能发出黄色霞光攻击.' },
  { id: 'jinsican', label: '金丝蚕', type: 'person', desc: '韩立收取的妖虫，有潜力进化为幻焰蛾.' },
  { id: 'huan_yan_e', label: '幻焰蛾', type: 'person', desc: '一种奇虫，由金丝蚕进化而来.' },
  { id: 'fanfuren', label: '范夫人', type: 'person', desc: '妙音门修士，与韩立商讨天雷竹事宜.' },
  { id: 'zhongnianren', label: '中年人', type: 'person', desc: '范夫人的手下.' },
  { id: 'yuntianxiao', label: '云天啸', type: 'person', desc: '妙音门修士，与范夫人一同商议传送事宜.' },
  { id: 'shixianzi', label: '石仙子', type: 'person', desc: '引导众人破除禁制.' },
  { id: 'huyue', label: '胡月', type: 'person', desc: '听从石仙子和韩立的指示.' },
  { id: 'jinqing', label: '金青', type: 'person', desc: '协助韩立破阵.' },
  { id: 'jianxingxiushi', label: '简姓修士', type: 'person', desc: '协助韩立破阵.' },
  { id: 'hongfalaozhe', label: '红发老者', type: 'person', desc: '手持玉简，是葛笠.' },
  { id: 'geli', label: '葛笠', type: 'person', desc: '乱星海修士，与韩立、紫灵仙子一同进入鬼雾.' },
  { id: 'zilingxianzi', label: '紫灵仙子', type: 'person', desc: '乱星海修士，与韩立、葛笠一同进入鬼雾.' },
  { id: 'xuangou', label: '玄骨', type: 'person', desc: '一个古修，与韩立合作寻找九曲灵参.' },
  { id: 'huangliannanzi', label: '黄脸男子', type: 'person', desc: '驱使红狸兽探索沙漠.' },
  { id: 'jiyinzushi', label: '极阴祖师', type: 'person', desc: '乱星海魔道老怪，后被韩立击败和冰封.' },
  { id: 'manhuzi', label: '蛮胡子', type: 'person', desc: '乱星海元婴期老怪.' },
  { id: 'qingyijushi', label: '青易居士', type: 'person', desc: '乱星海元婴期老怪.' },
  { id: 'yuanyao', label: '元瑶', type: 'person', desc: '在石殿中与韩立一起出现的黑袍女子.' },
  { id: 'jixuan', label: '极炫', type: 'person', desc: '被提及为玄骨的另一个逆徒.' },
  { id: 'lingyuling', label: '凌玉灵', type: 'person', desc: '星宫长老，招降逆星盟修士，后带领韩立进入玉制大门.' },
  { id: 'fengxi', label: '风希', type: 'person', desc: '九级裂风兽，自称研制出风雷翅。后被韩立击败并被收走妖丹.' },
  { id: 'guixiao', label: '龟妖', type: 'person', desc: '八级妖龟，拥有“自愈之体”，被韩立击败.' },
  { id: 'dujiao', label: '毒蛟', type: 'person', desc: '毒蛟.' },
  { id: 'yixingdahan', label: '易姓大汉', type: 'person', desc: '曾与韩立一起传送，在岛上向韩立求助.' },
  { id: 'miaoche', label: '妙鹤', type: 'person', desc: '一名老道.' },
  { id: 'wendaoyou', label: '温道友', type: 'person', desc: '俊秀斯文的青年，能推算鬼雾出现.' },
  { id: 'shao_nu', label: '少女', type: 'person', desc: '与温道友同行.' },
  { id: 'wentianren', label: '温天仁', type: 'person', desc: '鬼灵门的六道传人，与韩立激战，施展了“阴魔斩”。' },
  { id: 'jingshouhanzi', label: '精瘦汉子', type: 'person', desc: '鬼雾阴冥之地中带领众人，熟知绝灵之气.' },
  { id: 'zhiqidenanzi', label: '稚气的男子', type: 'person', desc: '精瘦汉子队伍中的一员.' },
  { id: 'fengxingzhongnianren', label: '封姓中年人', type: 'person', desc: '阴冥之地村民，欲娶梅凝为妻.' },
  { id: 'meining', label: '梅凝', type: 'person', desc: '阴冥之地中的美貌女修，被困在此地，后与韩立一同行动.' },
  { id: 'yujun', label: '俞君', type: 'person', desc: '落云宗弟子，引领韩立和杜东.' },
  { id: 'rushengzhongnianren', label: '儒生打扮的中年人', type: 'person', desc: '落云宗结丹中期修士，韩立的师祖.' },
  { id: 'baifacangcanglaozhe', label: '白发苍苍老者', type: 'person', desc: '落云宗弟子，精通制符术.' },
  { id: 'nv_de', label: '女的', type: 'person', desc: '落云宗弟子，精通炼丹术.' },
  { id: 'dudong', label: '杜东', type: 'person', desc: '落云宗新入门弟子，与韩立同门。在试剑大会中故意输给韩立.' },
  { id: 'kuihuan', label: '奎焕', type: 'person', desc: '黄枫谷弟子，讨论试剑大会.' },
  { id: 'wangshixiong', label: '王师兄', type: 'person', desc: '黄枫谷弟子，讨论试剑大会.' },
  { id: 'mashidi', label: '马师弟', type: 'person', desc: '黄枫谷弟子，检查死亡的妖狐。后来是结丹期修士，与秃眉大汉一同.' },
  { id: 'yuanxingdizi', label: '袁姓弟子', type: 'person', desc: '天泉峰弟子，在试剑大会中与白凤峰女修对战.' },
  { id: 'sunhuo', label: '孙火', type: 'person', desc: '落云宗弟子，在试剑大会中获得第三名.' },
  { id: 'pifalaozhe', label: '披发老者', type: 'person', desc: '带领弟子进入灵眼之树所在洞窟.' },
  { id: 'miniyinger', label: '迷你婴儿', type: 'person', desc: '韩立元婴的形象.' },
  { id: 'yinfalaozhe', label: '银发老者', type: 'person', desc: '落云宗长老，韩立的师兄.' },
  { id: 'mupeiling', label: '慕沛灵', type: 'person', desc: '落云宗弟子，在药园等待韩立.' },
  { id: 'xinruoyin', label: '辛如音', type: 'person', desc: '与韩立有约定，在元武国.' },
  { id: 'dongxuaner', label: '董璇儿', type: 'person', desc: '合欢宗金丹期弃徒，曾派人寻找韩立.' },
  { id: 'wuyihanzi', label: '乌衣汉子', type: 'person', desc: '鬼灵门修士，追查韩立踪迹.' },
  { id: 'fengyunyoucunzisanjiufuren', label: '风韵犹存的三十余岁妇人', type: 'person', desc: '鬼灵门修士，追查韩立踪迹，后被韩立收服.' },
  { id: 'hunshenyindejinyishusheng', label: '浑身阴气的锦衣书生', type: 'person', desc: '鬼灵门修士，姓阙，追查韩立踪迹.' },
  { id: 'hanyunzhi', label: '菡云芝', type: 'person', desc: '御灵宗弟子，被韩立救治并放走.' },
  { id: 'liuxingnvzi', label: '柳姓女子', type: 'person', desc: '御灵宗弟子，拥有六翼霜蚣，后被韩立收为弟子并传授驱虫术.' },
  { id: 'lulou', label: '吕洛', type: 'person', desc: '落云宗长老，与韩立同伴.' },
  { id: 'pangzi', label: '胖子', type: 'person', desc: '与肥姹双魔之一，来自合欢宗.' },
  { id: 'feichashuangmo', label: '肥姹双魔', type: 'person', desc: '合欢宗的双修伴侣，实力强大.' },
  { id: 'tianjingshangren', label: '天晶上人', type: 'person', desc: '乱星海元婴期修士，主持交易会。后在坠魔谷中元婴被困.' },
  { id: 'nanlonghou', label: '南陇侯', type: 'person', desc: '乱星海元婴期修士，与韩立在交易会上相遇。他与韩立、鲁卫英一同进入坠魔谷.' },
  { id: 'baishanlaozhe', label: '白衫老者', type: 'person', desc: '与南陇侯一同打开洞府禁制.' },
  { id: 'yanruyan', label: '燕如嫣', type: 'person', desc: '越国修士，在试剑大会中观察韩立。后成为元婴期修士并寻求韩立帮助.' },
  { id: 'panglaozhe', label: '胖老者', type: 'person', desc: '被韩立救助的修士.' },
  { id: 'nieying', label: '聂盈', type: 'person', desc: '被韩立救助的女修.' },
  { id: 'tumeidahan', label: '秃眉大汉', type: 'person', desc: '黄龙山修士，与马姓老者一同与韩立击杀附灵怪物.' },
  { id: 'sheyao', label: '蛇妖', type: 'person', desc: '被韩立和秃眉大汉、马姓老者击杀的附灵怪物.' },
  { id: 'lexingnvzi', label: '乐姓女子', type: 'person', desc: '慕兰族第一女上师，操控古灯和圣禽.' },
  { id: 'qingkongque', label: '青孔雀', type: 'person', desc: '圣禽，乐姓女子所操控.' },
  { id: 'tianzhong', label: '田锺', type: 'person', desc: '与凤冰对战的修士.' },
  { id: 'baixingfuren', label: '白姓妇人', type: 'person', desc: '从血罩中出现的秀美白衫妇人.' },
  { id: 'fengbing', label: '凤冰', type: 'person', desc: '慕兰族修士.' },
  { id: 'yinyue', label: '银月', type: 'person', desc: '韩立的傀儡分身，后完全恢复神智，并辅助韩立.' },
  { id: 'chengdaoyou', label: '程道友', type: 'person', desc: '即银发老者.' },
  { id: 'shixiao', label: '尸魈', type: 'person', desc: '一种被韩立困住并击出元神的怪物.' },
  { id: 'luweiying', label: '鲁卫英', type: 'person', desc: '韩立的同伴，与南陇侯一同进入坠魔谷.' },
  { id: 'dongmentu', label: '东门图', type: 'person', desc: '御灵宗大长老.' },
  { id: 'wuxinglingying', label: '五行灵婴', type: 'person', desc: '御灵宗的五名元婴初期修士.' },
  { id: 'huochanshou', label: '火蟾兽', type: 'person', desc: '一种强大的妖兽，被韩立诱杀并夺取妖丹.' },
  { id: 'dayanshenjun', label: '大衍神君', type: 'person', desc: '一个古修的元神寄居在小人傀儡中，指导韩立修炼和炼器.' },
  { id: 'xiangzhili', label: '向之礼', type: 'person', desc: '化神期修士.' },
  { id: 'linglong', type: 'person', desc: '一位修士，在古魔圣祖释放魔气后出现.' },
  { id: 'shanyanghuzidelaozhe', label: '山羊胡子的老者', type: 'person', desc: '韩立为了掩饰身份变幻而成的模样.' },
  { id: 'wusedenvziguangying', label: '五色的女子光影', type: 'person', desc: '小极宫的创建者，以光影形式出现.' },
  { id: 'hanlishangren', label: '寒骊上人', type: 'person', desc: '小极宫的高阶修士，与韩立对战.' },
  { id: 'baimengxin', label: '白梦馨', type: 'person', desc: '在玄玉洞中提取万年玄玉.' },
  { id: 'qingshanzhongnianren', label: '青衫中年人', type: 'person', desc: '白梦馨的同伴.' },
  { id: 'bingfeng', label: '冰凤', type: 'person', desc: '十级妖兽，与韩立对战，后一同被传送离开虚灵殿.' },
  { id: 'wensiyue', label: '文思月', type: 'person', desc: '韩立的故人.' },
  { id: 'tianqiner', label: '田琴儿', type: 'person', desc: '文思月夫妇的女儿，曾面黄肌瘦，被韩立救治后变得清秀.' },
  { id: 'dalanglaozhe', label: '大长老', type: 'person', desc: '宗门长老，命令蓝袍管事收集炼器材料.' },
  { id: 'hexinjinghun', label: '核心精魂', type: 'person', desc: '万丈魔渊中的一个高大人影.' },
  { id: 'dieryuanying', label: '第二元婴', type: 'person', desc: '韩立的化身，后被夺舍，又恢复神智与韩立激战，最终被韩立收服.' },
  { id: 'zhonglaozhe', label: '钟长老', type: 'person', desc: '鬼灵门长老，曾与韩立在坠魔谷有过一面之缘.' },
  { id: 'shuangshouguaishe', label: '双首怪蛇', type: 'person', desc: '六道极圣所放出的妖兽，被韩立的傀儡击杀.' },
  { id: 'fenglaoguai', label: '风老怪', type: 'person', desc: '化神期修士，因家族后裔被杀而追杀韩立.' },
  { id: 'jin_jiao_wang', label: '金蛟王', type: 'person', desc: '在火海中与韩立激战的妖兽.' },
  { id: 'tianjifu', label: '天机府', type: 'person', desc: '一件法宝，韩立将噬金虫等灵虫灵兽留在此处.' },
  { id: 'tongzi', label: '童子', type: 'person', desc: '一个器灵，与韩立对话，讨论其修炼和未来.' }
]

// 组织/宗门
const ORGANIZATIONS = [
  { id: 'qixuanmen', label: '七玄门', type: 'organization', desc: '江湖门派，有外门和内门之分，在方圆数百里内是了不起的、数一数二的大门派。' },
  { id: 'mofu', label: '墨府', type: 'organization', desc: '韩立承诺要帮助报仇的势力。' },
  { id: 'huangfenggu', label: '黄枫谷', type: 'organization', desc: '越国修仙界的大型门派，其坊市兴隆；谷内万余名修仙者中，结丹期仅数人。' },
  { id: 'qidaipai', label: '七大派', type: 'organization', desc: '越国修仙界的七个主要大型门派的总称，共同提供弟子名额和筑基丹，并监督禁地。' },
  { id: 'yanyuezong', label: '掩月宗', type: 'organization', desc: '越国修仙界七大派之一，有弟子和“穹老怪”等高阶修士。' },
  { id: 'tianquebao', label: '天阙堡', type: 'organization', desc: '越国修仙界七大派之一，有结丹期高手，擅长炼制法器。' },
  { id: 'guilingmen', label: '鬼灵门', type: 'organization', desc: '有少主和弟子，曾有修士进入冰缝。' },
  { id: 'lingshoushan', label: '灵兽山', type: 'organization', desc: '越国修仙界七大派之一，有弟子擅长驯养妖兽。' },
  { id: 'heishajiao', label: '黑煞教', type: 'organization', desc: '一个魔道教派，控制越国皇宫，有教主、血侍等成员，拥有独特的修炼功法。' },
  { id: 'sipingbang', label: '四平帮', type: 'organization', desc: '由孙二狗在曲魂协助下经营的势力。' },
  { id: 'wusemen', label: '五色门', type: 'organization', desc: '一个与韩立有恩怨的门派，有门主。' },
  { id: 'tiandaohui', label: '天道会', type: 'organization', desc: '天南地区由多个国家和宗派组成的修士联盟，与魔道和正道盟形成三足鼎立之势。' },
  { id: 'zhengdaomeng', label: '正道盟', type: 'organization', desc: '天南地区与天道会和魔道对立的修仙势力。' },
  { id: 'jiuguomeng', label: '九国盟', type: 'organization', desc: '天南地区的一个修士联盟，六派修士曾在此安顿并争夺资源，在虞国设有盛大交易会。' },
  { id: 'liuliandian', label: '六连殿', type: 'organization', desc: '一个修仙宗门，有长老。' },
  { id: 'xinggong', label: '星宫', type: 'organization', desc: '乱星海第一大势力，控制众多星岛，管理天星城秩序，曾与逆星盟大战，有长老等高层。' },
  { id: 'biyunmen', label: '碧云门', type: 'organization', desc: '与极阴祖师相关的当地势力，曾有修士被韩立灭杀。' },
  { id: 'miaoyinmen', label: '妙音门', type: 'organization', desc: '一个修仙宗门。' },
  { id: 'nixingmeng', label: '逆星盟', type: 'organization', desc: '乱星海中与星宫对立的修士联盟，曾有修士暗中投靠。' },
  { id: 'hehuanzong', label: '合欢宗', type: 'organization', desc: '魔道六宗之一，有合欢老魔等后期大修士。' },
  { id: 'huayimen', label: '化意门', type: 'organization', desc: '一个修仙宗门，有魏无涯等后期大修士。' },
  { id: 'gujianmen', label: '古剑门', type: 'organization', desc: '天道盟核心门派之一，擅长御剑之术，镇派绝学“太白剑诀”大名鼎鼎，对弟子资质要求高。' },
  { id: 'luoyunzong', label: '落云宗', type: 'organization', desc: '天道盟核心门派之一，位于云梦山，有接引弟子、掌门、长老，可举办元婴后期典礼。' },
  { id: 'baiqiaoyuan', label: '百巧院', type: 'organization', desc: '天道盟核心门派之一，以炼制法器闻名，门内藏有顶尖法宝炼制之法，由五个修士家族联合把持。' },
  { id: 'fujia', label: '付家', type: 'organization', desc: '元武国第一家族，曾是百巧院付家远支，魔道入侵时投靠魔焰宗。' },
  { id: 'moyanzong', label: '魔焰宗', type: 'organization', desc: '魔道六宗之一，元武国的控制者，付家曾投靠并派遣子弟加入。' },
  { id: 'yinluozong', label: '阴罗宗', type: 'organization', desc: '一个魔道宗门，曾有修士参与拍卖会，有宗主。' },
  { id: 'tianfumen', label: '天符门', type: 'organization', desc: '一个擅长制符的修仙宗门，拥有三大密符（化灵符、六丁天甲符、降灵符），其中化灵符是历代结丹修士必修神通。' },
  { id: 'huangqingguan', label: '皇清观', type: 'organization', desc: '一个有元婴期老道姑和高阶修士的观门，有炼器殿。' },
  { id: 'zhunanjiangjunfu', label: '柱南将军府', type: 'organization', desc: '一个有柱南将军之女和两位结丹期供奉的府邸。' },
  { id: 'dayanzong', label: '大衍宗', type: 'organization', desc: '大衍神君的传承，与傀儡术和神识相关。' },
  { id: 'dushengmen', label: '毒圣门', type: 'organization', desc: '一个修仙宗门。' },
  { id: 'jiuyouzong', label: '九幽宗', type: 'organization', desc: '一个修仙宗门，有长老。' },
  { id: 'mulanren', label: '慕兰族', type: 'organization', desc: '游牧民族，拥有法士体系，有神师，曾入侵天南。' },
  { id: 'tianlanshengdian', label: '天澜圣殿', type: 'organization', desc: '慕兰族的重要势力，可快速建立临时驻地供各部落歇脚。' },
  { id: 'xiaojigong', label: '小极宫', type: 'organization', desc: '北冥岛第一宗门，擅长驯养雪猿，有大长老。' },
  { id: 'bingfengzu', label: '冰凤族', type: 'organization', desc: '一个妖族，其成员冰凤能变幻分身，对修炼乾蓝冰焰之人有巨大怨恨。' },
  { id: 'zhengyumodao', label: '正魔两道', type: 'organization', desc: '天南地区两大对立的修仙势力阵营。' }
]

// 地点
const LOCATIONS = [
  { id: 'jingzhou', label: '镜州', type: 'location', desc: '七玄门曾雄霸数十载的州府，彩霞山位于其境内。' },
  { id: 'yueguo', label: '越国', type: 'location', desc: '七玄门曾声名赫赫的国家，岚州和溪国均位于其中。韩立曾遁入此国。' },
  { id: 'jingzhoucheng', label: '镜州城', type: 'location', desc: '镜州的首府，七玄门曾被挤出此城。' },
  { id: 'caixiashan', label: '彩霞山', type: 'location', desc: '七玄门宗门所在地，是镜州第二大山，拥有落日峰等多个山峰。' },
  { id: 'qingniuzhen', label: '青牛镇', type: 'location', desc: '七玄门控制的十几个小城镇之一，韩立曾从这里出发前往彩霞山。' },
  { id: 'caixiashanmai', label: '彩霞山脉', type: 'location', desc: '韩立曾在此山脉中寻找隐秘处所进行交易。' },
  { id: 'shenshougu', label: '神手谷', type: 'location', desc: '墨大夫的居所和韩立的修炼之地，曾被暂时对外封闭。' },
  { id: 'luorifeng', label: '落日峰', type: 'location', desc: '彩霞山的主峰，韩立曾在死斗结束后下山。' },
  { id: 'lanzhou', label: '岚州', type: 'location', desc: '越国面积第八大、富足程度位列第二的州府，嘉元城位于其中。' },
  { id: 'jiayuancheng', label: '嘉元城', type: 'location', desc: '岚州第一大城，交通极为发达，是水运枢纽和商贸要道。' },
  { id: 'xiangludayunhe', label: '乡鲁大运河', type: 'location', desc: '贯穿越国南北，穿过嘉元城中心。' },
  { id: 'dubashanzhuang', label: '独霸山庄', type: 'location', desc: '欧阳飞天的住所，韩立曾赶往此地刺杀他。' },
  { id: 'tainanshan', label: '太南山', type: 'location', desc: '韩立离开嘉元城后赶往的目的地。' },
  { id: 'tainangu', label: '太南谷', type: 'location', desc: '修仙者聚集之地，韩立曾想在此结交修仙者。' },
  { id: 'xinwangfu', label: '馨王府', type: 'location', desc: '韩立曾潜入此地进行调查。' },
  { id: 'lifu', label: '李府', type: 'location', desc: '五色门主二子的住所，韩立曾在此地将其化为灰烬。' },
  { id: 'qinzai', label: '秦宅', type: 'location', desc: '韩立曾在此地布下禁制并处理事务。' },
  { id: 'shuangfengdao', label: '双峰岛', type: 'location', desc: '妙音门坊市曾位于此岛，岛上有两座巨峰。' },
  { id: 'miaoyindao', label: '妙音岛', type: 'location', desc: '妙音门坊市最初设置的岛屿。' },
  { id: 'xiguo', label: '溪国', type: 'location', desc: '天南地区最北部的国家，面积比越国稍小，闵州位于其内。' },
  { id: 'minzhou', label: '闵州', type: 'location', desc: '溪国最大的州，紧邻无边海，封日城是其州府。' },
  { id: 'fengricheng', label: '封日城', type: 'location', desc: '闵州的州府和最大城市。' },
  { id: 'wubianhai', label: '无边海', type: 'location', desc: '韩立与梅凝、紫灵一同穿越的海域，景色奇特。' },
  { id: 'tianquanfeng', label: '天泉峰', type: 'location', desc: '落云宗的六巧峰之一，韩立被分派到此峰进行修行。' },
  { id: 'yuanwuguo', label: '元武国', type: 'location', desc: '一个曾被魔道入侵并投靠魔焰宗的国家，付家是其第一家族。' },
  { id: 'zidaoshan', label: '紫道山', type: 'location', desc: '元武国西部的一处深山，付家主堡所在地，常年被淡紫色毒雾缭绕。' },
  { id: 'dajin', label: '大晋', type: 'location', desc: '修仙界的一个古老国度，韩立曾前往此地寻找庚精和处理事务。' },
  { id: 'taichangfu', label: '太昌府', type: 'location', desc: '大晋的一个府城，以书院众多闻名。' },
  { id: 'taichangcheng', label: '太昌城', type: 'location', desc: '太昌府的府城，富豪巨商云集，有宝光殿等建筑。' },
  { id: 'wuguangcheng', label: '武广城', type: 'location', desc: '大晋名气最大的城市，比太昌城更著名。' },
  { id: 'ganjia', label: '甘家', type: 'location', desc: '太昌城中拥有巨宅的富商家族。' },
  { id: 'huoyu', label: '火狱', type: 'location', desc: '七大禁地之一，遍布火山和火属性材料，其中心山脉是真正的禁区。' },
  { id: 'zhuimogu', label: '坠魔谷', type: 'location', desc: '一个充满空间裂缝的险恶之地，韩立曾深入其中并解决问题。' },
  { id: 'kunwushan', label: '昆吾山', type: 'location', desc: '一处重要的寻宝之地，拥有镇魔塔和昆吾殿。' },
  { id: 'zhenmota', label: '镇魔塔', type: 'location', desc: '昆吾山上的一座塔，据说藏有奇宝并镇压魔物。' },
  { id: 'kunwudian', label: '昆吾殿', type: 'location', desc: '昆吾山上的雄伟宫殿，是众多修士前往探宝的目的地。' },
  { id: 'qilingdao', label: '七灵岛', type: 'location', desc: '万丈魔渊的所在地。' },
  { id: 'wanzhangmoyuan', label: '万丈魔渊', type: 'location', desc: '七灵岛上的深渊，韩立曾在此地获取魔髓钻并进行修炼。' },
  { id: 'xuanyudong', label: '玄玉洞', type: 'location', desc: '韩立曾进入探索的洞窟，以其神秘玄玉和极寒之气闻名。' },
  { id: 'xulingdian', label: '虚灵殿', type: 'location', desc: '韩立从玄玉洞缝隙中出来后所到达的殿堂。' },
  { id: 'beimingdao', label: '北冥岛', type: 'location', desc: '小极宫的所在地，因其极寒之气和风雪而闻名。' },
  { id: 'xiaojigong', label: '小极宫', type: 'location', desc: '位于北冥岛上的修仙宗门，其创始人是一位女修。' },
  { id: 'wanyaogu', label: '万妖谷', type: 'location', desc: '北冥岛方向的妖兽主要聚集地。' },
  { id: 'luanxinghai', label: '乱星海', type: 'location', desc: '一个充满危险与机遇的修仙海域，天星城是其第一大城。' },
  { id: 'tianxingcheng', label: '天星城', type: 'location', desc: '乱星海的第一大城，建在巨大的山体之上，是修士往来的枢纽。' },
  { id: 'shengshan', label: '圣山', type: 'location', desc: '星宫的圣山，韩立曾在此闭关百年。' },
  { id: 'wulonghai', label: '五龙海', type: 'location', desc: '一个海域，韩立曾在此地待了五六年进行修炼。' },
  { id: 'yuguo', label: '虞国', type: 'location', desc: '北凉国邻近的国家，黄龙山位于其离州边上。' },
  { id: 'lizhou', label: '离州', type: 'location', desc: '虞国的一个州。' },
  { id: 'huanglongshan', label: '黄龙山', type: 'location', desc: '虞国离州边上的山脉，曾是交战地，韩立曾从这里生还。' },
  { id: 'tianyicheng', label: '天一城', type: 'location', desc: '天南修士对抗慕兰人的临时据点。' },
  { id: 'mulancaoyuan', label: '慕兰草原', type: 'location', desc: '慕兰族人主要的居住地，也是慕兰法士的来源地。' },
  { id: 'beiliangguo', label: '北凉国', type: 'location', desc: '天南对抗法士的临时据点所在国，与虞国接壤。' },
  { id: 'jinjing', label: '晋京', type: 'location', desc: '大晋的都城。' },
  { id: 'tianjige', label: '天机阁', type: 'location', desc: '晋京的一个机构，韩立曾前往询问炼制芥子空间的秘术。' },
  { id: 'nanjun', label: '南郡', type: 'location', desc: '太昌城所属的区域，是达官贵人、富豪巨商居住较多的府城。' },
  { id: 'yulingfeng', label: '玉灵峰', type: 'location', desc: '凌玉灵的住所。' },
  { id: 'renjie', label: '人界', type: 'location', desc: '韩立当前所处的修炼界，与灵界相对。' },
  { id: 'xutiandian', label: '虚天殿', type: 'location', desc: '一处神秘的古殿，韩立曾在此获得许多宝物，如噬金虫和虚天鼎。' },
  { id: 'bingcheng', label: '冰城', type: 'location', desc: '小极宫内部的城市，因极寒环境而得名。' },
  { id: 'lingjie', label: '灵界', type: 'location', desc: '韩立计划飞升的更高层世界。' },
  { id: 'zhudi', label: '驻地', type: 'location', desc: '慕兰各部落进贡圣殿的临时驻扎地，一个由帐篷和木屋组成的城市。' }
]

// 法宝/物品
const ITEMS = [
  { id: 'hongjiangguo', label: '红浆果', type: 'item', desc: '韩立妹妹最喜欢吃的果实。' },
  { id: 'muchaidui', label: '木柴堆', type: 'item', desc: '韩立从山里背回家的木柴。' },
  { id: 'tongban', label: '铜板', type: 'item', desc: '韩立大哥当学徒每月能得到的报酬。' },
  { id: 'hanyangan', label: '旱烟杆', type: 'item', desc: '韩父思考时会抽的烟具。' },
  { id: 'mache', label: '马车', type: 'item', desc: '七玄门的重要人物或参加入门考试的孩童乘坐的交通工具。' },
  { id: 'heiqi', label: '黑旗', type: 'item', desc: '插在马车边框上绣有“玄”字的三角黑旗，代表七玄门的重要人物；也指野狼帮指挥其手下挥动的旗帜，会涌出诡异的黑色浓雾。' },
  { id: 'tanmuhezi', label: '檀木盒子', type: 'item', desc: '韩立用来装银针的盒子。' },
  { id: 'yinzhen', label: '银针', type: 'item', desc: '韩立用来为厉师兄医治的工具。' },
  { id: 'pinganfu', label: '平安符', type: 'item', desc: '帮助韩立驱除“心魔入侵”的外物。' },
  { id: 'chousuimaruan', label: '抽髓丸', type: 'item', desc: '一种会使人名利之心和野心大增的药物。' },
  { id: 'doupen', label: '斗篷', type: 'item', desc: '神秘男子经常穿着的遮盖身体的衣物。' },
  { id: 'huanglongdan', label: '黄龙丹', type: 'item', desc: '韩立用来突破长春功境界的珍贵药丸之一。' },
  { id: 'jinsuimaruan', label: '金髓丸', type: 'item', desc: '韩立用来突破长春功境界的珍贵药丸之一。' },
  { id: 'shichongwan', label: '尸虫丸', type: 'item', desc: '墨大夫用来要挟和控制韩立的药物。' },
  { id: 'jingjingping', label: '净精瓶', type: 'item', desc: '韩立拥有的一个能产生绿液的奇特小瓶，对其修炼有极大帮助。' },
  { id: 'lvye', label: '绿液', type: 'item', desc: '净精瓶中产生的神奇液体，可用于催熟灵药。' },
  { id: 'yaoshui', label: '药水', type: 'item', desc: '小王爷被韩立硬灌服用的迷幻药物。' },
  { id: 'yujian', label: '玉简', type: 'item', desc: '记载信息、功法或材料清单的物品。' },
  { id: 'danyao', label: '丹药', type: 'item', desc: '修炼者服用的各类药丸，用于提升修为、疗伤或辅助修炼。' },
  { id: 'fulu', label: '符箓', type: 'item', desc: '具有各种神奇法术效果的符纸或玉符。' },
  { id: 'lingshi', label: '灵石', type: 'item', desc: '修仙界流通的货币，也是修炼、驱动法器和布阵的重要能源。' },
  { id: 'zhujidan', label: '筑基丹', type: 'item', desc: '筑基期修炼必需的丹药，服用后可提升修为，帮助突破境界。' },
  { id: 'jingganghuan', label: '精钢环', type: 'item', desc: '韩立早期使用的上品法器，可以变大形成防御。' },
  { id: 'qingjiaoqi', label: '青蛟旗', type: 'item', desc: '陆师兄所持的顶级风属性法器，可化形为青色巨蛟进行攻击。' },
  { id: 'xuantiefeitundun', label: '玄铁飞天盾', type: 'item', desc: '与青蛟旗同等级的顶级防御法器，能抵挡强大攻击。' },
  { id: 'huisexiaojianfubao', label: '灰色小剑符宝', type: 'item', desc: '一张画有小剑的符箓，可驱动形成巨剑攻击敌人。' },
  { id: 'jinfuzimuren', label: '金蚨子母刃', type: 'item', desc: '一套韩立使用的刃类法器，可作为攻击手段。' },
  { id: 'xiaoyuping', label: '小玉瓶', type: 'item', desc: '韩立用来吸纳动物魂魄或储存液体的瓶子，与净精瓶不同。' },
  { id: 'bailindun', label: '白磷盾', type: 'item', desc: '韩立使用的防御性法器。' },
  { id: 'guikefaqì', label: '龟壳法器', type: 'item', desc: '韩立使用的防御性法器，坚硬无比。' },
  { id: 'huoniaozhenbao', label: '火鸟真宝', type: 'item', desc: '一种用于炼化血侍的真宝。' },
  { id: 'lansezhuzi', label: '蓝色珠子', type: 'item', desc: '从冰妖尸骸中获得的珠子。' },
  { id: 'jinzhu', label: '金珠', type: 'item', desc: '从血侍葬身处获得的珠子。' },
  { id: 'huangzhu', label: '黄珠', type: 'item', desc: '从血侍葬身处获得的珠子。' },
  { id: 'juhunbo', label: '聚魂钵', type: 'item', desc: '漆黑如墨的钵盂状法器，内含大量孤魂野鬼，可用于炼制傀儡。' },
  { id: 'xuehongjianzhui', label: '血红尖锥', type: 'item', desc: '魔道和邪修之人专用的法器物品。' },
  { id: 'shenfengzhou', label: '神风舟', type: 'item', desc: '韩立用来赶路的飞行法器，速度极快。' },
  { id: 'bingzhui', label: '冰锥', type: 'item', desc: '韩立用来击杀守卫的亮晶晶的冰制武器。' },
  { id: 'yinhunzhong', label: '引魂钟', type: 'item', desc: '含有曲魂精血的法器，可用于追踪曲魂藏身之所。' },
  { id: 'huanxingzhenqi', label: '幻形阵旗', type: 'item', desc: '一种用于彻底幻形掩盖入口的阵旗。' },
  { id: 'zhenpan', label: '阵盘', type: 'item', desc: '用于布置或操控法阵的器具。' },
  { id: 'zhenqi', label: '阵旗', type: 'item', desc: '用于布置或操控法阵的旗帜。' },
  { id: 'tianleizhu', label: '天雷竹', type: 'item', desc: '一种珍稀的木属性灵材，可用来炼制飞剑，不同年份有不同等阶和雷电颜色，万年以上被称为金雷竹。' },
  { id: 'qingzhufengyunjian', label: '青竹蜂云剑', type: 'item', desc: '韩立以天雷竹为主要材料炼制的一套七十二把飞剑法宝，威力强大，也是其大庚剑阵的核心。' },
  { id: 'xiaochi', label: '小尺', type: 'item', desc: '韩立用来破除禁制的法器。' },
  { id: 'xiaochui', label: '小锤', type: 'item', desc: '韩立用来破除禁制的法器。' },
  { id: 'xiaopcha', label: '小叉', type: 'item', desc: '韩立用来破除禁制的法器。' },
  { id: 'lansisipa', label: '蓝色丝帕', type: 'item', desc: '石蝶用来破除禁制的法器。' },
  { id: 'hongsesan', label: '红色的伞', type: 'item', desc: '葛笠用来防御鬼雾的法器。' },
  { id: 'yuanzhufaqì', label: '圆珠法器', type: 'item', desc: '紫灵仙子用来形成移动结界的四颗拳头大小的法器。' },
  { id: 'jinsiswang', label: '金色丝网', type: 'item', desc: '玄骨交给韩立的金色法宝，可困住妖兽，也可以化为金弧。' },
  { id: 'huanlangubao', label: '花篮古宝', type: 'item', desc: '韩立获得的古宝之一，在战斗中曾用来困敌。' },
  { id: 'lingshoudai', label: '灵兽袋', type: 'item', desc: '用来装活物或傀儡的袋子。' },
  { id: 'butiandan', label: '补天丹', type: 'item', desc: '一颗五色丹丸，是元婴期修士争夺的宝物。' },
  { id: 'yuruyi', label: '玉如意', type: 'item', desc: '韩立从虚天殿获得的宝物。' },
  { id: 'lingxipei', label: '灵犀佩', type: 'item', desc: '韩立从老魔那里获得的宝物之一。' },
  { id: 'hanbingzhu', label: '寒冰珠', type: 'item', desc: '韩立从老魔那里获得的宝物之一。' },
  { id: 'huanglinjia', label: '皇鳞甲', type: 'item', desc: '蛮胡子穿戴的宝甲，防御力超常。' },
  { id: 'kuileilingjiancanpian', label: '傀儡零件残片', type: 'item', desc: '韩立从虚天殿获得的傀儡部件。' },
  { id: 'wannianlingru', label: '万年灵乳', type: 'item', desc: '一种珍稀的灵液，可用于滋养元神或提升修为。' },
  { id: 'yanghunmugengxu', label: '养魂木根须', type: 'item', desc: '一种用于滋养魂魄的材料。' },
  { id: 'wusexiaoyuanzhu', label: '五色小圆珠', type: 'item', desc: '烧化五色骸骨时遗留的奇怪圆珠。' },
  { id: 'dayin', label: '大印', type: 'item', desc: '韩立从花篮中收取的法宝。' },
  { id: 'yantaifabao', label: '砚台法宝', type: 'item', desc: '韩立收取的法宝之一。' },
  { id: 'hongguangshanhandaofabao', label: '红光闪闪飞刀法宝', type: 'item', desc: '胡月之物，被韩立送了出去。' },
  { id: 'minghunzhu', label: '鸣魂珠', type: 'item', desc: '与啼魂兽有关的珠子，韩立未敢轻易炼化。' },
  { id: 'leichi', label: '雷翅', type: 'item', desc: '风希用雷鹏骸骨和灵禽翅膀材料炼制出的翅膀，具有惊人雷电之力，韩立后将其炼化为风雷翅法宝。' },
  { id: 'lianjing', label: '炼晶', type: 'item', desc: '一种珍稀的材料，可用于增强飞剑的坚硬程度，与庚精同等珍稀。' },
  { id: 'bifengzhu', label: '避风珠', type: 'item', desc: '能减弱狂风力量的罕见法器。' },
  { id: 'baijinge', label: '白金戈', type: 'item', desc: '袁姓弟子驱使的上阶法器，颇有威力。' },
  { id: 'dinglingdan', label: '定灵丹', type: 'item', desc: '有助于凝结元婴的丹药。' },
  { id: 'baisejing', label: '白色古镜', type: 'item', desc: '韩立在灵眼之树所在洞窟中见到的古宝。' },
  { id: 'gengjing', label: '庚精', type: 'item', desc: '一种极其稀有且强大的金属性材料，是炼制大庚剑阵的关键材料。' },
  { id: 'wanlifu', label: '万里符', type: 'item', desc: '一种用于长距离联系和通信的符箓。' },
  { id: 'jumao', label: '巨矛', type: 'item', desc: '村中男子用来对抗巨兽的巨大长矛。' },
  { id: 'jubang', label: '巨棒', type: 'item', desc: '巨兽使用的巨大棍棒。' },
  { id: 'lingfubi', label: '灵符笔', type: 'item', desc: '制符师用来画符的工具。' },
  { id: 'mosuizuan', label: '魔髓钻', type: 'item', desc: '一种特殊的钻头或材料，在炼制魔髓飞刀时会用到。' },
  { id: 'yinzong', label: '银钟', type: 'item', desc: '韩立祭出的古宝，可发出低沉钟声攻击。' },
  { id: 'heiseshanfeng', label: '黑色山峰', type: 'item', desc: '老者使用的法宝，可变大如小山镇压敌人。' },
  { id: 'leihuizhui', label: '雷火锥', type: 'item', desc: '老妇人使用的古宝，融合雷火之力，可穿透晶墙。' },
  { id: 'xuesepifeng', label: '血色披风', type: 'item', desc: '韩立用来快速飞遁的披风。' },
  { id: 'heiseiyufu', label: '黑色玉符', type: 'item', desc: '令狐老祖所持的玉符，可化出玄化鬼手攻击。' },
  { id: 'baiseigunfabao', label: '白色棍子般法宝', type: 'item', desc: '秃眉大汉用于防御的法宝。' },
  { id: 'jinhu', label: '金弧', type: 'item', desc: '辟邪神雷或特定法宝激发的金色电弧或光芒，具有强大攻击力。' },
  { id: 'shijinchongjia', label: '噬金虫甲', type: 'item', desc: '由噬金虫组成的防御战甲。' },
  { id: 'gudeng', label: '古灯', type: 'item', desc: '慕兰族圣禽所依附的铜质古宝，具有强大火焰和控制圣禽的能力。' },
  { id: 'fenhongyuanzhu', label: '粉红色圆珠', type: 'item', desc: '乐姓女子用来喂食圣禽的珠子。' },
  { id: 'lingxiangshou', label: '灵像兽', type: 'item', desc: '可被灵符激活的兽雕，具有战斗能力。' },
  { id: 'yinyuanwan', label: '阴元丸', type: 'item', desc: '韩立赠予宋姓女子的丹药，对处子之身的女修大有好处。' },
  { id: 'yinhuolei', label: '阴火雷', type: 'item', desc: '玄阴经中记载的一种雷珠炼制秘法，威力惊人。' },
  { id: 'tianleizi', label: '天雷子', type: 'item', desc: '一种雷珠宝物，与阴火雷类似。' },
  { id: 'jianglingfu', label: '降灵符', type: 'item', desc: '韩立炼制的一种强大符箓，可临时提升修为。' },
  { id: 'jinzhizhu', label: '禁制珠', type: 'item', desc: '韩立用来攻击血雾光罩的珠子。' },
  { id: 'xueleizi', label: '血雷子', type: 'item', desc: '用天地污秽之物炼制的圆珠，可使宝物威力大降。' },
  { id: 'mixianzhong', label: '迷仙钟', type: 'item', desc: '落云宗的至宝，可用于困敌或脱身。' },
  { id: 'juding', label: '巨钉', type: 'item', desc: '韩立用来困住尸魈的缠绕金色电弧的银色巨钉。' },
  { id: 'liangyihuan', label: '两仪环', type: 'item', desc: '苍坤上人留下的古宝，可抵御北极元光。' },
  { id: 'bijiuduye', label: '碧鸠毒液', type: 'item', desc: '韩立用来对付紫纹蝎的剧毒液体。' },
  { id: 'xueseyupan', label: '血色玉盘', type: 'item', desc: '韩立用来追踪特定目标的玉盘。' },
  { id: 'renxingkuilei', label: '人形傀儡', type: 'item', desc: '韩立炼制的强大傀儡，可伪装成真人，具有强大战斗力。' },
  { id: 'chilingruanyu', label: '叱灵软玉', type: 'item', desc: '一种奇妙的玉石，可随意变形，用于炼制傀儡外壳。' },
  { id: 'gangyin', label: '罡银', type: 'item', desc: '一种坚韧的金属材料，用于炼制傀儡。' },
  { id: 'ziyouzhu', label: '紫幽珠', type: 'item', desc: '富姓老者用来抵御阴风的法器。' },
  { id: 'bingnzi', label: '冰扇子', type: 'item', desc: '白瑶怡使用的冰属性扇子法宝。' },
  { id: 'hongzhen', label: '红针', type: 'item', desc: '韩立袖中射出的纤细红针，可穿透防御。' },
  { id: 'lanmengmengdejinbei', label: '蓝濛濛的晶碑', type: 'item', desc: '韩立在阴阳窟中获得的蓝色晶体石碑，上面有符文流动。' },
  { id: 'leihuogong', label: '雷火弓', type: 'item', desc: '人形傀儡使用的弓，可射出雷火短箭。' },
  { id: 'jinleimuduanjian', label: '金雷木短箭', type: 'item', desc: '人形傀儡雷火弓所用的短箭。' },
  { id: 'xuemozhu', label: '血魔珠', type: 'item', desc: '与魔道功法相关的珠子。' },
  { id: 'xuanuanggjing', label: '眩光晶', type: 'item', desc: '炼制魔眼所用的晶体。' },
  { id: 'moyan', label: '魔眼', type: 'item', desc: '傀儡身上用于施展迷魂幻术的眼状法器。' },
  { id: 'qingzetonngdun', label: '青色铜盾', type: 'item', desc: '四散真人使用的防御性铜盾。' },
  { id: 'balingchi', label: '八灵尺', type: 'item', desc: '一种法器，可化为银莲缠住巨狼。' },
  { id: 'jinmohuan', label: '禁魔环', type: 'item', desc: '七妙真人用来困住魔狼的翠色圆环。' },
  { id: 'chiminggu', label: '赤鸣鼓', type: 'item', desc: '一种火红小鼓，威力巨大，可能是通天灵宝仿制品。' },
  { id: 'hualongxi', label: '化龙玺', type: 'item', desc: '镶嵌在石碑上的物品。' },
  { id: 'rubaiseyuanzhu', label: '乳白色圆珠', type: 'item', desc: '魔像发出的圆珠，威力惊人。' },
  { id: 'huanlingfu', label: '化灵符', type: 'item', desc: '韩立从天符门获得的符箓，可化为替身。' },
  { id: 'heifengqi', label: '黑风旗', type: 'item', desc: '古魔圣祖使用的旗帜，可引爆魔气。' },
  { id: 'yupei', label: '玉佩', type: 'item', desc: '小极宫修士用于激活禁制或作为信物使用的玉制物品。' },
  { id: 'chenshui', label: '沉水', type: 'item', desc: '一种漆黑如墨的液体，可用于提取万年玄玉。' },
  { id: 'wannianxuanyu', label: '万年玄玉', type: 'item', desc: '一种极其稀有且富含寒气的玉石，用于精炼寒焰或炼制宝物。' },
  { id: 'xuanyupai', label: '玄玉牌', type: 'item', desc: '一块被火鸦衔在口中戏耍的玉牌。' },
  { id: 'huohonxxiaoding', label: '火红小鼎', type: 'item', desc: '韩立用来对付冰兽的火属性小鼎。' },
  { id: 'danuoyiling', label: '大挪移令', type: 'item', desc: '韩立拥有的上古传送令牌，可用于远距离传送。' },
  { id: 'xutianding', label: '虚天鼎', type: 'item', desc: '韩立获得的一件通天灵宝，可释放青丝或乾蓝冰焰，也称乾蓝小鼎或乾蓝鼎。' },
  { id: 'tiandushi', label: '天都尸', type: 'item', desc: '极阴祖师祭炼的强大炼尸，后被韩立的冰焰冻结。' },
  { id: 'wuheiyuanzhu', label: '乌黑圆珠', type: 'item', desc: '极阴祖师喷出的杀手锏，可化为天都尸火。' },
  { id: 'jipinlingshi', label: '极品灵石', type: 'item', desc: '修仙界中最顶级的灵石，极其稀有，可布上古奇阵并辅助突破瓶颈。' },
  { id: 'yuzhifulu', label: '玉制符箓', type: 'item', desc: '凌啸风夫妇用来记录突破化神心得的玉符。' },
  { id: 'toumingjiaozhuangwu', label: '透明胶状物', type: 'item', desc: '一种稀奇古怪的材料，在灵界也属罕见。' },
  { id: 'qheihelianangdejingshi', label: '漆黑的闪亮的晶石', type: 'item', desc: '一种稀奇古怪的晶石材料。' },
  { id: 'heiabiselangseizhu', label: '黑白色两色的圆珠', type: 'item', desc: '一种稀奇古怪的圆珠材料。' },
  { id: 'wuheiayanzhu', label: '乌黑眼珠', type: 'item', desc: '一种稀奇古怪的眼珠材料，可能与“破灭法目”有关。' },
  { id: 'huolingisi', label: '火灵丝', type: 'item', desc: '韩立向天澜圣兽所化童子询问的稀有材料。' },
  { id: 'pomiefamu', label: '破灭法目', type: 'item', desc: '一种威力强大的神通，可能与乌黑眼珠有关。' },
  { id: 'huangfan', label: '黄幡', type: 'item', desc: '韩立收取的两杆黄色幡类古宝，用于逃遁。' },
  { id: 'lvseyuping', label: '绿色玉瓶', type: 'item', desc: '韩立用来收第二元婴的玉瓶。' },
  { id: 'yugou', label: '玉钩', type: 'item', desc: '凌玉灵用来护身的蓝色玉钩。' },
  { id: 'huiyangshui', label: '回阳水', type: 'item', desc: '一种液体，可用于延长炼化器物为灵根的时间。' },
  { id: 'longlingu', label: '龙鳞果', type: 'item', desc: '一种能够提升修为的果实。' }
]

// 功法/技能

const SKILLS = [
  { id: 'changchun', label: '长春功', type: 'skill', desc: '韩立修炼的基础功法，能增强体内能量流，达到第五层可获得过目不忘的能力。' },
  { id: 'xiangjiagong', label: '象甲功', type: 'skill', desc: '张铁修炼的一种非常罕见的武功，共有九层，修炼至高层可刀枪不入，力大无穷。' },
  { id: 'yishu', label: '医术', type: 'skill', desc: '墨大夫传授给韩立的技能，韩立曾用银针救治厉师兄。' },
  { id: 'zhanianjianfa', label: '眨眼剑法', type: 'skill', desc: '一种罕见的刺杀秘术，着重于利用环境和光线制造视觉错误，瞬间击杀敌人弱点，不适合修炼内力者。' },
  { id: 'ruangugong', label: '软骨功', type: 'skill', desc: '韩立开始修炼的一种难度极高的功法。' },
  { id: 'huodanshu', label: '火弹术', type: 'skill', desc: '一种修仙小法术，能发出高温火球，韩立将其与武功结合用于实战。' },
  { id: 'tianyanshu', label: '天眼术', type: 'skill', desc: '一种简单的法术，用于加强视力，后被敛气术克制。' },
  { id: 'luoyanbu', label: '罗烟步', type: 'skill', desc: '韩立修炼的一种移动身法，后与御风诀结合使用。' },
  { id: 'yufengjue', label: '御风诀', type: 'skill', desc: '一种法术，韩立与罗烟步结合使用，提高身法速度。' },
  { id: 'quwushu', label: '驱物术', type: 'skill', desc: '韩立通过符箓练习的法术，用于操控物体。' },
  { id: 'lianqishu', label: '敛气术', type: 'skill', desc: '一种中阶辅助法术，能收敛自身灵气，隐匿藏身，可对抗天眼术。' },
  { id: 'shuizhaoshu', label: '水罩术', type: 'skill', desc: '一种防御法术。' },
  { id: 'yinqijue', label: '引气决', type: 'skill', desc: '筑基期修士才能施展的敛气功法，能使人透明般穿梭于凡人之间而不被察觉。' },
  { id: 'kongshenshu', label: '控神术', type: 'skill', desc: '韩立使用的迷魂法术，可以控制他人心神。' },
  { id: 'huanseyan', label: '幻色眼', type: 'skill', desc: '控神术中的一种普通迷魂法术。' },
  { id: 'heishashouluogong', label: '黑煞修罗功', type: 'skill', desc: '小王爷修炼的功法。' },
  { id: 'shayaojue', label: '煞妖诀', type: 'skill', desc: '四大血侍修炼的功法。' },
  { id: 'xuedaodafa', label: '血道大法', type: 'skill', desc: '越皇修炼的功法。' },
  { id: 'lianhunshu', label: '炼魂术', type: 'skill', desc: '一种可怕的秘术，可以将人的元神魂魄抽出加以折磨。' },
  { id: 'diandaowuxingzhen', label: '颠倒五行阵', type: 'skill', desc: '韩立布置的法阵，用于防御或困敌。' },
  { id: 'dayanjue', label: '大衍决', type: 'skill', desc: '一种高级修炼功法，韩立在此功法上天赋不小，主要用于祭炼分身。' },
  { id: 'qingyuanjianjue', label: '青元剑诀', type: 'skill', desc: '一种剑修功法，修炼者可在筑基后期散掉大部分修为，从筑基初期重新修炼以减轻结丹瓶颈阻力。' },
  { id: 'sanzhuanzhongyuangong', label: '三转重元功', type: 'skill', desc: '一种修炼方法，通过散功重修和压缩真元来减轻结丹瓶颈阻力。' },
  { id: 'pizhixianlei', label: '辟邪神雷', type: 'skill', desc: '万年天雷竹能发出的雷电，对邪法魔功有克制奇效，韩立也通过它加强飞剑。' },
  { id: 'jianyingfenguangshu', label: '剑影分光术', type: 'skill', desc: '一种神通，能使飞剑幻化出多道剑光，用于布下剑阵。' },
  { id: 'huanxingjue', label: '换形诀', type: 'skill', desc: '玄阴经的秘术之一，能任意拉长缩短身体部位并控制肌肉松缓。' },
  { id: 'yinmozhan', label: '阴魔斩', type: 'skill', desc: '韩立修炼的功法，能使右手臂膨胀并罩上血红黑气。' },
  { id: 'jifengjiubian', label: '疾风九变', type: 'skill', desc: '一种妖族禽类功法，包含法诀、身法和两种秘术。' },
  { id: 'nifengshu', label: '匿风术', type: 'skill', desc: '疾风九变中的秘术之一，是无名敛息术的修改版，适合人类修炼。' },
  { id: 'xueyingdun', label: '血影遁', type: 'skill', desc: '疾风九变中的秘术之一，一种借助精血力量进行瞬间转移的遁术。' },
  { id: 'quchongshu', label: '驱虫术', type: 'skill', desc: '韩立参悟的一种新的驱虫技能。' },
  { id: 'xuanmuiyingdafa', label: '玄牡化婴大法', type: 'skill', desc: '一种逆天神通，能修炼出第二个完全独立的元婴，并可融合躯体形成化身。' },
  { id: 'guiyijue', label: '归一诀', type: 'skill', desc: '玄牡化婴大法中的秘术，用于消去心魔，使本体和化身元神重新同化归一。' },
  { id: 'yinhuolei', label: '阴火雷', type: 'skill', desc: '玄阴经上的一种雷珠炼制秘法，威力惊人。' },
  { id: 'jianglingfu', label: '降灵符', type: 'skill', desc: '天符门三大密符之一，韩立曾炼制成功并使用。' },
  { id: 'dagengjianzhen', label: '大庚剑阵', type: 'skill', desc: '一种强大的剑阵，威力惊人，需要掺入庚精才能发挥最大效用，可形成无数剑丝。' },
  { id: 'tongbaojue', label: '通宝诀', type: 'skill', desc: '一种专门用于驱动通天灵宝的上古功法，每件通天灵宝都有其独特的法诀。' },
  { id: 'hualingfu', label: '化灵符', type: 'skill', desc: '天符门三大密符之一，结丹期修士可培炼，能转化自身，韩立曾用其化为替身。' },
  { id: 'liudingtianjiafu', label: '六丁天甲符', type: 'skill', desc: '天符门三大密符之一，能凝聚天地灵气形成六层护罩，其玉简已失传。' },
  { id: 'mingwangjue', label: '明王诀', type: 'skill', desc: '韩立修炼的功法，第一层可使躯体坚韧如铁精，增强防御。' },
  { id: 'yuancisnenguang', label: '元磁神光', type: 'skill', desc: '一种罕见的强大神通，修炼大成后可驱使五行磁力，克制五行之宝。' }
]


// 重要事件
const EVENTS = [
  { id: 'ruqi', label: '初入七玄门', type: 'event', desc: '韩立的修仙生涯从其亲三叔推荐他参加七玄门招收内门弟子考验开始，最终抵达七玄门总门彩霞山，正式踏上修行之路。' },
  { id: 'zhujichenggong', label: '筑基成功', type: 'event', desc: '韩立在苦修期间，通过服用“黄龙丹”和“金髓丸”等丹药，修为快速精进，最终成功突破至筑基期，并掌握了先天真火。' },
  { id: 'jiedanchenggong', label: '结丹成功', type: 'event', desc: '韩立的修为在某段时间内成功晋入结丹期，其法力达到结丹初期，这为他着手炼制“青竹蜂云剑”等强大法宝奠定了修为基础。' },
  { id: 'luanxinghailixian', label: '乱星海历险', type: 'event', desc: '韩立在北冥岛通过大挪移令被意外传送到乱星海的虚天殿内殿。在乱星海期间，他经历了众多历险，获得了如符宝、傀儡、噬金虫、啼魂兽 等多种珍贵宝物，并在此地大幅提升了自身实力。' },
  { id: 'yuanyingchenggong', label: '元婴成功', type: 'event', desc: '韩立成功突破瓶颈，凝结元婴，成为一名元婴期修士，并因此获得了落云宗“韩师叔”的尊称及在云梦山东脉开辟洞府的权利。' },
  { id: 'jihuafieshenglj', label: '计划飞升灵界', type: 'event', desc: '韩立在芥子空间内闭关修炼，将修为提升至化神初期顶峰，随后便开始筹备并计划在不久后飞升灵界。' }
]


// 生成关系边
function generateEdges(): EdgeData[] {
  const edges: EdgeData[] = []
  
  // 人物关系
  edges.push(
    { id: 'e1', source: 'hanli', target: 'moxian', edgeType: 'master_student', label: '师徒关系' },
    { id: 'e2', source: 'hanli', target: 'zhangtiege', edgeType: 'friend', label: '好友' },
    { id: 'e3', source: 'hanli', target: 'liyuesha', edgeType: 'relationship', label: '道侣' },
    { id: 'e4', source: 'hanli', target: 'nanlong', edgeType: 'relationship', label: '道侣' },
    { id: 'e5', source: 'hanli', target: 'qilingzi', edgeType: 'friend', label: '师兄弟' },
    { id: 'e6', source: 'hanli', target: 'wenqing', edgeType: 'friend', label: '朋友' }
  )

  // 组织归属关系
  edges.push(
    { id: 'e7', source: 'hanli', target: 'qixuanmen', edgeType: 'belongs_to', label: '加入' },
    { id: 'e8', source: 'hanli', target: 'huangfenggu', edgeType: 'belongs_to', label: '加入' },
    { id: 'e9', source: 'liyuesha', target: 'bingfengzu', edgeType: 'belongs_to', label: '族人' },
    { id: 'e10', source: 'qilingzi', target: 'qixuanmen', edgeType: 'belongs_to', label: '弟子' }
  )

  // 地点关系
  edges.push(
    { id: 'e11', source: 'hanli', target: 'jingzhou', edgeType: 'located_at', label: '出生地' },
    { id: 'e12', source: 'qixuanmen', target: 'tiannan', edgeType: 'located_at', label: '位于' },
    { id: 'e13', source: 'huangfenggu', target: 'tiannan', edgeType: 'located_at', label: '位于' }
  )

  // 物品拥有关系
  edges.push(
    { id: 'e14', source: 'hanli', target: 'jingjingping', edgeType: 'owns', label: '拥有' },
    { id: 'e15', source: 'hanli', target: 'zhujidan', edgeType: 'owns', label: '拥有' },
    { id: 'e16', source: 'hanli', target: 'lvyedan', edgeType: 'owns', label: '拥有' }
  )

  // 技能学习关系
  edges.push(
    { id: 'e17', source: 'hanli', target: 'changchun', edgeType: 'learned', label: '修炼' },
    { id: 'e18', source: 'hanli', target: 'dayan', edgeType: 'learned', label: '修炼' },
    { id: 'e19', source: 'liyuesha', target: 'bingfeng', edgeType: 'learned', label: '修炼' }
  )

  // 事件参与关系
  edges.push(
    { id: 'e20', source: 'hanli', target: 'ruqi', edgeType: 'participated', label: '参与' },
    { id: 'e21', source: 'hanli', target: 'zhujiji', edgeType: 'participated', label: '参与' },
    { id: 'e22', source: 'hanli', target: 'luanxing', edgeType: 'participated', label: '参与' },
    { id: 'e23', source: 'hanli', target: 'jiedan', edgeType: 'participated', label: '参与' }
  )

  return edges
}

// 生成所有节点数据
function generateNodes(): NodeData[] {
  const allEntities = [
    ...MAIN_CHARACTERS,
    ...ORGANIZATIONS, 
    ...LOCATIONS,
    ...ITEMS,
    ...SKILLS,
    ...EVENTS
  ]

  return allEntities.map(entity => ({
    id: entity.id,
    label: entity.label!,
    nodeType: entity.type,
    properties: {
      description: entity.desc,
      category: entity.type
    },
    color: NODE_TYPE_CONFIGS[entity.type as keyof typeof NODE_TYPE_CONFIGS]?.color || '#5B8FF9',
    size: NODE_TYPE_CONFIGS[entity.type as keyof typeof NODE_TYPE_CONFIGS]?.size || 30
  }))
}

// 生成演示数据
export function generateDemoData(): GraphData {
  const nodes = generateNodes()
  const edges = generateEdges().map(edge => ({
    ...edge,
    color: EDGE_TYPE_CONFIGS[edge.edgeType as keyof typeof EDGE_TYPE_CONFIGS]?.color || '#e2e2e2'
  }))

  return {
    nodes,
    edges
  }
}

// 根据类型过滤数据
export function filterDataByType(data: GraphData, nodeTypes: string[] = [], edgeTypes: string[] = []): GraphData {
  let filteredNodes = data.nodes
  let filteredEdges = data.edges

  if (nodeTypes.length > 0) {
    filteredNodes = data.nodes.filter(node => nodeTypes.includes(node.nodeType))
  }

  if (edgeTypes.length > 0) {
    filteredEdges = data.edges.filter(edge => edgeTypes.includes(edge.edgeType))
  }

  // 确保边的源节点和目标节点都在过滤后的节点中
  const nodeIds = new Set(filteredNodes.map(node => node.id))
  filteredEdges = filteredEdges.filter(edge => 
    nodeIds.has(edge.source) && nodeIds.has(edge.target)
  )

  return {
    nodes: filteredNodes,
    edges: filteredEdges
  }
}

// 根据关键词搜索节点
export function searchNodes(data: GraphData, keyword: string): NodeData[] {
  if (!keyword.trim()) {
    return data.nodes
  }

  const lowerKeyword = keyword.toLowerCase()
  return data.nodes.filter(node => 
    node.label.toLowerCase().includes(lowerKeyword) ||
    node.properties?.description?.toLowerCase().includes(lowerKeyword)
  )
}
