import { Box, Divider, List, Typography } from '@mui/material';
import { FC } from 'react';
import { Flat } from 'types/global';

import { FlatListItem } from '../FlatListItem';

export interface FlatsListProps {
  flats: Flat[];
  closeRangeFlats: Flat[];
}

export const FlatsList: FC<FlatsListProps> = ({ flats, closeRangeFlats }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: '100%',
      }}
    >
      {!flats.length && !closeRangeFlats.length && (
        <Typography sx={{ mt: '16px', fontSize: '20px', fontWeight: 'bold' }}>
          По заданим фільтрам об&apos;єкти нерухомості не знайдені!
        </Typography>
      )}

      {!!flats.length && (
        <>
          <Typography sx={{ mt: '16px', fontSize: '20px', fontWeight: 'bold' }}>
            Знайдені об&apos;єкти нерухомості:
          </Typography>
          <List
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              // overflowY: 'scroll',
              mt: '16px',
              p: 0,
            }}
          >
            {flats.map((flat) => (
              <FlatListItem key={flat.id} flat={flat} />
            ))}
          </List>
          {!!closeRangeFlats.length && <Divider sx={{ mb: '8px' }} />}
        </>
      )}
      {!!closeRangeFlats.length && (
        <>
          <Typography sx={{ mt: '16px', fontSize: '20px', fontWeight: 'bold' }}>
            Об&apos;єкти нерухомості поруч:
          </Typography>
          <List
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              // overflowY: 'scroll',
              mt: '16px',
              p: 0,
            }}
          >
            {closeRangeFlats.map((flat) => (
              <FlatListItem key={flat.id} flat={flat} />
            ))}
          </List>
        </>
      )}
    </Box>
  );
};
