import CitasComponent from "@/components/CitasComponent";

export default async function CitasPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div>
      <CitasComponent />;
    </div>
  );
}
