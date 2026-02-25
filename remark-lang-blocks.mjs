import { visit } from 'unist-util-visit';

export default function remarkLangBlocks() {
  return (tree) => {
    const newChildren = [];
    let currentLang = null;
    let langChildren = [];

    for (const node of tree.children) {
      if (node.type === 'paragraph' && node.children?.length === 1 && node.children[0].type === 'text') {
        const text = node.children[0].value.trim();
        if (text === ':::lang-en' || text === ':::lang-zh') {
          if (currentLang && langChildren.length > 0) {
            newChildren.push({
              type: 'html',
              value: `<div class="lang-${currentLang}">`,
            });
            newChildren.push(...langChildren);
            newChildren.push({ type: 'html', value: '</div>' });
          }
          currentLang = text === ':::lang-en' ? 'en' : 'zh';
          langChildren = [];
          continue;
        }
        if (text === ':::') {
          if (currentLang && langChildren.length > 0) {
            newChildren.push({
              type: 'html',
              value: `<div class="lang-${currentLang}">`,
            });
            newChildren.push(...langChildren);
            newChildren.push({ type: 'html', value: '</div>' });
          }
          currentLang = null;
          langChildren = [];
          continue;
        }
      }

      if (currentLang) {
        langChildren.push(node);
      } else {
        newChildren.push(node);
      }
    }

    // Flush remaining
    if (currentLang && langChildren.length > 0) {
      newChildren.push({
        type: 'html',
        value: `<div class="lang-${currentLang}">`,
      });
      newChildren.push(...langChildren);
      newChildren.push({ type: 'html', value: '</div>' });
    }

    tree.children = newChildren;
  };
}
