import { GraphData, NodeData, EdgeData } from '@/types/graph'
import { NODE_TYPE_CONFIGS, EDGE_TYPE_CONFIGS } from '@/constants/graph'

// 凡人修仙传主要人物数据
const MAIN_CHARACTERS = [
  { id: 'hanli', label: '韩立', type: 'person', desc: '主角，从凡人一步步修炼成仙的传奇人物。他勤奋修炼，获得各种秘术和法宝，最终成为修仙界举足轻重的人物.' },
  { id: 'modaifu', label: '墨大夫', type: 'person', desc: '韩立的师父，传授其无名口诀，并提供药物辅佐其修炼。对韩立表现出特别的重视和关心，但也有贪婪和渴望的神情。他的酒楼属于七玄门所有。他利用尸虫丸和韩立家人的安全来控制韩立。他利用一只黄羽小鸟监视韩立。他试图夺舍余子童。他最后被韩立击杀.' },
  { id: 'zhangtie', label: '张铁', type: 'person', desc: '韩立的好友兼同门，修炼"象甲功"。他抱怨修炼过程的痛苦，但意志坚强。他最后失踪，韩立怀疑是害怕"象甲功"的后续修炼.' },
  { id: 'lifeyu', label: '厉飞雨', type: 'person', desc: '韩立的好友，最初因伤病向韩立求药，后与韩立互相传授武功和药物。他机警过人，识破野狼帮奸细并立下大功，被七玄门任命为护法。他曾是"厉师兄"。' },
  { id: 'nangongwan', label: '南宫婉', type: 'person', desc: '韩立的双修伴侣。韩立在后来将其传送到了乱星海并安顿下来.' },
  { id: 'quhun', label: '曲魂', type: 'person', desc: '韩立的傀儡分身，由韩立用自身鲜血和魂魄炼化控制。他战斗力强大，后来随韩立闯荡修仙界，并协助韩立进行战斗和侦察.' },
  { id: 'yuzitong', label: '余子童', type: 'person', desc: '一个元神状态的古修，墨大夫试图夺舍的对象。他向墨大夫传授了夺舍之法.' },
  { id: 'sanshu', label: '三叔', type: 'person', desc: '韩立的亲戚，在七玄门酒楼担任大掌柜，后成为七玄门外门弟子。他引荐韩立参加七玄门内门弟子招募考核.' },
  { id: 'hanfu', label: '韩父', type: 'person', desc: '韩立的父亲，老实巴交，最初犹豫是否让韩立加入江湖门派，后因每月一两银子和体面身份而同意.' },
  { id: 'hanmu', label: '韩母', type: 'person', desc: '韩立的母亲，临别时嘱咐韩立注意身体.' },
  { id: 'dage', label: '大哥', type: 'person', desc: '韩立的兄长，经三叔介绍在城里当铁匠学徒，是韩家的骄傲.' },
  { id: 'wangdapang', label: '王大胖', type: 'person', desc: '七玄门外门弟子，在比试中表现得意，击败对手.' },
  { id: 'zhangchanggui', label: '张长贵', type: 'person', desc: '在七玄门比试中，其一方的弟子昏倒后被其拖回，负责处理比试事宜.' },
  { id: 'xiaosuapan', label: '小算盘', type: 'person', desc: '七玄门内门弟子，对韩立的师承和功力进展感到好奇并询问.' },
  { id: 'tienu', label: '铁奴', type: 'person', desc: '墨大夫手下的巨汉，力大无穷，曾奉命去抓捕韩立.' },
  { id: 'madamli', label: '李氏', type: 'person', desc: '李长老的夫人，对韩立救治李长老的恩情表示感谢.' },
  { id: 'elderli', label: '李长老', type: 'person', desc: '黄枫谷的长老，被韩立从余毒中救治，对韩立有提携之恩.' },
  { id: 'elderzhao', label: '赵长老', type: 'person', desc: '黄枫谷长老，在李长老被救治时显得急躁不安，关心同门安危.' },
  { id: 'rusheng', label: '儒生', type: 'person', desc: '在黄枫谷与其他门派的比试中，被灰衣人斩首，实力不济.' },
  { id: 'huiyiren', label: '灰衣人', type: 'person', desc: '在黄枫谷与其他门派的比试中，展现高超武功，斩杀儒生，实力强劲.' },
  { id: 'heixiong', label: '黑熊', type: 'person', desc: '孙二狗的同伴，在嘉元城码头与其一同混迹.' },
  { id: 'yanjiashi', label: '严氏', type: 'person', desc: '墨大夫的妻室之一，在墨大夫遗书中被提及。她与韩立交换"暖阳宝玉"，为人精明.' },
  { id: 'ouyangfeitian', label: '欧阳飞天', type: 'person', desc: '独霸山庄庄主，修炼有顶级硬功"霸王甲"，后被韩立使用剑符斩首，实力高强但最终不敌韩立.' },
  { id: 'yeshishu', label: '叶师叔', type: 'person', desc: '黄枫谷的师叔，曾给韩立一些法器和符箓，但韩立怀疑他私吞了不少东西，为人有些贪婪.' },
  { id: 'chenshimei', label: '陈师妹', type: 'person', desc: '黄枫谷的同门师妹，与陆师兄有情感纠葛。曾被韩立施法定神符救治，对韩立有所感激.' },
  { id: 'lushixiong', label: '陆师兄', type: 'person', desc: '黄枫谷的同门师兄，风属性法术强大。后与韩立发生激战，被韩立击败，为人骄傲自负.' },
  { id: 'wufeng', label: '吴风', type: 'person', desc: '黄枫谷的师兄，曾教授韩立"敛气术"和瞬发法术的技巧，对韩立有所指导.' },
  { id: 'lishizu', label: '李师祖', type: 'person', desc: '黄枫谷高层人物，建议韩立拜师。他也是七派之一的结丹期修士，地位尊崇.' },
  { id: 'daoshi', label: '道士', type: 'person', desc: '清虚门领队，向弟子们训话鼓舞士气。他是七派之一的结丹期修士，有领导才能.' },
  { id: 'ni_shang_xian_zi', label: '霓裳仙子', type: 'person', desc: '掩月宗的美貌少妇，门下弟子多为女性，且容貌出众，在修仙界颇有名气.' },
  { id: 'yanjialaozu', label: '燕家老祖', type: 'person', desc: '燕家的高人，将鬼灵门少主带入密室，身份神秘.' },
  { id: 'guilingmenshaozhu', label: '鬼灵门少主', type: 'person', desc: '鬼灵门的重要人物，与燕家老祖一同进入密室，身份高贵.' },
  { id: 'lutianmeng', label: '吕天蒙', type: 'person', desc: '使用"日月袋"生擒妖兽，但法器随后被妖兽撑破，实力尚可但法器不济.' },
  { id: 'mengmiannvzi', label: '蒙面女子', type: 'person', desc: '被韩立和蒙山五友擒获，韩立为其解除了血咒，并施加了禁制，身份神秘，身负血咒.' },
  { id: 'mengshanwuyou', label: '蒙山五友', type: 'person', desc: '协助韩立擒获蒙面女子，与韩立有所合作.' },
  { id: 'xiaowangye', label: '小王爷', type: 'person', desc: '被韩立用迷魂法术审问，透露了修炼魔功并血祭修士的秘密，后被韩立用"断魂丹"毒杀，是个作恶多端的凡人王爷.' },
  { id: 'wangzongguan', label: '王总管', type: 'person', desc: '曾与小王爷在一起，也被蒙山四友审问，是小王爷的亲信.' },
  { id: 'mengsansiyou', label: '蒙山四友', type: 'person', desc: '审问王总管并与韩立商讨口供，与韩立有所合作.' },
  { id: 'liujing', label: '刘靖', type: 'person', desc: '拥有"真宝"，为除恶而使用，是正义之士.' },
  { id: 'xuehongshijie', label: '雪虹师姐', type: 'person', desc: '刘靖的双修伴侣，与刘靖情投意合.' },
  { id: 'yuehuang', label: '越皇', type: 'person', desc: '越国皇帝，筑基后期修士，隐藏修为，是修仙者中的凡人帝王.' },
  { id: 'lanpaoren', label: '蓝袍人', type: 'person', desc: '与越皇一同行动，筑基后期修士，是越皇的亲信.' },
  { id: 'wusemenzhu', label: '五色门主', type: 'person', desc: '李府的人，被韩立审问，墨玉珠的相公，与韩立有恩怨.' },
  { id: 'moyuzhu', label: '墨玉珠', type: 'person', desc: '墨凤舞的姐姐，墨大夫的女儿，为五色门主求情，对韩立心存感激.' },
  { id: 'mofengwu', label: '墨凤舞', type: 'person', desc: '墨大夫的女儿，韩立承诺为其报仇，与韩立有交情.' },
  { id: 'baizhizhu', label: '白蜘蛛', type: 'person', desc: '韩立培育的灵兽之一，拥有特殊能力.' },
  { id: 'tihunshou', label: '啼魂兽', type: 'person', desc: '韩立收服的奇兽，能发出黄色霞光攻击，是韩立的重要助力.' },
  { id: 'jinsican', label: '金丝蚕', type: 'person', desc: '韩立收取的妖虫，有潜力进化为幻焰蛾，具有成长潜力.' },
  { id: 'huan_yan_e', label: '幻焰蛾', type: 'person', desc: '一种奇虫，由金丝蚕进化而来，是强大的妖虫.' },
  { id: 'fanfuren', label: '范夫人', type: 'person', desc: '妙音门修士，与韩立商讨天雷竹事宜，是妙音门的重要人物.' },
  { id: 'zhongnianren', label: '中年人', type: 'person', desc: '范夫人的手下，听从范夫人的指示.' },
  { id: 'yuntianxiao', label: '云天啸', type: 'person', desc: '妙音门修士，与范夫人一同商议传送事宜，是妙音门的重要人物.' },
  { id: 'shixianzi', label: '石仙子', type: 'person', desc: '引导众人破除禁制，对阵法有独到见解.' },
  { id: 'huyue', label: '胡月', type: 'person', desc: '听从石仙子和韩立的指示，与韩立有合作.' },
  { id: 'jinqing', label: '金青', type: 'person', desc: '协助韩立破阵，与韩立有合作.' },
  { id: 'jianxingxiushi', label: '简姓修士', type: 'person', desc: '协助韩立破阵，与韩立有合作.' },
  { id: 'hongfalaozhe', label: '红发老者', type: 'person', desc: '手持玉简，是葛笠，乱星海修士.' },
  { id: 'geli', label: '葛笠', type: 'person', desc: '乱星海修士，与韩立、紫灵仙子一同进入鬼雾，是韩立的同伴.' },
  { id: 'zilingxianzi', label: '紫灵仙子', type: 'person', desc: '乱星海修士，与韩立、葛笠一同进入鬼雾，是韩立的同伴.' },
  { id: 'xuangou', label: '玄骨', type: 'person', desc: '一个古修，与韩立合作寻找九曲灵参，是韩立的合作伙伴.' },
  { id: 'huangliannanzi', label: '黄脸男子', type: 'person', desc: '驱使红狸兽探索沙漠，对探索有所帮助.' },
  { id: 'jiyinzushi', label: '极阴祖师', type: 'person', desc: '乱星海魔道老怪，后被韩立击败和冰封，是韩立的强大敌人.' },
  { id: 'manhuzi', label: '蛮胡子', type: 'person', desc: '乱星海元婴期老怪，实力高强.' },
  { id: 'qingyijushi', label: '青易居士', type: 'person', desc: '乱星海元婴期老怪，实力高强.' },
  { id: 'yuanyao', label: '元瑶', type: 'person', desc: '在石殿中与韩立一起出现的黑袍女子，身份神秘.' },
  { id: 'jixuan', label: '极炫', type: 'person', desc: '被提及为玄骨的另一个逆徒，与玄骨有师徒恩怨.' },
  { id: 'lingyuling', label: '凌玉灵', type: 'person', desc: '星宫长老，招降逆星盟修士，后带领韩立进入玉制大门，是星宫的重要人物.' },
  { id: 'fengxi', label: '风希', type: 'person', desc: '九级裂风兽，自称研制出风雷翅。后被韩立击败并被收走妖丹，是强大的妖兽.' },
  { id: 'guixiao', label: '龟妖', type: 'person', desc: '八级妖龟，拥有"自愈之体"，被韩立击败，实力不弱.' },
  { id: 'dujiao', label: '毒蛟', type: 'person', desc: '一种强大的妖兽，拥有剧毒.' },
  { id: 'yixingdahan', label: '易姓大汉', type: 'person', desc: '曾与韩立一起传送，在岛上向韩立求助，与韩立有交情.' },
  { id: 'miaoche', label: '妙鹤', type: 'person', desc: '一名老道，对鬼雾有所了解.' },
  { id: 'wendaoyou', label: '温道友', type: 'person', desc: '俊秀斯文的青年，能推算鬼雾出现，拥有特殊能力.' },
  { id: 'shao_nu', label: '少女', type: 'person', desc: '与温道友同行，身份神秘.' },
  { id: 'wentianren', label: '温天仁', type: 'person', desc: '鬼灵门的六道传人，与韩立激战，施展了"阴魔斩"，实力强大.' },
  { id: 'jingshouhanzi', label: '精瘦汉子', type: 'person', desc: '鬼雾阴冥之地中带领众人，熟知绝灵之气，对当地情况熟悉.' },
  { id: 'zhiqidenanzi', label: '稚气的男子', type: 'person', desc: '精瘦汉子队伍中的一员，对当地情况有所了解.' },
  { id: 'fengxingzhongnianren', label: '封姓中年人', type: 'person', desc: '阴冥之地村民，欲娶梅凝为妻，对梅凝有爱慕之心.' },
  { id: 'meining', label: '梅凝', type: 'person', desc: '阴冥之地中的美貌女修，被困在此地，后与韩立一同行动，与韩立有交情.' },
  { id: 'yujun', label: '俞君', type: 'person', desc: '落云宗弟子，引领韩立和杜东，是韩立的同门.' },
  { id: 'rushengzhongnianren', label: '儒生打扮的中年人', type: 'person', desc: '落云宗结丹中期修士，韩立的师祖，实力高强.' },
  { id: 'baifacangcanglaozhe', label: '白发苍苍老者', type: 'person', desc: '落云宗弟子，精通制符术，是制符大师.' },
  { id: 'nv_de', label: '女的', type: 'person', desc: '落云宗弟子，精通炼丹术，是炼丹师.' },
  { id: 'dudong', label: '杜东', type: 'person', desc: '落云宗新入门弟子，与韩立同门。在试剑大会中故意输给韩立，对韩立有所尊敬.' },
  { id: 'kuihuan', label: '奎焕', type: 'person', desc: '黄枫谷弟子，讨论试剑大会，对试剑大会有所关注.' },
  { id: 'wangshixiong', label: '王师兄', type: 'person', desc: '黄枫谷弟子，讨论试剑大会，对试剑大会有所关注.' },
  { id: 'mashidi', label: '马师弟', type: 'person', desc: '黄枫谷弟子，检查死亡的妖狐。后来是结丹期修士，与秃眉大汉一同，对妖兽有所研究.' },
  { id: 'yuanxingdizi', label: '袁姓弟子', type: 'person', desc: '天泉峰弟子，在试剑大会中与白凤峰女修对战，实力不俗.' },
  { id: 'sunhuo', label: '孙火', type: 'person', desc: '落云宗弟子，在试剑大会中获得第三名，实力强劲.' },
  { id: 'pifalaozhe', label: '披发老者', type: 'person', desc: '带领弟子进入灵眼之树所在洞窟，对灵眼之树有所了解.' },
  { id: 'miniyinger', label: '迷你婴儿', type: 'person', desc: '韩立元婴的形象，是韩立修为达到元婴期的标志.' },
  { id: 'yinfalaozhe', label: '银发老者', type: 'person', desc: '落云宗长老，韩立的师兄，实力高强.' },
  { id: 'mupeiling', label: '慕沛灵', type: 'person', desc: '落云宗弟子，在药园等待韩立，与韩立有交情.' },
  { id: 'xinruoyin', label: '辛如音', type: 'person', desc: '与韩立有约定，在元武国，与韩立有交情.' },
  { id: 'dongxuaner', label: '董璇儿', type: 'person', desc: '合欢宗金丹期弃徒，曾派人寻找韩立，与韩立有恩怨.' },
  { id: 'wuyihanzi', label: '乌衣汉子', type: 'person', desc: '鬼灵门修士，追查韩立踪迹，是韩立的敌人.' },
  { id: 'fengyunyoucunzisanjiufuren', label: '风韵犹存的三十余岁妇人', type: 'person', desc: '鬼灵门修士，追查韩立踪迹，后被韩立收服，是韩立的敌人.' },
  { id: 'hunshenyindejinyishusheng', label: '浑身阴气的锦衣书生', type: 'person', desc: '鬼灵门修士，姓阙，追查韩立踪迹，是韩立的敌人.' },
  { id: 'hanyunzhi', label: '菡云芝', type: 'person', desc: '御灵宗弟子，被韩立救治并放走，对韩立心存感激.' },
  { id: 'liuxingnvzi', label: '柳姓女子', type: 'person', desc: '御灵宗弟子，拥有六翼霜蚣，后被韩立收为弟子并传授驱虫术，是韩立的弟子.' },
  { id: 'lulou', label: '吕洛', type: 'person', desc: '落云宗长老，与韩立同伴，与韩立有交情.' },
  { id: 'pangzi', label: '胖子', type: 'person', desc: '与肥姹双魔之一，来自合欢宗，是合欢宗修士.' },
  { id: 'feichashuangmo', label: '肥姹双魔', type: 'person', desc: '合欢宗的双修伴侣，实力强大，是合欢宗的代表人物.' },
  { id: 'tianjingshangren', label: '天晶上人', type: 'person', desc: '乱星海元婴期修士，主持交易会。后在坠魔谷中元婴被困，实力高强但遭遇困境.' },
  { id: 'nanlonghou', label: '南陇侯', type: 'person', desc: '乱星海元婴期修士，与韩立在交易会上相遇。他与韩立、鲁卫英一同进入坠魔谷，是韩立的同伴.' },
  { id: 'baishanlaozhe', label: '白衫老者', type: 'person', desc: '与南陇侯一同打开洞府禁制，对禁制有所了解.' },
  { id: 'yanruyan', label: '燕如嫣', type: 'person', desc: '越国修士，在试剑大会中观察韩立。后成为元婴期修士并寻求韩立帮助，与韩立有交情.' },
  { id: 'panglaozhe', label: '胖老者', type: 'person', desc: '被韩立救助的修士，对韩立心存感激.' },
  { id: 'nieying', label: '聂盈', type: 'person', desc: '被韩立救助的女修，对韩立心存感激.' },
  { id: 'tumeidahan', label: '秃眉大汉', type: 'person', desc: '黄龙山修士，与马姓老者一同与韩立击杀附灵怪物，与韩立有合作.' },
  { id: 'sheyao', label: '蛇妖', type: 'person', desc: '被韩立和秃眉大汉、马姓老者击杀的附灵怪物，实力强大.' },
  { id: 'lexingnvzi', label: '乐姓女子', type: 'person', desc: '慕兰族第一女上师，操控古灯和圣禽，实力强大，地位尊崇.' },
  { id: 'qingkongque', label: '青孔雀', type: 'person', desc: '圣禽，乐姓女子所操控，实力强大.' },
  { id: 'tianzhong', label: '田锺', type: 'person', desc: '与凤冰对战的修士，实力不俗.' },
  { id: 'baixingfuren', label: '白姓妇人', type: 'person', desc: '从血罩中出现的秀美白衫妇人，身份神秘.' },
  { id: 'fengbing', label: '凤冰', type: 'person', desc: '慕兰族修士，实力不俗.' },
  { id: 'yinyue', label: '银月', type: 'person', desc: '韩立的傀儡分身，后完全恢复神智，并辅助韩立，是韩立的重要助力.' },
  { id: 'chengdaoyou', label: '程道友', type: 'person', desc: '即银发老者，是落云宗长老.' },
  { id: 'shixiao', label: '尸魈', type: 'person', desc: '一种被韩立困住并击出元神的怪物，实力强大.' },
  { id: 'luweiying', label: '鲁卫英', type: 'person', desc: '韩立的同伴，与南陇侯一同进入坠魔谷，是韩立的同伴.' },
  { id: 'dongmentu', label: '东门图', type: 'person', desc: '御灵宗大长老，实力强大，地位尊崇.' },
  { id: 'wuxinglingying', label: '五行灵婴', type: 'person', desc: '御灵宗的五名元婴初期修士，实力不俗.' },
  { id: 'huochanshou', label: '火蟾兽', type: 'person', desc: '一种强大的妖兽，被韩立诱杀并夺取妖丹，实力强大.' },
  { id: 'dayanshenjun', label: '大衍神君', type: 'person', desc: '一个古修的元神寄居在小人傀儡中，指导韩立修炼和炼器，是韩立的重要导师.' },
  { id: 'xiangzhili', label: '向之礼', type: 'person', desc: '化神期修士，实力强大，地位尊崇.' },
  { id: 'linglong', type: 'person', desc: '一位修士，在古魔圣祖释放魔气后出现，身份神秘.' },
  { id: 'shanyanghuzidelaozhe', label: '山羊胡子的老者', type: 'person', desc: '韩立为了掩饰身份变幻而成的模样.' },
  { id: 'wusedenvziguangying', label: '五色的女子光影', type: 'person', desc: '小极宫的创建者，以光影形式出现，身份神秘，地位尊崇.' },
  { id: 'hanlishangren', type: 'person', desc: '小极宫的高阶修士，与韩立对战，实力强大.' },
  { id: 'baimengxin', label: '白梦馨', type: 'person', desc: '在玄玉洞中提取万年玄玉，对炼器有所研究.' },
  { id: 'qingshanzhongnianren', label: '青衫中年人', type: 'person', desc: '白梦馨的同伴，与白梦馨有合作.' },
  { id: 'bingfeng', label: '冰凤', type: 'person', desc: '十级妖兽，与韩立对战，后一同被传送离开虚灵殿，实力强大.' },
  { id: 'wensiyue', label: '文思月', type: 'person', desc: '韩立的故人，与韩立有旧交.' },
  { id: 'tianqiner', label: '田琴儿', type: 'person', desc: '文思月夫妇的女儿，曾面黄肌瘦，被韩立救治后变得清秀，对韩立心存感激.' },
  { id: 'dalanglaozhe', label: '大长老', type: 'person', desc: '宗门长老，命令蓝袍管事收集炼器材料，地位尊崇.' },
  { id: 'hexinjinghun', label: '核心精魂', type: 'person', desc: '万丈魔渊中的一个高大人影，身份神秘.' },
  { id: 'dieryuanying', label: '第二元婴', type: 'person', desc: '韩立的化身，后被夺舍，又恢复神智与韩立激战，最终被韩立收服，是韩立的重要助力.' },
  { id: 'zhonglaozhe', label: '钟长老', type: 'person', desc: '鬼灵门长老，曾与韩立在坠魔谷有过一面之缘，对韩立有所了解.' },
  { id: 'shuangshouguaishe', label: '双首怪蛇', type: 'person', desc: '六道极圣所放出的妖兽，被韩立的傀儡击杀，实力强大.' },
  { id: 'fenglaoguai', label: '风老怪', type: 'person', desc: '化神期修士，因家族后裔被杀而追杀韩立，实力强大，与韩立有恩怨.' },
  { id: 'jin_jiao_wang', label: '金蛟王', type: 'person', desc: '在火海中与韩立激战的妖兽，实力强大.' },
  { id: 'tianjifu', label: '天机府', type: 'person', desc: '一件法宝，韩立将噬金虫等灵虫灵兽留在此处.' },
  { id: 'tongzi', label: '童子', type: 'person', desc: '一个器灵，与韩立对话，讨论其修炼和未来，对韩立有所指导.' }
]

