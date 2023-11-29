import * as yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 5 characters,1 upper case letter,1 lowercase letter,1 numeric digit

export const basicSchema = yup.object().shape({
  petName: yup.string().required("This field is required"),
  petAge: yup.number().positive().integer().required("This field is required"),
  // category: yup.string().required("This field is required"),
  petAddress: yup.string().required("This field is required"),
  shortDes: yup.string().required("This field is required"),
  longDes: yup.string().required("This field is required"),
});
// password: yup
//   .string()
//   .min(6)
//   .matches(passwordRules, { message: "Please create a stronger password" })
//   .required("Required"),
