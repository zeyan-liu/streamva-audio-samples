# SMVA audio samples

Static, GitHub Pages-ready listening supplement for **SMVA: A Streaming Multi-Speaker Voice Anonymization Method for Real-Time Conversations**.

The gallery contains 12 paired MSA clean development conversations: three each with 2, 3, 4, and 5 speakers. Every row lets a listener compare the source conversation with Qwen3-TTS and X-VC anonymized reconstructions of that same session. The website does **not** report these handpicked examples as official MSA DER or held-out performance.

A separate section embeds the MSA authors' [published audio examples](https://xiaoxiaomiao323.github.io/msa-audio/) (ORI, RES, SELECT, DS, AS; one predicted-RTTM conversation for each of 2–5 speakers). Those example sessions are **different** from our 12 paired development sessions. Their audio remains hosted by the MSA authors, not in this repository.

## Contents

- `dist/` — the local, self-contained static website and browser-compatible audio files. The published GitHub Pages snapshot places these files at the repository root, with audio under `audio/spk2`–`audio/spk5`.
- `AUDIO_PROVENANCE.md` — dataset attribution, experiment roots, and selection scope.
- `CODE_RELEASE_PLAN.md` — intended structure and validation gates for a later model-code release. No model weights or private evaluation assets are included.

## Run locally

From `dist/`, start any static HTTP server, then open its printed local URL. For example, `python3 -m http.server 8765` serves the gallery at `http://localhost:8765/`.

## GitHub Pages

The published repository serves the website from the `main` branch root. The local `dist/` directory is its staging copy. It does not publish training code or raw project directories. Audio files are intentionally tracked as site assets; do not add an all-audio Git LFS rule because ordinary GitHub Pages cannot play LFS pointer files.

## Audio terms

The source conversations derive from the [MSA benchmark](https://github.com/xiaoxiaomiao323/MSA) and [LibriSpeech](https://www.openslr.org/12/). MSA documents an Attribution-NonCommercial 4.0 license for its project; LibriSpeech is CC BY 4.0. This repository's code license, if added later, must not be assumed to grant a new license for the source or generated audio. Preserve attribution and check upstream terms before redistributing the audio elsewhere.
