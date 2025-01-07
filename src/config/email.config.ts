import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const emailConfig = (configService: ConfigService) => ({
  transport: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: 'athlinkteam@gmail.com',
      pass: 'prdg pwkr acxc ywqt',
    },
  },
  defaults: {},
  template: {
    dir: join(__dirname + './../templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  inject: [ConfigService],
});
