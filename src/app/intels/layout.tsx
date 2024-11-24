import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Intel | Turn your audio into insights",
  description: "Turn your audio into insights",
};

export default function IntelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