// 组织/宗门
const ORGANIZATIONS = [
  { id: 'qixuanmen', label: '七玄门', type: 'organization', desc: '江湖门派，有外门和内门之分，在方圆数百里内是了不起的、数一数二的大门派。' },
  { id: 'mofu', label: '墨府', type: 'organization', desc: '韩立承诺要帮助报仇的势力，是墨大夫的家族所在地。' },
  { id: 'huangfenggu', label: '黄枫谷', type: 'organization', desc: '越国修仙界的大型门派，其坊市兴隆；谷内万余名修仙者中，结丹期仅数人，是韩立早期加入的修仙宗门。' },
  { id: 'qidaipai', label: '七大派', type: 'organization', desc: '越国修仙界的七个主要大型门派的总称，共同提供弟子名额和筑基丹，并监督禁地，是越国修仙界的核心势力。' },
  { id: 'yanyuezong', label: '掩月宗', type: 'organization', desc: '越国修仙界七大派之一，有弟子和"穹老怪"等高阶修士，以女性修士居多。' },
  { id: 'tianquebao', label: '天阙堡', type: 'organization', desc: '越国修仙界七大派之一，有结丹期高手，擅长炼制法器，以炼器闻名。' },
  { id: 'guilingmen', label: '鬼灵门', type: 'organization', desc: '魔道六宗之一，有少主和弟子，曾有修士进入冰缝，与韩立多次冲突。' },
  { id: 'lingshoushan', label: '灵兽山', type: 'organization', desc: '越国修仙界七大派之一，有弟子擅长驯养妖兽，以御兽闻名。' },
  { id: 'heishajiao', label: '黑煞教', type: 'organization', desc: '一个魔道教派，控制越国皇宫，有教主、血侍等成员，拥有独特的修炼功法，是越国的邪恶势力。' },
  { id: 'sipingbang', label: '四平帮', type: 'organization', desc: '由孙二狗在曲魂协助下经营的势力，在嘉元城有一定影响力，是韩立在凡间的布局。' },
  { id: 'wusemen', label: '五色门', type: 'organization', desc: '一个与韩立有恩怨的门派，有门主，曾被韩立灭杀主要人物。' },
  { id: 'tiandaohui', label: '天道会', type: 'organization', desc: '天南地区由多个国家和宗派组成的修士联盟，与魔道和正道盟形成三足鼎立之势，是天南正道势力之一。' },
  { id: 'zhengdaomeng', label: '正道盟', type: 'organization', desc: '天南地区与天道会和魔道对立的修仙势力，是天南正道势力之一。' },
  { id: 'jiuguomeng', label: '九国盟', type: 'organization', desc: '天南地区的一个修士联盟，六派修士曾在此安顿并争夺资源，在虞国设有盛大交易会，是天南的重要势力。' },
  { id: 'liuliandian', label: '六连殿', type: 'organization', desc: '一个修仙宗门，有长老，实力不俗。' },
  { id: 'xinggong', label: '星宫', type: 'organization', desc: '乱星海第一大势力，控制众多星岛，管理天星城秩序，曾与逆星盟大战，有长老等高层，是乱星海的霸主。' },
  { id: 'biyunmen', label: '碧云门', type: 'organization', desc: '与极阴祖师相关的当地势力，曾有修士被韩立灭杀，实力不济。' },
  { id: 'miaoyinmen', label: '妙音门', type: 'organization', desc: '一个修仙宗门，与韩立有过合作。' },
  { id: 'nixingmeng', label: '逆星盟', type: 'organization', desc: '乱星海中与星宫对立的修士联盟，曾有修士暗中投靠，是乱星海的叛逆势力。' },
  { id: 'hehuanzong', label: '合欢宗', type: 'organization', desc: '魔道六宗之一，有合欢老魔等后期大修士，以双修功法闻名。' },
  { id: 'huayimen', label: '化意门', type: 'organization', desc: '一个修仙宗门，有魏无涯等后期大修士，实力强大。' },
  { id: 'gujianmen', label: '古剑门', type: 'organization', desc: '天道盟核心门派之一，擅长御剑之术，镇派绝学"太白剑诀"大名鼎鼎，对弟子资质要求高，是天南剑修的代表。' },
  { id: 'luoyunzong', label: '落云宗', type: 'organization', desc: '天道盟核心门派之一，位于云梦山，有接引弟子、掌门、长老，可举办元婴后期典礼，是天南的重要宗门。' },
  { id: 'baiqiaoyuan', label: '百巧院', type: 'organization', desc: '天道盟核心门派之一，以炼制法器闻名，门内藏有顶尖法宝炼制之法，由五个修士家族联合把持，是天南炼器宗门。' },
  { id: 'fujia', label: '付家', type: 'organization', desc: '元武国第一家族，曾是百巧院付家远支，魔道入侵时投靠魔焰宗，是元武国的世家大族。' },
  { id: 'moyanzong', label: '魔焰宗', type: 'organization', desc: '魔道六宗之一，元武国的控制者，付家曾投靠并派遣子弟加入，是元武国的魔道势力。' },
  { id: 'yinluozong', label: '阴罗宗', type: 'organization', desc: '一个魔道宗门，曾有修士参与拍卖会，有宗主，是魔道势力之一。' },
  { id: 'tianfumen', label: '天符门', type: 'organization', desc: '一个擅长制符的修仙宗门，拥有三大密符（化灵符、六丁天甲符、降灵符），其中化灵符是历代结丹修士必修神通，是天南制符宗门。' },
  { id: 'huangqingguan', label: '皇清观', type: 'organization', desc: '一个有元婴期老道姑和高阶修士的观门，有炼器殿，实力不俗。' },
  { id: 'zhunanjiangjunfu', label: '柱南将军府', type: 'organization', desc: '一个有柱南将军之女和两位结丹期供奉的府邸，是凡人与修仙者共存的势力。' },
  { id: 'dayanzong', label: '大衍宗', type: 'organization', desc: '大衍神君的传承，与傀儡术和神识相关，是修炼大衍决的宗门。' },
  { id: 'dushengmen', label: '毒圣门', type: 'organization', desc: '一个修仙宗门，擅长用毒。' },
  { id: 'jiuyouzong', label: '九幽宗', type: 'organization', desc: '一个修仙宗门，有长老，实力不俗。' },
  { id: 'mulanren', label: '慕兰族', type: 'organization', desc: '游牧民族，拥有法士体系，有神师，曾入侵天南，是天南的外部威胁。' },
  { id: 'tianlanshengdian', label: '天澜圣殿', type: 'organization', desc: '慕兰族的重要势力，可快速建立临时驻地供各部落歇脚，是慕兰族的信仰中心。' },
  { id: 'xiaojigong', label: '小极宫', type: 'organization', desc: '北冥岛第一宗门，擅长驯养雪猿，有大长老，是北冥岛的霸主。' },
  { id: 'bingfengzu', label: '冰凤族', type: 'organization', desc: '一个妖族，其成员冰凤能变幻分身，对修炼乾蓝冰焰之人有巨大怨恨，是妖族中的强大势力。' },
  { id: 'zhengyumodao', label: '正魔两道', type: 'organization', desc: '天南地区两大对立的修仙势力阵营，相互竞争。' }
]

