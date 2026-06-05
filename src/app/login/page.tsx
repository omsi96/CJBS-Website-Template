import { redirect } from "next/navigation";
import { SignInCard } from "@/components/site/SignInCard";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px 480px at 80% 0%, rgba(255,199,44,0.18), transparent 60%), radial-gradient(600px 460px at 0% 100%, rgba(163,2,52,0.08), transparent 60%)",
        }}
      />
      <SignInCard />
    </div>
  );
}
