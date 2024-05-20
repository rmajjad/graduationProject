import * as yup from 'yup';
export const validationSchema = yup.object({
    userName:yup.string().required("UserName is reqired").min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })
  export const loginSchema = yup.object({
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })
  export const sendcodeSchema = yup.object({
    email:yup.string().required("Email is reqired"),
  })
  export const forgetpasswordSchema = yup.object({
    code:yup.string().required("code is reqired").length(4,'must be 4 char '),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })
  export const validationOrderSchema = yup.object({
    couponName:yup.string().min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    address:yup.string().required("address is reqired"),
    phone: yup.string().required('Phone number is required').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Please enter a valid phone number')
  })
  export const reviewSchema = yup.object({
    comment:yup.string().required("comment is reqired").min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    rating:yup.string().required("rating is required").min(1,"must be at least 1 char").max(5,"must be at most 30 char"),
  })