// 地点
const LOCATIONS = [
  { id: 'jingzhou', label: '镜州', type: 'location', desc: '七玄门曾雄霸数十载的州府，彩霞山位于其境内。' },
  { id: 'yueguo', label: '越国', type: 'location', desc: '七玄门曾声名赫赫的国家，岚州和溪国均位于其中。韩立曾遁入此国。' },
  { id: 'jingzhoucheng', label: '镜州城', type: 'location', desc: '镜州的首府，七玄门曾被挤出此城，是镜州的核心城市。' },
  { id: 'caixiashan', label: '彩霞山', type: 'location', desc: '七玄门宗门所在地，是镜州第二大山，拥有落日峰等多个山峰，是七玄门的重要地盘。' },
  { id: 'qingniuzhen', label: '青牛镇', type: 'location', desc: '七玄门控制的十几个小城镇之一，韩立曾从这里出发前往彩霞山，是韩立的故乡。' },
  { id: 'caixiashanmai', label: '彩霞山脉', type: 'location', desc: '韩立曾在此山脉中寻找隐秘处所进行交易，是修仙者秘密交易的地点。' },
  { id: 'shenshougu', label: '神手谷', type: 'location', desc: '墨大夫的居所和韩立的修炼之地，曾被暂时对外封闭，是韩立早期修炼的重要场所。' },
  { id: 'luorifeng', label: '落日峰', type: 'location', desc: '彩霞山的主峰，韩立曾在死斗结束后下山，是七玄门的重要山峰。' },
  { id: 'lanzhou', label: '岚州', type: 'location', desc: '越国面积第八大、富足程度位列第二的州府，嘉元城位于其中，是越国的富庶之地。' },
  { id: 'jiayuancheng', label: '嘉元城', type: 'location', desc: '岚州第一大城，交通极为发达，是水运枢纽和商贸要道，是越国的商业中心。' },
  { id: 'xiangludayunhe', label: '乡鲁大运河', type: 'location', desc: '贯穿越国南北，穿过嘉元城中心，是越国重要的交通命脉。' },
  { id: 'dubashanzhuang', label: '独霸山庄', type: 'location', desc: '欧阳飞天的住所，韩立曾赶往此地刺杀他，是欧阳飞天的势力范围。' },
  { id: 'tainanshan', label: '太南山', type: 'location', desc: '韩立离开嘉元城后赶往的目的地，是修仙者聚集的重要地点。' },
  { id: 'tainangu', label: '太南谷', type: 'location', desc: '修仙者聚集之地，韩立曾想在此结交修仙者，是修仙者交流的重要场所。' },
  { id: 'xinwangfu', label: '馨王府', type: 'location', desc: '韩立曾潜入此地进行调查，是凡人皇族的府邸。' },
  { id: 'lifu', label: '李府', type: 'location', desc: '五色门主二子的住所，韩立曾在此地将其化为灰烬，是五色门的重要据点。' },
  { id: 'qinzai', label: '秦宅', type: 'location', desc: '韩立曾在此地布下禁制并处理事务，是韩立的临时住所。' },
  { id: 'shuangfengdao', label: '双峰岛', type: 'location', desc: '妙音门坊市曾位于此岛，岛上有两座巨峰，是妙音门的重要据点。' },
  { id: 'miaoyindao', label: '妙音岛', type: 'location', desc: '妙音门坊市最初设置的岛屿，是妙音门的重要据点。' },
  { id: 'xiguo', label: '溪国', type: 'location', desc: '天南地区最北部的国家，面积比越国稍小，闵州位于其内，是天南的重要国家。' },
  { id: 'minzhou', label: '闵州', type: 'location', desc: '溪国最大的州，紧邻无边海，封日城是其州府，是溪国的重要州府。' },
  { id: 'fengricheng', label: '封日城', type: 'location', desc: '闵州的州府和最大城市，是溪国的商业中心。' },
  { id: 'wubianhai', label: '无边海', type: 'location', desc: '韩立与梅凝、紫灵一同穿越的海域，景色奇特，是乱星海的边缘地带。' },
  { id: 'tianquanfeng', label: '天泉峰', type: 'location', desc: '落云宗的六巧峰之一，韩立被分派到此峰进行修行，是韩立在落云宗的修炼之地。' },
  { id: 'yuanwuguo', label: '元武国', type: 'location', desc: '一个曾被魔道入侵并投靠魔焰宗的国家，付家是其第一家族，是魔道势力渗透的凡人国度。' },
  { id: 'zidaoshan', label: '紫道山', type: 'location', desc: '元武国西部的一处深山，付家主堡所在地，常年被淡紫色毒雾缭绕，是付家的隐秘据点。' },
  { id: 'dajin', label: '大晋', type: 'location', desc: '修仙界的一个古老国度，韩立曾前往此地寻找庚精和处理事务，是人界的重要修仙国度。' },
  { id: 'taichangfu', label: '太昌府', type: 'location', desc: '大晋的一个府城，以书院众多闻名，是文化气息浓厚之地。' },
  { id: 'taichangcheng', label: '太昌城', type: 'location', desc: '太昌府的府城，富豪巨商云集，有宝光殿等建筑，是大晋的商业中心。' },
  { id: 'wuguangcheng', label: '武广城', type: 'location', desc: '大晋名气最大的城市，比太昌城更著名，是大晋的中心城市。' },
  { id: 'ganjia', label: '甘家', type: 'location', desc: '太昌城中拥有巨宅的富商家族，是太昌城的豪门望族。' },
  { id: 'huoyu', label: '火狱', type: 'location', desc: '七大禁地之一，遍布火山和火属性材料，其中心山脉是真正的禁区，是修仙者寻找火属性材料的危险之地。' },
  { id: 'zhuimogu', label: '坠魔谷', type: 'location', desc: '一个充满空间裂缝的险恶之地，韩立曾深入其中并解决问题，是人界重要的历练场所。' },
  { id: 'kunwushan', label: '昆吾山', type: 'location', desc: '一处重要的寻宝之地，拥有镇魔塔和昆吾殿，是人界重要的秘境。' },
  { id: 'zhenmota', label: '镇魔塔', type: 'location', desc: '昆吾山上的一座塔，据说藏有奇宝并镇压魔物，是昆吾山的重要建筑。' },
  { id: 'kunwudian', label: '昆吾殿', type: 'location', desc: '昆吾山上的雄伟宫殿，是众多修士前往探宝的目的地，是昆吾山的重要建筑。' },
  { id: 'qilingdao', label: '七灵岛', type: 'location', desc: '万丈魔渊的所在地，是人界的重要岛屿。' },
  { id: 'wanzhangmoyuan', label: '万丈魔渊', type: 'location', desc: '七灵岛上的深渊，韩立曾在此地获取魔髓钻并进行修炼，是人界重要的修炼之地。' },
  { id: 'xuanyudong', label: '玄玉洞', type: 'location', desc: '韩立曾进入探索的洞窟，以其神秘玄玉和极寒之气闻名，是人界重要的秘境。' },
  { id: 'xulingdian', label: '虚灵殿', type: 'location', desc: '韩立从玄玉洞缝隙中出来后所到达的殿堂，是虚天殿的一部分。' },
  { id: 'beimingdao', label: '北冥岛', type: 'location', desc: '小极宫的所在地，因其极寒之气和风雪而闻名，是小极宫的重要地盘。' },
  { id: 'xiaojigong', label: '小极宫', type: 'location', desc: '位于北冥岛上的修仙宗门，其创始人是一位女修，是北冥岛的霸主。' },
  { id: 'wanyaogu', label: '万妖谷', type: 'location', desc: '北冥岛方向的妖兽主要聚集地，是妖兽横行的危险之地。' },
  { id: 'luanxinghai', label: '乱星海', type: 'location', desc: '一个充满危险与机遇的修仙海域，天星城是其第一大城，是人界最重要的修仙海域之一。' },
  { id: 'tianxingcheng', label: '天星城', type: 'location', desc: '乱星海的第一大城，建在巨大的山体之上，是修士往来的枢纽，是乱星海的中心城市。' },
  { id: 'shengshan', label: '圣山', type: 'location', desc: '星宫的圣山，韩立曾在此闭关百年，是星宫的禁地。' },
  { id: 'wulonghai', label: '五龙海', type: 'location', desc: '一个海域，韩立曾在此地待了五六年进行修炼，是韩立修炼的重要场所。' },
  { id: 'yuguo', label: '虞国', type: 'location', desc: '北凉国邻近的国家，黄龙山位于其离州边上，是天南的重要国家。' },
  { id: 'lizhou', label: '离州', type: 'location', desc: '虞国的一个州，是虞国的重要行政区。' },
  { id: 'huanglongshan', label: '黄龙山', type: 'location', desc: '虞国离州边上的山脉，曾是交战地，韩立曾从这里生还，是天南的重要战场。' },
  { id: 'tianyicheng', label: '天一城', type: 'location', desc: '天南修士对抗慕兰人的临时据点，是天南的军事重镇。' },
  { id: 'mulancaoyuan', label: '慕兰草原', type: 'location', desc: '慕兰族人主要的居住地，也是慕兰法士的来源地，是慕兰族的核心区域。' },
  { id: 'beiliangguo', label: '北凉国', type: 'location', desc: '天南对抗法士的临时据点所在国，与虞国接壤，是天南的边境国家。' },
  { id: 'jinjing', label: '晋京', type: 'location', desc: '大晋的都城，是大晋的政治文化中心。' },
  { id: 'tianjige', label: '天机阁', type: 'location', desc: '晋京的一个机构，韩立曾前往询问炼制芥子空间的秘术，是重要的情报机构。' },
  { id: 'nanjun', label: '南郡', type: 'location', desc: '太昌城所属的区域，是达官贵人、富豪巨商居住较多的府城，是太昌城的富人区。' },
  { id: 'yulingfeng', label: '玉灵峰', type: 'location', desc: '凌玉灵的住所，是星宫长老的居所。' },
  { id: 'renjie', label: '人界', type: 'location', desc: '韩立当前所处的修炼界，与灵界相对，是凡人与修仙者共存的世界。' },
  { id: 'xutiandian', label: '虚天殿', type: 'location', desc: '一处神秘的古殿，韩立曾在此获得许多宝物，如噬金虫和虚天鼎，是人界重要的寻宝之地。' },
  { id: 'bingcheng', label: '冰城', type: 'location', desc: '小极宫内部的城市，因极寒环境而得名，是小极宫的重要城市。' },
  { id: 'lingjie', label: '灵界', type: 'location', desc: '韩立计划飞升的更高层世界，是修仙者追求的终极目标。' },
  { id: 'zhudi', label: '驻地', type: 'location', desc: '慕兰各部落进贡圣殿的临时驻扎地，一个由帐篷和木屋组成的城市，是慕兰族的临时聚集地。' }
]

