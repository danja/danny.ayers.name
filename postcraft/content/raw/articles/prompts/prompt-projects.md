Maybe you can give it the opportunity to "look" through the documents?  
Including in its system prompt that it should use an `<antThinking>` tag  or a markdown comment like this `[Document Search]: # (Here goes my consideration if the relevant information can be found in one of the documents)` to consider if there's related information in one of the documents.

---

It's likely that the system doesn't check the documentation for every query to save tokens. Instead, it attempts to bootstrap the conversation by initially reviewing the uploaded information, then relies on Claude's training data to continue without constant reference to the documentation.

One partially effective technique I've found is instructing Claude to explicitly state when it can't find an answer in the documents. However, this approach can limit the Claude's ability to leverage its base knowledge, as it focuses solely on regurgitating information from the provided documents. When given more nuanced instructions that allow for generating answers from its training data, Claude often reverts to confidently providing bullshit without checking the documentation.

Additional observations:

1. For projects involving codebase and API analysis, it's beneficial to start a new conversation for each question. The model tends to check the documents more thoroughly at the beginning of a conversation, so frequent resets can improve accuracy.

2. Explicit instructions to always check uploaded documents before answering help mitigate the issue but don't completely resolve it.

3. The model appears more reliable when searching for specific answers or patterns in uploaded data, as this is more of a boolean operation. When combining uploaded data with its training data to create answers, the model is more prone to generating potentially inaccurate information.
