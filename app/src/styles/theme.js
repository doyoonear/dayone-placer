export const theme = {
  primary2: '#EAEEFB',
  primary4: '#DFE3EF',
  primary6: '#839DFB',
  primary8: '#6988FA',
  primary10: '#5449D2',
};

export const handleGridColor = (type) => {
  switch (type) {
    case 'WINDOW_1' || 'WINDOW':
      return 'lightblue';
    case 'DESK':
      return 'lightpink';
    case 'MEMBER':
      return 'tomato';
    default:
      return 'white';
  }
};
