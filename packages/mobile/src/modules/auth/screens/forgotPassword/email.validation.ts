import * as Yup from 'yup';

export const emailSchema = Yup.object({
	email: Yup.string().email().required(),
});
