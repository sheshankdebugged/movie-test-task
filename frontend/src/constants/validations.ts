import * as Yup from 'yup';


export const signUpValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});


export const validationMovieDetails = Yup.object().shape({
  movie_title: Yup.string().required('Movie title is required'),
  publish_year: Yup
    .string()
    .matches(/^\d{4}$/, 'Publish year must be a valid 4-digit year')
    .required('Publish year is required'),
  movie_link: Yup.string().url('Movie image must be a valid URL').required('Movie image is required'),
});