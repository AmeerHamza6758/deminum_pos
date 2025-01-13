export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Role {
  Admin = 'admin',
  User = 'user',
  SuperAdmin = 'superadmin',
}

export const QueueNames = {
  EMAIL_QUEUE: 'email-queue',

  NOTIFICATIONS_QUEUE: 'notifications-queue',
};


export const EmailTemplates = {
  RESET_PASSWORD: 'reset-password',
  CONFIRM_ACCOUNT:'user-register',
  CONFIRM_EMAIL:'confirm-email'
};