// 法宝/物品
const ITEMS = [
  { id: 'hongjiangguo', label: '红浆果', type: 'item', desc: '韩立妹妹最喜欢吃的果实，是凡人界的常见水果。' },
  { id: 'muchaidui', label: '木柴堆', type: 'item', desc: '韩立从山里背回家的木柴，是凡人生活必需品。' },
  { id: 'tongban', label: '铜板', type: 'item', desc: '韩立大哥当学徒每月能得到的报酬，是凡人界的通用货币。' },
  { id: 'hanyangan', label: '旱烟杆', type: 'item', desc: '韩父思考时会抽的烟具，是凡人界的常见物品。' },
  { id: 'mache', label: '马车', type: 'item', desc: '七玄门的重要人物或参加入门考试的孩童乘坐的交通工具，是凡人界的交通工具。' },
  { id: 'heiqi', label: '黑旗', type: 'item', desc: '插在马车边框上绣有"玄"字的三角黑旗，代表七玄门的重要人物；也指野狼帮指挥其手下挥动的旗帜，会涌出诡异的黑色浓雾，具有象征意义和法术效果。' },
  { id: 'tanmuhezi', label: '檀木盒子', type: 'item', desc: '韩立用来装银针的盒子，是凡人界的普通容器。' },
  { id: 'yinzhen', label: '银针', type: 'item', desc: '韩立用来为厉师兄医治的工具，是凡人界的医疗器械。' },
  { id: 'pinganfu', label: '平安符', type: 'item', desc: '帮助韩立驱除"心魔入侵"的外物，是具有法力加持的符箓。' },
  { id: 'chousuimaruan', label: '抽髓丸', type: 'item', desc: '一种会使人名利之心和野心大增的药物，是凡人界的毒药。' },
  { id: 'doupen', label: '斗篷', type: 'item', desc: '神秘男子经常穿着的遮盖身体的衣物，是凡人界的普通衣物。' },
  { id: 'huanglongdan', label: '黄龙丹', type: 'item', desc: '韩立用来突破长春功境界的珍贵药丸之一，是修仙者提升修为的重要丹药。' },
  { id: 'jinsuimaruan', label: '金髓丸', type: 'item', desc: '韩立用来突破长春功境界的珍贵药丸之一，是修仙者提升修为的重要丹药。' },
  { id: 'shichongwan', label: '尸虫丸', type: 'item', desc: '墨大夫用来要挟和控制韩立的药物，是凡人界的毒药。' },
  { id: 'jingjingping', label: '净精瓶', type: 'item', desc: '韩立拥有的一个能产生绿液的奇特小瓶，对其修炼有极大帮助，是韩立最重要的法宝之一。' },
  { id: 'lvye', label: '绿液', type: 'item', desc: '净精瓶中产生的神奇液体，可用于催熟灵药，是韩立修炼的重要辅助。' },
  { id: 'yaoshui', label: '药水', type: 'item', desc: '小王爷被韩立硬灌服用的迷幻药物，是凡人界的毒药。' },
  { id: 'yujian', label: '玉简', type: 'item', desc: '记载信息、功法或材料清单的物品，是修仙者传承信息的重要载体。' },
  { id: 'danyao', label: '丹药', type: 'item', desc: '修炼者服用的各类药丸，用于提升修为、疗伤或辅助修炼，是修仙者修炼必需品。' },
  { id: 'fulu', label: '符箓', type: 'item', desc: '具有各种神奇法术效果的符纸或玉符，是修仙者施展法术的重要道具。' },
  { id: 'lingshi', label: '灵石', type: 'item', desc: '修仙界流通的货币，也是修炼、驱动法器和布阵的重要能源，是修仙界最重要的流通货币。' },
  { id: 'zhujidan', label: '筑基丹', type: 'item', desc: '筑基期修炼必需的丹药，服用后可提升修为，帮助突破境界，是修仙者突破境界的重要丹药。' },
  { id: 'jingganghuan', label: '精钢环', type: 'item', desc: '韩立早期使用的上品法器，可以变大形成防御，是韩立早期的防御法宝。' },
  { id: 'qingjiaoqi', label: '青蛟旗', type: 'item', desc: '陆师兄所持的顶级风属性法器，可化形为青色巨蛟进行攻击，是陆师兄的标志性法宝。' },
  { id: 'xuantiefeitundun', label: '玄铁飞天盾', type: 'item', desc: '与青蛟旗同等级的顶级防御法器，能抵挡强大攻击，是高级防御法宝。' },
  { id: 'huisexiaojianfubao', label: '灰色小剑符宝', type: 'item', desc: '一张画有小剑的符箓，可驱动形成巨剑攻击敌人，是威力强大的符宝。' },
  { id: 'jinfuzimuren', label: '金蚨子母刃', type: 'item', desc: '一套韩立使用的刃类法器，可作为攻击手段，是韩立的攻击法宝。' },
  { id: 'xiaoyuping', label: '小玉瓶', type: 'item', desc: '韩立用来吸纳动物魂魄或储存液体的瓶子，与净精瓶不同，是韩立的辅助法宝。' },
  { id: 'bailindun', label: '白磷盾', type: 'item', desc: '韩立使用的防御性法器，是韩立的防御法宝。' },
  { id: 'guikefaqì', label: '龟壳法器', type: 'item', desc: '韩立使用的防御性法器，坚硬无比，是韩立的防御法宝。' },
  { id: 'huoniaozhenbao', label: '火鸟真宝', type: 'item', desc: '一种用于炼化血侍的真宝，是魔道炼制血侍的重要材料。' },
  { id: 'lansezhuzi', label: '蓝色珠子', type: 'item', desc: '从冰妖尸骸中获得的珠子，具有特殊属性。' },
  { id: 'jinzhu', label: '金珠', type: 'item', desc: '从血侍葬身处获得的珠子，具有特殊属性。' },
  { id: 'huangzhu', label: '黄珠', type: 'item', desc: '从血侍葬身处获得的珠子，具有特殊属性。' },
  { id: 'juhunbo', label: '聚魂钵', type: 'item', desc: '漆黑如墨的钵盂状法器，内含大量孤魂野鬼，可用于炼制傀儡，是魔道炼制傀儡的邪恶法宝。' },
  { id: 'xuehongjianzhui', label: '血红尖锥', type: 'item', desc: '魔道和邪修之人专用的法器物品，是邪修的标志性法宝。' },
  { id: 'shenfengzhou', label: '神风舟', type: 'item', desc: '韩立用来赶路的飞行法器，速度极快，是韩立的代步工具。' },
  { id: 'bingzhui', label: '冰锥', type: 'item', desc: '韩立用来击杀守卫的亮晶晶的冰制武器，是韩立的攻击法宝。' },
  { id: 'yinhunzhong', label: '引魂钟', type: 'item', desc: '含有曲魂精血的法器，可用于追踪曲魂藏身之所，是追踪类法宝。' },
  { id: 'huanxingzhenqi', label: '幻形阵旗', type: 'item', desc: '一种用于彻底幻形掩盖入口的阵旗，是阵法类法宝。' },
  { id: 'zhenpan', label: '阵盘', type: 'item', desc: '用于布置或操控法阵的器具，是阵法师的必备工具。' },
  { id: 'zhenqi', label: '阵旗', type: 'item', desc: '用于布置或操控法阵的旗帜，是阵法师的必备工具。' },
  { id: 'tianleizhu', label: '天雷竹', type: 'item', desc: '一种珍稀的木属性灵材，可用来炼制飞剑，不同年份有不同等阶和雷电颜色，万年以上被称为金雷竹，是炼制青竹蜂云剑的核心材料。' },
  { id: 'qingzhufengyunjian', label: '青竹蜂云剑', type: 'item', desc: '韩立以天雷竹为主要材料炼制的一套七十二把飞剑法宝，威力强大，也是其大庚剑阵的核心，是韩立最重要的攻击法宝。' },
  { id: 'xiaochi', label: '小尺', type: 'item', desc: '韩立用来破除禁制的法器，是韩立的辅助法宝。' },
  { id: 'xiaochui', label: '小锤', type: 'item', desc: '韩立用来破除禁制的法器，是韩立的辅助法宝。' },
  { id: 'xiaopcha', label: '小叉', type: 'item', desc: '韩立用来破除禁制的法器，是韩立的辅助法宝。' },
  { id: 'lansisipa', label: '蓝色丝帕', type: 'item', desc: '石蝶用来破除禁制的法器，是石蝶的辅助法宝。' },
  { id: 'hongsesan', label: '红色的伞', type: 'item', desc: '葛笠用来防御鬼雾的法器，是葛笠的防御法宝。' },
  { id: 'yuanzhufaqì', label: '圆珠法器', type: 'item', desc: '紫灵仙子用来形成移动结界的四颗拳头大小的法器，是紫灵仙子的防御法宝。' },
  { id: 'jinsiswang', label: '金色丝网', type: 'item', desc: '玄骨交给韩立的金色法宝，可困住妖兽，也可以化为金弧，是玄骨的赠予。' },
  { id: 'huanlangubao', label: '花篮古宝', type: 'item', desc: '韩立获得的古宝之一，在战斗中曾用来困敌，是韩立的辅助法宝。' },
  { id: 'lingshoudai', label: '灵兽袋', type: 'item', desc: '用来装活物或傀儡的袋子，是修仙者储存活物的重要道具。' },
  { id: 'butiandan', label: '补天丹', type: 'item', desc: '一颗五色丹丸，是元婴期修士争夺的宝物，是提升元婴修为的珍贵丹药。' },
  { id: 'yuruyi', label: '玉如意', type: 'item', desc: '韩立从虚天殿获得的宝物，是韩立的辅助法宝。' },
  { id: 'lingxipei', label: '灵犀佩', type: 'item', desc: '韩立从老魔那里获得的宝物之一，具有特殊功能。' },
  { id: 'hanbingzhu', label: '寒冰珠', type: 'item', desc: '韩立从老魔那里获得的宝物之一，具有冰属性攻击能力。' },
  { id: 'huanglinjia', label: '皇鳞甲', type: 'item', desc: '蛮胡子穿戴的宝甲，防御力超常，是蛮胡子的防御法宝。' },
  { id: 'kuileilingjiancanpian', label: '傀儡零件残片', type: 'item', desc: '韩立从虚天殿获得的傀儡部件，是炼制傀儡的重要材料。' },
  { id: 'wannianlingru', label: '万年灵乳', type: 'item', desc: '一种珍稀的灵液，可用于滋养元神或提升修为，是珍贵的修炼辅助。' },
  { id: 'yanghunmugengxu', label: '养魂木根须', type: 'item', desc: '一种用于滋养魂魄的材料，是滋养元神的重要材料。' },
  { id: 'wusexiaoyuanzhu', label: '五色小圆珠', type: 'item', desc: '烧化五色骸骨时遗留的奇怪圆珠，具有特殊属性。' },
  { id: 'dayin', label: '大印', type: 'item', desc: '韩立从花篮中收取的法宝，具有镇压能力。' },
  { id: 'yantaifabao', label: '砚台法宝', type: 'item', desc: '韩立收取的法宝之一，具有特殊功能。' },
  { id: 'hongguangshanhandaofabao', label: '红光闪闪飞刀法宝', type: 'item', desc: '胡月之物，被韩立送了出去，是胡月的攻击法宝。' },
  { id: 'minghunzhu', label: '鸣魂珠', type: 'item', desc: '与啼魂兽有关的珠子，韩立未敢轻易炼化，具有特殊联系。' },
  { id: 'leichi', label: '雷翅', type: 'item', desc: '风希用雷鹏骸骨和灵禽翅膀材料炼制出的翅膀，具有惊人雷电之力，韩立后将其炼化为风雷翅法宝，是韩立重要的飞行法宝。' },
  { id: 'lianjing', label: '炼晶', type: 'item', desc: '一种珍稀的材料，可用于增强飞剑的坚硬程度，与庚精同等珍稀，是炼器的重要材料。' },
  { id: 'bifengzhu', label: '避风珠', type: 'item', desc: '能减弱狂风力量的罕见法器，是辅助性法宝。' },
  { id: 'baijinge', label: '白金戈', type: 'item', desc: '袁姓弟子驱使的上阶法器，颇有威力，是袁姓弟子的攻击法宝。' },
  { id: 'dinglingdan', label: '定灵丹', type: 'item', desc: '有助于凝结元婴的丹药，是修仙者突破元婴期的重要丹药。' },
  { id: 'baisejing', label: '白色古镜', type: 'item', desc: '韩立在灵眼之树所在洞窟中见到的古宝，具有特殊功能。' },
  { id: 'gengjing', label: '庚精', type: 'item', desc: '一种极其稀有且强大的金属性材料，是炼制大庚剑阵的关键材料，是炼制顶级法宝的重要材料。' },
  { id: 'wanlifu', label: '万里符', type: 'item', desc: '一种用于长距离联系和通信的符箓，是修仙者通信的重要工具。' },
  { id: 'jumao', label: '巨矛', type: 'item', desc: '村中男子用来对抗巨兽的巨大长矛，是凡人界的武器。' },
  { id: 'jubang', label: '巨棒', type: 'item', desc: '巨兽使用的巨大棍棒，是妖兽的武器。' },
  { id: 'lingfubi', label: '灵符笔', type: 'item', desc: '制符师用来画符的工具，是制符师的必备工具。' },
  { id: 'mosuizuan', label: '魔髓钻', type: 'item', desc: '一种特殊的钻头或材料，在炼制魔髓飞刀时会用到，是炼制魔道法宝的材料。' },
  { id: 'yinzong', label: '银钟', type: 'item', desc: '韩立祭出的古宝，可发出低沉钟声攻击，是韩立的攻击法宝。' },
  { id: 'heiseshanfeng', label: '黑色山峰', type: 'item', desc: '老者使用的法宝，可变大如小山镇压敌人，是老者的攻击法宝。' },
  { id: 'leihuizhui', label: '雷火锥', type: 'item', desc: '老妇人使用的古宝，融合雷火之力，可穿透晶墙，是老妇人的攻击法宝。' },
  { id: 'xuesepifeng', label: '血色披风', type: 'item', desc: '韩立用来快速飞遁的披风，是韩立的飞行法宝。' },
  { id: 'heiseiyufu', label: '黑色玉符', type: 'item', desc: '令狐老祖所持的玉符，可化出玄化鬼手攻击，是令狐老祖的攻击法宝。' },
  { id: 'baiseigunfabao', label: '白色棍子般法宝', type: 'item', desc: '秃眉大汉用于防御的法宝，是秃眉大汉的防御法宝。' },
  { id: 'jinhu', label: '金弧', type: 'item', desc: '辟邪神雷或特定法宝激发的金色电弧或光芒，具有强大攻击力，是强大的攻击手段。' },
  { id: 'shijinchongjia', label: '噬金虫甲', type: 'item', desc: '由噬金虫组成的防御战甲，是噬金虫的特殊能力。' },
  { id: 'gudeng', label: '古灯', type: 'item', desc: '慕兰族圣禽所依附的铜质古宝，具有强大火焰和控制圣禽的能力，是慕兰族的重要法宝。' },
  { id: 'fenhongyuanzhu', label: '粉红色圆珠', type: 'item', desc: '乐姓女子用来喂食圣禽的珠子，是慕兰族的特殊物品。' },
  { id: 'lingxiangshou', label: '灵像兽', type: 'item', desc: '可被灵符激活的兽雕，具有战斗能力，是傀儡类法宝。' },
  { id: 'yinyuanwan', label: '阴元丸', type: 'item', desc: '韩立赠予宋姓女子的丹药，对处子之身的女修大有好处，是辅助修炼的丹药。' },
  { id: 'yinhuolei', label: '阴火雷', type: 'item', desc: '玄阴经中记载的一种雷珠炼制秘法，威力惊人，是魔道功法的产物。' },
  { id: 'tianleizi', label: '天雷子', type: 'item', desc: '一种雷珠宝物，与阴火雷类似，是强大的攻击法宝。' },
  { id: 'jianglingfu', label: '降灵符', type: 'item', desc: '韩立炼制的一种强大符箓，可临时提升修为，是天符门三大密符之一。' },
  { id: 'jinzhizhu', label: '禁制珠', type: 'item', desc: '韩立用来攻击血雾光罩的珠子，是韩立的攻击法宝。' },
  { id: 'xueleizi', label: '血雷子', type: 'item', desc: '用天地污秽之物炼制的圆珠，可使宝物威力大降，是魔道法宝。' },
  { id: 'mixianzhong', label: '迷仙钟', type: 'item', desc: '落云宗的至宝，可用于困敌或脱身，是落云宗的镇派之宝。' },
  { id: 'juding', label: '巨钉', type: 'item', desc: '韩立用来困住尸魈的缠绕金色电弧的银色巨钉，是韩立的攻击法宝。' },
  { id: 'liangyihuan', label: '两仪环', type: 'item', desc: '苍坤上人留下的古宝，可抵御北极元光，是防御性古宝。' },
  { id: 'bijiuduye', label: '碧鸠毒液', type: 'item', desc: '韩立用来对付紫纹蝎的剧毒液体，是韩立的攻击手段。' },
  { id: 'xueseyupan', label: '血色玉盘', type: 'item', desc: '韩立用来追踪特定目标的玉盘，是追踪类法宝。' },
  { id: 'renxingkuilei', label: '人形傀儡', type: 'item', desc: '韩立炼制的强大傀儡，可伪装成真人，具有强大战斗力，是韩立的杀手锏。' },
  { id: 'chilingruanyu', label: '叱灵软玉', type: 'item', desc: '一种奇妙的玉石，可随意变形，用于炼制傀儡外壳，是炼制傀儡的重要材料。' },
  { id: 'gangyin', label: '罡银', type: 'item', desc: '一种坚韧的金属材料，用于炼制傀儡，是炼制傀儡的重要材料。' },
  { id: 'ziyouzhu', label: '紫幽珠', type: 'item', desc: '富姓老者用来抵御阴风的法器，是防御性法宝。' },
  { id: 'bingnzi', label: '冰扇子', type: 'item', desc: '白瑶怡使用的冰属性扇子法宝，是白瑶怡的攻击法宝。' },
  { id: 'hongzhen', label: '红针', type: 'item', desc: '韩立袖中射出的纤细红针，可穿透防御，是韩立的攻击法宝。' },
  { id: 'lanmengmengdejinbei', label: '蓝濛濛的晶碑', type: 'item', desc: '韩立在阴阳窟中获得的蓝色晶体石碑，上面有符文流动，具有特殊功能。' },
  { id: 'leihuogong', label: '雷火弓', type: 'item', desc: '人形傀儡使用的弓，可射出雷火短箭，是傀儡的攻击法宝。' },
  { id: 'jinleimuduanjian', label: '金雷木短箭', type: 'item', desc: '人形傀儡雷火弓所用的短箭，是傀儡的攻击法宝。' },
  { id: 'xuemozhu', label: '血魔珠', type: 'item', desc: '与魔道功法相关的珠子，是魔道修炼的材料。' },
  { id: 'xuanuanggjing', label: '眩光晶', type: 'item', desc: '炼制魔眼所用的晶体，是炼制魔眼的重要材料。' },
  { id: 'moyan', label: '魔眼', type: 'item', desc: '傀儡身上用于施展迷魂幻术的眼状法器，是傀儡的辅助法宝。' },
  { id: 'qingzetonngdun', label: '青色铜盾', type: 'item', desc: '四散真人使用的防御性铜盾，是防御性法宝。' },
  { id: 'balingchi', label: '八灵尺', type: 'item', desc: '一种法器，可化为银莲缠住巨狼，是辅助性法宝。' },
  { id: 'jinmohuan', label: '禁魔环', type: 'item', desc: '七妙真人用来困住魔狼的翠色圆环，是辅助性法宝。' },
  { id: 'chiminggu', label: '赤鸣鼓', type: 'item', desc: '一种火红小鼓，威力巨大，可能是通天灵宝仿制品，是强大的攻击法宝。' },
  { id: 'hualongxi', label: '化龙玺', type: 'item', desc: '镶嵌在石碑上的物品，具有特殊功能。' },
  { id: 'rubaiseyuanzhu', label: '乳白色圆珠', type: 'item', desc: '魔像发出的圆珠，威力惊人，是魔像的攻击法宝。' },
  { id: 'huanlingfu', label: '化灵符', type: 'item', desc: '韩立从天符门获得的符箓，可化为替身，是天符门三大密符之一。' },
  { id: 'heifengqi', label: '黑风旗', type: 'item', desc: '古魔圣祖使用的旗帜，可引爆魔气，是魔道的重要法宝。' },
  { id: 'yupei', label: '玉佩', type: 'item', desc: '小极宫修士用于激活禁制或作为信物使用的玉制物品，是信物类物品。' },
  { id: 'chenshui', label: '沉水', type: 'item', desc: '一种漆黑如墨的液体，可用于提取万年玄玉，是炼器材料。' },
  { id: 'wannianxuanyu', label: '万年玄玉', type: 'item', desc: '一种极其稀有且富含寒气的玉石，用于精炼寒焰或炼制宝物，是珍贵的炼器材料。' },
  { id: 'xuanyupai', label: '玄玉牌', type: 'item', desc: '一块被火鸦衔在口中戏耍的玉牌，具有特殊功能。' },
  { id: 'huohonxxiaoding', label: '火红小鼎', type: 'item', desc: '韩立用来对付冰兽的火属性小鼎，是韩立的攻击法宝。' },
  { id: 'danuoyiling', label: '大挪移令', type: 'item', desc: '韩立拥有的上古传送令牌，可用于远距离传送，是韩立重要的辅助法宝。' },
  { id: 'xutianding', label: '虚天鼎', type: 'item', desc: '韩立获得的一件通天灵宝，可释放青丝或乾蓝冰焰，也称乾蓝小鼎或乾蓝鼎，是韩立最重要的法宝之一。' },
  { id: 'tiandushi', label: '天都尸', type: 'item', desc: '极阴祖师祭炼的强大炼尸，后被韩立的冰焰冻结，是魔道强大的炼尸。' },
  { id: 'wuheiyuanzhu', label: '乌黑圆珠', type: 'item', desc: '极阴祖师喷出的杀手锏，可化为天都尸火，是魔道强大的攻击法宝。' },
  { id: 'jipinlingshi', label: '极品灵石', type: 'item', desc: '修仙界中最顶级的灵石，极其稀有，可布上古奇阵并辅助突破瓶颈，是珍贵的修炼资源。' },
  { id: 'yuzhifulu', label: '玉制符箓', type: 'item', desc: '凌啸风夫妇用来记录突破化神心得的玉符，是传承信息的载体。' },
  { id: 'toumingjiaozhuangwu', label: '透明胶状物', type: 'item', desc: '一种稀奇古怪的材料，在灵界也属罕见，是珍贵的炼器材料。' },
  { id: 'qheihelianangdejingshi', label: '漆黑的闪亮的晶石', type: 'item', desc: '一种稀奇古怪的晶石材料，是珍贵的炼器材料。' },
  { id: 'heiabiselangseizhu', label: '黑白色两色的圆珠', type: 'item', desc: '一种稀奇古怪的圆珠材料，具有特殊属性。' },
  { id: 'wuheiayanzhu', label: '乌黑眼珠', type: 'item', desc: '一种稀奇古怪的眼珠材料，可能与"破灭法目"有关，具有特殊功能。' },
  { id: 'huolingisi', label: '火灵丝', type: 'item', desc: '韩立向天澜圣兽所化童子询问的稀有材料，是珍贵的炼器材料。' },
  { id: 'pomiefamu', label: '破灭法目', type: 'item', desc: '一种威力强大的神通，可能与乌黑眼珠有关，是强大的攻击神通。' },
  { id: 'huangfan', label: '黄幡', type: 'item', desc: '韩立收取的两杆黄色幡类古宝，用于逃遁，是韩立的辅助法宝。' },
  { id: 'lvseyuping', label: '绿色玉瓶', type: 'item', desc: '韩立用来收第二元婴的玉瓶，是韩立的辅助法宝。' },
  { id: 'yugou', label: '玉钩', type: 'item', desc: '凌玉灵用来护身的蓝色玉钩，是凌玉灵的防御法宝。' },
  { id: 'huiyangshui', label: '回阳水', type: 'item', desc: '一种液体，可用于延长炼化器物为灵根的时间，是辅助炼器的材料。' },
  { id: 'longlingu', label: '龙鳞果', type: 'item', desc: '一种能够提升修为的果实，是珍贵的修炼资源。' }
]

