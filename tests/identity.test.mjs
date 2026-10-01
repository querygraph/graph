import assert from 'node:assert/strict';
import test from 'node:test';
import { buildGraphIdentityIndex, resolveGraphNode } from '../src/index.js';

test('legacy IDs and canonical IDs resolve to exactly the same provenance-bearing node', () => {
  const node = { id: 'speaker:matei-zaharia', kind: 'person', name: 'Matei Zaharia', aliases: ['matei-zaharia'], sourceIds: ['reviewed'] };
  const index = buildGraphIdentityIndex([node]);
  assert.equal(resolveGraphNode(index, 'matei-zaharia'), node);
  assert.equal(resolveGraphNode(index, 'speaker:matei-zaharia'), node);
  assert.equal(resolveGraphNode(index, 'Matei Zaharia'), undefined);
  assert.equal(resolveGraphNode(index, 'missing'), undefined);
});

test('homonyms remain separate and conflicting identity mappings fail closed', () => {
  const a = { id: 'person:a', kind: 'person', name: 'Alex Smith', aliases: ['alex-smith'] };
  const b = { id: 'person:b', kind: 'person', name: 'Alex Smith', aliases: ['alex-smith-2'] };
  const index = buildGraphIdentityIndex([a, b]);
  assert.equal(resolveGraphNode(index, 'alex-smith'), a);
  assert.equal(resolveGraphNode(index, 'alex-smith-2'), b);
  assert.throws(() => buildGraphIdentityIndex([a, { ...b, aliases: ['alex-smith'] }]), /Conflicting/);
  assert.throws(() => buildGraphIdentityIndex([a, { ...b, aliases: ['person:a'] }]), /Conflicting/);
  assert.throws(() => buildGraphIdentityIndex([a, a]), /Duplicate/);
});
