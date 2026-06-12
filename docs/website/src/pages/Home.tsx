import React, { useState } from 'react';
import { highlightCode } from '../components/MarkdownRenderer';
import { Star, Check, BookOpen, Github, MessageSquare } from 'lucide-react';

interface HomeProps {
  onNavigateToDocs: () => void;
  onRequestFeedback: () => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToDocs, onRequestFeedback }) => {
  const [sandboxTab, setSandboxTab] = useState<'ts' | 'go' | 'csharp'>('ts');

  const sandboxCodes = {
    ts: `// TypeScript Handler
import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (e: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "success" })
  };
};`,
    go: `// Go AL2023 bootstrap handler
package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

func Handle(ctx context.Context) (string, error) {
	return "Hello Aetheris!", nil
}

func main() {
	lambda.Start(Handle)
}`,
    csharp: `// C# .NET 8 AOT handler
using Amazon.Lambda.Core;

namespace App;

public class Functions {
    public string Handler(string input, ILambdaContext ctx) {
        return input.ToUpper();
    }
}`
  };

  return (
    <div className="landing-container animate-fade-in">
      {/* Tailwind v4 Verification Banner */}
      <div className="bg-accent-primary text-text-primary text-center py-2 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
        <Star size={14} className="animate-spin" />
        <span>Tailwind v4 Compile Engine Active</span>
        <Star size={14} className="animate-spin" />
      </div>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-badge">Apache 2.0 Open Source Project</div>
          <h1 className="hero-title">
            Cloud Native Infrastructure <br />
            <span className="hero-gradient-text">Compiled from Code</span>
          </h1>
          <p className="hero-desc">
            A free, open-source type-safe IaC framework supporting TypeScript, Go, and C#. Build, emulate, and compile your runtime handlers and cloud resources into optimized production stacks instantly.
          </p>
          <div className="hero-ctas">
            <button className="hero-btn-primary flex items-center gap-2" onClick={onNavigateToDocs}>
              <BookOpen size={18} />
              <span>Read the Docs</span>
            </button>
            <button className="hero-btn-secondary flex items-center gap-2" onClick={() => window.open('https://github.com', '_blank')}>
              <Github size={18} />
              <span>GitHub Star</span>
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="sandbox-card">
            <div className="sandbox-tabs">
              <button 
                className={`sandbox-tab ${sandboxTab === 'ts' ? 'active' : ''}`}
                onClick={() => setSandboxTab('ts')}
              >
                TypeScript
              </button>
              <button 
                className={`sandbox-tab ${sandboxTab === 'go' ? 'active' : ''}`}
                onClick={() => setSandboxTab('go')}
              >
                Go
              </button>
              <button 
                className={`sandbox-tab ${sandboxTab === 'csharp' ? 'active' : ''}`}
                onClick={() => setSandboxTab('csharp')}
              >
                C# (.NET)
              </button>
            </div>
            <div className="sandbox-code-container">
              <pre className="code-block" style={{ background: 'transparent', padding: 0 }}>
                {highlightCode(sandboxCodes[sandboxTab], sandboxTab === 'ts' ? 'typescript' : sandboxTab === 'go' ? 'go' : 'typescript')}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section id="features" className="stats-section">
        <div className="stat-card">
          <div className="stat-val">100% Free</div>
          <div className="stat-label">Open Source Software</div>
          <div className="stat-desc">Licensed under permissive Apache 2.0. No vendor lock-in.</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">Multi-Language</div>
          <div className="stat-label">Function Handlers</div>
          <div className="stat-desc">Supports C#, Go, JavaScript, TypeScript and Python runtimes.</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">&lt; 15ms</div>
          <div className="stat-label">MicroVM Cold Starts</div>
          <div className="stat-desc">Pre-warmed snapshots for lightning fast on-demand response.</div>
        </div>
      </section>

      {/* Open Source Engagement / Community Cards */}
      <section id="community" className="pricing-section">
        <h2 className="section-title">Get Involved & Support Aetheris</h2>
        <p className="section-subtitle">Aetheris is built by a growing community of developers. Explore paths to use, contribute, and collaborate.</p>

        <div className="pricing-grid">
          {/* Build Tier */}
          <div className="pricing-card">
            <div className="plan-name">Deploy Locally</div>
            <div className="plan-desc">Install the CLI and start provisioning resources in your own clouds.</div>
            <div className="plan-price-container">
              <span className="plan-price">Free</span>
              <span className="plan-period">/forever</span>
            </div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Emulators & local CLI</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Compile to CloudFormation</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Compile to Kubernetes</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Self-hosted private clouds</span></li>
            </ul>
            <button className="pricing-card-btn" onClick={onNavigateToDocs}>Install Aetheris CLI</button>
          </div>

          {/* Contribute Tier */}
          <div className="pricing-card premium">
            <div className="pricing-popular-ribbon">Collaborate</div>
            <div className="plan-name">Contribute Code</div>
            <div className="plan-desc">Help improve the core engines, write adapter plugins, or fix bugs.</div>
            <div className="plan-price-container">
              <span className="plan-price">Open</span>
              <span className="plan-period">/contribute</span>
            </div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Review active GitHub Issues</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Build custom provider plugins</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Write docs & examples</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Submit pull requests</span></li>
            </ul>
            <button className="pricing-card-btn flex items-center justify-center gap-2" onClick={() => window.open('https://github.com', '_blank')}>
              <Github size={16} />
              <span>GitHub Repository</span>
            </button>
          </div>

          {/* Discuss Tier */}
          <div className="pricing-card">
            <div className="plan-name">Join the Discussion</div>
            <div className="plan-desc">Meet other cloud engineers, ask questions, and share project architectures.</div>
            <div className="plan-price-container">
              <span className="plan-price">Active</span>
            </div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Community Discord channel</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Suggest feature roadmaps</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Ask configuration help</span></li>
              <li className="pricing-feature-item flex items-center gap-2"><Check size={14} className="text-accent-secondary" /> <span>Share what you built</span></li>
            </ul>
            <button className="pricing-card-btn flex items-center justify-center gap-2" onClick={onRequestFeedback}>
              <MessageSquare size={16} />
              <span>Join Community Discussion</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
