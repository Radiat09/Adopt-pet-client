import useAxiosPublic from "../useAxiosPublic";

const imageBbApiKey = import.meta.env.VITE_IMAGEBB_APIKEY;
const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;

const useImageHosting = async (imageFile) => {
  const res = await useAxiosPublic.post(imageHostingAPi, imageFile, {
    headers: {
      "content-Type": "multipart/form-data",
    },
  });
  return res;
};

export default useImageHosting;
