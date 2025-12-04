import * as Yup from 'yup';

export const passwordSchema = Yup.object({
	password: Yup.string().min(8).max(24).required(),
	newPassword: Yup.string().min(8).max(24).required(),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required(),
});
