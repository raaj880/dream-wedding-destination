
export type NotificationType = 'new_match' | 'new_message' | 'profile_view';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  data: {
    match_id?: string;
    matched_user_id?: string;
    matched_user_name?: string;
    sender_id?: string;
    sender_name?: string;
    message_preview?: string;
    viewer_id?: string;
    viewer_name?: string;
  };
  isRead: boolean;
  createdAt: Date;
}
