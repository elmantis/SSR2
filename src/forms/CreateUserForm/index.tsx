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
    timeZone?: string;
  };
  onSubmit: (data: { name: string; zipCode: number }) => void;
  userLocation: {
    latitude?: string;
    longitude?: string;
    timeZone?: string;
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
  timeZone: yup.string(),
});

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  initialValues,
  userLocation,
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

  if (userLocation.latitude || userLocation.longitude) {
    setValue("latitude", userLocation.latitude);
    setValue("longitude", userLocation.longitude);
    setValue("timeZone", userLocation.timeZone);
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
      <TextInput
        register={register}
        errors={errors}
        name="timeZone"
        fieldLabel="Time Zone"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateUserForm;
