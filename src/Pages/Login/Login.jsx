import loginImg from "../../assets/images/authImg.jpg";
import loginImgBg from "../../assets/images/authBgImg.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { emailPassSignIn, googleSignIn, githubSignIn, logOut } =
    useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";

  const verifyBan = async (email) => {
    const res = await axiosPublic(`/users/${email}`);
    return res.data.banned;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    emailPassSignIn(email, password)
      .then(async (res) => {
        // console.log(res.user);
        const data = await verifyBan(res.user?.email);
        if (data === true) {
          toast.error("Sorry your account is banned!");
          return logOut;
        }
        toast.success("Login Successfull!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn().then(async (res) => {
      // console.log(res);
      const data = await verifyBan(res.user?.email);
      if (data === true) {
        toast.error("Sorry your account is banned!");
        return logOut;
      }
      const userInfo = {
        image: res.user?.photoURL,
        email: res.user?.email,
        name: res.user?.displayName,
        role: "user",
        banned: false,
      };
      navigate(from, { replace: true });
      toast.success("Login Successfull!");
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
      });
    });
  };

  const handleGithubLogin = () => {
    githubSignIn().then(async (res) => {
      // console.log(res.user);
      const data = await verifyBan(res.user?.email);
      if (data === true) {
        toast.error("Sorry your account is banned!");
        return logOut;
      }
      const userInfo = {
        image: res.user?.photoURL,
        email: res.user?.email,
        name: res.user?.displayName,
        role: "user",
        banned: false,
      };
      navigate(from, { replace: true });
      toast.success("Login Successfull!");
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
      });
    });
  };

  return (
    <div
      style={{
        //todo need image
        backgroundImage: `url(${loginImgBg})`,
      }}
      className="hero min-h-screen"
    >
      <div className="hero-content w-full flex-col md:flex-row justify-between gap-40 shadow-2xl">
        <div className="flex-1">
          {/*todo Need Imge */}
          <img src={loginImg} alt="an image of login page" />
        </div>
        <div className="flex-1 w-full">
          <form onSubmit={handleFormSubmit} className="card-body">
            <h3 className="text-center text-4xl font-bold text-white">Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-xl font-semibold text-white">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-yellow-500 text-white">Login</button>
            </div>
            <div className="text-center mt-8 space-y-5">
              <p className="text-center text-xl font-medium text-yellow-500">
                New here?{" "}
                <Link to="/register" className="link link-hover">
                  <span className="font-bold ">Create a New Account</span>
                </Link>
              </p>
              <p className="text-xl font-medium">or Sign in with</p>

              {/* Social Login */}
              <div className="flex justify-center items-center gap-10">
                {/* Google */}
                <div
                  onClick={handleGoogleLogin}
                  className="w-fit rounded-full p-3 cursor-pointer border-2 hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3_103)">
                      <path
                        d="M0 12C0 5.3832 5.3832 0 12 0C14.6723 0 17.2017 0.859771 19.3147 2.4864L16.5262 6.1088C15.2197 5.10309 13.6545 4.57143 12 4.57143C7.90389 4.57143 4.57143 7.90389 4.57143 12C4.57143 16.0961 7.90389 19.4286 12 19.4286C15.2991 19.4286 18.1026 17.2671 19.0688 14.2857H12V9.71429H24V12C24 18.6168 18.6168 24 12 24C5.3832 24 0 18.6168 0 12Z"
                        fill="#444444"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_103">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div
                  onClick={handleGithubLogin}
                  className="w-fit rounded-full p-3 cursor-pointer border-2 hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3_108)">
                      <path
                        d="M12 0.5C5.37 0.5 0 5.78 0 12.292C0 17.503 3.438 21.922 8.205 23.48C8.805 23.591 9.025 23.226 9.025 22.913C9.025 22.633 9.015 21.891 9.01 20.908C5.672 21.619 4.968 19.326 4.968 19.326C4.422 17.965 3.633 17.601 3.633 17.601C2.546 16.87 3.717 16.885 3.717 16.885C4.922 16.967 5.555 18.1 5.555 18.1C6.625 19.903 8.364 19.382 9.05 19.081C9.158 18.318 9.467 17.799 9.81 17.504C7.145 17.209 4.344 16.195 4.344 11.677C4.344 10.39 4.809 9.338 5.579 8.513C5.444 8.215 5.039 7.016 5.684 5.392C5.684 5.392 6.689 5.076 8.984 6.601C9.944 6.339 10.964 6.209 11.984 6.203C13.004 6.209 14.024 6.339 14.984 6.601C17.264 5.076 18.269 5.392 18.269 5.392C18.914 7.016 18.509 8.215 18.389 8.513C19.154 9.338 19.619 10.39 19.619 11.677C19.619 16.207 16.814 17.204 14.144 17.494C14.564 17.848 14.954 18.571 14.954 19.676C14.954 21.254 14.939 22.522 14.939 22.905C14.939 23.214 15.149 23.583 15.764 23.465C20.565 21.917 24 17.495 24 12.292C24 5.78 18.627 0.5 12 0.5Z"
                        fill="#444444"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_108">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
