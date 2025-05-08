import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../ui/Input";
import { REGISTER_FORM } from "../data";
import InputErrorMessage from "../ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { scemaRegister } from "../Validation";
import axiosinstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import Button from "../ui/Button";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loding, setLodin] = useState(false);
  interface IFormInput {
    username: string;
    password: string;
    email: string;
  }
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(scemaRegister),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLodin(true);
    try {
      const res = await axiosinstance.post("/auth/local/register", data);
      console.log(res);

      toast.success("Successfully created!");
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      console.log(error);

      const errorObj = error as AxiosError<IErrorResponse>;
      // console.log(error);
      toast.error(`${errorObj.response?.data.error.message}`, {});
    } finally {
      setLodin(false);
    }

    console.log(data);
  };

  console.log(errors);

  //render//
  const RegisterInputs = REGISTER_FORM.map(
    ({ name, type, placeholder, validation }, index) => {
      return (
        <div key={index}>
          <Input
            placeholder={placeholder}
            {...register(name, validation)}
            type={type}
          />
          {errors[name]?.message && (
            <InputErrorMessage msg={errors[name].message} />
          )}
        </div>
      );
    }
  );
  //
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  justify-center items-center h-[350px]  gap-5"
      >
        {RegisterInputs}

        <Button
          fullWidth
          className="border-2 outline-none w-md px-2 py-2 "
          loding={loding}
        >
          register
        </Button>
      </form>
    </div>
  );
};

export default Register;
