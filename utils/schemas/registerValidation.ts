import * as yup from "yup";
import {loginFormSchema} from "./loginValidation";

export const registerFormSchema = yup.object().shape({
	fullName: yup.string().required("Имя и фамилия обязательны!"),
}).concat(loginFormSchema);