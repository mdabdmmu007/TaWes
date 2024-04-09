import Header from "../components/Header";
import Signup from "../components/Signup";

function SignupPage() {
  return (
    <div className="min-h-full h-screen mobile:w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mobile:w-full space-y-8">
        <Header
          heading="Signup a new account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </div>
  );
}

export default SignupPage;
