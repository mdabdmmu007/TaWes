import ForgotPassword from "../components/ForgotPassword";
import Header from "../components/Header";

function ForgotPasswordPage() {
  return (
    <div className="min-h-full mobile:w-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mobile:w-full space-y-8">
        <Header
          heading="Reset Your Password"
          paragraph="Need an account? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
