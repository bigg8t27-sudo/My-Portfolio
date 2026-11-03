'use client';
import React from 'react';

interface State { error: Error | null; info: string }

export default class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null, info: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, info: '' };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[RootErrorBoundary] caught:', error, info);
    this.setState({ error, info: info.componentStack ?? '' });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position:'fixed', inset:0, background:'#000', color:'#fff',
          display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', padding:'2rem', fontFamily:'monospace',
          zIndex:99999,
        }}>
          <div style={{ maxWidth:'640px', width:'100%' }}>
            <div style={{ color:'#f87171', fontSize:'1.1rem', fontWeight:'bold', marginBottom:'1rem' }}>
              ⚠ Runtime Error
            </div>
            <pre style={{
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,100,100,0.3)',
              borderRadius:'8px', padding:'1rem', fontSize:'0.75rem', overflowX:'auto',
              whiteSpace:'pre-wrap', marginBottom:'1rem',
            }}>
              {this.state.error.message}
            </pre>
            <pre style={{
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'8px', padding:'1rem', fontSize:'0.65rem', overflowX:'auto',
              whiteSpace:'pre-wrap', color:'rgba(255,255,255,0.5)', maxHeight:'200px',
            }}>
              {this.state.info}
            </pre>
            <button
              onClick={() => { this.setState({ error:null, info:'' }); window.location.reload(); }}
              style={{
                marginTop:'1rem', padding:'0.5rem 1.5rem', borderRadius:'6px',
                background:'#3b82f6', color:'#fff', border:'none', cursor:'pointer',
                fontSize:'0.85rem',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
