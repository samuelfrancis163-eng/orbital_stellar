// tests for EventEngine.initialLookback handling
import { describe, it, expect } from 'vitest';
import { EventEngine } from '../src/EventEngine.js';

class SpyLogger {
  public warnings: string[] = [];
  info() {}
  error() {}
  warn(message: string) { this.warnings.push(message); }
}

describe('EventEngine.initialLookback', () => {
  it('stores provided lookback within limits', () => {
    const engine = new EventEngine({
      network: 'testnet',
      soroban: { rpcUrl: 'http://example', initialLookback: 1000 },
    });
    // @ts-ignore accessing private field for test purposes
    expect((engine as any).initialLookback).toBe(1000);
  });

  it('clamps lookback > 24h and logs warning', () => {
    const spy = new SpyLogger();
    const engine = new EventEngine({
      network: 'testnet',
      logger: spy,
      soroban: { rpcUrl: 'http://example', initialLookback: 20000 },
    });
    // @ts-ignore accessing private field
    expect((engine as any).initialLookback).toBe((engine as any).MAX_LOOKBACK_LEDGERS);
    expect(spy.warnings.length).toBe(1);
    expect(spy.warnings[0]).toContain('exceeds 24h retention');
  });
});
