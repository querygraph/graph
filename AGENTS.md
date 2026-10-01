# QueryGraph browser graph utilities

- This package contains framework-neutral, dependency-free browser exploration code.
- Preserve exact node and edge objects so applications keep provenance and domain metadata.
- Applications own authorization, persistence, source ingestion, server-side graph queries, and rendering.
- `src/index.js` is shipped directly with `src/index.d.ts`; no consumer build step is required.
- Keep declarations and runtime behavior aligned. Run `npm test` before committing changes.
- Consumers pin an immutable Git commit. Coordinate API changes with Devreal and Anthropology.
- The edge key and initial layout came from Devreal and retain its NoJVM license; retain attribution and the license.
