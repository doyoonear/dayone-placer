export const theme = {
  grey0: '#fafafa',
  grey2: '#ededed',
  grey4: '#bfbfbf',
  grey6: '#636363',
  grey8: '#404040',
  grey10: '#262626',
  primary2: '#EAEEFB',
  primary4: '#e6e9f2',
  primary6: '#a1b5ff',
  primary8: '#839DFB',
  primary10: '#6988FA',
  secondary2: '#fdffb5',
  secondary4: '#fbff70',
};

export const handleGridColor = (type) => {
  switch (type) {
    case 'MEMBER':
      return '#e3e1e1';
    default:
      return 'white';
  }
};
