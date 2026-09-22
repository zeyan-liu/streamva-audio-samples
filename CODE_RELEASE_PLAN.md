# Future code-release staging

This gallery intentionally separates **listening assets** from a later reproducible model-code release. The inference implementation is under review and is not public. If the paper is accepted, an audited release is planned. Before adding research code to this repository or linking a new code repository:

1. Freeze the exact SMVA configuration corresponding to any public paper table. Keep the Qwen3-TTS and X-VC backend-specific paths distinct.
2. Export only first-party implementation, minimal inference configuration, environment lockfiles, and a small reproducibility smoke test. Audit adapted third-party code and weights against their own licenses.
3. Document chunk activity, dynamic boundary handling, streaming speaker encoding, speaker-ID assignment/state, and each generation backend as separate modules. Mark training-time-only paths versus inference paths.
4. Provide a model/dataset download manifest rather than bundling large checkpoints, private credentials, or restricted data.
5. Publish a checksum-bound example manifest and a command that recreates one paired example without oracle transcripts, RTTM, or speaker identities as inference inputs.
6. Keep VPC2026 privacy/utility and MSA DER reproduction scripts and metrics separate from the handpicked gallery cases.

The release candidate is inventoried privately in the research repository at `release_candidate/README.md`. The existence of that inventory does not claim that all model-code release gates are complete.
