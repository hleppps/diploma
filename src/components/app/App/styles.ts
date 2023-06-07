import { SxStyles } from 'types/styles';

export const styles: SxStyles = {
  container: {
    height: '100vh',
    overflow: 'none',
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
  },

  mapSection: {
    height: '100vh',
  },

  filtersSection: {
    p: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};
