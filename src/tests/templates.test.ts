import { describe, it, expect } from 'vitest';
import { generateWorkflow } from '../templates/workflow.js';
import { generateSourceProfile } from '../templates/source-profile.js';
import { generateSourceProject } from '../templates/source-project.js';

describe('generateWorkflow', () => {
  it('returns valid YAML with required fields', () => {
    const yaml = generateWorkflow();
    expect(yaml).toContain('name: Generate README');
    expect(yaml).toContain('uses: collectioneur/readme-aura@main');
    expect(yaml).toContain('actions/checkout@v4');
    expect(yaml).toContain('permissions:');
    expect(yaml).toContain('contents: write');
  });

  it('includes push trigger on main branch', () => {
    const yaml = generateWorkflow();
    expect(yaml).toContain('branches: [main]');
    expect(yaml).toContain("paths: ['readme.source.md']");
  });

  it('includes schedule and workflow_dispatch triggers', () => {
    const yaml = generateWorkflow();
    expect(yaml).toContain('schedule:');
    expect(yaml).toContain('cron:');
    expect(yaml).toContain('workflow_dispatch:');
  });

  it('includes github_token input', () => {
    const yaml = generateWorkflow();
    expect(yaml).toContain('github_token:');
  });
});

describe('generateSourceProfile', () => {
  it('includes aura blocks', () => {
    const md = generateSourceProfile({ owner: 'alice', repo: 'alice' });
    expect(md).toContain('```aura');
  });

  it('includes readme-aura badge', () => {
    const md = generateSourceProfile({ owner: 'alice', repo: 'alice' });
    expect(md).toContain('readme--aura');
    expect(md).toContain('https://github.com/collectioneur/readme-aura');
  });

  it('interpolates owner name', () => {
    const md = generateSourceProfile({ owner: 'alice', repo: 'alice' });
    expect(md).toContain('alice');
  });

  it('includes hero banner and footer attribution', () => {
    const md = generateSourceProfile({ owner: 'alice', repo: 'alice' });
    expect(md).toContain('float-slow');
    expect(md).toContain('powered by readme-aura');
  });
});

describe('generateSourceProject', () => {
  it('includes aura blocks', () => {
    const md = generateSourceProject({ owner: 'bob', repo: 'cool-lib' });
    expect(md).toContain('```aura');
  });

  it('includes readme-aura badge', () => {
    const md = generateSourceProject({ owner: 'bob', repo: 'cool-lib' });
    expect(md).toContain('readme--aura');
    expect(md).toContain('https://github.com/collectioneur/readme-aura');
  });

  it('interpolates repo name', () => {
    const md = generateSourceProject({ owner: 'bob', repo: 'cool-lib' });
    expect(md).toContain('cool-lib');
  });

  it('includes hero banner and footer attribution', () => {
    const md = generateSourceProject({ owner: 'bob', repo: 'cool-lib' });
    expect(md).toContain('repo?.name');
    expect(md).toContain('powered by readme-aura');
  });
});
