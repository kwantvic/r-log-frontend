import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
	email: yup.string().email("Wrong email!").required("Mail is required!"),
	password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required!")
});