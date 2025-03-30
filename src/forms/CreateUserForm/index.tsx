import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import TextInput from "../../components/Input";

type CreateUserFormProps = {
  initialValues: {
    name: string;
    zipCode: number;
    latitude?: string;
    longitude?: string;
  };
  onSubmit: (data: { name: string; zipCode: number }) => void;
  coordinateValues: {
    latitude?: string;
    longitude?: string;
  };
};

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .required(),
  zipCode: yup.number().positive().integer().required(),
  latitude: yup.string(),
  longitude: yup.string(),
});

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  initialValues,
  coordinateValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (coordinateValues.latitude || coordinateValues.longitude) {
    setValue("latitude", coordinateValues.latitude);
    setValue("longitude", coordinateValues.longitude);
  }

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
      <TextInput
        register={register}
        errors={errors}
        name="longitude"
        fieldLabel="Longitude"
      />
      <TextInput
        register={register}
        errors={errors}
        name="latitude"
        fieldLabel="latitude"
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
