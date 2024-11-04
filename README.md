

# AI Code Gen

This project provides a platform to generate live previewable React components using OpenAI's GPT-4 model. It leverages various technologies and configurations to provide seamless and efficient code generation and rendering.

## Project Structure

- **components/CalculatorBuilder/OptionField.tsx**: Customizable option field component that dynamically renders based on props.
  
- **components/app-page.tsx**: Houses the `ComponentGenerator` function that likely integrates with OpenAI or provides utility functions for generating components.
  
- **api/route.ts**: Defines an API route using OpenAI's streaming capabilities for generating React components based on user prompts.

- **pages/page.tsx**: Entry point that renders the `ComponentGenerator` component to deliver the UI.

- **components/slider.tsx**: A React slider component created with Radix UI primitives, styled, and exported for reuse.

- **.env**: Contains sensitive environmental variables, such as the OpenAI API key.

- **tsconfig.json**: TypeScript configuration ensuring strong typing and modern JavaScript features are supported within the project.

## Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed to manage dependencies.
- **OpenAI API Key**: This project requires access to GPT-4 through OpenAI.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create an `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key
   ```

### Running the Project

To start the development server:

```bash
npm run dev
```

Navigating to `http://localhost:3000` should display the home page with a component being generated based on prompts.

## Usage

Upon starting the server, you can provide prompts through the UI which are then sent to our backend. GPT-4 processes these prompts and returns React component definitions rendered on the page.

The prompt content and result are handled in the API route (`route.ts`). It uses a configuration that instructs GPT-4 to generate JavaScript functional components for React.

## Key Features

- **Dynamic Component Generation**: Automatically generates React components which can be previewed live.

- **Integration with OpenAI**: Utilizes the OpenAI GPT-4 model to enable the generation of components from natural language prompts.

- **Modern JavaScript and React Practices**: Emphasizes clean, functional JavaScript (and TypeScript where applicable) with hooks and functional components.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## License

This project is open-source under the [MIT License](LICENSE).

---

If there are any uncertainties due to missing files or unfamiliar definitions, referring to the following might help:

- Explore additional sections within `components/app-page.tsx` for details on `ComponentGenerator`.
- Check documentation or comments within files to understand unconventional logic or practices.
- Refer to official OpenAI documentation for more on setting up and using GPT-4 with its API.

