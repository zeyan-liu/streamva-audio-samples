# Audio provenance and limitations

All 12 case IDs and the original three-way file paths are recorded in the local research artifact `artifacts/qwen_xvc_gallery_20260921/README.md`. The first gallery version copies exactly those case IDs.

| Website column | Original experiment storage |
|---|---|
| Source | `/scratch-data/zeynliu/voice-anonymization-research-2026/data/raw/msa/msa_data/clean/spkN/wavs/` |
| Qwen3-TTS | `/lustre-data/zeynliu/qwen3tts_overflow_paired64_20260903_v2/overflow/reconstructed_clean/spkN/` |
| X-VC | `/lustre-data/zeynliu/xvc_overflow_paired64_20260903_v2/reconstructed_clean/spkN/` |

The Qwen3-TTS samples use the native 0.6B backend and native 1024-dimensional pool, with the overflow-routing development experiment described in `docs/qwen3tts_overflow_pair_20260903.md` in the private research workspace. The X-VC samples come from the corresponding paired 64-session X-VC experiment. The two backends have different conditioning mechanisms. Their audio is paired by **source session ID**, not claimed to share identical target conditions.

The original 16-kHz floating-point source WAVs were converted to 16-kHz, 16-bit PCM copies for browser playback. Qwen3-TTS and X-VC WAVs were already 16-kHz PCM and were copied without resynthesis. The original research artifacts remain unchanged.

These cases were selected from an inspected development subset. Their role is qualitative comparison only. They are not a random sample, a held-out test set, or a replacement for the official MSA stage-7/md-eval protocol. The site's technical claims should be read alongside the complete experimental results in the paper.

Attribution: [MSA benchmark](https://github.com/xiaoxiaomiao323/MSA), Xiaoxiao Miao et al.; [LibriSpeech](https://www.openslr.org/12/), Vassil Panayotov et al. No blanket relicensing of these audio files is asserted here.

## Official MSA author-hosted examples

The Official MSA section references the authors' public `predict_rttm/{ori,res,select,ds,as}` audio files from [their audio site](https://xiaoxiaomiao323.github.io/msa-audio/) ([repository](https://github.com/xiaoxiaomiao323/msa-audio), inspected at commit `7d2b48e`). One conversation is shown for each of 2, 3, 4, and 5 speakers. The example session IDs differ from all 12 cases in our paired gallery. They therefore support listening to the official methods but are **not** a same-input A/B comparison with our generated audio. Their files are not copied or re-licensed in this repository; browser players request the original author-hosted URLs.
