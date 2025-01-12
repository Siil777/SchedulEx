import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons({onClick}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
      style={{fontSize:'24px'}} 
      color="secondary" 
      onClick={onClick}
      
      >Save</Button>
    </Stack>
  );
}