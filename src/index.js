/**
 * QueryGraph browser exploration utilities.
 * graphEdgeKey and graphNodePosition extracted from querygraph/devreal's
 * lib/graph-exploration.ts. Licensed under NoJVM 1.0; see LICENSE.md.
 */

/** Undirected endpoint-pair key for visual highlighting; not a relationship ID. */
export function graphEdgeKey(edge) {
  return edge.source < edge.target
    ? `${edge.source}\u0000${edge.target}`
    : `${edge.target}\u0000${edge.source}`;
}

/** Deterministic initial positions in a 100 × 100 graph viewport. */
export function graphNodePosition(index, count) {
  const coordinate = (value) => Number(value.toFixed(4));
  if (index === 0 || count <= 1) return { x: 50, y: 48 };
  const angle = (index - 1) * Math.PI * (3 - Math.sqrt(5));
  const radius = Math.sqrt(index / Math.max(count - 1, 1));
  return {
    x: coordinate(50 + Math.cos(angle) * 40 * radius),
    y: coordinate(48 + Math.sin(angle) * 34 * radius),
  };
}

/**
 * Index an already-loaded graph. Dangling edges are ignored. Parallel
 * relationships remain separate and retain their exact source objects.
 */
export function buildGraphIndex(nodes, edges, { directed = false } = {}) {
  const nodeById = new Map();
  const adjacency = new Map();
  const degrees = new Map();
  for (const node of nodes) {
    if (nodeById.has(node.id)) throw new Error(`Duplicate graph node ID: ${node.id}`);
    nodeById.set(node.id, node);
    adjacency.set(node.id, []);
    degrees.set(node.id, 0);
  }
  for (const edge of edges) {
    if (!nodeById.has(edge.source) || !nodeById.has(edge.target)) continue;
    adjacency.get(edge.source).push({ neighbor: edge.target, edge });
    degrees.set(edge.source, degrees.get(edge.source) + 1);
    if (edge.source !== edge.target) {
      if (!directed) adjacency.get(edge.target).push({ neighbor: edge.source, edge });
      degrees.set(edge.target, degrees.get(edge.target) + 1);
    }
  }
  return { nodeById, adjacency, degrees };
}

/** Breadth-first shortest path across loaded evidence, including original edges. */
export function shortestGraphPath(index, sourceId, targetId, { maxDepth = Infinity, edgeKinds } = {}) {
  if (!(maxDepth === Infinity || Number.isInteger(maxDepth) && maxDepth >= 0)) {
    throw new RangeError("maxDepth must be a nonnegative integer or Infinity");
  }
  if (!index.nodeById.has(sourceId) || !index.nodeById.has(targetId)) return null;
  if (sourceId === targetId) return { nodes: [index.nodeById.get(sourceId)], edges: [] };
  const acceptedKinds = edgeKinds ? new Set(edgeKinds) : null;
  const parents = new Map();
  const visited = new Set([sourceId]);
  const queue = [{ id: sourceId, depth: 0 }];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const { id, depth } = queue[cursor];
    if (depth >= maxDepth) continue;
    for (const { neighbor, edge } of index.adjacency.get(id) || []) {
      if (visited.has(neighbor) || !index.nodeById.has(neighbor)) continue;
      if (acceptedKinds && !acceptedKinds.has(edge.kind ?? edge.label ?? "")) continue;
      visited.add(neighbor);
      parents.set(neighbor, { id, edge });
      if (neighbor === targetId) {
        const nodes = [index.nodeById.get(targetId)];
        const edges = [];
        let current = targetId;
        while (current !== sourceId) {
          const parent = parents.get(current);
          edges.push(parent.edge);
          nodes.push(index.nodeById.get(parent.id));
          current = parent.id;
        }
        return { nodes: nodes.reverse(), edges: edges.reverse() };
      }
      queue.push({ id: neighbor, depth: depth + 1 });
    }
  }
  return null;
}

const searchKey = (value) => String(value ?? "").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * Free local text/type/tribe filtering. Query tokens are ANDed against name,
 * label, headline, subtitle, description, roles, and ID. Input order is kept.
 */
export function filterGraphNodes(nodes, { query = "", kind, tribe, limit = Infinity } = {}) {
  if (!(limit === Infinity || Number.isInteger(limit) && limit >= 0)) {
    throw new RangeError("limit must be a nonnegative integer or Infinity");
  }
  if (limit === 0) return [];
  const terms = searchKey(query).trim().split(/\s+/u).filter(Boolean);
  const matches = [];
  for (const node of nodes) {
    if (kind && kind !== "all" && node.kind !== kind) continue;
    if (tribe && tribe !== "all" && !(node.tribes || []).includes(tribe)) continue;
    const searchable = searchKey([node.name, node.label, node.headline, node.subtitle, node.description,
      ...(node.roles || []), node.id].filter(Boolean).join(" "));
    if (!terms.every((term) => searchable.includes(term))) continue;
    matches.push(node);
    if (matches.length >= limit) break;
  }
  return matches;
}

/** Explicit node membership only; never infer a tribe from a connection. */
export function graphTribeMembers(nodes, tribeId) {
  return nodes.filter((node) => (node.tribes || []).includes(tribeId));
}
