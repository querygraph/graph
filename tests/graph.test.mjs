import assert from "node:assert/strict";
import test from "node:test";
import {
  buildGraphIndex, shortestGraphPath, filterGraphNodes,
  graphTribeMembers, graphNodePosition, graphEdgeKey,
} from "../src/index.js";

const nodes = Object.freeze([
  Object.freeze({ id: "person:scott", name: "Scott McNealy", kind: "person", headline: "Sun cofounder", tribes: ["sun"], sourceIds: ["official"] }),
  Object.freeze({ id: "sun", name: "Sun Microsystems", kind: "organization", description: "Workstation company", tribes: ["sun"] }),
  Object.freeze({ id: "person:vinod", name: "Vinod Khosla", kind: "person", roles: ["founder", "investor"], tribes: ["sun"] }),
  Object.freeze({ id: "person:jose", label: "José García", kind: "person", subtitle: "Research engineer", tribes: [] }),
  Object.freeze({ id: "isolated", name: "Isolated", kind: "person" }),
]);
const edges = Object.freeze([
  Object.freeze({ source: "person:scott", target: "sun", kind: "founded", sourceIds: ["official"] }),
  Object.freeze({ source: "person:vinod", target: "sun", kind: "founded", sourceIds: ["official"] }),
  Object.freeze({ source: "person:vinod", target: "person:jose", label: "worked with", sourceIds: ["dated-bio"] }),
]);

test("index preserves provenance, isolates, parallel edges and ignores missing endpoints", () => {
  const parallel = { ...edges[0], kind: "led" };
  const index = buildGraphIndex(nodes, [...edges, parallel, { source: "missing", target: "sun" }]);
  assert.equal(index.nodeById.get(nodes[0].id), nodes[0]);
  assert.equal(index.adjacency.get(nodes[0].id)[0].edge, edges[0]);
  assert.equal(index.adjacency.get(nodes[0].id).length, 2);
  assert.deepEqual(index.adjacency.get("isolated"), []);
  assert.equal(index.degrees.get("sun"), 3);
  assert.equal(index.nodeById.has("missing"), false);
  assert.throws(() => buildGraphIndex([nodes[0], nodes[0]], []), /Duplicate graph node ID/);
});

test("shortest paths can traverse backward while preserving original edge direction and evidence", () => {
  const path = shortestGraphPath(buildGraphIndex(nodes, edges), "person:scott", "person:vinod");
  assert.deepEqual(path.nodes.map((node) => node.id), ["person:scott", "sun", "person:vinod"]);
  assert.equal(path.nodes[0], nodes[0]);
  assert.deepEqual(path.edges, [edges[0], edges[1]]);
  assert.equal(path.edges[1], edges[1]);
  assert.equal(path.edges[1].source, "person:vinod");
});

test("directed paths honor direction and retain incident degrees", () => {
  const index = buildGraphIndex(nodes, edges, { directed: true });
  assert.equal(shortestGraphPath(index, "person:scott", "person:vinod"), null);
  assert.equal(shortestGraphPath(index, "sun", "person:scott"), null);
  assert.deepEqual(shortestGraphPath(index, "person:scott", "sun").edges, [edges[0]]);
  assert.equal(index.degrees.get("sun"), 2);
  assert.equal(index.adjacency.get("sun").length, 0);
});

test("cycles, parallel edges and self-loops cannot derail a shortest path", () => {
  const short = { source: "person:scott", target: "person:jose", kind: "met" };
  const index = buildGraphIndex(nodes, [...edges, edges[0], { source: "sun", target: "sun", kind: "self" }, short]);
  const path = shortestGraphPath(index, "person:scott", "person:jose");
  assert.deepEqual(path.nodes.map((node) => node.id), ["person:scott", "person:jose"]);
  assert.equal(path.edges[0], short);
  assert.equal(index.degrees.get("sun"), 4);
});

