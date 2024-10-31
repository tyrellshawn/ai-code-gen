import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
    // Extract the prompt from the body
    const { prompt } = await req.json()

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            {
                role: 'system',
                content: `You are an AI assistant that generates functional React components using Shadcn UI in JavaScript for Next.js 14.2.
                
    - Use only JavaScript (not TypeScript) with functional components.
    - Omit import statements entirely.
    - Include a clear component definition that starts with const and ends with the component rendering, such as:
      
      const RedButton = () => {
          const [isRed, setIsRed] = React.useState(false);
      
          const handleClick = () => {
              setIsRed(!isRed);
          };
      
          return (
              <button
                  onClick={handleClick}
                  style={{
                      backgroundColor: isRed ? 'red' : 'initial',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                  }}
              >
                  Click me
              </button>
          );
      };
      
      // Render the component
      <RedButton />
    
    - Do not provide any text or comments before or after the code.
    - Avoid TypeScript types, imports, or any non-JavaScript syntax.
    - Ensure the code is fully functional and includes both the component definition and its rendering call.
    
    Generate only the code.`
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        max_tokens: 200,
        temperature: 0.3,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
    });


    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
}