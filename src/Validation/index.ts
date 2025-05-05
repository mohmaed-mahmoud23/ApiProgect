import * as yup from "yup"
export const scemaRegister = yup
  .object({
    username: yup.string().required("user name requierd").min(5, "user name min 5"),
  password: yup.string().required("passwors is requaierd").min(5,"pasword must 5"),
  email: yup.string().required("email is requaierd").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"email not valid")
  })
  .required()




  export const Loginscema = yup
  .object({
  password: yup.string().required("passwors is requaierd").min(5,"pasword must 5"),
  identifier: yup.string().required("email is requaierd").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"email not valid")
  })
  .required()