# LibreChat Notes 2024-05-30

[LibreChat](https://www.librechat.ai/) is a front end for conversational AI services. It's design is not dissimilar to OpenAI's ChatGPT Web interface, but supports a wide range of services. It's open source, and can be run locally or wherever. They recommend using Docker, which is what I did. I'm on Ubuntu here, they support all the usual desktop platforms.

**LibreChat is in active development, flux likely, so note the date above.**

For starters I wanted to use models from [OpenAI](https://openai.com/index/openai-api/) and [Groq](https://groq.com/). API keys are needed - OpenAI's is pay-as-you-go, Groq is free but capped usage (and very fast).

Following the [Local Installation of LibreChat with Docker](https://www.librechat.ai/docs/local/docker) will get the thing up and basically running with no fuss. But out of the box there are a few things that might not be immediately obvious.

For the OpenAI API key, first copy yours to clipboard then click the dropdown labeled **OpenAI** top-left of screen and click the gear icon to the right of OpenAI on the list. That's it **done**.

For **Groq** it's a little more involved.

I was going around in circles for quite a while until I saw that the instructions for [YAML Setup](https://www.librechat.ai/docs/configuration/librechat_yaml/setup) appear _after_ those for [Custom AI Endpoints](https://www.librechat.ai/docs/configuration/librechat_yaml/ai_endpoints). The former tells you a `docker-compose.override.yml` is needed (a new one from the code on that page worked for me). That points Docker to a `librechat.yaml` file.
Conveniently (for me) their `librechat.example.yaml` file has an entry for Groq, so I just copied & renamed the whole file to `librechat.yaml`. It contains:

```
  custom:
    # Groq Example
    - name: 'groq'
      apiKey: '${GROQ_API_KEY}'
      baseURL: 'https://api.groq.com/openai/v1/'
      ...
```

_However_, I'm no doubt missing something here, but it didn't pick up my environment variable set with:

```
export GROQ_API_KEY=...
```

Probably not best practices, but this is on a local install, so I simply pasted my key instead of the `${GROQ_API_KEY}` bit above.
**It works!!!**

I intend using this quite a lot, so I created a service file for systemd,

in `/etc/systemd/system/librechat.service` :

```
[Unit]
Description=LibreChat
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/home/danny/AI/LibreChat
ExecStart=/usr/bin/docker-compose up
ExecStop=/usr/bin/docker-compose down
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

_Adjust paths to taste_

I always get confused about the order of these, it's something like:

```
sudo systemctl daemon-reload
sudo systemctl enable librechat
sudo systemctl start librechat
```

If you run into probs, try all the usual update procedures for Docker, npm, etc. before tearing your hair out.

I'll be trying some other services soon (I see they have support for Ollama, so that's definitely in my queue). If there's anything useful to share I'll add it here.
