import Image from "next/image";
import Hero from "@/components/ui/Hero";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId }: { userId: string | null } = auth();

  const url = userId ? "upload" : "sign-up";

  return <Hero url={url} />;
}
