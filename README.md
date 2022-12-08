# GPTCommentDetector

A UserScript to detect GPT generated comments on Hackernews.

![image](https://github.com/chryzsh/GPTCommentDetector/raw/main/screenshot/screenshot1.png)

This is a browser UserScript that tries to detect comments on [Hacker News](https://news.ycombinator.com/) that are GPT/OpenAI generated [ChatGPT](https://chatgpt.com/). It is based on [GPT output detector](https://huggingface.co/openai-detector).

# How it works

It puts every comment into the [GPT output detector](https://huggingface.co/openai-detector) and colors and writes a short comment on the HN comment based on its assessment, like you see in the screenshot. This is based on a threshold set by me. >0.7 is probably AI, >0.9 is definitely AI. Lower than that is most likely human. Most comments on HN still appear to be human.

It only becomes reliable after about 50 tokens (one token is around 4 characters) so I mark the comments that are too short with gray and make no assessment on those.

Remember that when using thisthe point is to detect comments obviously written completely by GPT, not detecting that a human a wrote it. You have to discern between the two, as the scale is not really utilized here. What I've found over the last few days of playing with this is that most AI generated text will almost always be identified with 99.97% probability , while human text ranges somewhere between 70-98. So I could move the threshold for my script quite a lot. I just wanted to see how it works with these thresholds for a while.

# Disclaimer

I know pretty much nothing about Javascript. This is shitty code largely
written by ChatGPT itself, untested beyond Chrome on MacOS, and no plans for
maintenance or extends. If you want features or support, you have to ask
ChatGPT, not me.

# Install

## Prerequisites

Install **(Violentmonkey[https://violentmonkey.github.io/]**

Alternative: Install **Tampermonkey** **（[Chrome](https://www.tampermonkey.net/)** / **[Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)** / **[Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd?hl=zh-CN)）**


## UserScript

| Greasyfork                                                                         | GitHub                                                                                       |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Not published yet]() | [Github](https://github.com/chryzsh/GPTCommentDetector/raw/main/gpt-comment-detector.js)

# Example

## Screenshot
![Detected](https://github.com/chryzsh/GPTCommentDetector/raw/main/screenshot/screenshot2.png)
