"use client";
import React, { useState } from "react";
import { AddMovieTypeSubmit } from "@/types/common";
import { deleteImageFromS3, uploadImageToS3 } from "@/services/helpers";
import { useApp } from "@/hooks/useApp";
import { useRouter } from "next/navigation";
import InputField from "@/shared/inputField";
import ButtonComponent from "@/shared/buttonComp";
import CancelBtn from "@/shared/cancelBtn";
import SkeletonLoadingView from "@/shared/skeletonImageLoading";
import InputFieldFile from "@/shared/inputFieldFile";
import PreviewImage from "@/shared/previewImage";
import { Formik, Form } from 'formik';
import { validationMovieDetails } from "@/constants/validations";
import { toast } from "react-toastify";

const AddNewMovieForm: React.FC = () => {
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(false);
  const [previewImg, setPreviewImage] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false)

  const router = useRouter();
  const initialValues = { movie_title: "", publish_year: "", movie_link: "" }

  const { handleAddMovie, loading } = useApp();

  // handle change
  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    setSkeletonLoading(true)
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageS3Url = await uploadImageToS3(file);
      setPreviewImage(imageS3Url);
      setFieldValue('movie_link', imageS3Url)
      setSkeletonLoading(false)
    }
    setSkeletonLoading(false)
  };

  // Handle Delete Image
  const handleDeleteImage = async (setFieldValue: any) => {
    setDeleteLoading(true)
    const result = await deleteImageFromS3(previewImg);
    if (result) {
      setPreviewImage("");
      setFieldValue('movie_link', '')
      toast.success("Image Deleted Successfully")
    }
    setDeleteLoading(false)
  };

  // handle Submit The add movie data
  const handleSubmit = async (values: AddMovieTypeSubmit, setSubmitting: (arg: boolean) => void) => {
    setSubmitting(true)
    if (!previewImg) {
      toast.info("Please select Image");
      return false;
    }
    const result = await handleAddMovie(values);
    if (result) {
      router.push("/");
      setSubmitting(false)
    }
    setSubmitting(false)
  };

  // Handle Cancel
  const handleCancel = async (reset: () => void) => {
    setCancelLoading(true)
    if (previewImg) {
      const result = await deleteImageFromS3(previewImg);
    }
    setPreviewImage("");
    reset();
    setCancelLoading(false)
  };

  return (
    <>
      <div className="h-screen flex max-w-1440 m-auto flex-col">
        <div>
          <h1 className="text-white text-6xl font-semibold pt-24 pb-24">
            Create A New Movie
          </h1>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting)
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
                          deleteLoading={deleteLoading}
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
                          loading={cancelLoading}
                        />
                      </div>
                      <div className="pt-2 pb-2 rounded bg-emerald-400">
                        <ButtonComponent
                          loading={loading}
                          type="submit"
                          buttonName="Submit"
                          btnclass="text-base text-bold text-white rounded submitbtn"
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

export default AddNewMovieForm;
