'use client'
import Cookies from "js-cookie";
import AWS from '../config/awsConfig'

// Check user is logged in or not
export const checkIsLogin = () => {
    const isLogin = Cookies.get('token');
    if (isLogin) {
        return true
    } else {
        return false
    }
}

// Get user data from cookies
export function getUserData() {
    const user: string | undefined = Cookies.get('user');
    let userData: any = {};
    if (user !== undefined) {
        userData = JSON.parse(user)
    }
    return userData;
}

// handle upload file to s3
export const uploadImageToS3 = async (file: File) => {
    const timestamp = new Date().getTime();
    const keyWithTimestamp = `${timestamp}_${file.name}`;
    const uploadParams = {
      Bucket: "repair-tech-connect-data",
      Key: keyWithTimestamp,
      Body: file,
      ACL: "public-read",
    };

    const s3 = new AWS.S3();

    try {
      const data = await s3.upload(uploadParams).promise();
      const imageUrl = data.Location;
   
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return '';
    }
  };

//   Handle delete from S3

export const deleteImageFromS3 = async (file:any) => {
    const imageUrl = file
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1];
   
    const s3 = new AWS.S3();
    const deleteParams = {
      Bucket: "repair-tech-connect-data",
      Key: filename,
    };
  
    try {
      await s3.deleteObject(deleteParams).promise();
      // console.log(`Image '${deleteParams.Key}' deleted successfully from S3 bucket '${deleteParams.Bucket}'.`);
      return true;
    } catch (error) {
      console.error(`Error deleting image '${deleteParams.Key}' from S3 bucket '${deleteParams.Bucket}':`, error);
      return false;
    }
  };

