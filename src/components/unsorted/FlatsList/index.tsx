import { List } from '@mui/material';
import { FC } from 'react';
import { Flat } from 'types/global';

import { FlatListItem } from '../FlatListItem';

export interface FlatsListProps {
  flats: Flat[];
}

export const FlatsList: FC<FlatsListProps> = ({ flats }) => {
  return (
    <List
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'scroll',
        mt: '16px',
        p: 0,
      }}
    >
      {flats.map((flat) => (
        <FlatListItem key={flat.id} flat={flat} />
      ))}
    </List>
  );
};
