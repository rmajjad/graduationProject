import * as yup from 'yup';

export const UServalidationSchema = yup.object({
  userName: yup.string().required("UserName is required").min(3, "must be at least 3 characters").max(20, "must be at most 20 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(7, "must be at least 7 characters").max(20, "must be at most 20 characters"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
});
export const updatevalidationSchema = yup.object({
  userName: yup.string().required("User Name is required").min(3, "must be at least 3 characters").max(50, "must be at most 50 characters"),
  email: yup.string().required("Email is required").email("Invalid email address"),
});
export const CategoryValidationSchema = yup.object({
  name: yup.string().required("Category Name is required") .min(3, "must be at least 3 characters").max(50, "must be at most 50 characters"),
  image: yup.mixed().required("Category Image is required"),
});
export const update_categoryvalidationSchema = yup.object().shape({
  name: yup.string().required('Category Name is required') .min(5, "must be at least 5 characters").max(50, "must be at most 50 characters"),
  status: yup.string().required('Category Status is required'),
  image: yup.mixed().notRequired(),
});
export const product_validationSchema = yup.object({
  name: yup.string().required("Product Name Required").min(5, "must be at least 5 characters").max(50, "must be at most 50 characters"),
  categoryId: yup.string().required("CategoryId Required"),
  price: yup.number().required("Price Required").min(1, "must be at least $1"),
  discount: yup.number().required("Discount Required"),
  description: yup.string().notRequired(),
  mainImage: yup.mixed().required("MainImage Required"),
  subImages: yup.array().required("SubImages Required"),
});
export const updateProduct_validationSchema =  yup.object({
  name: yup.string().required('Product Name Required').min(5, "must be at least 5 characters").max(50, "must be at most 50 characters"),
  status: yup.string().required('status Required').min(5, "must be at least 5 characters").max(20, "must be at most 20 characters"),
  stock: yup.number().required('stock Required').min(1, "must be at least 1 stock"),
  price: yup.number().required('price Required').min(1, "must be at least $1"),
  description: yup.string().notRequired(),
  mainImage: yup.mixed().notRequired(),
  subImages:  yup.array().notRequired(),
});


