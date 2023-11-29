import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import Select from "react-select";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { basicSchema } from "../../../schemas";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth/useAuth";

/**
 *dogs
 *cats
 *fish
 *birds
 *small_mammals
 *reptiles
 */

const options = [
  { value: "dogs", label: "dogs" },
  { value: "cats", label: "cats" },
  { value: "fish", label: "fish" },
  { value: "birds", label: "birds" },
  { value: "small_mammals", label: "small_mammals" },
  { value: "reptiles", label: "reptiles" },
];

const imageBbApiKey = import.meta.env.VITE_IMAGEBB_APIKEY;
const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;

const AddAPet = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("");
  const [photo, setPhoto] = useState(null);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  return (
    <div className="w-full mt-20">
      <h1 className="uppercase text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        Add a pet
      </h1>
      <div className="max-w-6xl mx-auto bg-yellow-600 text-white">
        <Formik
          initialValues={{
            petName: "",
            petAge: "",
            petAddress: "",
            shortDes: "",
            longDes: "",
            category: "",
          }}
          validationSchema={basicSchema}
          onSubmit={async (values, actions) => {
            const name = values.petName;
            const age = values.petAge;
            const category = selectedOption.value;
            const location = values.petAddress;
            const shortDescription = values.shortDes;
            const longDescription = values.longDes;

            // console.log(values);
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
              const petData = {
                email: user.email,
                name,
                age,
                category,
                location,
                shortDescription,
                longDescription,
                image,
                date,
                adopted: false,
              };
              // console.log(petData);
              await axiosSecure.post("/pets", petData).then((res) => {
                // console.log(res.data);
                if (res.data.insertedId) {
                  toast.success(`${name} added successfully!`);
                  actions.resetForm();
                }
              });
            }
          }}
        >
          <Form className="w-full grid grid-cols-2 gap-5 px-5 md:px-20 py-14">
            <div className="col-span-2 md:col-span-1  w-full">
              <label className="text-xl font-semibold" htmlFor="petName">
                Pet Name<span className="text-red-600">*</span>
              </label>
              <Field
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="petName"
                name="petName"
                type="text"
                placeholder="Enter pet name"
              />
              <div className="text-red-600 font-semibold">
                <ErrorMessage name="petName" />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1  w-full">
              <label className="text-xl font-semibold" htmlFor="petAge">
                Pet Age<span className="text-red-600">*</span>
              </label>
              <Field
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="petAge"
                type="number"
                name="petAge"
                placeholder="Enter pet age"
              />
              <div className="text-red-600 font-semibold">
                <ErrorMessage name="petAge" />
              </div>
            </div>
            <div className="col-span-2 w-full ">
              <label className="text-xl font-semibold" htmlFor="category">
                Category<span className="text-red-600">*</span>
              </label>
              <Select
                name="category"
                className="text-black"
                id="category"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />
              {/* <div className="text-red-600 font-semibold">
                <ErrorMessage name="category" />
              </div> */}
            </div>
            <div className="col-span-2 md:col-span-1  w-full">
              <label className="text-xl font-semibold" htmlFor="petAddress">
                Pet Address<span className="text-red-600">*</span>
              </label>
              <Field
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="petAddress"
                name="petAddress"
                placeholder="Enter pet address"
              />
              <div className="text-red-600 font-semibold">
                <ErrorMessage name="petAddress" />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1  w-full">
              <label className="text-xl font-semibold" htmlFor="shortDes">
                Short Description<span className="text-red-600">*</span>
              </label>
              <Field
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="shortDes"
                name="shortDes"
                placeholder="Enter a short description"
              />
              <div className="text-red-600 font-semibold">
                <ErrorMessage name="shortDes" />
              </div>
            </div>
            <div className="col-span-2  w-full">
              <label className="text-xl font-semibold" htmlFor="longDes">
                Long Description<span className="text-red-600">*</span>
              </label>
              <Field
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none text-black"
                id="longDes"
                name="longDes"
                placeholder="Enter a long description"
              />
              <div className="text-red-600 font-semibold">
                <ErrorMessage name="longDes" />
              </div>
            </div>
            <div className="col-span-2  w-full">
              <label className="text-xl font-semibold" htmlFor="photo">
                Photo<span className="text-red-600">*</span>
              </label>
              <input
                className="w-full px-8 py-3 rounded-lg mt-2 focus:outline-none cursor-pointer"
                id="photo"
                name="photo"
                type="file"
                required
                onChange={(e) => setPhoto(e.target.files[0])}
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
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddAPet;