test("missing, disconnected and depth-limited paths return null; existing same-node path is zero hops", () => {
  const index = buildGraphIndex(nodes, edges);
  assert.equal(shortestGraphPath(index, "missing", "missing"), null);
  assert.equal(shortestGraphPath(index, "person:scott", "isolated"), null);
  assert.equal(shortestGraphPath(index, "person:scott", "person:vinod", { maxDepth: 1 }), null);
  assert.equal(shortestGraphPath(index, "person:scott", "sun", { maxDepth: 0 }), null);
  assert.equal(shortestGraphPath(index, "person:scott", "person:vinod", { maxDepth: 2 }).edges.length, 2);
  assert.deepEqual(shortestGraphPath(index, "isolated", "isolated", { maxDepth: 0 }), { nodes: [nodes[4]], edges: [] });
  assert.throws(() => shortestGraphPath(index, "sun", "sun", { maxDepth: -1 }), RangeError);
});

test("relationship filters apply during traversal, including label-based Devreal relationships", () => {
  const index = buildGraphIndex(nodes, edges);
  assert.equal(shortestGraphPath(index, "person:scott", "person:jose", { edgeKinds: ["founded"] }), null);
  assert.equal(shortestGraphPath(index, "person:scott", "sun", { edgeKinds: [] }), null);
  assert.equal(shortestGraphPath(index, "person:scott", "person:jose", { edgeKinds: ["founded", "worked with"] }).edges.length, 3);
});

test("local filtering combines text, kind and explicit tribe while preserving identity and order", () => {
  assert.deepEqual(filterGraphNodes(nodes, { query: "SCOTT founder", kind: "person", tribe: "sun" }), [nodes[0]]);
  assert.deepEqual(filterGraphNodes(nodes, { query: "  jose GARCIA  " }), [nodes[3]]);
  assert.deepEqual(filterGraphNodes(nodes, { query: "investor" }), [nodes[2]]);
  assert.deepEqual(filterGraphNodes(nodes, { query: "research engineer" }), [nodes[3]]);
  assert.deepEqual(filterGraphNodes(nodes, { query: "sun", kind: "organization" }), [nodes[1]]);
  assert.deepEqual(filterGraphNodes(nodes, { query: "person:jose", tribe: "sun" }), []);
  assert.equal(filterGraphNodes(nodes, { kind: "all", tribe: "all", limit: 1 })[0], nodes[0]);
  assert.deepEqual(filterGraphNodes(nodes, { limit: 0 }), []);
  assert.throws(() => filterGraphNodes(nodes, { limit: -1 }), RangeError);
  assert.equal(filterGraphNodes(nodes).length, nodes.length);
});

test("tribes use explicit membership rather than inferring membership from graph links", () => {
  assert.deepEqual(graphTribeMembers(nodes, "sun"), nodes.slice(0, 3));
  assert.deepEqual(graphTribeMembers(nodes, "unknown"), []);
});

test("extracted layout remains deterministic and within Devreal's padded viewport", () => {
  for (const count of [1, 2, 12, 100]) {
    assert.deepEqual(graphNodePosition(0, count), { x: 50, y: 48 });
    for (let index = 0; index < count; index += 1) {
      const point = graphNodePosition(index, count);
      assert.deepEqual(point, graphNodePosition(index, count));
      assert.ok(point.x >= 10 && point.x <= 90);
      assert.ok(point.y >= 14 && point.y <= 82);
    }
  }
  assert.deepEqual(graphNodePosition(1, 2), { x: 90, y: 48 });
});

test("edge keys preserve Devreal undirected visual highlighting semantics", () => {
  assert.equal(graphEdgeKey({ source: "sun", target: "person:scott" }), "person:scott\0sun");
  assert.equal(graphEdgeKey(edges[0]), graphEdgeKey({ source: edges[0].target, target: edges[0].source }));
  assert.equal(graphEdgeKey({ ...edges[0], kind: "led" }), graphEdgeKey(edges[0]));
});
