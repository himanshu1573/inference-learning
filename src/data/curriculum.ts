// The full map of the book: 5 phases, each with its chapters, in reading order.
// A chapter is "ready" when a matching MDX file exists in
// src/content/chapters/<phase-slug>/<chapter-slug>.mdx. Everything else shows
// as "coming soon" with the list of things it will teach.

/** 1 = Basic, 2 = Intermediate, 3 = Advanced, 4 = Expert */
export type Level = 1 | 2 | 3 | 4;

export const levelNames: Record<Level, string> = {
  1: 'Basic',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
};

export interface ChapterPlan {
  slug: string;
  level: Level;
  title: string;
  summary: string;
  /** What the reader will learn. Shown on "coming soon" pages and phase pages. */
  learn: string[];
}

export interface Phase {
  num: number;
  slug: string;
  title: string;
  short: string;
  tagline: string;
  goal: string;
  chapters: ChapterPlan[];
}

export const phases: Phase[] = [
  {
    num: 1,
    slug: 'gpu-hardware',
    title: 'GPU Hardware',
    short: 'The machine',
    tagline: 'What is inside the box that runs the model, and why it matters.',
    goal: 'Look at any GPU spec sheet and predict how fast it will run an LLM, and how much memory you need.',
    chapters: [
      {
        slug: 'what-is-inference', level: 1,
        title: 'Start Here: What Is LLM Inference?',
        summary: 'Training vs inference, what a model really is, and how it writes an answer one token at a time.',
        learn: ['Training vs inference', 'A model is a big file of numbers', 'The token-by-token loop', 'Why inference is a big engineering problem'],
      },
      {
        slug: 'why-gpus', level: 1,
        title: 'Why LLMs Run on GPUs',
        summary: 'What an LLM really does for each word, and why a GPU does it much faster than a CPU.',
        learn: ['What a model "is" in memory', 'How many calculations one token needs', 'CPU vs GPU: few strong workers vs many simple workers'],
      },
      {
        slug: 'inside-a-gpu', level: 2,
        title: 'Inside a GPU: SMs, Cores and Tensor Cores',
        summary: 'Open the GPU and meet its parts: SMs, CUDA cores, Tensor Cores and warps.',
        learn: ['What an SM is', 'Threads, warps and blocks', 'Why Tensor Cores make matrix math so fast', 'How to calculate peak FLOPS yourself'],
      },
      {
        slug: 'memory-hierarchy', level: 2,
        title: 'The GPU Memory Hierarchy',
        summary: 'Registers, shared memory, L2 cache and HBM: where data lives and how fast it moves.',
        learn: ['The memory levels from fast-and-small to slow-and-big', 'Bandwidth vs capacity', 'Why moving data costs more than doing math'],
      },
      {
        slug: 'roofline', level: 2,
        title: 'The Roofline Model',
        summary: 'One simple picture that tells you if your work is limited by math or by memory.',
        learn: ['Arithmetic intensity', 'The ridge point of a GPU', 'Why LLM decode is memory-bound', 'How batching helps'],
      },
      {
        slug: 'number-formats', level: 2,
        title: 'Number Formats: FP32 to FP4',
        summary: 'How numbers are stored in bits, and why smaller numbers make inference faster and cheaper.',
        learn: ['Sign, exponent and mantissa', 'FP32, FP16, BF16, FP8, INT8, FP4', 'Memory needed for a model in each format'],
      },
      {
        slug: 'connecting-gpus', level: 3,
        title: 'Connecting GPUs: PCIe, NVLink and InfiniBand',
        summary: 'When one GPU is not enough: how GPUs talk to each other inside a server and across servers.',
        learn: ['PCIe, NVLink and NVSwitch', 'InfiniBand and RoCE between servers', 'Ring all-reduce and its cost'],
      },
      {
        slug: 'choosing-hardware', level: 2,
        title: 'Choosing Hardware: Will My Model Fit?',
        summary: 'Put it all together: calculate memory for weights and KV cache, and pick the right GPU.',
        learn: ['The GPU memory budget', 'KV cache size per token', 'Comparing H100, H200, B200, MI300X and more'],
      },
    ],
  },
  {
    num: 2,
    slug: 'inference-fundamentals',
    title: 'Inference Fundamentals',
    short: 'The layers',
    tagline: 'What happens inside the model, step by step, from your prompt to the answer.',
    goal: 'Trace a request through tokenizer, transformer layers and sampler, and explain every optimisation that makes it fast.',
    chapters: [
      { slug: 'life-of-a-request', level: 1, title: 'The Life of a Request', summary: 'Follow one prompt from the moment you press Enter to the last word of the answer.', learn: ['The full request path', 'Prefill and decode at a high level', 'Where time is spent'] },
      { slug: 'tokenization', level: 1, title: 'Tokens and Tokenizers', summary: 'How text becomes numbers: BPE, vocabularies and why tokens are not words.', learn: ['Byte Pair Encoding', 'Vocabulary size', 'Tokens per word in practice'] },
      { slug: 'embeddings', level: 1, title: 'Embeddings and Positions', summary: 'How each token becomes a vector, and how the model knows the order of tokens (RoPE).', learn: ['Embedding tables', 'Hidden size', 'Rotary position embeddings'] },
      { slug: 'transformer-forward-pass', level: 2, title: 'Inside the Forward Pass', summary: 'Attention, MLP, normalisation: one transformer layer explained with shapes and FLOPs.', learn: ['Q, K, V projections', 'Attention step by step', 'The MLP block', 'FLOPs per layer'] },
      { slug: 'sampling', level: 1, title: 'Sampling: Choosing the Next Token', summary: 'Logits, softmax, temperature, top-k and top-p, made simple.', learn: ['Softmax', 'Temperature', 'Top-k and top-p', 'Greedy vs random'] },
      { slug: 'prefill-vs-decode', level: 2, title: 'Prefill and Decode', summary: 'Why reading the prompt and writing the answer are two very different jobs for the GPU.', learn: ['Compute-bound prefill', 'Memory-bound decode', 'Arithmetic intensity of each'] },
      { slug: 'kv-cache', level: 2, title: 'The KV Cache', summary: 'The memory trick that stops the model from repeating work, and the price you pay for it.', learn: ['Why K and V can be saved', 'KV cache size formula', 'Memory growth with context length'] },
      { slug: 'attention-variants', level: 3, title: 'Sharing Heads: MHA, MQA, GQA and MLA', summary: 'How new models make the KV cache much smaller by sharing keys and values.', learn: ['Multi-head attention', 'Multi-query and grouped-query attention', 'Multi-head latent attention'] },
      { slug: 'flash-attention', level: 3, title: 'FlashAttention', summary: 'Attention that respects the memory hierarchy: tiling, online softmax and fewer HBM trips.', learn: ['Why naive attention is slow', 'Tiling and online softmax', 'FlashAttention 1, 2 and 3'] },
      { slug: 'kernels-and-graphs', level: 3, title: 'Kernel Fusion and CUDA Graphs', summary: 'Why launching many small GPU programs is slow, and how fusion and graphs fix it.', learn: ['What a kernel is', 'Kernel fusion', 'CUDA Graphs and torch.compile'] },
      { slug: 'quantization', level: 3, title: 'Quantization: GPTQ, AWQ and FP8', summary: 'Making models smaller without breaking them.', learn: ['Weight-only vs weight-and-activation', 'GPTQ and AWQ', 'FP8 and FP4 inference'] },
      { slug: 'speculative-decoding', level: 3, title: 'Speculative Decoding', summary: 'Guess several tokens cheaply, check them all at once, keep the correct ones.', learn: ['Draft and target models', 'Acceptance rate math', 'EAGLE and n-gram methods'] },
      { slug: 'mixture-of-experts', level: 3, title: 'Mixture of Experts', summary: 'Models where each token only uses a few experts, and what that means for serving.', learn: ['Router and experts', 'Active vs total parameters', 'Memory vs compute in MoE'] },
      { slug: 'metrics', level: 2, title: 'Metrics That Matter', summary: 'TTFT, TPOT, throughput and goodput: how to measure an inference system.', learn: ['Time to first token', 'Time per output token', 'Throughput vs latency', 'Goodput'] },
    ],
  },
  {
    num: 3,
    slug: 'serving-engines',
    title: 'Serving Engines',
    short: 'vLLM, SGLang, Dynamo',
    tagline: 'The software that turns a model into a fast, shared service.',
    goal: 'Explain how vLLM, SGLang, TensorRT-LLM and Dynamo schedule requests and manage GPU memory, and choose the right one.',
    chapters: [
      { slug: 'what-is-a-serving-engine', level: 1, title: 'What a Serving Engine Does', summary: 'Why you cannot just call model.generate() in production.', learn: ['The jobs of a serving engine', 'OpenAI-compatible APIs', 'The main engines today'] },
      { slug: 'batching', level: 2, title: 'From Static to Continuous Batching', summary: 'How serving many users together makes the GPU much more useful.', learn: ['Static batching and its waste', 'Continuous (in-flight) batching', 'Iteration-level scheduling'] },
      { slug: 'paged-attention', level: 2, title: 'PagedAttention and the Block Manager', summary: 'Borrowing an idea from operating systems to stop wasting KV cache memory.', learn: ['Fragmentation', 'Blocks and block tables', 'Copy-on-write sharing'] },
      { slug: 'vllm-architecture', level: 3, title: 'vLLM Architecture', summary: 'The engine core, scheduler, KV cache manager, workers and model runner.', learn: ['vLLM V1 design', 'Processes and their jobs', 'Key configuration options'] },
      { slug: 'anatomy-of-a-vllm-step', level: 3, title: 'Anatomy of a vLLM Step', summary: 'One engine step, from scheduler decision to streamed token, with real numbers.', learn: ['Startup memory partition', 'Block allocation', 'Scheduling a step', 'Preemption'] },
      { slug: 'chunked-prefill', level: 3, title: 'Chunked Prefill', summary: 'Splitting long prompts so they do not block other users.', learn: ['Token budget per step', 'Mixing prefill and decode', 'Effect on TTFT and TPOT'] },
      { slug: 'prefix-caching', level: 2, title: 'Prefix Caching', summary: 'Re-using the KV cache when many requests start with the same text.', learn: ['Hashing blocks', 'Cache hit rate', 'When prefix caching helps'] },
      { slug: 'parallelism', level: 3, title: 'Splitting Models Across GPUs', summary: 'Tensor, pipeline, data and expert parallelism, with their costs.', learn: ['Tensor parallelism', 'Pipeline parallelism', 'Data and expert parallelism', 'Choosing a layout'] },
      { slug: 'sglang', level: 3, title: 'SGLang and RadixAttention', summary: 'A serving engine built around sharing prefixes with a radix tree.', learn: ['RadixAttention', 'Structured outputs', 'The SGLang runtime'] },
      { slug: 'tensorrt-llm', level: 3, title: 'TensorRT-LLM', summary: 'NVIDIA’s compiled engine: building engines and running them with Triton.', learn: ['Engine building', 'In-flight batching', 'When to choose it'] },
      { slug: 'disaggregated-serving', level: 4, title: 'Disaggregated Prefill and Decode', summary: 'Running prefill and decode on different GPUs, and moving the KV cache between them.', learn: ['Why split the phases', 'KV transfer cost', 'P/D ratios'] },
      { slug: 'dynamo', level: 4, title: 'NVIDIA Dynamo', summary: 'A data-centre-scale layer on top of engines: KV-aware routing and disaggregation.', learn: ['Dynamo components', 'KV-aware router', 'NIXL data transfer'] },
      { slug: 'lmcache', level: 4, title: 'LMCache: Offloading and Sharing KV Cache', summary: 'Storing KV cache in CPU memory and disk, and sharing it between engines.', learn: ['KV offloading tiers', 'Cache sharing across instances', 'Integration with vLLM'] },
      { slug: 'choosing-an-engine', level: 2, title: 'Choosing an Engine', summary: 'vLLM, SGLang, TensorRT-LLM, llama.cpp: a practical comparison.', learn: ['Strengths of each engine', 'Hardware support', 'A decision guide'] },
    ],
  },
  {
    num: 4,
    slug: 'kubernetes',
    title: 'Kubernetes & Cluster',
    short: 'The platform',
    tagline: 'Running many engines on many machines, and routing users to the right one.',
    goal: 'Deploy, scale and route LLM servers on Kubernetes using GPU Operator, Gateway API Inference Extension and llm-d.',
    chapters: [
      { slug: 'containers-and-gpus', level: 1, title: 'Containers and GPUs', summary: 'How a container gets access to a GPU: drivers, CUDA and the container toolkit.', learn: ['Driver vs CUDA runtime', 'NVIDIA Container Toolkit', 'Building inference images'] },
      { slug: 'kubernetes-basics', level: 1, title: 'Kubernetes Basics for Inference', summary: 'Pods, Deployments, Services and resources, explained for LLM serving.', learn: ['Pods and Deployments', 'Services and Ingress', 'Requests and limits'] },
      { slug: 'gpu-operator', level: 2, title: 'GPUs in Kubernetes', summary: 'Device plugin, GPU Operator, MIG and time-slicing.', learn: ['The device plugin', 'GPU Operator', 'MIG and sharing GPUs'] },
      { slug: 'deploying-vllm-on-k8s', level: 2, title: 'Deploying vLLM on Kubernetes', summary: 'A full, working deployment with health checks and model caching.', learn: ['Manifests step by step', 'Readiness and liveness', 'Shared memory and model volumes'] },
      { slug: 'model-loading', level: 2, title: 'Model Storage and Fast Loading', summary: 'Why startup takes minutes, and how to make it take seconds.', learn: ['Where weights come from', 'PVCs, object storage and caches', 'Fast loaders'] },
      { slug: 'autoscaling', level: 3, title: 'Autoscaling LLM Servers', summary: 'Scaling on the right signal: queue length and KV cache use, not CPU.', learn: ['Why CPU metrics fail', 'HPA and KEDA', 'Scale-to-zero and cold starts'] },
      { slug: 'multi-node', level: 3, title: 'Multi-Node Serving', summary: 'Serving models too big for one machine with LeaderWorkerSet and Ray.', learn: ['LeaderWorkerSet', 'Ray clusters', 'Networking for multi-node'] },
      { slug: 'gateway-api-inference', level: 3, title: 'Gateway API Inference Extension', summary: 'Smart load balancing that understands queues, LoRA adapters and KV cache.', learn: ['InferencePool and InferenceModel', 'Endpoint picker', 'Load-aware routing'] },
      { slug: 'llm-d', level: 4, title: 'llm-d: Distributed Inference on Kubernetes', summary: 'A Kubernetes-native stack for KV-aware routing and disaggregated serving.', learn: ['llm-d architecture', 'Inference scheduler', 'Disaggregation on Kubernetes'] },
      { slug: 'semantic-router', level: 3, title: 'Semantic Router', summary: 'Sending each request to the right model based on what it asks.', learn: ['Intent classification', 'Model selection', 'Cost and quality trade-offs'] },
      { slug: 'kserve', level: 2, title: 'KServe and Other Platforms', summary: 'Higher-level platforms that package all of this for you.', learn: ['KServe', 'Managed services', 'Build vs buy'] },
    ],
  },
  {
    num: 5,
    slug: 'production',
    title: 'Production',
    short: 'Running it for real',
    tagline: 'Measuring, paying for and protecting an inference service that real users depend on.',
    goal: 'Set SLOs, benchmark properly, monitor the right metrics, calculate cost per token and design a full inference platform.',
    chapters: [
      { slug: 'slos', level: 2, title: 'SLOs for LLM Services', summary: 'Setting promises about speed and uptime that you can really keep.', learn: ['SLIs, SLOs and SLAs', 'Percentiles (p50, p99)', 'Choosing targets'] },
      { slug: 'benchmarking', level: 2, title: 'Benchmarking and Load Testing', summary: 'How to benchmark an LLM server without fooling yourself.', learn: ['Workload shapes', 'Benchmark tools', 'Reading the results'] },
      { slug: 'observability', level: 2, title: 'Observability', summary: 'The metrics, logs and traces that tell you what your servers are doing.', learn: ['Key engine metrics', 'Prometheus and Grafana', 'Tracing requests'] },
      { slug: 'cost', level: 2, title: 'The Cost of a Token', summary: 'From GPU price per hour to dollars per million tokens, step by step.', learn: ['Cost per million tokens', 'Utilisation', 'Ways to cut cost'] },
      { slug: 'reliability', level: 3, title: 'Reliability and Rollouts', summary: 'GPU failures, retries, timeouts and safe model upgrades.', learn: ['Failure modes', 'Retries and timeouts', 'Canary rollouts'] },
      { slug: 'security', level: 3, title: 'Security and Multi-Tenancy', summary: 'Keeping users, data and models safe on shared GPUs.', learn: ['Isolation', 'Rate limits and quotas', 'Prompt and data safety'] },
      { slug: 'capstone', level: 4, title: 'Capstone: Design an Inference Platform', summary: 'Use everything in the book to design a real platform from scratch.', learn: ['Requirements to hardware', 'Engine and cluster design', 'Cost and SLO check'] },
    ],
  },
];

export const totalChapters = phases.reduce((n, p) => n + p.chapters.length, 0);

export function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function findChapter(phaseSlug: string, chapterSlug: string) {
  const phase = phases.find((p) => p.slug === phaseSlug);
  if (!phase) return undefined;
  const index = phase.chapters.findIndex((c) => c.slug === chapterSlug);
  if (index === -1) return undefined;
  return { phase, chapter: phase.chapters[index], index };
}

/** All chapters in reading order across the whole book, for prev/next links. */
export const readingOrder = phases.flatMap((phase) =>
  phase.chapters.map((chapter, index) => ({ phase, chapter, index })),
);
