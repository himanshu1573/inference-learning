# The LLM Inference Book

A free, simple-English (B1 level) book that explains how large language models
are served — from the GPU chip up to a production platform on Kubernetes.

The book has **5 phases**, and each phase goes from basic to advanced:

| Phase | Topic | What it covers |
| ----- | ----- | -------------- |
| 1 | GPU Hardware | SMs, Tensor Cores, memory hierarchy, roofline, number formats, interconnects, sizing |
| 2 | Inference Fundamentals | Tokenizer, transformer forward pass, KV cache, attention variants, FlashAttention, quantization |
| 3 | Serving Engines | Batching, PagedAttention, vLLM internals, SGLang, TensorRT-LLM, Dynamo, LMCache |
| 4 | Kubernetes & Cluster | GPU Operator, deploying vLLM, autoscaling, Gateway API Inference Extension, llm-d |
| 5 | Production | SLOs, benchmarking, observability, cost per token, reliability, capstone |

Every chapter has a level (Basic, Intermediate, Advanced, Expert), a "new words"
box, illustrations, worked examples, step-by-step math, optional deep dives and
check-yourself questions.

## Themes

Three reading themes, switchable from the top bar: **Light**, **Dark** and
**Reading** (warm paper colours, serif font, single column).

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Built with [Astro](https://astro.build), MDX and KaTeX. Deploys as a static site
(for example on Vercel with no extra configuration).

## Writing a chapter

1. Find the chapter in `src/data/curriculum.ts` (phase slug + chapter slug).
2. Create `src/content/chapters/<phase-slug>/<chapter-slug>.mdx` with
   `title` and `description` in the frontmatter.
3. Use the components in `src/components/` (`NewWords`, `Callout`, `Figure`,
   `Derivation`, `DeepDive`, `KeyNumbers`, `Quiz`, `Takeaways`) and put SVG
   illustrations in `src/components/figures/`.

The chapter becomes "ready" on the roadmap as soon as the file exists.

### Writing style

- B1 English: short sentences, common words, one idea per sentence.
- Explain every new word the first time it appears.
- Go from the simple picture → how it works → the math → deep dive.
- Use real models and real hardware numbers, and show the calculation.
