"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateIntel, uploadAudio } from "@/app/actions/assemblyai";
import { UploadDropzone } from "@/lib/uploadthing";
import { Intel } from "@/types/intel";
import { ClientUploadedFileData } from "uploadthing/types";
import {
  BotMessageSquareIcon,
  CaptionsIcon,
  FileTextIcon,
  Mic2Icon,
  PenSquareIcon,
  PlayCircleIcon,
  StopCircleIcon,
  TableOfContentsIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { youtubeToMp3 } from "../actions/youtube";
import AudioPlayer from "@/components/audio-player";
import { createIntel } from "@/queries/intel-queries";
import { useSession } from "@/lib/auth-client";
import TopOverview from "@/components/top-overview";
import Overview from "@/components/overview";
import Transcript from "@/components/transcript";
import Chat from "@/components/chat";
import Blog from "@/components/blog";

export const maxDuration = 60;

export default function AppPage() {
  const { data: session } = useSession();

  const [mode, setMode] = useState<"file" | "audio" | "youtube">("file");
  const [fileData, setFileData] = useState<ClientUploadedFileData<{
    url: string;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intel, setIntel] = useState<Intel | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [hasPermission, setHasPermission] = useState(false);

  const handleGenerateIntel = async () => {
    if (fileData) {
      // Generate Intel
      try {
        setIsLoading(true);
        setIntel(null);
        const intel = await generateIntel(fileData.url);
        console.log("Intel", intel);
        setIntel(intel as Intel);
        const overallSentiment =
          intel.sentimentResults && intel.sentimentResults.length > 0
            ? intel.sentimentResults?.filter((r) => r.sentiment === "POSITIVE")
                .length >
              intel.sentimentResults?.filter((r) => r.sentiment === "NEGATIVE")
                .length
              ? "Positive"
              : intel.sentimentResults?.filter(
                  (r) => r.sentiment === "POSITIVE"
                ).length ==
                intel.sentimentResults?.filter(
                  (r) => r.sentiment === "NEGATIVE"
                ).length
              ? "Neutral"
              : "Negative"
            : "Neutral";
        await createIntel({
          id: "",
          fileUrl: fileData.url,
          youtubeUrl: "",
          overallSentiment: overallSentiment,
          duration:
            Math.round(
              intel.transcriptUtterances![
                intel.transcriptUtterances!.length - 1
              ].end / 60000
            ).toFixed(0) + " min",
          speakerCount: intel.transcriptUtterances
            ? new Set(
                intel.transcriptUtterances!.map((u) => u.speaker)
              ).size.toString()
            : "0",
          userId: session?.user.id!,
          transcriptId: intel.id,
          transcriptUtterances: intel.transcriptUtterances,
          summary: intel.summary,
          sentiment: intel.sentiment,
          sentimentResults: intel.sentimentResults,
          actionableInsights: intel.actionableInsights,
          title: intel.title,
          keySections: intel.keySections,
          blogPost: intel.blogPost,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error(error);
        toast.error("Error generating intel");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})(\S+)?$/;
    return youtubeRegex.test(url);
  };

  const handleGenerateIntelFromYoutube = async () => {
    // Validate youtube url
    if (!isValidYouTubeUrl(youtubeUrl)) {
      toast.error("Invalid Youtube URL");
      return;
    }

    try {
      setIsLoading(true);
      setIntel(null);
      console.log("Generating mp3 from youtube");
      const { url } = await youtubeToMp3(youtubeUrl);
      console.log("Mp3", url);

      console.log("Generating intel from youtube");
      const intel = await generateIntel(url);
      setIntel(intel);
      console.log("Intel", intel);
      setIntel(intel as Intel);
      const overallSentiment =
        intel.sentimentResults && intel.sentimentResults.length > 0
          ? intel.sentimentResults?.filter((r) => r.sentiment === "POSITIVE")
              .length >
            intel.sentimentResults?.filter((r) => r.sentiment === "NEGATIVE")
              .length
            ? "Positive"
            : intel.sentimentResults?.filter((r) => r.sentiment === "POSITIVE")
                .length ==
              intel.sentimentResults?.filter((r) => r.sentiment === "NEGATIVE")
                .length
            ? "Neutral"
            : "Negative"
          : "Neutral";
      await createIntel({
        id: "",
        fileUrl: "",
        youtubeUrl: youtubeUrl,
        overallSentiment: overallSentiment,
        duration:
          Math.round(
            intel.transcriptUtterances![intel.transcriptUtterances!.length - 1]
              .end / 60000
          ).toFixed(0) + " min",
        speakerCount: intel.transcriptUtterances
          ? new Set(
              intel.transcriptUtterances!.map((u) => u.speaker)
            ).size.toString()
          : "0",
        userId: session?.user.id!,
        transcriptId: intel.id,
        transcriptUtterances: intel.transcriptUtterances,
        summary: intel.summary,
        sentiment: intel.sentiment,
        sentimentResults: intel.sentimentResults,
        actionableInsights: intel.actionableInsights,
        title: intel.title,
        keySections: intel.keySections,
        blogPost: intel.blogPost,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
      toast.error("Error generating intel");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateIntelFromRecord = async () => {
    if (files.length === 0) return;

    try {
      setIsLoading(true);
      setIntel(null);
      console.log("Generating intel from record");

      const fileUrl = await uploadAudio(files[0]);

      console.log("File URL", fileUrl);

      if (fileUrl) {
        const intel = await generateIntel(fileUrl);
        setIntel(intel as Intel);
        const overallSentiment =
          intel.sentimentResults && intel.sentimentResults.length > 0
            ? intel.sentimentResults?.filter((r) => r.sentiment === "POSITIVE")
                .length >
              intel.sentimentResults?.filter((r) => r.sentiment === "NEGATIVE")
                .length
              ? "Positive"
              : intel.sentimentResults?.filter(
                  (r) => r.sentiment === "POSITIVE"
                ).length ==
                intel.sentimentResults?.filter(
                  (r) => r.sentiment === "NEGATIVE"
                ).length
              ? "Neutral"
              : "Negative"
            : "Neutral";
        await createIntel({
          id: "",
          fileUrl,
          youtubeUrl: "",
          overallSentiment: overallSentiment,
          duration:
            Math.round(
              intel.transcriptUtterances![
                intel.transcriptUtterances!.length - 1
              ].end / 60000
            ).toFixed(0) + " min",
          speakerCount: intel.transcriptUtterances
            ? new Set(
                intel.transcriptUtterances!.map((u) => u.speaker)
              ).size.toString()
            : "0",
          userId: session?.user.id!,
          transcriptId: intel.id,
          transcriptUtterances: intel.transcriptUtterances,
          summary: intel.summary,
          sentiment: intel.sentiment,
          sentimentResults: intel.sentimentResults,
          actionableInsights: intel.actionableInsights,
          title: intel.title,
          keySections: intel.keySections,
          blogPost: intel.blogPost,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error generating intel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold">Generate Audio Intel</h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        Upload or record audio or youtube video and generate actionable
        insights.
      </p>
      {fileData ? (
        <div className="flex flex-col gap-2 mt-4 border rounded-lg p-4">
          <p className="text-sm font-medium">File: {fileData.name}</p>
          <p className="text-sm text-muted-foreground">
            Size: {(fileData.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <div className="flex justify-between items-center gap-2">
            <div className="w-full h-24  rounded-lg overflow-hidden">
              {/* <audio
                  id="audioPlayer"
                  src={fileData.url}
                  controls
                  className="w-full"
                /> */}
              <AudioPlayer audioUrl={fileData.url} />
            </div>
            <Button
              disabled={isLoading}
              size="sm"
              variant="destructive"
              onClick={() => {
                setFileData(null);
                setFiles([]);
                setIntel(null);
              }}
            >
              <TrashIcon className="h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-4">
          <RadioGroup
            onValueChange={(value) =>
              setMode(value as "file" | "audio" | "youtube")
            }
            defaultValue="file"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="file" id="file" />
              <Label htmlFor="file">Audio File</Label>

              <RadioGroupItem value="audio" id="audio" />
              <Label htmlFor="audio">Record Audio</Label>

              <RadioGroupItem value="youtube" id="youtube" />
              <Label htmlFor="youtube">Youtube Video</Label>
            </div>
          </RadioGroup>

          {mode === "file" && (
            <UploadDropzone
              endpoint="uploader"
              onChange={(files) => {
                console.log("Files", files);
                setFiles(files);
              }}
              onClientUploadComplete={(res) => {
                console.log("Files", res);
                console.log("Files uploaded");
                setFileData(res[0]);
              }}
              onUploadError={(error) => {
                console.error(error);
                setFileData(null);
              }}
              config={{
                mode: "auto",
              }}
            />
          )}
          {mode === "audio" && (
            <div>
              <div className="flex border rounded-lg p-4 mt-4 flex-col gap-4">
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="min-w-[150px] gap-2"
                    onClick={() => {
                      // @ts-expect-error window.stream is not defined in the global scope
                      const mediaRecorder = new MediaRecorder(window.stream);
                      mediaRecorder.start();
                      setIsRecording(true);

                      const audioChunks: BlobPart[] = [];
                      mediaRecorder.addEventListener(
                        "dataavailable",
                        (event) => {
                          audioChunks.push(event.data);
                        }
                      );

                      mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioFile = new File(
                          [audioBlob],
                          "recording.wav",
                          {
                            type: "audio/wav",
                          }
                        );
                        setFiles([audioFile]);
                      });

                      setMediaRecorder(mediaRecorder);
                    }}
                    disabled={!hasPermission || isRecording}
                  >
                    <PlayCircleIcon className="h-4 w-4" />
                    {isRecording ? "Recording..." : "Record"}
                  </Button>

                  <Button
                    variant="destructive"
                    size="lg"
                    className="min-w-[150px] gap-2"
                    onClick={() => {
                      mediaRecorder?.stop();
                      setIsRecording(false);
                    }}
                    disabled={!isRecording}
                  >
                    <StopCircleIcon className="h-4 w-4" />
                    Stop
                  </Button>
                </div>

                {!hasPermission && (
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="min-w-[250px] gap-2"
                      onClick={async () => {
                        try {
                          const stream =
                            await navigator.mediaDevices.getUserMedia({
                              audio: true,
                            });
                          // @ts-expect-error window.stream is not defined in the global scope
                          window.stream = stream;
                          setHasPermission(true);
                        } catch (err) {
                          console.error("Error accessing microphone:", err);
                          toast.error("Could not access microphone");
                        }
                      }}
                    >
                      <Mic2Icon className="h-4 w-4" />
                      Allow Microphone Access
                    </Button>
                  </div>
                )}

                {isRecording && (
                  <div className="flex justify-center items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      Recording in progress...
                    </span>
                  </div>
                )}

                {files.length > 0 && (
                  <div className="mt-2">
                    <div className="w-full h-24  justify-center  rounded-lg overflow-hidden">
                      <AudioPlayer audioUrl={URL.createObjectURL(files[0])} />
                    </div>
                  </div>
                )}
              </div>

              {files.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button
                    disabled={isLoading}
                    onClick={handleGenerateIntelFromRecord}
                  >
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    {isLoading ? "Generating..." : "Generate Intel"}
                  </Button>
                </div>
              )}
            </div>
          )}
          {mode === "youtube" && (
            <div>
              <div className="mt-4 flex items-center gap-2">
                <Input
                  disabled={isLoading}
                  type="text"
                  placeholder="Enter Youtube Video URL"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <Button
                  disabled={isLoading || !youtubeUrl}
                  onClick={handleGenerateIntelFromYoutube}
                >
                  {isLoading ? "Generating..." : "Generate Intel"}
                </Button>
              </div>
              <div className="mt-4 flex justify-center">
                {youtubeUrl && (
                  <iframe
                    className="w-[560px] h-[315px] rounded-lg"
                    src={`https://www.youtube.com/embed/${
                      youtubeUrl.split("v=")[1]
                    }`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {fileData && (
        <div className="flex gap-2 mt-4">
          <Button onClick={handleGenerateIntel} disabled={isLoading}>
            <FileTextIcon className="h-4 w-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Intel"}
          </Button>
        </div>
      )}
      {isLoading && (
        <div className="mt-8 flex text-center flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black">
            <div className="absolute inset-0 h-full w-full animate-ping rounded-full border-4 border-black opacity-75"></div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">
            Analyzing audio and generating insights...
            <br />
            This may take a few seconds
          </p>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-black animate-bounce"></div>
          </div>
        </div>
      )}
      {intel && (
        <div className="mt-4">
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
      )}
    </div>
  );
}
