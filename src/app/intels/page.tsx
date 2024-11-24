import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getIntels } from "@/queries/intel-queries";
import { headers } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import IntelsTable from "@/components/intels-table";
import { SelectTranscript } from "@/lib/schemas";
export default async function IntelsPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userId = session?.user?.id;

  if (!userId) {
    return <div>You are not signed in</div>;
  }

  let intels: SelectTranscript[] = [];
  try {
    intels = await getIntels(userId);
  } catch (error) {
    console.error(error);
    return <div>Error fetching intels</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Intels</h1>
          <p className="text-sm text-gray-500">
            Here you can view all your intels
          </p>
        </div>
        {intels.length > 0 && (
          <Button asChild>
            <Link href="/app">Create new Intel</Link>
          </Button>
        )}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {intels.length === 0 && (
          <>
            <div className=" text-gray-500 mt-8">No intels found</div>
            <Button className="mt-4" asChild>
              <Link href="/app">Create new Intel</Link>
            </Button>
          </>
        )}
        {intels.length > 0 && <IntelsTable className="mt-4" intels={intels} />}
      </Suspense>
    </div>
  );
}