// 功法/技能

const SKILLS = [
  { id: 'changchun', label: '长春功', type: 'skill', desc: '韩立修炼的基础功法，能增强体内能量流，达到第五层可获得过目不忘的能力。' },
  { id: 'xiangjiagong', label: '象甲功', type: 'skill', desc: '张铁修炼的一种非常罕见的武功，共有九层，修炼至高层可刀枪不入，力大无穷。' },
  { id: 'yishu', label: '医术', type: 'skill', desc: '墨大夫传授给韩立的技能，韩立曾用银针救治厉师兄。' },
  { id: 'zhanianjianfa', label: '眨眼剑法', type: 'skill', desc: '一种罕见的刺杀秘术，着重于利用环境和光线制造视觉错误，瞬间击杀敌人弱点，不适合修炼内力者，是凡人界的刺杀绝学。' },
  { id: 'ruangugong', label: '软骨功', type: 'skill', desc: '韩立开始修炼的一种难度极高的功法，能使身体柔韧度大增，适合潜行和规避攻击。' },
  { id: 'huodanshu', label: '火弹术', type: 'skill', desc: '一种修仙小法术，能发出高温火球，韩立将其与武功结合用于实战，是修仙界入门法术。' },
  { id: 'tianyanshu', label: '天眼术', type: 'skill', desc: '一种简单的法术，用于加强视力，后被敛气术克制，是辅助侦查的法术。' },
  { id: 'luoyanbu', label: '罗烟步', type: 'skill', desc: '韩立修炼的一种移动身法，后与御风诀结合使用，是修仙界常见的身法。' },
  { id: 'yufengjue', label: '御风诀', type: 'skill', desc: '一种法术，韩立与罗烟步结合使用，提高身法速度，是修仙界常见的飞行法术。' },
  { id: 'quwushu', label: '驱物术', type: 'skill', desc: '韩立通过符箓练习的法术，用于操控物体，是修仙界入门法术。' },
  { id: 'lianqishu', label: '敛气术', type: 'skill', desc: '一种中阶辅助法术，能收敛自身灵气，隐匿藏身，可对抗天眼术，是修仙界常见的隐匿法术。' },
  { id: 'shuizhaoshu', label: '水罩术', type: 'skill', desc: '一种防御法术，能形成水幕抵挡攻击，是修仙界常见的防御法术。' },
  { id: 'yinqijue', label: '引气决', type: 'skill', desc: '筑基期修士才能施展的敛气功法，能使人透明般穿梭于凡人之间而不被察觉，是高级隐匿法术。' },
  { id: 'kongshenshu', label: '控神术', type: 'skill', desc: '韩立使用的迷魂法术，可以控制他人心神，是辅助审问和控制的法术。' },
  { id: 'huanseyan', label: '幻色眼', type: 'skill', desc: '控神术中的一种普通迷魂法术，是入门级幻术。' },
  { id: 'heishashouluogong', label: '黑煞修罗功', type: 'skill', desc: '小王爷修炼的功法，是一种魔道功法。' },
  { id: 'shayaojue', label: '煞妖诀', type: 'skill', desc: '四大血侍修炼的功法，是一种魔道功法。' },
  { id: 'xuedaodafa', label: '血道大法', type: 'skill', desc: '越皇修炼的功法，是一种魔道功法。' },
  { id: 'lianhunshu', label: '炼魂术', type: 'skill', desc: '一种可怕的秘术，可以将人的元神魂魄抽出加以折磨，是魔道邪术。' },
  { id: 'diandaowuxingzhen', label: '颠倒五行阵', type: 'skill', desc: '韩立布置的法阵，用于防御或困敌，是韩立掌握的阵法之一。' },
  { id: 'dayanjue', label: '大衍决', type: 'skill', desc: '一种高级修炼功法，韩立在此功法上天赋不小，主要用于祭炼分身，是韩立重要的修炼功法。' },
  { id: 'qingyuanjianjue', label: '青元剑诀', type: 'skill', desc: '一种剑修功法，修炼者可在筑基后期散掉大部分修为，从筑基初期重新修炼以减轻结丹瓶颈阻力，是剑修的特殊修炼法门。' },
  { id: 'sanzhuanzhongyuangong', label: '三转重元功', type: 'skill', desc: '一种修炼方法，通过散功重修和压缩真元来减轻结丹瓶颈阻力，是修仙者突破境界的辅助功法。' },
  { id: 'pizhixianlei', label: '辟邪神雷', type: 'skill', desc: '万年天雷竹能发出的雷电，对邪法魔功有克制奇效，韩立也通过它加强飞剑，是韩立重要的攻击手段。' },
  { id: 'jianyingfenguangshu', label: '剑影分光术', type: 'skill', desc: '一种神通，能使飞剑幻化出多道剑光，用于布下剑阵，是剑修的强大神通。' },
  { id: 'huanxingjue', label: '换形诀', type: 'skill', desc: '玄阴经的秘术之一，能任意拉长缩短身体部位并控制肌肉松缓，是魔道变化的法术。' },
  { id: 'yinmozhan', label: '阴魔斩', type: 'skill', desc: '韩立修炼的功法，能使右手臂膨胀并罩上血红黑气，是韩立的攻击功法。' },
  { id: 'jifengjiubian', label: '疾风九变', type: 'skill', desc: '一种妖族禽类功法，包含法诀、身法和两种秘术，是妖族的强大功法。' },
  { id: 'nifengshu', label: '匿风术', type: 'skill', desc: '疾风九变中的秘术之一，是无名敛息术的修改版，适合人类修炼，是高级隐匿法术。' },
  { id: 'xueyingdun', label: '血影遁', type: 'skill', desc: '疾风九变中的秘术之一，一种借助精血力量进行瞬间转移的遁术，是强大的保命遁术。' },
  { id: 'quchongshu', label: '驱虫术', type: 'skill', desc: '韩立参悟的一种新的驱虫技能，是韩立驯养灵虫的重要技能。' },
  { id: 'xuanmuiyingdafa', label: '玄牡化婴大法', type: 'skill', desc: '一种逆天神通，能修炼出第二个完全独立的元婴，并可融合躯体形成化身，是逆天秘术。' },
  { id: 'guiyijue', label: '归一诀', type: 'skill', desc: '玄牡化婴大法中的秘术，用于消去心魔，使本体和化身元神重新同化归一，是修炼第二元婴的重要法诀。' },
  { id: 'yinhuolei', label: '阴火雷', type: 'skill', desc: '玄阴经上的一种雷珠炼制秘法，威力惊人，是魔道强大的攻击手段。' },
  { id: 'jianglingfu', label: '降灵符', type: 'skill', desc: '天符门三大密符之一，韩立曾炼制成功并使用，可临时提升修为，是天符门的高级符箓。' },
  { id: 'dagengjianzhen', label: '大庚剑阵', type: 'skill', desc: '一种强大的剑阵，威力惊人，需要掺入庚精才能发挥最大效用，可形成无数剑丝，是韩立最重要的攻击手段之一。' },
  { id: 'tongbaojue', label: '通宝诀', type: 'skill', desc: '一种专门用于驱动通天灵宝的上古功法，每件通天灵宝都有其独特的法诀，是驱动通天灵宝的秘法。' },
  { id: 'hualingfu', label: '化灵符', type: 'skill', desc: '天符门三大密符之一，结丹期修士可培炼，能转化自身，韩立曾用其化为替身，是天符门的高级符箓。' },
  { id: 'liudingtianjiafu', label: '六丁天甲符', type: 'skill', desc: '天符门三大密符之一，能凝聚天地灵气形成六层护罩，其玉简已失传，是天符门强大的防御符箓。' },
  { id: 'mingwangjue', label: '明王诀', type: 'skill', desc: '韩立修炼的功法，第一层可使躯体坚韧如铁精，增强防御，是韩立的炼体功法。' },
  { id: 'yuancisnenguang', label: '元磁神光', type: 'skill', desc: '一种罕见的强大神通，修炼大成后可驱使五行磁力，克制五行之宝，是强大的辅助和攻击神通。' }
]


