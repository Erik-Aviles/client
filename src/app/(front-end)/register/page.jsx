import RegisterForm from "@/components/frontend/forms/RegisterForm";

export default function Register() {
  return (
    <section className=" dark:bg-slate-900 h-[calc(100vh-189.33px)] lg:h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="w-full rounded-lg shadow-2xl border dark:bg-slate-800 dark:border-slate-700 max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white text-center">
            Crear nueva cuenta
          </h1>
          <RegisterForm role="USER" />
        </div>
      </div>
    </section>
  );
}
