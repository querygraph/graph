/** Minimum node contract. Additional properties and object identity are preserved. */
export interface GraphNode {
  id: string;
  kind: string;
  name?: string;
  label?: string;
  headline?: string;
  subtitle?: string;
  description?: string;
  roles?: readonly string[];
  tribes?: readonly string[];
  /** Explicit prior node IDs, never unreviewed name matches. */
  aliases?: readonly string[];
}
export interface GraphEdge {
  source: string;
  target: string;
  kind?: string;
  label?: string;
}
export interface GraphNeighbor<E extends GraphEdge = GraphEdge> {
  neighbor: string;
  edge: E;
}
export interface GraphIndex<N extends GraphNode = GraphNode, E extends GraphEdge = GraphEdge> {
  nodeById: Map<string, N>;
  adjacency: Map<string, GraphNeighbor<E>[]>;
  /** Incident relationship count, regardless of traversal direction; self-loops count once. */
  degrees: Map<string, number>;
}
export interface GraphPath<N extends GraphNode = GraphNode, E extends GraphEdge = GraphEdge> {
  nodes: N[];
  edges: E[];
}
/** Undirected endpoint pair key. Distinct relationship kinds share a visual key. */
export function graphEdgeKey(edge: Pick<GraphEdge, "source" | "target">): string;
/** Zero-based index in [0,count). Returns percent coordinates, deterministic across renders. */
export function graphNodePosition(index: number, count: number): { x: number; y: number };
/** Ignores dangling edges; throws on duplicate node IDs. Default traversal is undirected. */
export function buildGraphIndex<N extends GraphNode, E extends GraphEdge>(
  nodes: readonly N[], edges: readonly E[], options?: { directed?: boolean }
): GraphIndex<N, E>;
/** Returns null for missing endpoints, no path, or no path within maxDepth. */
export function shortestGraphPath<N extends GraphNode, E extends GraphEdge>(
  index: GraphIndex<N, E>, sourceId: string, targetId: string,
  options?: { maxDepth?: number; edgeKinds?: Iterable<string> }
): GraphPath<N, E> | null;
export interface GraphNodeFilter {
  query?: string;
  kind?: string;
  tribe?: string;
  limit?: number;
}
/** Case/diacritic-insensitive token search. Filters combine; input order is preserved. */
export function filterGraphNodes<N extends GraphNode>(nodes: readonly N[], filter?: GraphNodeFilter): N[];
/** Uses explicit node.tribes memberships, retaining original nodes and order. */
export function graphTribeMembers<N extends GraphNode>(nodes: readonly N[], tribeId: string): N[];
export interface GraphIdentityIndex<N extends GraphNode = GraphNode> {
  nodeById: Map<string, N>;
  canonicalIdByAlias: Map<string, string>;
}
/** Throws on duplicate IDs, conflicting aliases, or aliases shadowing another canonical node. */
export function buildGraphIdentityIndex<N extends GraphNode>(nodes: readonly N[]): GraphIdentityIndex<N>;
/** Matches IDs and explicit aliases only. Never matches a display name. */
export function resolveGraphNode<N extends GraphNode>(index: GraphIdentityIndex<N>, id: string): N | undefined;