// 重要事件
const EVENTS = [
  { id: 'ruqi', label: '初入七玄门', type: 'event', desc: '韩立的修仙生涯从其亲三叔推荐他参加七玄门招收内门弟子考验开始，最终抵达七玄门总门彩霞山，正式踏上修行之路，是他修仙的起点。' },
  { id: 'zhujichenggong', label: '筑基成功', type: 'event', desc: '韩立在苦修期间，通过服用"黄龙丹"和"金髓丸"等丹药，修为快速精进，最终成功突破至筑基期，并掌握了先天真火，是其修仙生涯的第一个重要里程碑。' },
  { id: 'jiedanchenggong', label: '结丹成功', type: 'event', desc: '韩立的修为在某段时间内成功晋入结丹期，其法力达到结丹初期，这为他着手炼制"青竹蜂云剑"等强大法宝奠定了修为基础，是其修仙生涯的又一重要进展。' },
  { id: 'luanxinghailixian', label: '乱星海历险', type: 'event', desc: '韩立在北冥岛通过大挪移令被意外传送到乱星海的虚天殿内殿。在乱星海期间，他经历了众多历险，获得了如符宝、傀儡、噬金虫、啼魂兽 等多种珍贵宝物，并在此地大幅提升了自身实力，是其修仙生涯的转折点。' },
  { id: 'yuanyingchenggong', label: '元婴成功', type: 'event', desc: '韩立成功突破瓶颈，凝结元婴，成为一名元婴期修士，并因此获得了落云宗"韩师叔"的尊称及在云梦山东脉开辟洞府的权利，是其修仙生涯的重要突破。' },
  { id: 'jihuafieshenglj', label: '计划飞升灵界', type: 'event', desc: '韩立在芥子空间内闭关修炼，将修为提升至化神初期顶峰，随后便开始筹备并计划在不久后飞升灵界，是其修仙生涯的最终目标。' }
]


