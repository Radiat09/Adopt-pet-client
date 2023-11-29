import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

const imageBbApiKey = import.meta.env.VITE_IMAGEBB_APIKEY;
const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;
const UpdateDonationCampaign = () => {
  const { data } = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.petName.value;
    const donationTarget = form.maxDonation.value;
    const shortDescription = form.shortDes.value;
    const longDescription = form.longDes.value;
    const photo = form.photo.files[0];
    const lastDate = form.lastDate.value;

    const res = await axiosPublic.post(
      imageHostingAPi,
      { image: photo },
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success) {
      const image = res.data.data.display_url;
      const date = new Date();

      const campaignData = {
        email: data?.email || "",
        name,
        donationTarget,
        lastDate,
        shortDescription,
        longDescription,
        image,
        date,
        pause: data?.pause,
        totalDonation: [],
      };
      console.log(campaignData);
      await axiosSecure
        .put(`/donationCampaigns/${data?._id}`, campaignData)
        .then((res) => {
          // console.log(res.data);
          if (res.data.modifiedCount) {
            toast.success(`${name} updated successfully!`);
            // actions.resetForm();
          }
        });
    }
  };
  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        Update Donation Campaign
      </h1>
      <div className="max-w-6xl mx-auto bg-yellow-600 text-white">
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-2 gap-5 px-5 md:px-20 py-14"
        >
          <div className="col-span-2 md:col-span-1  w-full">
            <label className="text-xl font-semibold" htmlFor="petName">
              Pet Name<span className="text-red-600">*</span>
            </label>
            <input
              defaultValue={data?.name}
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
              id="petName"
              name="petName"
              type="text"
              placeholder="Enter pet name"
            />
            <div className="text-red-600 font-semibold"></div>
          </div>
          <div className="col-span-2 md:col-span-1  w-full">
            <label className="text-xl font-semibold" htmlFor="maxDonation">
              Max Donation<span className="text-red-600">*</span>
            </label>
            <input
              defaultValue={data?.donationTarget}
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
              id="maxDonation"
              type="number"
              name="maxDonation"
              placeholder="Enter max donation amount"
            />
            <div className="text-red-600 font-semibold"></div>
          </div>
          <div className="col-span-2 w-full ">
            <label className="text-xl font-semibold" htmlFor="lastDate">
              Last Date<span className="text-red-600">*</span>
            </label>
            <input
              defaultValue={data?.lastDate}
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
              type="datetime-local"
              name="lastDate"
              id="lastDate"
            />
          </div>
          <div className="col-span-2  w-full">
            <label className="text-xl font-semibold" htmlFor="shortDes">
              Short Description<span className="text-red-600">*</span>
            </label>
            <input
              defaultValue={data?.shortDescription}
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
              id="shortDes"
              name="shortDes"
              placeholder="Enter a short description"
            />
            <div className="text-red-600 font-semibold"></div>
          </div>
          <div className="col-span-2  w-full">
            <label className="text-xl font-semibold" htmlFor="longDes">
              Long Description<span className="text-red-600">*</span>
            </label>
            <input
              defaultValue={data?.longDescription}
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
              id="longDes"
              name="longDes"
              placeholder="Enter a long description"
            />
            <div className="text-red-600 font-semibold"></div>
          </div>
          <div className="col-span-2  w-full">
            <label className="text-xl font-semibold" htmlFor="photo">
              Photo<span className="text-red-600">*</span>
            </label>
            <input
              required
              className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none cursor-pointer"
              id="photo"
              name="photo"
              type="file"
            />
          </div>

          {/* submit Button */}
          <div className="col-span-2 flex justify-center mt-10">
            <button
              className="btn rounded-none w-28 text-white bg-gradient-to-r from-[#ff922b] to-[#ffd43b]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationCampaign;
