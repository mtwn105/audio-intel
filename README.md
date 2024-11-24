# 🎙️ AudioIntel

Transform audio into actionable intelligence with our powerful AI platform. AudioIntel helps you extract valuable insights from audio content through transcription, analysis, and AI-powered features.

## ✨ Features

- 🎵 **Multiple Input Methods**

  - Upload audio files (MP3, WAV)
  - Record directly in browser
  - Analyze YouTube videos

- 🤖 **AI-Powered Analysis**

  - Smart summaries and key takeaways
  - Sentiment analysis
  - Speaker identification
  - Actionable insights generation

- 📝 **Content Generation**

  - Automatic blog post creation
  - Interactive chat with transcripts
  - Key sections identification

- 🔍 **Advanced Features**
  - Timeline view with precise timestamps
  - Multi-speaker detection
  - Searchable transcripts
  - Real-time sentiment tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- AssemblyAI API key

### Installation

1. Clone the repository

```
git clone https://github.com/yourusername/audio-intel.git
cd audio-intel
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Required environment variables:

```
ASSEMBLYAI_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
UPLOADTHING_TOKEN=your_uploadthing_token
GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_BASE_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Neon](https://neon.tech/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Audio Processing**: [AssemblyAI](https://www.assemblyai.com/)
- **File Upload**: [Uploadthing](https://uploadthing.com/)
- **Analytics**: [OpenPanel](https://openpanel.dev/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   └── intels/           # Intel pages
├── components/            # React components
├── lib/                   # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Public assets
└── types/                # TypeScript types

```

## 🔑 Key Features Implementation

### Audio Processing

- Uses AssemblyAI for advanced audio transcription and analysis
- Supports multiple audio formats and YouTube URLs
- Real-time processing status updates

### Transcript Analysis

- Speaker diarization
- Sentiment analysis
- Key points extraction
- Blog post generation

### Interactive Features

- Real-time chat with transcript context
- Searchable transcript interface
- Timeline-based navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Made with ❤️ by [Amit Wani](https://x.com/mtwn105)

## 🙏 Acknowledgments

- [AssemblyAI](https://www.assemblyai.com/) for their powerful audio intelligence API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- The open-source community for their amazing tools and libraries

## 📱 Screenshots

[Add screenshots of your application here]

## 🔗 Links

- [Live Demo](https://audiointel.amitwani.dev)
- [Twitter](https://twitter.com/mtwn105)
