import { selectors, classes } from '../lib/constants';

/** Adds placeholders for pieces in their original square when you are dragging them */
function piecePlaceholders({ records, observer }) {
  const chessboard = document.querySelector(selectors.chessboard);
  const dragging = 'chess_com_dragging';
  if (!chessboard) {
    observer.disconnect();
    return;
  }
  observer.observe(chessboard, {
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
  });

  if (records.length > 0) {
    records.forEach((record) => {
      const node = record.target;
      if (node.classList.contains(dragging)) {
        const placeholderNode = node.cloneNode();
        placeholderNode.classList.add(classes.placeholder);
        placeholderNode.style.opacity = 0.3;
        // Insert placeholder after original piece
        node.parentNode.insertBefore(placeholderNode, node.nextSibling);
      } else if (typeof record.oldValue === 'string' && record.oldValue.indexOf(dragging) >= 0) {
        const placeholderNode = record.target.parentNode.querySelector(selectors.placeholder);

        if (placeholderNode) {
          placeholderNode.remove();
        }
      }
    });
  }
}

export default {
  fn: piecePlaceholders,
  withObserver: true,
  settings: {
    id: 'piece-placeholders',
    name: 'Piece placeholders',
    description: 'Show a transparent piece placeholder for the current piece being dragged',
  },
};
