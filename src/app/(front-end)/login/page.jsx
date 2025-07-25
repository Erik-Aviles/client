import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <section className="dark:bg-slate-900 h-[calc(100vh-189.33px)] lg:h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="w-full bg-white rounded-lg shadow-2xl border dark:bg-slate-800 dark:border-slate-700 max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white text-center">
            Acceso a la cuenta
          </h1>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
