// eslint-disable-next-line import/prefer-default-export
export const messageTypes = {
  showPage: 'showPage',
};

export const classes = {
  placeholder: 'refined-chess-placeholder',
};

export const selectors = {
  usernames: '#sidebar .username',
  gameResult: '.game-info-item[ng-bind="vm.model.game.result_message"]',
  playerDetails: '.about-player',
  chessboard: '.chessboard',
  placeholder: `.${classes.placeholder}`,
};

export const regexes = {
  winner: /(.*) won /,
  yourMove: /^(YOUR MOVE)|(_{3,})/,
};
