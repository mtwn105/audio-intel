"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateIntel } from "../actions/assemblyai";
import { UploadDropzone } from "@/lib/uploadthing";
import { Intel } from "@/types/intel";
import { ClientUploadedFileData } from "uploadthing/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookmarkIcon,
  ClockIcon,
  LightbulbIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function AppPage() {
  const [fileData, setFileData] = useState<ClientUploadedFileData<{
    url: string;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [intel, setIntel] = useState<Intel | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [overallSentiment, setOverallSentiment] = useState<string | null>(null);

  const handleGenerateIntel = async () => {
    if (fileData) {
      // Generate Intel
      try {
        setIsLoading(true);
        setIntel(null);
        const intel = await generateIntel(fileData.url);
        // const intel = {
        //   transcript:
        //     "So what's new, Mark? How is your new job going? To be honest, I can't complain. I really love the company that I am working for. My coworkers are all really friendly and helpful. They really help me feel welcome. It's a really energetic and fun atmosphere. My boss is hilarious and he's really flexible. Really? How so? He allows me to come in when I want and make my own hours. I can also leave early if I start early. There is no real dress code either. I can wear jeans and a T shirt if I want. I can even wear shorts in the summer. Wow, it sounds really cool. I can't stand wearing a suit every day. Which do you prefer? Working late or finishing early? I prefer finishing early. I really enjoy the morning. I love getting up early and going for a run. There's nothing like watching the sunrise while drinking my morning coffee. Really? I am opposite. I love sleeping in. I am most alert in the evenings. I'm a real night owl. Well, you know what they say. The early bird catches the worm. You know, you could be right. Maybe I will try to go to bed a little earlier tonight.",
        //   transcriptUtterances: [
        //     {
        //       speaker: "A",
        //       text: "So what's new, Mark? How is your new job going?",
        //       confidence: 0.991129,
        //       start: 12760,
        //       end: 17045,
        //       words: [
        //         {
        //           text: "So",
        //           start: 12760,
        //           end: 13184,
        //           confidence: 0.98751,
        //           speaker: "A",
        //         },
        //         {
        //           text: "what's",
        //           start: 13184,
        //           end: 13632,
        //           confidence: 0.98277,
        //           speaker: "A",
        //         },
        //         {
        //           text: "new,",
        //           start: 13665,
        //           end: 13865,
        //           confidence: 0.99988,
        //           speaker: "A",
        //         },
        //         {
        //           text: "Mark?",
        //           start: 13905,
        //           end: 14485,
        //           confidence: 0.95949,
        //           speaker: "A",
        //         },
        //         {
        //           text: "How",
        //           start: 14865,
        //           end: 15177,
        //           confidence: 0.99989,
        //           speaker: "A",
        //         },
        //         {
        //           text: "is",
        //           start: 15201,
        //           end: 15361,
        //           confidence: 0.98533,
        //           speaker: "A",
        //         },
        //         {
        //           text: "your",
        //           start: 15393,
        //           end: 15609,
        //           confidence: 0.99938,
        //           speaker: "A",
        //         },
        //         {
        //           text: "new",
        //           start: 15657,
        //           end: 15961,
        //           confidence: 0.99855,
        //           speaker: "A",
        //         },
        //         {
        //           text: "job",
        //           start: 16033,
        //           end: 16361,
        //           confidence: 0.99991,
        //           speaker: "A",
        //         },
        //         {
        //           text: "going?",
        //           start: 16433,
        //           end: 17045,
        //           confidence: 0.99858,
        //           speaker: "A",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "B",
        //       text: "To be honest, I can't complain. I really love the company that I am working for. My coworkers are all really friendly and helpful. They really help me feel welcome. It's a really energetic and fun atmosphere. My boss is hilarious and he's really flexible.",
        //       confidence: 0.91864353,
        //       start: 17625,
        //       end: 42975,
        //       words: [
        //         {
        //           text: "To",
        //           start: 17625,
        //           end: 17985,
        //           confidence: 0.92068,
        //           speaker: "B",
        //         },
        //         {
        //           text: "be",
        //           start: 18025,
        //           end: 18225,
        //           confidence: 0.99959,
        //           speaker: "B",
        //         },
        //         {
        //           text: "honest,",
        //           start: 18265,
        //           end: 18885,
        //           confidence: 0.78316,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 19305,
        //           end: 19689,
        //           confidence: 0.99753,
        //           speaker: "B",
        //         },
        //         {
        //           text: "can't",
        //           start: 19737,
        //           end: 20073,
        //           confidence: 0.66859,
        //           speaker: "B",
        //         },
        //         {
        //           text: "complain.",
        //           start: 20129,
        //           end: 20845,
        //           confidence: 0.62173,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 21585,
        //           end: 22017,
        //           confidence: 0.99667,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 22081,
        //           end: 22377,
        //           confidence: 0.99893,
        //           speaker: "B",
        //         },
        //         {
        //           text: "love",
        //           start: 22441,
        //           end: 22665,
        //           confidence: 0.99972,
        //           speaker: "B",
        //         },
        //         {
        //           text: "the",
        //           start: 22705,
        //           end: 22929,
        //           confidence: 0.9987,
        //           speaker: "B",
        //         },
        //         {
        //           text: "company",
        //           start: 22977,
        //           end: 23329,
        //           confidence: 0.99827,
        //           speaker: "B",
        //         },
        //         {
        //           text: "that",
        //           start: 23417,
        //           end: 23593,
        //           confidence: 0.99059,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 23609,
        //           end: 23737,
        //           confidence: 0.99858,
        //           speaker: "B",
        //         },
        //         {
        //           text: "am",
        //           start: 23761,
        //           end: 23993,
        //           confidence: 0.99039,
        //           speaker: "B",
        //         },
        //         {
        //           text: "working",
        //           start: 24049,
        //           end: 24313,
        //           confidence: 0.99986,
        //           speaker: "B",
        //         },
        //         {
        //           text: "for.",
        //           start: 24369,
        //           end: 24965,
        //           confidence: 0.99526,
        //           speaker: "B",
        //         },
        //         {
        //           text: "My",
        //           start: 26075,
        //           end: 26435,
        //           confidence: 0.99835,
        //           speaker: "B",
        //         },
        //         {
        //           text: "coworkers",
        //           start: 26475,
        //           end: 27171,
        //           confidence: 0.41804,
        //           speaker: "B",
        //         },
        //         {
        //           text: "are",
        //           start: 27243,
        //           end: 27547,
        //           confidence: 0.99952,
        //           speaker: "B",
        //         },
        //         {
        //           text: "all",
        //           start: 27611,
        //           end: 27955,
        //           confidence: 0.99773,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 28035,
        //           end: 28371,
        //           confidence: 0.99942,
        //           speaker: "B",
        //         },
        //         {
        //           text: "friendly",
        //           start: 28443,
        //           end: 28955,
        //           confidence: 0.99993,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 29035,
        //           end: 29299,
        //           confidence: 0.99979,
        //           speaker: "B",
        //         },
        //         {
        //           text: "helpful.",
        //           start: 29347,
        //           end: 30055,
        //           confidence: 0.99987,
        //           speaker: "B",
        //         },
        //         {
        //           text: "They",
        //           start: 30675,
        //           end: 31107,
        //           confidence: 0.99983,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 31171,
        //           end: 31491,
        //           confidence: 0.99914,
        //           speaker: "B",
        //         },
        //         {
        //           text: "help",
        //           start: 31563,
        //           end: 31771,
        //           confidence: 0.99986,
        //           speaker: "B",
        //         },
        //         {
        //           text: "me",
        //           start: 31803,
        //           end: 32019,
        //           confidence: 0.99951,
        //           speaker: "B",
        //         },
        //         {
        //           text: "feel",
        //           start: 32067,
        //           end: 32371,
        //           confidence: 0.99949,
        //           speaker: "B",
        //         },
        //         {
        //           text: "welcome.",
        //           start: 32443,
        //           end: 33135,
        //           confidence: 0.76213,
        //           speaker: "B",
        //         },
        //         {
        //           text: "It's",
        //           start: 33995,
        //           end: 34371,
        //           confidence: 0.76418,
        //           speaker: "B",
        //         },
        //         {
        //           text: "a",
        //           start: 34403,
        //           end: 34595,
        //           confidence: 0.99772,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 34635,
        //           end: 34907,
        //           confidence: 0.99986,
        //           speaker: "B",
        //         },
        //         {
        //           text: "energetic",
        //           start: 34971,
        //           end: 35707,
        //           confidence: 0.94603,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 35771,
        //           end: 36019,
        //           confidence: 0.99928,
        //           speaker: "B",
        //         },
        //         {
        //           text: "fun",
        //           start: 36067,
        //           end: 36371,
        //           confidence: 0.99995,
        //           speaker: "B",
        //         },
        //         {
        //           text: "atmosphere.",
        //           start: 36443,
        //           end: 37455,
        //           confidence: 0.79347,
        //           speaker: "B",
        //         },
        //         {
        //           text: "My",
        //           start: 38275,
        //           end: 38659,
        //           confidence: 0.99979,
        //           speaker: "B",
        //         },
        //         {
        //           text: "boss",
        //           start: 38707,
        //           end: 39035,
        //           confidence: 0.56201,
        //           speaker: "B",
        //         },
        //         {
        //           text: "is",
        //           start: 39115,
        //           end: 39379,
        //           confidence: 0.9997,
        //           speaker: "B",
        //         },
        //         {
        //           text: "hilarious",
        //           start: 39427,
        //           end: 40295,
        //           confidence: 0.4743,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 40995,
        //           end: 41283,
        //           confidence: 0.99873,
        //           speaker: "B",
        //         },
        //         {
        //           text: "he's",
        //           start: 41299,
        //           end: 41699,
        //           confidence: 0.97939,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 41747,
        //           end: 42027,
        //           confidence: 0.99978,
        //           speaker: "B",
        //         },
        //         {
        //           text: "flexible.",
        //           start: 42091,
        //           end: 42975,
        //           confidence: 0.69391,
        //           speaker: "B",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "A",
        //       text: "Really? How so?",
        //       confidence: 0.87882334,
        //       start: 43715,
        //       end: 46615,
        //       words: [
        //         {
        //           text: "Really?",
        //           start: 43715,
        //           end: 44455,
        //           confidence: 0.99982,
        //           speaker: "A",
        //         },
        //         {
        //           text: "How",
        //           start: 45635,
        //           end: 45995,
        //           confidence: 0.99961,
        //           speaker: "A",
        //         },
        //         {
        //           text: "so?",
        //           start: 46035,
        //           end: 46615,
        //           confidence: 0.63704,
        //           speaker: "A",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "B",
        //       text: "He allows me to come in when I want and make my own hours. I can also leave early if I start early. There is no real dress code either. I can wear jeans and a T shirt if I want. I can even wear shorts in the summer.",
        //       confidence: 0.9753886,
        //       start: 47595,
        //       end: 67825,
        //       words: [
        //         {
        //           text: "He",
        //           start: 47595,
        //           end: 47979,
        //           confidence: 0.99988,
        //           speaker: "B",
        //         },
        //         {
        //           text: "allows",
        //           start: 48027,
        //           end: 48419,
        //           confidence: 0.99974,
        //           speaker: "B",
        //         },
        //         {
        //           text: "me",
        //           start: 48467,
        //           end: 48675,
        //           confidence: 0.99972,
        //           speaker: "B",
        //         },
        //         {
        //           text: "to",
        //           start: 48715,
        //           end: 48915,
        //           confidence: 0.99944,
        //           speaker: "B",
        //         },
        //         {
        //           text: "come",
        //           start: 48955,
        //           end: 49131,
        //           confidence: 0.99996,
        //           speaker: "B",
        //         },
        //         {
        //           text: "in",
        //           start: 49163,
        //           end: 49379,
        //           confidence: 0.99909,
        //           speaker: "B",
        //         },
        //         {
        //           text: "when",
        //           start: 49427,
        //           end: 49635,
        //           confidence: 0.99965,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 49675,
        //           end: 49875,
        //           confidence: 0.99917,
        //           speaker: "B",
        //         },
        //         {
        //           text: "want",
        //           start: 49915,
        //           end: 50495,
        //           confidence: 0.99908,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 51005,
        //           end: 51365,
        //           confidence: 0.98896,
        //           speaker: "B",
        //         },
        //         {
        //           text: "make",
        //           start: 51405,
        //           end: 51629,
        //           confidence: 0.99971,
        //           speaker: "B",
        //         },
        //         {
        //           text: "my",
        //           start: 51677,
        //           end: 51909,
        //           confidence: 0.9997,
        //           speaker: "B",
        //         },
        //         {
        //           text: "own",
        //           start: 51957,
        //           end: 52261,
        //           confidence: 0.99988,
        //           speaker: "B",
        //         },
        //         {
        //           text: "hours.",
        //           start: 52333,
        //           end: 52945,
        //           confidence: 0.99939,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 53805,
        //           end: 54117,
        //           confidence: 0.99966,
        //           speaker: "B",
        //         },
        //         {
        //           text: "can",
        //           start: 54141,
        //           end: 54349,
        //           confidence: 0.99949,
        //           speaker: "B",
        //         },
        //         {
        //           text: "also",
        //           start: 54397,
        //           end: 54677,
        //           confidence: 0.99955,
        //           speaker: "B",
        //         },
        //         {
        //           text: "leave",
        //           start: 54741,
        //           end: 55037,
        //           confidence: 0.99958,
        //           speaker: "B",
        //         },
        //         {
        //           text: "early",
        //           start: 55101,
        //           end: 55517,
        //           confidence: 0.99991,
        //           speaker: "B",
        //         },
        //         {
        //           text: "if",
        //           start: 55621,
        //           end: 55861,
        //           confidence: 0.99966,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 55893,
        //           end: 56109,
        //           confidence: 0.99888,
        //           speaker: "B",
        //         },
        //         {
        //           text: "start",
        //           start: 56157,
        //           end: 56437,
        //           confidence: 0.99995,
        //           speaker: "B",
        //         },
        //         {
        //           text: "early.",
        //           start: 56501,
        //           end: 57105,
        //           confidence: 0.99959,
        //           speaker: "B",
        //         },
        //         {
        //           text: "There",
        //           start: 57765,
        //           end: 58101,
        //           confidence: 0.99982,
        //           speaker: "B",
        //         },
        //         {
        //           text: "is",
        //           start: 58133,
        //           end: 58349,
        //           confidence: 0.99898,
        //           speaker: "B",
        //         },
        //         {
        //           text: "no",
        //           start: 58397,
        //           end: 58629,
        //           confidence: 0.99979,
        //           speaker: "B",
        //         },
        //         {
        //           text: "real",
        //           start: 58677,
        //           end: 59005,
        //           confidence: 0.99981,
        //           speaker: "B",
        //         },
        //         {
        //           text: "dress",
        //           start: 59085,
        //           end: 59373,
        //           confidence: 0.98889,
        //           speaker: "B",
        //         },
        //         {
        //           text: "code",
        //           start: 59429,
        //           end: 59773,
        //           confidence: 0.81675,
        //           speaker: "B",
        //         },
        //         {
        //           text: "either.",
        //           start: 59829,
        //           end: 60465,
        //           confidence: 0.99451,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 61045,
        //           end: 61357,
        //           confidence: 0.99959,
        //           speaker: "B",
        //         },
        //         {
        //           text: "can",
        //           start: 61381,
        //           end: 61541,
        //           confidence: 0.99974,
        //           speaker: "B",
        //         },
        //         {
        //           text: "wear",
        //           start: 61573,
        //           end: 61813,
        //           confidence: 0.99508,
        //           speaker: "B",
        //         },
        //         {
        //           text: "jeans",
        //           start: 61869,
        //           end: 62237,
        //           confidence: 0.56189,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 62301,
        //           end: 62453,
        //           confidence: 0.99973,
        //           speaker: "B",
        //         },
        //         {
        //           text: "a",
        //           start: 62469,
        //           end: 62597,
        //           confidence: 0.9928,
        //           speaker: "B",
        //         },
        //         {
        //           text: "T",
        //           start: 62621,
        //           end: 62829,
        //           confidence: 0.99349,
        //           speaker: "B",
        //         },
        //         {
        //           text: "shirt",
        //           start: 62877,
        //           end: 63253,
        //           confidence: 0.57319,
        //           speaker: "B",
        //         },
        //         {
        //           text: "if",
        //           start: 63309,
        //           end: 63501,
        //           confidence: 0.9997,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 63533,
        //           end: 63725,
        //           confidence: 0.99886,
        //           speaker: "B",
        //         },
        //         {
        //           text: "want.",
        //           start: 63765,
        //           end: 64345,
        //           confidence: 0.99986,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 64925,
        //           end: 65261,
        //           confidence: 0.99896,
        //           speaker: "B",
        //         },
        //         {
        //           text: "can",
        //           start: 65293,
        //           end: 65509,
        //           confidence: 0.99966,
        //           speaker: "B",
        //         },
        //         {
        //           text: "even",
        //           start: 65557,
        //           end: 65813,
        //           confidence: 0.99983,
        //           speaker: "B",
        //         },
        //         {
        //           text: "wear",
        //           start: 65869,
        //           end: 66133,
        //           confidence: 0.91428,
        //           speaker: "B",
        //         },
        //         {
        //           text: "shorts",
        //           start: 66189,
        //           end: 66669,
        //           confidence: 0.99965,
        //           speaker: "B",
        //         },
        //         {
        //           text: "in",
        //           start: 66717,
        //           end: 66901,
        //           confidence: 0.99954,
        //           speaker: "B",
        //         },
        //         {
        //           text: "the",
        //           start: 66933,
        //           end: 67125,
        //           confidence: 0.99658,
        //           speaker: "B",
        //         },
        //         {
        //           text: "summer.",
        //           start: 67165,
        //           end: 67825,
        //           confidence: 0.99342,
        //           speaker: "B",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "A",
        //       text: "Wow, it sounds really cool. I can't stand wearing a suit every day. Which do you prefer? Working late or finishing early?",
        //       confidence: 0.94335455,
        //       start: 68405,
        //       end: 81235,
        //       words: [
        //         {
        //           text: "Wow,",
        //           start: 68405,
        //           end: 69185,
        //           confidence: 0.878,
        //           speaker: "A",
        //         },
        //         {
        //           text: "it",
        //           start: 69765,
        //           end: 70149,
        //           confidence: 0.99761,
        //           speaker: "A",
        //         },
        //         {
        //           text: "sounds",
        //           start: 70197,
        //           end: 70701,
        //           confidence: 0.99117,
        //           speaker: "A",
        //         },
        //         {
        //           text: "really",
        //           start: 70773,
        //           end: 71077,
        //           confidence: 0.99937,
        //           speaker: "A",
        //         },
        //         {
        //           text: "cool.",
        //           start: 71141,
        //           end: 71785,
        //           confidence: 0.90451,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I",
        //           start: 72445,
        //           end: 72853,
        //           confidence: 0.99912,
        //           speaker: "A",
        //         },
        //         {
        //           text: "can't",
        //           start: 72909,
        //           end: 73413,
        //           confidence: 0.52126,
        //           speaker: "A",
        //         },
        //         {
        //           text: "stand",
        //           start: 73509,
        //           end: 73981,
        //           confidence: 0.99974,
        //           speaker: "A",
        //         },
        //         {
        //           text: "wearing",
        //           start: 74093,
        //           end: 74469,
        //           confidence: 0.90446,
        //           speaker: "A",
        //         },
        //         {
        //           text: "a",
        //           start: 74517,
        //           end: 74701,
        //           confidence: 0.9983,
        //           speaker: "A",
        //         },
        //         {
        //           text: "suit",
        //           start: 74733,
        //           end: 75133,
        //           confidence: 0.95236,
        //           speaker: "A",
        //         },
        //         {
        //           text: "every",
        //           start: 75229,
        //           end: 75461,
        //           confidence: 0.99981,
        //           speaker: "A",
        //         },
        //         {
        //           text: "day.",
        //           start: 75493,
        //           end: 76065,
        //           confidence: 0.96781,
        //           speaker: "A",
        //         },
        //         {
        //           text: "Which",
        //           start: 76535,
        //           end: 76871,
        //           confidence: 0.99939,
        //           speaker: "A",
        //         },
        //         {
        //           text: "do",
        //           start: 76903,
        //           end: 77047,
        //           confidence: 0.99973,
        //           speaker: "A",
        //         },
        //         {
        //           text: "you",
        //           start: 77071,
        //           end: 77327,
        //           confidence: 0.99954,
        //           speaker: "A",
        //         },
        //         {
        //           text: "prefer?",
        //           start: 77391,
        //           end: 77995,
        //           confidence: 0.6427,
        //           speaker: "A",
        //         },
        //         {
        //           text: "Working",
        //           start: 78535,
        //           end: 78991,
        //           confidence: 0.99997,
        //           speaker: "A",
        //         },
        //         {
        //           text: "late",
        //           start: 79063,
        //           end: 79511,
        //           confidence: 0.99998,
        //           speaker: "A",
        //         },
        //         {
        //           text: "or",
        //           start: 79623,
        //           end: 79943,
        //           confidence: 0.9998,
        //           speaker: "A",
        //         },
        //         {
        //           text: "finishing",
        //           start: 79999,
        //           end: 80551,
        //           confidence: 0.99937,
        //           speaker: "A",
        //         },
        //         {
        //           text: "early?",
        //           start: 80623,
        //           end: 81235,
        //           confidence: 0.9998,
        //           speaker: "A",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "B",
        //       text: "I prefer finishing early. I really enjoy the morning. I love getting up early and going for a run. There's nothing like watching the sunrise while drinking my morning coffee.",
        //       confidence: 0.963747,
        //       start: 81935,
        //       end: 96675,
        //       words: [
        //         {
        //           text: "I",
        //           start: 81935,
        //           end: 82295,
        //           confidence: 0.99887,
        //           speaker: "B",
        //         },
        //         {
        //           text: "prefer",
        //           start: 82335,
        //           end: 82695,
        //           confidence: 0.99989,
        //           speaker: "B",
        //         },
        //         {
        //           text: "finishing",
        //           start: 82775,
        //           end: 83351,
        //           confidence: 0.9994,
        //           speaker: "B",
        //         },
        //         {
        //           text: "early.",
        //           start: 83423,
        //           end: 84035,
        //           confidence: 0.99747,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 84615,
        //           end: 85023,
        //           confidence: 0.99934,
        //           speaker: "B",
        //         },
        //         {
        //           text: "really",
        //           start: 85079,
        //           end: 85319,
        //           confidence: 0.9999,
        //           speaker: "B",
        //         },
        //         {
        //           text: "enjoy",
        //           start: 85367,
        //           end: 85703,
        //           confidence: 0.95753,
        //           speaker: "B",
        //         },
        //         {
        //           text: "the",
        //           start: 85759,
        //           end: 85951,
        //           confidence: 0.99956,
        //           speaker: "B",
        //         },
        //         {
        //           text: "morning.",
        //           start: 85983,
        //           end: 86555,
        //           confidence: 0.99899,
        //           speaker: "B",
        //         },
        //         {
        //           text: "I",
        //           start: 87455,
        //           end: 87815,
        //           confidence: 0.99948,
        //           speaker: "B",
        //         },
        //         {
        //           text: "love",
        //           start: 87855,
        //           end: 88151,
        //           confidence: 0.99992,
        //           speaker: "B",
        //         },
        //         {
        //           text: "getting",
        //           start: 88223,
        //           end: 88503,
        //           confidence: 0.99991,
        //           speaker: "B",
        //         },
        //         {
        //           text: "up",
        //           start: 88559,
        //           end: 88847,
        //           confidence: 0.99971,
        //           speaker: "B",
        //         },
        //         {
        //           text: "early",
        //           start: 88911,
        //           end: 89279,
        //           confidence: 0.99996,
        //           speaker: "B",
        //         },
        //         {
        //           text: "and",
        //           start: 89367,
        //           end: 89615,
        //           confidence: 0.99977,
        //           speaker: "B",
        //         },
        //         {
        //           text: "going",
        //           start: 89655,
        //           end: 89879,
        //           confidence: 0.99991,
        //           speaker: "B",
        //         },
        //         {
        //           text: "for",
        //           start: 89927,
        //           end: 90111,
        //           confidence: 0.99988,
        //           speaker: "B",
        //         },
        //         {
        //           text: "a",
        //           start: 90143,
        //           end: 90335,
        //           confidence: 0.99941,
        //           speaker: "B",
        //         },
        //         {
        //           text: "run.",
        //           start: 90375,
        //           end: 90955,
        //           confidence: 0.99967,
        //           speaker: "B",
        //         },
        //         {
        //           text: "There's",
        //           start: 91575,
        //           end: 92143,
        //           confidence: 0.60392,
        //           speaker: "B",
        //         },
        //         {
        //           text: "nothing",
        //           start: 92199,
        //           end: 92591,
        //           confidence: 0.99993,
        //           speaker: "B",
        //         },
        //         {
        //           text: "like",
        //           start: 92663,
        //           end: 92967,
        //           confidence: 0.99986,
        //           speaker: "B",
        //         },
        //         {
        //           text: "watching",
        //           start: 93031,
        //           end: 93391,
        //           confidence: 0.99984,
        //           speaker: "B",
        //         },
        //         {
        //           text: "the",
        //           start: 93423,
        //           end: 93591,
        //           confidence: 0.99966,
        //           speaker: "B",
        //         },
        //         {
        //           text: "sunrise",
        //           start: 93623,
        //           end: 94263,
        //           confidence: 0.60924,
        //           speaker: "B",
        //         },
        //         {
        //           text: "while",
        //           start: 94319,
        //           end: 94559,
        //           confidence: 0.99929,
        //           speaker: "B",
        //         },
        //         {
        //           text: "drinking",
        //           start: 94607,
        //           end: 95039,
        //           confidence: 0.89322,
        //           speaker: "B",
        //         },
        //         {
        //           text: "my",
        //           start: 95087,
        //           end: 95343,
        //           confidence: 0.99941,
        //           speaker: "B",
        //         },
        //         {
        //           text: "morning",
        //           start: 95399,
        //           end: 95807,
        //           confidence: 0.99999,
        //           speaker: "B",
        //         },
        //         {
        //           text: "coffee.",
        //           start: 95911,
        //           end: 96675,
        //           confidence: 0.85948,
        //           speaker: "B",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "A",
        //       text: "Really? I am opposite. I love sleeping in. I am most alert in the evenings. I'm a real night owl.",
        //       confidence: 0.972553,
        //       start: 97735,
        //       end: 110195,
        //       words: [
        //         {
        //           text: "Really?",
        //           start: 97735,
        //           end: 98475,
        //           confidence: 0.99962,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I",
        //           start: 99415,
        //           end: 99727,
        //           confidence: 0.9993,
        //           speaker: "A",
        //         },
        //         {
        //           text: "am",
        //           start: 99751,
        //           end: 100079,
        //           confidence: 0.9967,
        //           speaker: "A",
        //         },
        //         {
        //           text: "opposite.",
        //           start: 100167,
        //           end: 101075,
        //           confidence: 0.98946,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I",
        //           start: 101735,
        //           end: 102167,
        //           confidence: 0.99946,
        //           speaker: "A",
        //         },
        //         {
        //           text: "love",
        //           start: 102231,
        //           end: 102575,
        //           confidence: 0.99986,
        //           speaker: "A",
        //         },
        //         {
        //           text: "sleeping",
        //           start: 102655,
        //           end: 103119,
        //           confidence: 0.99284,
        //           speaker: "A",
        //         },
        //         {
        //           text: "in.",
        //           start: 103167,
        //           end: 103755,
        //           confidence: 0.99777,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I",
        //           start: 104735,
        //           end: 105047,
        //           confidence: 0.99319,
        //           speaker: "A",
        //         },
        //         {
        //           text: "am",
        //           start: 105071,
        //           end: 105375,
        //           confidence: 0.99371,
        //           speaker: "A",
        //         },
        //         {
        //           text: "most",
        //           start: 105455,
        //           end: 105767,
        //           confidence: 0.9998,
        //           speaker: "A",
        //         },
        //         {
        //           text: "alert",
        //           start: 105831,
        //           end: 106255,
        //           confidence: 0.99773,
        //           speaker: "A",
        //         },
        //         {
        //           text: "in",
        //           start: 106335,
        //           end: 106527,
        //           confidence: 0.9997,
        //           speaker: "A",
        //         },
        //         {
        //           text: "the",
        //           start: 106551,
        //           end: 106759,
        //           confidence: 0.99922,
        //           speaker: "A",
        //         },
        //         {
        //           text: "evenings.",
        //           start: 106807,
        //           end: 107555,
        //           confidence: 0.9985,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I'm",
        //           start: 108015,
        //           end: 108471,
        //           confidence: 0.85178,
        //           speaker: "A",
        //         },
        //         {
        //           text: "a",
        //           start: 108503,
        //           end: 108719,
        //           confidence: 0.99918,
        //           speaker: "A",
        //         },
        //         {
        //           text: "real",
        //           start: 108767,
        //           end: 109095,
        //           confidence: 0.99993,
        //           speaker: "A",
        //         },
        //         {
        //           text: "night",
        //           start: 109175,
        //           end: 109415,
        //           confidence: 0.99299,
        //           speaker: "A",
        //         },
        //         {
        //           text: "owl.",
        //           start: 109455,
        //           end: 110195,
        //           confidence: 0.65032,
        //           speaker: "A",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "B",
        //       text: "Well, you know what they say. The early bird catches the worm.",
        //       confidence: 0.88926584,
        //       start: 114255,
        //       end: 119635,
        //       words: [
        //         {
        //           text: "Well,",
        //           start: 114255,
        //           end: 114783,
        //           confidence: 0.99536,
        //           speaker: "B",
        //         },
        //         {
        //           text: "you",
        //           start: 114879,
        //           end: 115111,
        //           confidence: 0.9997,
        //           speaker: "B",
        //         },
        //         {
        //           text: "know",
        //           start: 115143,
        //           end: 115287,
        //           confidence: 0.99985,
        //           speaker: "B",
        //         },
        //         {
        //           text: "what",
        //           start: 115311,
        //           end: 115495,
        //           confidence: 0.99901,
        //           speaker: "B",
        //         },
        //         {
        //           text: "they",
        //           start: 115535,
        //           end: 115783,
        //           confidence: 0.99968,
        //           speaker: "B",
        //         },
        //         {
        //           text: "say.",
        //           start: 115839,
        //           end: 116435,
        //           confidence: 0.8261,
        //           speaker: "B",
        //         },
        //         {
        //           text: "The",
        //           start: 116975,
        //           end: 117359,
        //           confidence: 0.99939,
        //           speaker: "B",
        //         },
        //         {
        //           text: "early",
        //           start: 117407,
        //           end: 117687,
        //           confidence: 0.99981,
        //           speaker: "B",
        //         },
        //         {
        //           text: "bird",
        //           start: 117751,
        //           end: 118183,
        //           confidence: 0.56098,
        //           speaker: "B",
        //         },
        //         {
        //           text: "catches",
        //           start: 118239,
        //           end: 118695,
        //           confidence: 0.56172,
        //           speaker: "B",
        //         },
        //         {
        //           text: "the",
        //           start: 118735,
        //           end: 118911,
        //           confidence: 0.99952,
        //           speaker: "B",
        //         },
        //         {
        //           text: "worm.",
        //           start: 118943,
        //           end: 119635,
        //           confidence: 0.73007,
        //           speaker: "B",
        //         },
        //       ],
        //     },
        //     {
        //       speaker: "A",
        //       text: "You know, you could be right. Maybe I will try to go to bed a little earlier tonight.",
        //       confidence: 0.96686834,
        //       start: 120015,
        //       end: 126855,
        //       words: [
        //         {
        //           text: "You",
        //           start: 120015,
        //           end: 120351,
        //           confidence: 0.99049,
        //           speaker: "A",
        //         },
        //         {
        //           text: "know,",
        //           start: 120383,
        //           end: 120671,
        //           confidence: 0.99942,
        //           speaker: "A",
        //         },
        //         {
        //           text: "you",
        //           start: 120743,
        //           end: 120999,
        //           confidence: 0.99964,
        //           speaker: "A",
        //         },
        //         {
        //           text: "could",
        //           start: 121047,
        //           end: 121255,
        //           confidence: 0.99951,
        //           speaker: "A",
        //         },
        //         {
        //           text: "be",
        //           start: 121295,
        //           end: 121519,
        //           confidence: 0.99976,
        //           speaker: "A",
        //         },
        //         {
        //           text: "right.",
        //           start: 121567,
        //           end: 122155,
        //           confidence: 0.99674,
        //           speaker: "A",
        //         },
        //         {
        //           text: "Maybe",
        //           start: 122935,
        //           end: 123559,
        //           confidence: 0.99975,
        //           speaker: "A",
        //         },
        //         {
        //           text: "I",
        //           start: 123647,
        //           end: 123847,
        //           confidence: 0.99933,
        //           speaker: "A",
        //         },
        //         {
        //           text: "will",
        //           start: 123871,
        //           end: 124103,
        //           confidence: 0.99533,
        //           speaker: "A",
        //         },
        //         {
        //           text: "try",
        //           start: 124159,
        //           end: 124351,
        //           confidence: 0.99951,
        //           speaker: "A",
        //         },
        //         {
        //           text: "to",
        //           start: 124383,
        //           end: 124575,
        //           confidence: 0.99316,
        //           speaker: "A",
        //         },
        //         {
        //           text: "go",
        //           start: 124615,
        //           end: 124791,
        //           confidence: 0.99792,
        //           speaker: "A",
        //         },
        //         {
        //           text: "to",
        //           start: 124823,
        //           end: 124991,
        //           confidence: 0.99771,
        //           speaker: "A",
        //         },
        //         {
        //           text: "bed",
        //           start: 125023,
        //           end: 125375,
        //           confidence: 0.62227,
        //           speaker: "A",
        //         },
        //         {
        //           text: "a",
        //           start: 125455,
        //           end: 125623,
        //           confidence: 0.99801,
        //           speaker: "A",
        //         },
        //         {
        //           text: "little",
        //           start: 125639,
        //           end: 125983,
        //           confidence: 0.99978,
        //           speaker: "A",
        //         },
        //         {
        //           text: "earlier",
        //           start: 126079,
        //           end: 126527,
        //           confidence: 0.99965,
        //           speaker: "A",
        //         },
        //         {
        //           text: "tonight.",
        //           start: 126631,
        //           end: 126855,
        //           confidence: 0.81565,
        //           speaker: "A",
        //         },
        //       ],
        //     },
        //   ],
        //   summary:
        //     "- Mark tells Speaker A about his new job. He loves the company because his boss is flexible and he can wear whatever he wants. Mark prefers finishing early because he enjoys the morning. But Speaker A loves sleeping in.",
        //   sentiment: true,
        //   sentimentResults: [
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "So what's new, Mark?",
        //       start: 12760,
        //       end: 14485,
        //       confidence: 0.8581262,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "How is your new job going?",
        //       start: 14865,
        //       end: 17045,
        //       confidence: 0.8753841,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "To be honest, I can't complain.",
        //       start: 17625,
        //       end: 20845,
        //       confidence: 0.5380609,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "I really love the company that I am working for.",
        //       start: 21585,
        //       end: 24965,
        //       confidence: 0.99079376,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "My coworkers are all really friendly and helpful.",
        //       start: 26075,
        //       end: 30055,
        //       confidence: 0.98724407,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "They really help me feel welcome.",
        //       start: 30675,
        //       end: 33135,
        //       confidence: 0.9655897,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "It's a really energetic and fun atmosphere.",
        //       start: 33995,
        //       end: 37455,
        //       confidence: 0.9820562,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "My boss is hilarious and he's really flexible.",
        //       start: 38275,
        //       end: 42975,
        //       confidence: 0.96830463,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "Really?",
        //       start: 43715,
        //       end: 44455,
        //       confidence: 0.60081327,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "How so?",
        //       start: 45635,
        //       end: 46615,
        //       confidence: 0.76303536,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "He allows me to come in when I want and make my own hours.",
        //       start: 47595,
        //       end: 52945,
        //       confidence: 0.6671915,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "I can also leave early if I start early.",
        //       start: 53805,
        //       end: 57105,
        //       confidence: 0.6880805,
        //     },
        //     {
        //       sentiment: "NEGATIVE",
        //       speaker: "B",
        //       text: "There is no real dress code either.",
        //       start: 57765,
        //       end: 60465,
        //       confidence: 0.55545604,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "I can wear jeans and a T shirt if I want.",
        //       start: 61045,
        //       end: 64345,
        //       confidence: 0.67509776,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "I can even wear shorts in the summer.",
        //       start: 64925,
        //       end: 67825,
        //       confidence: 0.73763424,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "A",
        //       text: "Wow, it sounds really cool.",
        //       start: 68405,
        //       end: 71785,
        //       confidence: 0.9882625,
        //     },
        //     {
        //       sentiment: "NEGATIVE",
        //       speaker: "A",
        //       text: "I can't stand wearing a suit every day.",
        //       start: 72445,
        //       end: 76065,
        //       confidence: 0.964985,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "Which do you prefer?",
        //       start: 76535,
        //       end: 77995,
        //       confidence: 0.8394141,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "Working late or finishing early?",
        //       start: 78535,
        //       end: 81235,
        //       confidence: 0.77412254,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "I prefer finishing early.",
        //       start: 81935,
        //       end: 84035,
        //       confidence: 0.6138421,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "I really enjoy the morning.",
        //       start: 84615,
        //       end: 86555,
        //       confidence: 0.98615605,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "I love getting up early and going for a run.",
        //       start: 87455,
        //       end: 90955,
        //       confidence: 0.9833823,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "B",
        //       text: "There's nothing like watching the sunrise while drinking my morning coffee.",
        //       start: 91575,
        //       end: 96675,
        //       confidence: 0.9282136,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "Really?",
        //       start: 97735,
        //       end: 98475,
        //       confidence: 0.60081327,
        //     },
        //     {
        //       sentiment: "NEGATIVE",
        //       speaker: "A",
        //       text: "I am opposite.",
        //       start: 99415,
        //       end: 101075,
        //       confidence: 0.6146521,
        //     },
        //     {
        //       sentiment: "POSITIVE",
        //       speaker: "A",
        //       text: "I love sleeping in.",
        //       start: 101735,
        //       end: 103755,
        //       confidence: 0.9583409,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "I am most alert in the evenings.",
        //       start: 104735,
        //       end: 107555,
        //       confidence: 0.550556,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "I'm a real night owl.",
        //       start: 108015,
        //       end: 110195,
        //       confidence: 0.76795506,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "Well, you know what they say.",
        //       start: 114255,
        //       end: 116435,
        //       confidence: 0.6259165,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "B",
        //       text: "The early bird catches the worm.",
        //       start: 116975,
        //       end: 119635,
        //       confidence: 0.63201684,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "You know, you could be right.",
        //       start: 120015,
        //       end: 122155,
        //       confidence: 0.64347506,
        //     },
        //     {
        //       sentiment: "NEUTRAL",
        //       speaker: "A",
        //       text: "Maybe I will try to go to bed a little earlier tonight.",
        //       start: 122935,
        //       end: 126855,
        //       confidence: 0.72603995,
        //     },
        //   ],
        // };
        console.log("Intel", intel);
        setIntel(intel as Intel);
        setOverallSentiment(
          intel.sentimentResults
            ? intel.sentimentResults.filter((r) => r.sentiment === "POSITIVE")
                .length >
              intel.sentimentResults.filter((r) => r.sentiment === "NEGATIVE")
                .length
              ? "Positive"
              : "Negative"
            : "Neutral"
        );
      } catch (error) {
        console.error(error);
        toast.error("Error generating intel");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold">Generate Audio Intel</h1>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">
        Upload your audio file and generate actionable insights.
      </p>
      {fileData ? (
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">File: {fileData.name}</p>
            <p className="text-sm text-muted-foreground">
              Size: {(fileData.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <Button
            disabled={isLoading}
            size="sm"
            variant="destructive"
            onClick={() => setFileData(null)}
          >
            Remove
          </Button>
        </div>
      ) : (
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
      {fileData && (
        <div className="mt-4">
          <Button onClick={handleGenerateIntel} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Intel"}
          </Button>
        </div>
      )}
      {intel && (
        <div className="mt-4">
          <div className="flex w-full gap-4 mb-4">
            <div className="flex w-full items-center gap-2 rounded-lg border p-3">
              <UsersIcon className="h-4 w-4" />
              <div>
                <p className="text-xs md:text-sm font-medium">Speakers</p>
                <p className="text-2xl font-bold">
                  {intel.transcriptUtterances
                    ? new Set(intel.transcriptUtterances.map((u) => u.speaker))
                        .size
                    : 0}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 rounded-lg border p-3">
              <ClockIcon className="h-4 w-4" />
              <div>
                <p className="text-xs md:text-sm font-medium">Duration</p>
                <p className="text-2xl font-bold">
                  {intel.transcriptUtterances
                    ? Math.round(
                        intel.transcriptUtterances[
                          intel.transcriptUtterances.length - 1
                        ].end / 60000
                      )
                    : 0}{" "}
                  min
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-2 rounded-lg border p-3">
              <MessageSquareIcon className="h-4 w-4" />
              <div>
                <p className="text-xs md:text-sm font-medium">
                  Overall Sentiment
                </p>
                <p className="text-2xl font-bold">{overallSentiment}</p>
              </div>
            </div>
          </div>
          <h2 className="text-2xl mb-2 font-bold">Title: {intel.title}</h2>
          <Accordion
            defaultValue="summary"
            type="single"
            collapsible
            className="mb-4"
          >
            <AccordionItem value="summary">
              <AccordionTrigger className="text-lg font-bold">
                Summary
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {intel.summary}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sentiment">
              <AccordionTrigger className="text-lg font-bold">
                Sentiment Analysis
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {intel.sentimentResults && (
                  <div className="w-full h-8 flex rounded-lg overflow-hidden">
                    {intel.sentimentResults.map((result, index) => {
                      const duration = result.end - result.start;
                      const totalDuration = intel.sentimentResults
                        ? intel.sentimentResults[
                            intel.sentimentResults.length - 1
                          ]?.end - intel.sentimentResults[0]?.start
                        : 100;

                      const width = (duration / totalDuration) * 100;

                      const bgColor =
                        result.sentiment === "POSITIVE"
                          ? "bg-green-200"
                          : result.sentiment === "NEGATIVE"
                          ? "bg-red-200"
                          : "bg-gray-200";

                      return (
                        <div
                          key={index}
                          className={`h-full ${bgColor} hover:opacity-80 transition-opacity`}
                          style={{ width: `${width}%` }}
                          title={`${result.sentiment} (${Math.floor(
                            result.start / 1000
                          )}s - ${Math.floor(result.end / 1000)}s)`}
                        />
                      );
                    })}
                  </div>
                )}
                <div className="mt-4">
                  {intel.sentimentResults && (
                    <div className="flex gap-4 ">
                      {["POSITIVE", "NEUTRAL", "NEGATIVE"].map((sentiment) => {
                        const count = intel.sentimentResults!.filter(
                          (result) => result.sentiment === sentiment
                        ).length;
                        const percentage = Math.round(
                          (count / intel.sentimentResults!.length) * 100
                        );

                        const bgColor =
                          sentiment === "POSITIVE"
                            ? "bg-green-100"
                            : sentiment === "NEGATIVE"
                            ? "bg-red-100"
                            : "bg-gray-100";

                        return (
                          <div
                            key={sentiment}
                            className={`px-4 py-2 rounded-lg ${bgColor}`}
                          >
                            <p className="text-sm font-medium">{sentiment}</p>
                            <p className="text-xl font-bold">{percentage}%</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="actionableInsights">
              <AccordionTrigger className="text-lg font-bold">
                Actionable Insights
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {intel.actionableInsights?.map((insight, index) => (
                  <div key={index}>
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 mr-2 mb-2">
                      <LightbulbIcon className="text-yellow-800 h-4 w-4" />
                    </div>
                    {insight}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="keySections">
              <AccordionTrigger className="text-lg font-bold">
                Key Sections
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {intel.keySections?.map((section, index) => (
                  <div
                    key={index}
                    className="mb-4 rounded-lg border p-3 bg-gray-50"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <BookmarkIcon className="h-4 w-4" />
                      <p className="text-sm font-medium">
                        {Math.floor(section.timestamp.start / 1000 / 60)}:
                        {String(
                          Math.floor((section.timestamp.start / 1000) % 60)
                        ).padStart(2, "0")}{" "}
                        - {Math.floor(section.timestamp.end / 1000 / 60)}:
                        {String(
                          Math.floor((section.timestamp.end / 1000) % 60)
                        ).padStart(2, "0")}
                      </p>
                    </div>
                    <p>{section.text}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="transcript">
              <AccordionTrigger className="text-lg font-bold">
                Full Transcript
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {intel.transcriptUtterances?.map((utterance, index) => (
                  <div key={index}>
                    <div
                      className={`mb-4 rounded-lg border p-3 ${
                        utterance.speaker === "A"
                          ? "bg-blue-50"
                          : utterance.speaker === "B"
                          ? "bg-green-50"
                          : utterance.speaker === "C"
                          ? "bg-yellow-50"
                          : utterance.speaker === "D"
                          ? "bg-purple-50"
                          : utterance.speaker === "E"
                          ? "bg-pink-50"
                          : utterance.speaker === "F"
                          ? "bg-orange-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        <p className="text-sm font-medium">
                          Speaker {utterance.speaker} (
                          {Math.floor(utterance.start / 1000 / 60)}:
                          {String(
                            Math.floor((utterance.start / 1000) % 60)
                          ).padStart(2, "0")}{" "}
                          - {Math.floor(utterance.end / 1000 / 60)}:
                          {String(
                            Math.floor((utterance.end / 1000) % 60)
                          ).padStart(2, "0")}
                          )
                        </p>
                      </div>
                      <p>{utterance.text}</p>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
