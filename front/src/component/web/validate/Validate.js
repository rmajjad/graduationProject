import * as yup from 'yup';
export const validationSchema = yup.object({
    userName:yup.string().required("UserName is reqired").min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(7,"must be at least 7 char").max(20,"must be at most 20 char"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is Not Match"),
  })
  export const loginSchema = yup.object({
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 7 char").max(15,"must be at most 20 char"),
  })
  export const sendcodeSchema = yup.object({
    email:yup.string().required("Email is reqired"),
  })
  export const forgetpasswordSchema = yup.object({
    code:yup.string().required("code is reqired").length(4,'must be 4 char '),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(7,"must be at least 7 char").max(20,"must be at most 20 char"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is Not Match"),
  })
  export const validationOrderSchema = yup.object({
    address:yup.string().required("address is reqired"),
    phone: yup.string().required('Phone number is required').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Please enter a valid phone number')
  })
  export const reviewSchema = yup.object({
    comment:yup.string().required("comment is reqired").min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    rating:yup.number().required("rating is required").min(1,"must be at least 1 ").max(5,"must be at most 5"),
  })