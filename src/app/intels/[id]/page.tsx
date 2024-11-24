import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import {
  CaptionsIcon,
  PenSquareIcon,
  TableOfContentsIcon,
  BotMessageSquareIcon,
} from "lucide-react";
import TopOverview from "@/components/top-overview";
import Overview from "@/components/overview";
import Blog from "@/components/blog";
import Transcript from "@/components/transcript";
import Chat from "@/components/chat";
import { getIntel } from "@/queries/intel-queries";
export default async function IntelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const intel = await getIntel(id);

  if (!intel) {
    return <div>Intel not found</div>;
  }

  return (
    <>
      <div className="m-4">
        <TopOverview intel={intel} />

        <Tabs defaultValue="overview" className="w-full mt-4">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="overview" className="w-full">
              <TableOfContentsIcon className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="transcript" className="w-full">
              <CaptionsIcon className="h-4 w-4 mr-2" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="chat" className="w-full">
              <BotMessageSquareIcon className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="blog" className="w-full">
              <PenSquareIcon className="h-4 w-4 mr-2" />
              Blog Post
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview intel={intel} />
          </TabsContent>
          <TabsContent value="transcript">
            <Transcript intel={intel} />
          </TabsContent>
          <TabsContent value="chat">
            <Chat intel={intel} />
          </TabsContent>
          <TabsContent value="blog">
            <Blog intel={intel} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
