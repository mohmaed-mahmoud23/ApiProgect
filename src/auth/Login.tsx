import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loginform } from "../data";
import Input from "../ui/Input";
import InputErrorMessage from "../ui/InputErrorMessage";
import axiosinstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useState } from "react";
import Button from "../ui/Button";
import { Loginscema } from "../Validation";

interface Ilogin {
  identifier: string;
  password: string;
}

const Login = () => {
  const [loding, setLodin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilogin>({
    resolver: yupResolver(Loginscema),
  });

  //Fetch//

  const onSubmit: SubmitHandler<Ilogin> = async (data) => {
    setLodin(true);
    try {
      const res = await axiosinstance.post("/auth/local/", data);
      console.log(res);

      toast.success("Successfully created!");

      setTimeout(() => {
        location.replace("/");
      }, 2000);

      localStorage.setItem("logedn", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);

      const errorObj = error as AxiosError<IErrorResponse>;
      // console.log(error);
      toast.error(`${errorObj.response?.data.error.message}`);
    } finally {
      setLodin(false);
    }

    console.log(data);
  };
  //
  //render login
  const Logininput = Loginform.map(
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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  justify-center items-center h-[350px]  gap-5"
      >
        {Logininput}

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

export default Login;
