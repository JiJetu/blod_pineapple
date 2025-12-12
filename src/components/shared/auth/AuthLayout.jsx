import { IMAGES } from "../../../assets";


const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center px-4 roboto">
      <div className="relative bg-white rounded-xl shadow-lg flex max-w-5xl w-full overflow-hidden">
        {children}
        {/* Right side: Welcome Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={IMAGES.loginBanner}
            alt="Techboro School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E1E1E] opacity-25"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[80%]">
            <h1 className="text-5xl mb-2 rocknroll">Welcome Back</h1>
            <p className="text-2xl mt-5">Award and certificate control system</p>
          </div>
        </div>
        {/* Bottom Tree Image */}
        <img
          src={IMAGES.treeAuth}
          alt="Tree Decoration"
          className="absolute bottom-0 left-0 w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;