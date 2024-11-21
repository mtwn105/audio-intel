"use server";

export async function youtubeToMp3(youtubeUrl: string) {
  const response = await fetch("https://cnvmp3.com/fetch.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: youtubeUrl,
      downloadMode: "audio",
      filenameStyle: "basic",
      audioBitrate: "96",
    }),
  });
  return response.json();
}
