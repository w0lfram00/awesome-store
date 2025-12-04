import { EmailService } from '@/services/Email.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
