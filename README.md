# Cortex - Customer Engagement Dashboard
![image](https://github.com/user-attachments/assets/6bbc277e-2d7a-45fe-a5d7-07f2bd98ec7a)

## Overview
Cortex is a cutting-edge customer engagement dashboard designed specifically for car dealerships. It offers a comprehensive suite of tools that allow dealerships to effectively manage customer interactions, analyze feedback, and optimize customer satisfaction. Cortex empowers dealerships with the ability to track individual customer profiles, monitor sentiment through advanced AI-powered analysis, and leverage synthetic data to simulate real-world customer scenarios.

By integrating state-of-the-art technologies like AWS Comprehend for sentiment analysis and DynamoDB for scalable database management, Cortex provides an all-in-one solution to enhance customer experiences and drive business growth.

## Key Features
- **Individual Customer Profiles**: Keep detailed records of customer interactions, including visit history, personalized notes, and feedback.
- **Sentiment Analysis**: Harness the power of AI with AWS Comprehend to analyze customer sentiment from call transcripts and feedback, enabling more informed decision-making.
- **Synthetic Call Transcripts**: Generate realistic call transcripts that simulate various customer scenarios, helping to train staff and improve customer interactions.
- **Frontend Enhancements**: Leverage tools like MagicUI and Spline to create a sleek and modern user interface that’s both functional and aesthetically pleasing.
- **Data-Driven Insights**: Monitor and analyze customer engagement metrics to tailor marketing strategies and improve service offerings.

## Tech Stack
Cortex is built on a robust tech stack that ensures performance, scalability, and ease of use:

### Frontend:
- **Next.js**: Overall app structure and server-side rendering.
- **TypeScript**: For static type checking, improving code quality.
- **TailwindCSS**: Utility-first CSS framework for responsive design.
- **MagicUI & Spline**: Tools to enhance the UI with modern, interactive components.

### Backend:
- **Node.js**: Server-side logic and API integration.
- **AWS Lambda**: (Optional) For scalable, serverless functions (can be added in future enhancements).
- **DynamoDB**: NoSQL database for fast and flexible data storage.

### AI & Analytics:
- **AWS Comprehend**: To perform sentiment analysis on customer interactions.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) or [https://car-ai-agent.vercel.app/](https://car-ai-agent.vercel.app/) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For more information, visit the [Cortex GitHub Repository](https://github.com/ahkamboh/Cortex).


