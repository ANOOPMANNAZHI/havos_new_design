export default function FloatingMockup({ variant = 'dashboard' }) {
  return (
    <>
      {/* Chrome dots */}
      <div className="hero__mockup-chrome">
        <span />
        <span />
        <span />
      </div>

      <div className="hero__mockup-body">
        {variant === 'dashboard' && <DashboardContent />}
        {variant === 'code' && <CodeContent />}
        {variant === 'chart' && <ChartContent />}
      </div>
    </>
  );
}

function DashboardContent() {
  return (
    <div className="mockup-dashboard">
      <div className="mockup-dashboard__bars">
        <div style={{ height: '45%' }} />
        <div style={{ height: '70%' }} />
        <div style={{ height: '55%' }} />
        <div style={{ height: '85%' }} />
        <div style={{ height: '60%' }} />
        <div style={{ height: '40%' }} />
      </div>
      <div className="mockup-dashboard__rows">
        <div className="mockup-dashboard__row" style={{ width: '80%' }} />
        <div className="mockup-dashboard__row" style={{ width: '60%' }} />
        <div className="mockup-dashboard__row" style={{ width: '70%' }} />
      </div>
    </div>
  );
}

function CodeContent() {
  return (
    <div className="mockup-code">
      <div className="mockup-code__line">
        <span className="mockup-code__keyword">const</span>{' '}
        <span className="mockup-code__var">server</span>{' '}
        <span className="mockup-code__op">=</span>{' '}
        <span className="mockup-code__func">create</span>
        <span className="mockup-code__paren">()</span>
      </div>
      <div className="mockup-code__line">
        <span className="mockup-code__keyword">await</span>{' '}
        <span className="mockup-code__var">server</span>
        <span className="mockup-code__op">.</span>
        <span className="mockup-code__func">listen</span>
        <span className="mockup-code__paren">(</span>
        <span className="mockup-code__num">3000</span>
        <span className="mockup-code__paren">)</span>
      </div>
      <div className="mockup-code__line mockup-code__line--dim" />
      <div className="mockup-code__line">
        <span className="mockup-code__comment">// ready</span>
      </div>
    </div>
  );
}

function ChartContent() {
  return (
    <div className="mockup-chart">
      <div className="mockup-chart__trend">+12.4%</div>
      <svg
        className="mockup-chart__svg"
        viewBox="0 0 200 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(43,92,255,0.25)" />
            <stop offset="100%" stopColor="rgba(43,92,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 Q25 55 50 45 T100 30 T150 18 T200 8"
          stroke="#2B5CFF"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M0 60 Q25 55 50 45 T100 30 T150 18 T200 8 V80 H0 Z"
          fill="url(#chartFill)"
        />
      </svg>
    </div>
  );
}
