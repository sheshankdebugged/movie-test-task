'use client'
import React, { useEffect, useState } from 'react';
import { getData, putData } from '@/services/apiServices';
import { deleteImageFromS3, uploadImageToS3 } from '@/services/helpers';
import ButtonComponent from '@/shared/buttonComp';
import CancelBtn from '@/shared/cancelBtn';
import InputField from '@/shared/inputField';
import SkeletonLoadingView from '@/shared/skeletonImageLoading';
import { useParams, useRouter } from 'next/navigation';
import InputFieldFile from '@/shared/inputFieldFile';
import PreviewImage from '@/shared/previewImage';
import { Form, Formik } from 'formik';
import { validationMovieDetails } from '@/constants/validations';
import { AddMovieType } from '@/types/common';
import { toast } from 'react-toastify';

const EditMovie: React.FC = () => {
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(false);
  const [movieData, setMovieData] = useState({
    publish_year: '',
    movie_title: '',
    movie_link: '',
  });
  const [previewImg, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    publish_year:'',
    movie_title: '',
    movie_link: '',
  }

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    getMovieDetail()
  }, [])

  // Get Movie deatils by Id
  const getMovieDetail = async () => {
    try {
      const result = await getData(`/api/getmovie/${params.id}`);
      if (result.data.success === true) {
        console.log('result', result.data.data)
        const initialValues = {
          movie_title: result.data.data.movie_title,
          publish_year: result.data.data.publish_year,
          movie_link: result.data.data.movie_link
        }
        setMovieData(initialValues)
        setPreviewImage(result.data.data.movie_link)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // handle upload file to S3
  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    setSkeletonLoading(true)
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageS3Url = await uploadImageToS3(file)
      setPreviewImage(imageS3Url)
      setSkeletonLoading(false)
      setFieldValue('movie_link', imageS3Url)
    }
    setSkeletonLoading(false)
  }


  // Handle Delete Image from S3
  const handleDeleteImage = async (setFieldValue: any) => {
    const result = await deleteImageFromS3(previewImg);
    if (result) {
      setPreviewImage('')
      setFieldValue('movie_link', '')
    }
  }

  // Handle Submit updated data
  const handleSubmit = async (values: AddMovieType, setSubmitting: (arg: boolean) => void) => {
    setLoading(true)
    setSubmitting(true)
    if (!previewImg || !movieData.publish_year || !movieData.movie_title) {
      toast.info('Please Fill all details')
      setLoading(false)
      return false
    }
    try {
      const result = await putData(`/api/editmovie/${params.id}`, values);
      if (result.data.success === true) {
        toast.success(result.data.message)
        setLoading(false)
        router.push('/')
      }
    } catch (error) {
      setLoading(false)
      console.log('err', error)
    }
    setLoading(false)
    setSubmitting(false)
  }

  // Handle Cancel 
  const handleCancel = () => {
    router.push('/')
  }


  return (
    <>
      <div className="h-screen flex max-w-1440 m-auto flex-col">
        <div>
          <h1 className="text-white text-6xl font-semibold mt-24 mb-24">
            Edit Movie
          </h1>
        </div>
        <div>
          <Formik
            initialValues={movieData || initialValues}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting)
              console.log('values', values)
              setSubmitting(false)
            }}
            validationSchema={validationMovieDetails}
          >
            {({ isSubmitting, resetForm, setFieldValue }) => (
              <Form
                className="space-y-4 flex flex-col w-full text-sm items-center"
              >
                <div className="flex flex-row justify-between gap-40">
                  {skeletonLoading ? <SkeletonLoadingView /> :
                    <div>
                      {!previewImg ? (
                        <>
                          <InputFieldFile
                            handleUploadFile={handleUploadFile}
                            type="file"
                            name="movie_link"
                            classes=""
                            setFieldValue={setFieldValue}
                          />
                        </>
                      )
                        :
                        <PreviewImage
                          previewImg={previewImg}
                          handleDeleteImage={handleDeleteImage}
                          setFieldValue={setFieldValue}
                        />
                      }
                    </div>
                  }
                  <div className="flex flex-col">
                    <div className="mb-5 mt-5">
                      <InputField
                        name="movie_title"
                        type="text"
                        placeholder="Title"
                        classes=""
                        errorMessage="Please add title"
                      />
                    </div>
                    <div>
                      <InputField
                        name="publish_year"
                        type="number"
                        placeholder="Publishing Year"
                        classes="publishYear"
                        errorMessage="Please Enter a valid Year"
                      />
                    </div>
                    <div className="buttons flex flex-row gap-2 justify-end mt-10">
                      <div className="border pt-2 pb-2 rounded cancelbtn">
                        <CancelBtn
                          handleCancel={handleCancel}
                          buttonText="Cancel"
                          type="button"
                          resetForm={resetForm}
                        />
                      </div>
                      <div className="pt-2 pb-2 rounded bg-emerald-400 submitbtn">
                        <ButtonComponent
                          loading={loading}
                          type="submit"
                          buttonName="Submit"
                          btnclass="text-base text-bold text-white rounded "
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
