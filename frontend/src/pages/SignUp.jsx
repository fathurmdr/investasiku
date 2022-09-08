import AuthFooter from "../components/atoms/AuthFooter";
import BannerLogo from "../components/molecules/BannerLogo";
import SignUpForm from "../components/organisms/SignUpForm";

function SignUp() {
  return (
    <>
      <BannerLogo />
      <SignUpForm />
      <AuthFooter currentPage="signup" />
    </>
  );
}

export default SignUp;
