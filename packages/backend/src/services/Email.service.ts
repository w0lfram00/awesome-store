import { Injectable } from '@nestjs/common';
import createHttpError from 'http-errors';
import sgMail from '@sendgrid/mail';
import { sendMailOptions } from '@/interfaces/mail.js';
import { getEnv } from '@/utils/getEnv';

@Injectable()
export class EmailService {
	constructor() {
		sgMail.setApiKey(getEnv('SENDGRID_API_KEY'));
	}

	async sendMail({
		to,
		subject,
		html,
		text,
		from = getEnv('EMAIL_SENDER'),
	}: sendMailOptions) {
		try {
			return await sgMail.send({ to, from, subject, html, text });
		} catch (error) {
			throw createHttpError(500, 'Failed to send a mail.\n' + error);
		}
	}
}
