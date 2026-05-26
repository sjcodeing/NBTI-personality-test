/**
 * NBTI 多皮肤配置
 * 一套框架，三套皮肤：职场/校园/恋爱
 */

const SKINS = [
  {
    id: 'workplace',
    name: '职场版',
    icon: '🏢',
    tagline: '测测你的职场人格，是卷王还是躺平大师',
    color: '#4A90D9',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'NBTI 职场人格测试',
    subtitle: '30道题，测出你的职场人设',
    resultTitle: '你的职场人格是',
    shareText: '我在测职场人格，你是卷王还是躺平大师？'
  },
  {
    id: 'campus',
    name: '校园版',
    icon: '🎓',
    tagline: '测测你的校园人设，是学霸还是摆烂王',
    color: '#F5A623',
    bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    title: 'NBTI 校园人格测试',
    subtitle: '30道题，测出你的校园人设',
    resultTitle: '你的校园人设是',
    shareText: '我在测校园人格，你是学霸还是摆烂王？'
  },
  {
    id: 'love',
    name: '恋爱版',
    icon: '💕',
    tagline: '测测你的恋爱模式，是粘人精还是独立王',
    color: '#E91E63',
    bgGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    title: 'NBTI 恋爱人格测试',
    subtitle: '30道题，测出你的恋爱模式',
    resultTitle: '你的恋爱人格是',
    shareText: '我在测恋爱人格，你是粘人精还是独立王？'
  }
];

/**
 * 获取皮肤配置
 */
function getSkin(id) {
  return SKINS.find(s => s.id === id) || SKINS[0];
}

/**
 * 获取皮肤列表
 */
function getAllSkins() {
  return SKINS;
}

/**
 * 获取默认皮肤
 */
function getDefaultSkin() {
  return SKINS[0];
}

module.exports = {
  SKINS,
  getSkin,
  getAllSkins,
  getDefaultSkin
};
