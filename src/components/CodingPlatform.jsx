import React from 'react';
import { Play, Check, Server, GitPullRequest } from 'lucide-react';
import './CodingPlatform.css';

const CodingPlatform = () => {
  return (
    <section className="section platform-section section-gray">
      <div className="container">
        <div className="platform-header">
          <div>
            <h2 className="h2">Master Coding Interviews</h2>
            <p className="text-muted platform-subtitle">
              Practice on an industry-standard environment with real interview questions from top tech companies.
            </p>
          </div>
          <a href="#" className="btn btn-primary">Try Platform</a>
        </div>
        
        <div className="ide-preview glass-card">
          {/* IDE Header */}
          <div className="ide-header">
            <div className="window-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="ide-tabs">
              <div className="ide-tab active">Two Sum.js</div>
              <div className="ide-tab">Solution.java</div>
            </div>
          </div>
          
          <div className="ide-body">
            {/* Left Panel: Problem */}
            <div className="ide-panel problem-panel">
              <h3 className="problem-title">1. Two Sum</h3>
              <div className="problem-tags">
                <span className="tag-easy">Easy</span>
                <span className="tag-company">Amazon</span>
                <span className="tag-company">Google</span>
              </div>
              <p className="problem-text">
                Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
              </p>
              <div className="test-cases">
                <div className="test-case">
                  <div className="tc-label">Input:</div>
                  <div className="tc-value">nums = [2,7,11,15], target = 9</div>
                </div>
                <div className="test-case">
                  <div className="tc-label">Output:</div>
                  <div className="tc-value">[0,1]</div>
                </div>
              </div>
            </div>
            
            {/* Right Panel: Editor */}
            <div className="ide-panel editor-panel">
              <div className="editor-controls">
                <span className="editor-lang">JavaScript</span>
                <div className="editor-actions">
                  <button className="btn-icon"><Server size={16} /></button>
                  <button className="btn-icon"><GitPullRequest size={16} /></button>
                </div>
              </div>
              <div className="editor-content">
                <pre><code>
<span className="code-keyword">const</span> <span className="code-function">twoSum</span> = <span className="code-keyword">function</span>(nums, target) {'{'}
  <span className="code-keyword">const</span> map = <span className="code-keyword">new</span> <span className="code-function">Map</span>();
  <span className="code-keyword">for</span> (<span className="code-keyword">let</span> i = 0; i &lt; nums.length; i++) {'{'}
    <span className="code-keyword">const</span> complement = target - nums[i];
    <span className="code-keyword">if</span> (map.<span className="code-function">has</span>(complement)) {'{'}
      <span className="code-keyword">return</span> [map.<span className="code-function">get</span>(complement), i];
    {'}'}
    map.<span className="code-function">set</span>(nums[i], i);
  {'}'}
  <span className="code-keyword">return</span> [];
{'}'};
                </code></pre>
              </div>
              <div className="editor-footer">
                <div className="execution-result success">
                  <Check size={16} /> Accepted
                </div>
                <button className="btn btn-primary btn-sm btn-run">
                  <Play size={16} fill="currentColor" /> Run Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingPlatform;
