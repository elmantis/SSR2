import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import TextInput from "../../components/Input";

type CreateUserFormProps = {
  initialValues: {
    name: string;
    zipCode: number;
  };
  onSubmit: (data: { name: string; zipCode: number }) => void;
};

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .required(),
  zipCode: yup.number().positive().integer().required(),
});

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        register={register}
        errors={errors}
        name="name"
        fieldLabel="Full Name"
      />
      <TextInput
        register={register}
        errors={errors}
        name="zipCode"
        fieldLabel="Zip Code"
      />

      <button type="submit">Sign up</button>
    </form>
  );
};

export default CreateUserForm;
