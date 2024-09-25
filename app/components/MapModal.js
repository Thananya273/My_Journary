"use client";
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function MapModal({ open, onClose, googleMapUrl }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={{ p: 0 }}>
        <IconButton 
          onClick={onClose} 
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <iframe
          src={googleMapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen = ""
          loading="lazy"
        />
      </DialogContent>
    </Dialog>
  );
}
