export type Message = {
  role: "user" | "assistant";
  content: string;
}

export async function chat(messages: Message[]) {

}