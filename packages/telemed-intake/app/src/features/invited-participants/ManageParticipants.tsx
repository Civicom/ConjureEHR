import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { useGetVideoChatInvites } from '../waiting-room';
import { InviteParticipantForm } from './InviteParticipantForm';
import { InvitedParticipantList } from './InvitedParticipantList';
import { useZapEHRAPIClient } from 'src/utils';
import { useAppointmentStore } from '../appointments';

interface ManageParticipantsProps {
  onClose?: () => void;
}

export const ManageParticipants: FC<ManageParticipantsProps> = ({ onClose }) => {
  const { appointmentID } = useAppointmentStore();
  console.log('appointmentID', appointmentID);
  const apiClient = useZapEHRAPIClient();
  console.log('apiClient', apiClient);
  const { data: invitesData, isLoading, isFetching } = useGetVideoChatInvites();
  const invitedParticipants = invitesData?.invites ?? [];

  return isLoading || isFetching ? (
    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
      <CircularProgress />
    </Box>
  ) : invitedParticipants.length > 0 ? (
    <InvitedParticipantList items={invitedParticipants} onInviteCancelled={() => onClose?.()} />
  ) : (
    <InviteParticipantForm isGetInvitesFetching={isFetching} onInviteSuccess={() => onClose?.()} onBack={onClose} />
  );
};