// 生成关系边
function generateEdges(): EdgeData[] {
  const edges: EdgeData[] = []
  
  // 人物关系 (r前缀)
  // 师徒关系
  edges.push(
    { id: 'r1', source: 'hanli', target: 'modaifu', edgeType: 'master_student', label: '师父' },
    { id: 'r2', source: 'hanli', target: 'lishizu', edgeType: 'master_student', label: '师祖' },
    { id: 'r3', source: 'wufeng', target: 'hanli', edgeType: 'master_student', label: '师兄传授' },
  )

  // 同门关系
  edges.push(
    { id: 'r4', source: 'hanli', target: 'zhangtie', edgeType: 'fellow_disciple', label: '同门' },
    { id: 'r5', source: 'hanli', target: 'lifeyu', edgeType: 'fellow_disciple', label: '同门' },
    { id: 'r6', source: 'hanli', target: 'chenshimei', edgeType: 'fellow_disciple', label: '同门' },
    { id: 'r7', source: 'hanli', target: 'lushixiong', edgeType: 'fellow_disciple', label: '同门' },
    { id: 'r8', source: 'hanli', target: 'wufeng', edgeType: 'fellow_disciple', label: '同门' },
    { id: 'r9', source: 'hanli', target: 'dudong', edgeType: 'fellow_disciple', label: '同门' }
  )

  // 家庭关系
  edges.push(
    { id: 'r10', source: 'hanli', target: 'hanfu', edgeType: 'family', label: '父子' },
    { id: 'r11', source: 'hanli', target: 'hanmu', edgeType: 'family', label: '母子' },
    { id: 'r12', source: 'hanli', target: 'dage', edgeType: 'family', label: '兄弟' },
    { id: 'r13', source: 'hanli', target: 'sanshu', edgeType: 'family', label: '叔侄' },
    { id: 'r14', source: 'moyuzhu', target: 'mofengwu', edgeType: 'family', label: '姐妹' },
    { id: 'r15', source: 'mofengwu', target: 'modaifu', edgeType: 'family', label: '父女' },
    { id: 'r16', source: 'moyuzhu', target: 'modaifu', edgeType: 'family', label: '父女' }
  )

  // 双修/道侣关系
  edges.push(
    { id: 'r17', source: 'hanli', target: 'nangongwan', edgeType: 'dao_companion', label: '双修道侣' },
    { id: 'r18', source: 'liujing', target: 'xuehongshijie', edgeType: 'dao_companion', label: '双修道侣' }
  )

  // 敌对关系
  edges.push(
    { id: 'r19', source: 'hanli', target: 'modaifu', edgeType: 'enemy', label: '击杀' },
    { id: 'r20', source: 'hanli', target: 'ouyangfeitian', edgeType: 'enemy', label: '击杀' },
    { id: 'r21', source: 'hanli', target: 'jiyinzushi', edgeType: 'enemy', label: '击败冰封' },
    { id: 'r22', source: 'hanli', target: 'xiaowangye', edgeType: 'enemy', label: '毒杀' },
    { id: 'r23', source: 'hanli', target: 'lushixiong', edgeType: 'enemy', label: '激战击败' },
    { id: 'r24', source: 'hanli', target: 'wentianren', edgeType: 'enemy', label: '激战' }
  )

  // 傀儡/分身关系
  edges.push(
    { id: 'r25', source: 'hanli', target: 'quhun', edgeType: 'puppet', label: '傀儡分身' },
    { id: 'r26', source: 'hanli', target: 'yinyue', edgeType: 'puppet', label: '傀儡分身' },
    { id: 'r27', source: 'hanli', target: 'dieryuanying', edgeType: 'puppet', label: '第二元婴' }
  )

  // 新增关系
  edges.push(
    // 师徒关系
    { id: 'r28', source: 'yuzitong', target: 'modaifu', edgeType: 'master_student', label: '传授夺舍之法' },
    { id: 'r29', source: 'shixianzi', target: 'huyue', edgeType: 'master_student', label: '指导' },
    { id: 'r30', source: 'xuangou', target: 'jixuan', edgeType: 'master_student', label: '逆徒' },
    { id: 'r31', source: 'yujun', target: 'hanli', edgeType: 'master_student', label: '引领' },
    { id: 'r32', source: 'yujun', target: 'dudong', edgeType: 'master_student', label: '引领' },
    { id: 'r33', source: 'rushengzhongnianren', target: 'hanli', edgeType: 'master_student', label: '师祖' },
    { id: 'r34', source: 'hanli', target: 'liuxingnvzi', edgeType: 'master_student', label: '师父' },

    // 同门关系
    { id: 'r35', source: 'sunergou', target: 'heixiong', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r36', source: 'xiaowangye', target: 'wangzongguan', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r37', source: 'yuehuang', target: 'lanpaoren', edgeType: 'fellow_disciple', label: '一同行动' },
    { id: 'r38', source: 'geli', target: 'hanli', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r39', source: 'zilingxianzi', target: 'hanli', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r40', source: 'geli', target: 'zilingxianzi', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r41', source: 'xuangou', target: 'hanli', edgeType: 'fellow_disciple', label: '合作' },
    { id: 'r42', source: 'lingyuling', target: 'hanli', edgeType: 'fellow_disciple', label: '引导' },
    { id: 'r43', source: 'wendaoyou', target: 'shao_nu', edgeType: 'fellow_disciple', label: '同行' },
    { id: 'r44', source: 'jingshouhanzi', target: 'zhiqidenanzi', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r45', source: 'meining', target: 'hanli', edgeType: 'fellow_disciple', label: '一同行动' },
    { id: 'r46', source: 'mashidi', target: 'tumeidahan', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r47', source: 'kuihuan', target: 'wangshixiong', edgeType: 'fellow_disciple', label: '讨论' },
    { id: 'r48', source: 'yinfalaozhe', target: 'hanli', edgeType: 'fellow_disciple', label: '师兄' },
    { id: 'r49', source: 'mupeiling', target: 'hanli', edgeType: 'fellow_disciple', label: '等待' },
    { id: 'r50', source: 'xinruoyin', target: 'hanli', edgeType: 'fellow_disciple', label: '有约定' },
    { id: 'r51', source: 'dongxuaner', target: 'hanli', edgeType: 'fellow_disciple', label: '寻找' },
    { id: 'r52', source: 'fengyunyoucunzisanjiufuren', target: 'wuyihanzi', edgeType: 'fellow_disciple', label: '追查' },
    { id: 'r53', source: 'fengyunyoucunzisanjiufuren', target: 'hunshenyindejinyishusheng', edgeType: 'fellow_disciple', label: '追查' },
    { id: 'r54', source: 'wuyihanzi', target: 'hunshenyindejinyishusheng', edgeType: 'fellow_disciple', label: '追查' },
    { id: 'r55', source: 'hanli', target: 'hanyunzhi', edgeType: 'fellow_disciple', label: '救治' },
    { id: 'r56', source: 'lulou', target: 'hanli', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r57', source: 'pangzi', target: 'feichashuangmo', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r58', source: 'nanlonghou', target: 'luweiying', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r59', source: 'nanlonghou', target: 'baishanlaozhe', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r60', source: 'yanruyan', target: 'hanli', edgeType: 'fellow_disciple', label: '寻求帮助' },
    { id: 'r61', source: 'hanli', target: 'panglaozhe', edgeType: 'fellow_disciple', label: '救助' },
    { id: 'r62', source: 'hanli', target: 'nieying', edgeType: 'fellow_disciple', label: '救助' },
    { id: 'r63', source: 'tumeidahan', target: 'mashidi', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r64', source: 'baimengxin', target: 'qingshanzhongnianren', edgeType: 'fellow_disciple', label: '同伴' },
    { id: 'r65', source: 'bingfeng', target: 'hanli', edgeType: 'fellow_disciple', label: '一同传送' },
    { id: 'r66', source: 'dalanglaozhe', target: 'lanpaoren', edgeType: 'fellow_disciple', label: '命令' },
    { id: 'r67', source: 'zhonglaozhe', target: 'hanli', edgeType: 'fellow_disciple', label: '有过一面之缘' },
    { id: 'r68', source: 'tongzi', target: 'hanli', edgeType: 'fellow_disciple', label: '对话' },
    { id: 'r69', source: 'fanfuren', target: 'zhongnianren', edgeType: 'fellow_disciple', label: '手下' },
    { id: 'r70', source: 'fanfuren', target: 'yuntianxiao', edgeType: 'fellow_disciple', label: '一同商议' },


    // 家庭关系
    { id: 'r71', source: 'wusemenzhu', target: 'moyuzhu', edgeType: 'family', label: '夫妻' },
    { id: 'r72', source: 'moyuzhu', target: 'mofengwu', edgeType: 'family', label: '姐妹' },
    { id: 'r73', source: 'fengxingzhongnianren', target: 'meining', edgeType: 'family', label: '欲娶' },
    { id: 'r74', source: 'wensiyue', target: 'tianqiner', edgeType: 'family', label: '母亲' },

    // 敌对关系
    { id: 'r75', source: 'mengshanwuyou', target: 'mengmiannvzi', edgeType: 'enemy', label: '擒获' },
    { id: 'r76', source: 'hanli', target: 'mengmiannvzi', edgeType: 'enemy', label: '施加禁制' },
    { id: 'r77', source: 'mengsansiyou', target: 'wangzongguan', edgeType: 'enemy', label: '审问' },
    { id: 'r78', source: 'tianzhong', target: 'fengbing', edgeType: 'enemy', label: '对战' },
    { id: 'r79', source: 'bingfeng', target: 'hanli', edgeType: 'enemy', label: '对战' },
    { id: 'r80', source: 'dieryuanying', target: 'hanli', edgeType: 'enemy', label: '激战' },
    { id: 'r81', source: 'fenglaoguai', target: 'hanli', edgeType: 'enemy', label: '追杀' },

    // 傀儡/分身关系
    { id: 'r82', source: 'lexingnvzi', target: 'qingkongque', edgeType: 'puppet', label: '操控' }
  )

  // 组织归属关系 (o前缀)
  edges.push(
    { id: 'o1', source: 'hanli', target: 'qixuanmen', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o2', source: 'hanli', target: 'huangfenggu', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o3', source: 'hanli', target: 'luoyunzong', edgeType: 'belongs_to', label: '长老' },
    { id: 'o4', source: 'zhangtie', target: 'qixuanmen', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o5', source: 'lifeyu', target: 'qixuanmen', edgeType: 'belongs_to', label: '护法' },
    { id: 'o6', source: 'modaifu', target: 'qixuanmen', edgeType: 'belongs_to', label: '长老' },
    { id: 'o7', source: 'sanshu', target: 'qixuanmen', edgeType: 'belongs_to', label: '外门弟子' },
    { id: 'o8', source: 'lishizu', target: 'huangfenggu', edgeType: 'belongs_to', label: '长老' },
    { id: 'o9', source: 'ni_shang_xian_zi', target: 'yanyuezong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o10', source: 'dongxuaner', target: 'hehuanzong', edgeType: 'belongs_to', label: '弃徒' },
    { id: 'o11', source: 'hanyunzhi', target: 'yulingzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o12', source: 'liuxingnvzi', target: 'yulingzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o13', source: 'dongmentu', target: 'yulingzong', edgeType: 'belongs_to', label: '大长老' },
    { id: 'o14', source: 'wuxinglingying', target: 'yulingzong', edgeType: 'belongs_to', label: '元婴初期修士' },
    { id: 'o15', source: 'yujun', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o16', source: 'rushengzhongnianren', target: 'luoyunzong', edgeType: 'belongs_to', label: '结丹中期修士' },
    { id: 'o17', source: 'baifacangcanglaozhe', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o18', source: 'nv_de', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o19', source: 'dudong', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o20', source: 'sunhuo', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o21', source: 'yinfalaozhe', target: 'luoyunzong', edgeType: 'belongs_to', label: '长老' },
    { id: 'o22', source: 'mupeiling', target: 'luoyunzong', edgeType: 'belongs_to', label: '弟子' },
    { id: 'o23', source: 'lulou', target: 'luoyunzong', edgeType: 'belongs_to', label: '长老' },
    { id: 'o24', source: 'guilingmenshaozhu', target: 'guilingmen', edgeType: 'belongs_to', label: '少主' },
    { id: 'o25', source: 'wentianren', target: 'guilingmen', edgeType: 'belongs_to', label: '六道传人' },
    { id: 'o26', source: 'wuyihanzi', target: 'guilingmen', edgeType: 'belongs_to', label: '修士' },
    { id: 'o27', source: 'fengyunyoucunzisanjiufuren', target: 'guilingmen', edgeType: 'belongs_to', label: '修士' },
    { id: 'o28', source: 'hunshenyindejinyishusheng', target: 'guilingmen', edgeType: 'belongs_to', label: '修士' },
    { id: 'o29', source: 'zhonglaozhe', target: 'guilingmen', edgeType: 'belongs_to', label: '长老' },
    { id: 'o30', source: 'wusedenvziguangying', target: 'xiaojigong', edgeType: 'belongs_to', label: '创建者' },
    { id: 'o31', source: 'hanlishangren', target: 'xiaojigong', edgeType: 'belongs_to', label: '高阶修士' },
    { id: 'o32', source: 'lexingnvzi', target: 'mulanren', edgeType: 'belongs_to', label: '女上师' },
    { id: 'o33', source: 'fengbing', target: 'mulanren', edgeType: 'belongs_to', label: '修士' },
    { id: 'o34', source: 'sunergou', target: 'sipingbang', edgeType: 'belongs_to', label: '协助管理' },
    { id: 'o35', source: 'wusemenzhu', target: 'wusemen', edgeType: 'belongs_to', label: '门主' },
    { id: 'o36', source: 'moyuzhu', target: 'wusemen', edgeType: 'belongs_to', label: '相关' },
    { id: 'o37', source: 'lingyuling', target: 'xinggong', edgeType: 'belongs_to', label: '长老' },
    { id: 'o38', source: 'fanfuren', target: 'miaoyinmen', edgeType: 'belongs_to', label: '修士' },
    { id: 'o39', source: 'yuntianxiao', target: 'miaoyinmen', edgeType: 'belongs_to', label: '修士' },
    { id: 'o40', source: 'dongxuaner', target: 'hehuanzong', edgeType: 'belongs_to', label: '弃徒' },
    { id: 'o41', source: 'pangzi', target: 'hehuanzong', edgeType: 'belongs_to', label: '来自' },
    { id: 'o42', source: 'feichashuangmo', target: 'hehuanzong', edgeType: 'belongs_to', label: '双修伴侣' },
    { id: 'o43', source: 'dayanshenjun', target: 'dayanzong', edgeType: 'belongs_to', label: '传承者' },
    { id: 'o44', source: 'bingfeng', target: 'bingfengzu', edgeType: 'belongs_to', label: '成员' }
  )

  // 地点关系 (l前缀)
  // 位于关系
  edges.push(
    { id: 'l1', source: 'qixuanmen', target: 'caixiashan', edgeType: 'located_at', label: '宗门所在' },
    { id: 'l2', source: 'caixiashan', target: 'jingzhou', edgeType: 'located_at', label: '位于' },
    { id: 'l3', source: 'jingzhou', target: 'yueguo', edgeType: 'located_at', label: '位于' },
    { id: 'l4', source: 'huangfenggu', target: 'yueguo', edgeType: 'located_at', label: '位于' },
    { id: 'l5', source: 'jiayuancheng', target: 'lanzhou', edgeType: 'located_at', label: '位于' },
    { id: 'l6', source: 'lanzhou', target: 'yueguo', edgeType: 'located_at', label: '位于' },
    { id: 'l7', source: 'luoyunzong', target: 'tianquanfeng', edgeType: 'located_at', label: '位于' },
    { id: 'l8', source: 'xinggong', target: 'luanxinghai', edgeType: 'located_at', label: '位于' },
    { id: 'l9', source: 'tianxingcheng', target: 'luanxinghai', edgeType: 'located_at', label: '位于' }
  )

  // 出生/居住地关系
  edges.push(
    { id: 'l10', source: 'hanli', target: 'qingniuzhen', edgeType: 'birthplace', label: '出生地' },
    { id: 'l11', source: 'hanli', target: 'shenshougu', edgeType: 'residence', label: '修炼地' },
    { id: 'l12', source: 'hanli', target: 'tianquanfeng', edgeType: 'residence', label: '修炼地' },
    { id: 'l13', source: 'modaifu', target: 'shenshougu', edgeType: 'residence', label: '居所' }
  )

  // 物品拥有关系 (i前缀)
  edges.push(
    { id: 'i1', source: 'hanli', target: 'jingjingping', edgeType: 'owns', label: '拥有' },
    { id: 'i2', source: 'hanli', target: 'zhujidan', edgeType: 'owns', label: '拥有' },
    { id: 'i3', source: 'hanli', target: 'qingzhufengyunjian', edgeType: 'owns', label: '炼制使用' },
    { id: 'i4', source: 'hanli', target: 'xutianding', edgeType: 'owns', label: '获得' },
    { id: 'i5', source: 'hanli', target: 'tianleizhu', edgeType: 'owns', label: '收集' },
    { id: 'i6', source: 'hanli', target: 'gengjing', edgeType: 'owns', label: '寻找' },
    { id: 'i7', source: 'hanli', target: 'danuoyiling', edgeType: 'owns', label: '拥有' },
    { id: 'i8', source: 'lushixiong', target: 'qingjiaoqi', edgeType: 'owns', label: '使用' },
    { id: 'i9', source: 'hanli', target: 'jingganghuan', edgeType: 'owns', label: '早期使用' },
    { id: 'i10', source: 'manhuzi', target: 'huanglinjia', edgeType: 'owns', label: '穿戴' }
  )

  // 技能学习关系 (s前缀)
  edges.push(
    { id: 's1', source: 'hanli', target: 'changchun', edgeType: 'learned', label: '修炼' },
    { id: 's2', source: 'hanli', target: 'dayanjue', edgeType: 'learned', label: '修炼' },
    { id: 's3', source: 'hanli', target: 'xuanmuiyingdafa', edgeType: 'learned', label: '修炼' },
    { id: 's4', source: 'hanli', target: 'dagengjianzhen', edgeType: 'learned', label: '掌握' },
    { id: 's5', source: 'hanli', target: 'mingwangjue', edgeType: 'learned', label: '修炼' },
    { id: 's6', source: 'hanli', target: 'pizhixianlei', edgeType: 'learned', label: '掌握' },
    { id: 's7', source: 'zhangtie', target: 'xiangjiagong', edgeType: 'learned', label: '修炼' },
    { id: 's8', source: 'hanli', target: 'yishu', edgeType: 'learned', label: '学习' },
    { id: 's9', source: 'hanli', target: 'lianqishu', edgeType: 'learned', label: '掌握' },
    { id: 's10', source: 'hanli', target: 'quchongshu', edgeType: 'learned', label: '参悟' }
  )

  // 事件参与关系 (e前缀)
  edges.push(
    { id: 'e1', source: 'hanli', target: 'ruqi', edgeType: 'participated', label: '参与' },
    { id: 'e2', source: 'hanli', target: 'zhujichenggong', edgeType: 'participated', label: '突破' },
    { id: 'e3', source: 'hanli', target: 'jiedanchenggong', edgeType: 'participated', label: '突破' },
    { id: 'e4', source: 'hanli', target: 'luanxinghailixian', edgeType: 'participated', label: '历险' },
    { id: 'e5', source: 'hanli', target: 'yuanyingchenggong', edgeType: 'participated', label: '突破' },
    { id: 'e6', source: 'hanli', target: 'jihuafieshenglj', edgeType: 'participated', label: '筹备' },
    { id: 'e7', source: 'zhangtie', target: 'ruqi', edgeType: 'participated', label: '参与' },
    { id: 'e8', source: 'lifeyu', target: 'ruqi', edgeType: 'participated', label: '参与' }
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
    (node.label && node.label.toLowerCase().includes(lowerKeyword)) ||
    (node.properties?.description && node.properties.description.toLowerCase().includes(lowerKeyword))
  )
}
