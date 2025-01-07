import { Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { MailInput } from 'src/helpers/interfaces/email.template.interface';
import { SharedService } from 'src/modules/shared/shared.service';

@Injectable()
export class GlobalProcessor {
  constructor(private readonly sharedService: SharedService) {}
  @Process('sendEmail')
  async sendEmail(job: Job<MailInput>) {
    await this.sharedService.sendEmail(job.data);
  }
}
