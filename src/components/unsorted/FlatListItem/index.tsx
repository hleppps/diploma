import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import DomainIcon from '@mui/icons-material/Domain';
import { Box, Icon, ListItem, Typography } from '@mui/material';
import { FC } from 'react';
import { Flat } from 'types/global';
export interface FlatListItemProps {
  flat: Flat;
}

export const FlatListItem: FC<FlatListItemProps> = ({ flat }) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 0,
        border: '1px solid lightgrey',
      }}
    >
      <Box
        component="img"
        src={flat.previewImage}
        sx={{ width: '300px', maxWidth: '35%' }}
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', p: '16px', gap: '8px' }}
      >
        <Typography
          sx={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' }}
        >
          {flat.rentPrice} грн
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>
          {flat.address.streetAddress}
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', mt: '8px' }}>
          <BedroomParentIcon sx={{ color: 'grey' }} />
          <Typography>{flat.rooms} кімнатa(-и)</Typography>
        </Box>
      </Box>
    </ListItem>
  );
};
