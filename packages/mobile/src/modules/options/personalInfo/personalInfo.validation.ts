import * as Yup from 'yup';

export const personalInfoSchema = Yup.object({
	name: Yup.string().min(3).max(32).required(),
	phone: Yup.string().required(),
	address: Yup.string().min(10).required(),
});
