import * as Yup from 'yup';

export const registerSchema = Yup.object({
	email: Yup.string().email().required(),
	name: Yup.string().min(3).max(32).required(),
	phone: Yup.string().required(),
	address: Yup.string().min(10).required(),
	password: Yup.string().min(8).max(24).required(),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required(),
});
