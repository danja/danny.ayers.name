# Semem Lives!

*[Semem](https://github.com/danja/semem) ~~is~~ will be an LLM-compatible context-aware, open-ended graph knowledgebase system combining the advantages of vector embeddings and Linked Data technologies.*

[Notes from yesterday](https://danny.ayers.name/entries/2024-12-29_semem-ollama.html), [this morning](https://danny.ayers.name/entries/2024-12-30_perplexed.html)

**Wow!**, that went remarkably well. I'm pretty familiar with the semweb bits, the embedding/chat interfacing side very inexperienced. So, hard part (for me) first.

Claude did most of the heavy lifting, a long session about a month ago, a bunch this morning. I only actually **ran it for the first time about an hour ago**. Predictably Claude had left me with a load of manual *make-sane* refactoring to do. One stumble remaining is down to Faiss libs. The npm package `faiss` is an empty repo, Claude had hallucinated its API. What I needed was `faiss-node`. So that's where it stalls right now. I've got the tooling in place to quicky sort this out. But I'd used up my Claude Pro (!) token allowance by 11am, it's not due to reset for 20 mins and I have at least one tree to cut down before it gets dark...


Still embryonic, but so pleasing, in [OllamaExample.js](https://github.com/danja/semem/blob/main/src/OllamaExample.js) there is :

```javascript
chat: {
    provider: 'ollama',
    model: 'qwen2:1.5b'
},
embedding: {
    provider: 'ollama',
    model: 'nomic-embed-text'
}
...
    const prompt = "What's the current state of AI technology?";
```

*...and so...*

```sh
node src/OllamaExample.js

[INFO] Generating embedding...
[INFO] No existing interaction history found in JSON. Starting fresh.
[INFO] Memory initialized with 0 short-term and 0 long-term memories
[INFO] Extracting concepts...
[INFO] Extracted concepts: [ 'AI technology' ]
[INFO] No interactions available
Response: AI (artificial intelligence) technology has come a long way since its inception in the 1950s. It is now a rapidly growing field, and there are numerous advancements being made across various industries.

1. Machine Learning: This involves programming computers to learn from data without being explicitly programmed. It's used for tasks like recognizing images, identifying voice commands, or predicting customer behavior.

2. Natural Language Processing (NLP): AI systems can understand human language in ways that make them easier to interact with and more efficient. They are used for tasks like chatbots, virtual assistants, and text-based search engines.

3. Robotics: As technology develops further, robots have become better at performing complex tasks autonomously. Some advanced robots now perform jobs such as manufacturing goods or even medical procedures.

4. Computer Vision (CV): This uses AI to help computers understand visual information in images or videos. It's used for applications like self-driving cars, security cameras, and facial recognition.

5. Deep Learning: This branch of artificial intelligence involves creating algorithms that can learn from data without being explicitly programmed. It's widely used in image classification tasks, natural language processing, and reinforcement learning.

6. Neural Networks: These are a type of machine learning algorithm inspired by the human brain. They're used for tasks such as recognizing handwriting, speech recognition, and playing games like chess or Go.

In summary, AI technology is advancing rapidly across various fields, offering more efficient solutions to complex problems. However, there's still room for improvement in areas like ethical considerations and ensuring that AI systems can be trusted by humans.
[INFO] Generating embedding...
[INFO] Extracting concepts...
[INFO] Extracted concepts: [
  'Machine Learning',
  'Natural Language Processing (NLP)',
  'Robotics',
  'Computer Vision (CV)',
  'Deep Learning',
  'Neural Networks'
]
[INFO] Adding interaction: 'What's the current state of AI technology?'
TypeError: Invalid the first argument type, must be an Array.
```

**Tree time.**
