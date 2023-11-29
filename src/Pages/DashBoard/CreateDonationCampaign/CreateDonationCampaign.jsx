import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth/useAuth";
import toast from "react-hot-toast";

const imageBbApiKey = import.meta.env.VITE_IMAGEBB_APIKEY;
const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;

const CreateDonationCampaign = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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
        email: user.email,
        name,
        donationTarget,
        lastDate,
        shortDescription,
        longDescription,
        image,
        date,
        pause: false,
        totalDonation: [],
      };
      console.log(campaignData);
      await axiosSecure.post("/donationCampaigns", campaignData).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          toast.success(`${name} created successfully!`);
          // actions.resetForm();
        }
      });
    }
  };
  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        Create Donation Campaign
      </h1>
      <div className="w-full mt-20">
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
                required
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                type="datetime-local"
                name="lastDate"
                id="lastDate"
              />
            </div>
            {/* <div className="col-span-2 md:col-span-1  w-full">
              <label className="text-xl font-semibold" htmlFor="petAddress">
                Pet Address<span className="text-red-600">*</span>
              </label>
              <input
                required
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="petAddress"
                name="petAddress"
                placeholder="Enter pet address"
              />
              <div className="text-red-600 font-semibold"></div>
            </div> */}
            <div className="col-span-2  w-full">
              <label className="text-xl font-semibold" htmlFor="shortDes">
                Short Description<span className="text-red-600">*</span>
              </label>
              <input
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
    </div>
  );
};

export default CreateDonationCampaign;
