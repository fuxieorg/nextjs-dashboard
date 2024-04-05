import { SignIn } from "@/components/auth-components";
import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import SignInForm from "@/components/sign-in-form";

export default function Page() {
  return (
    <div className="h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {/* Left */}
      <div className="flex h-full flex-col items-center">
        <header className="flex w-full items-center justify-between p-4 md:p-6">
          <Logo />
          <ModeToggle />
        </header>
        <div className="flex h-full w-full flex-1 flex-col justify-center p-4 md:p-6">
          <SignInForm githubSignIn={<SignIn />} />
        </div>
        <Footer />
      </div>

      {/* Right */}
      <div className="hidden bg-muted p-6 lg:block"></div>
    </div>
  );
}
