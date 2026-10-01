# @querygraph/graph

Dependency-free browser graph exploration shared by [Devreal](https://devreal.ai)
and [Anthropology](https://anthropolo.gy). Ships native ESM with TypeScript
declarations; no build, framework, database, or network access is required.

Install an immutable reviewed commit:

```sh
npm install @querygraph/graph@github:querygraph/graph#<full-commit-sha>
```

```js
import {
  buildGraphIndex, shortestGraphPath, filterGraphNodes,
  graphTribeMembers, graphNodePosition, graphEdgeKey,
} from "@querygraph/graph";

const index = buildGraphIndex(nodes, edges);
const matching = filterGraphNodes(nodes, { query: "founder", kind: "person" });
const alumni = graphTribeMembers(nodes, "sun-alumni");
const path = shortestGraphPath(index, "scott-mcnealy", "vinod-khosla");
const position = graphNodePosition(1, nodes.length);
const highlightedPair = graphEdgeKey(edges[0]);
```

Nodes require `id` and `kind`; text filtering recognizes `name` (Anthropology),
`label` (Devreal), `headline`, `subtitle`, `description`, `roles`, and `id`.
Optional `tribes` contains explicit tribe IDs. Edges require string `source`
and `target`; `kind` or fallback `label` identifies the relationship type.
All returned nodes and edges retain their original object identity and metadata,
including source citations. Inputs are never mutated.

## Semantics

- `buildGraphIndex(nodes, edges, {directed?})` creates `nodeById`, `adjacency`,
  and `degrees` maps. Duplicate node IDs throw. Dangling edges are ignored.
  Parallel edges remain distinct. Isolates are indexed. Degrees count incident
  edges (self-loops once), including incoming edges in directed mode.
- `shortestGraphPath(index, sourceId, targetId, {maxDepth?, edgeKinds?})`
  returns `{nodes, edges}` in traversal order, or `null`. Defaults to unbounded
  BFS on the loaded graph; build a directed index for directed paths. A zero-hop
  path returns one node and no edges. Ties follow source edge order. Edges retain
  their original direction even when traversed backward. This function discovers
  recorded connections; it makes no claim about a personal relationship.
- `filterGraphNodes(nodes, {query?, kind?, tribe?, limit?})` combines filters.
  Whitespace-separated search terms must all match, ignoring case and diacritics.
  Input order is retained. `"all"` disables kind/tribe filtering. Nonnegative
  integer limits are supported, including zero; the default is unlimited.
- `graphTribeMembers(nodes, tribeId)` uses exact, explicit membership only.
- `buildGraphIdentityIndex(nodes)` indexes canonical IDs and explicit legacy IDs
  in `node.aliases`. `resolveGraphNode(index, id)` returns the original canonical
  node for either ID. Names never establish identity. Duplicate node IDs,
  ambiguous aliases, or aliases shadowing another canonical ID throw rather
  than silently merging different people.
- `graphNodePosition(index, count)` takes an in-range zero-based index and
  returns deterministic viewport percentages. The first node is at `(50,48)`;
  subsequent nodes use Devreal's golden-angle layout with a padded border.
- `graphEdgeKey({source, target})` is an undirected visual endpoint-pair key.
  It intentionally ignores relationship kind and is **not** a database key or
  a deduplication key for distinct evidence. Node IDs must not contain NUL.

These functions operate on the graph already loaded in the browser. Applications
own evidence review, server queries, crawling, persistence, rendering, access
control, rate limits, and tier enforcement. Ontology selection lives separately
in `querygraph/ontology` and Verdun.

## Development and attribution

Run `npm test` with Node 22 or newer. Tests cover directed and undirected paths,
cycles, parallel edges, depth and type limits, disconnected nodes, provenance
identity, combined text filters, tribe membership, and layout compatibility.

The edge-pair key and initial layout are extracted without behavioral changes
from [querygraph/devreal](https://github.com/querygraph/devreal),
`lib/graph-exploration.ts`. The index, shortest-path, filtering, and tribe APIs
extend those browser primitives for reuse across both applications.

Licensed under the [NoJVM License 1.0](LICENSE.md), retaining Devreal's license.
Attribution is required; incorporation into JVM-based systems is excluded.
