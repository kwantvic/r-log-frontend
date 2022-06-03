import React from "react";
import {TextField} from "@material-ui/core";
import {useFormContext} from "react-hook-form";

interface IFormFieldProps {
	name: string,
	label: string
}

const FormField: React.FC<IFormFieldProps> = ({name, label}) => {
	const {register, formState} = useFormContext();

	return (
		<TextField
			{...register(name)}
			className="mb-20" size="small"
			label={label}
			type={name === "password" ? name : ""}
			variant="outlined"
			helperText={formState.errors[name]?.message}
			error={!!formState.errors[name]?.message}
			fullWidth
			required
		/>
	);
};

export default FormField;