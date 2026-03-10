import React from 'react';

const shimmerStyle = {
  background: 'linear-gradient(90deg, #E8EAF0 25%, #F3F4F8 50%, #E8EAF0 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
  borderRadius: 'var(--radius-md, 12px)',
};

/* ---- Card Skeleton ---- */
export function CardSkeleton({ count = 1 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ padding: '24px', borderRadius: 'var(--radius-lg, 16px)', border: '1px solid var(--border, #E8EAF0)' }}>
          <div style={{ ...shimmerStyle, width: '48px', height: '24px', marginBottom: '16px', borderRadius: 'var(--radius-sm, 8px)' }} />
          <div style={{ ...shimmerStyle, width: '70%', height: '20px', marginBottom: '12px' }} />
          <div style={{ ...shimmerStyle, width: '100%', height: '14px', marginBottom: '8px' }} />
          <div style={{ ...shimmerStyle, width: '90%', height: '14px', marginBottom: '8px' }} />
          <div style={{ ...shimmerStyle, width: '60%', height: '14px', marginBottom: '20px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ ...shimmerStyle, width: '64px', height: '28px', borderRadius: '999px' }} />
            <div style={{ ...shimmerStyle, width: '80px', height: '28px', borderRadius: '999px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Hero Skeleton ---- */
export function HeroSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 24px 60px', gap: '20px' }}>
      <div style={{ ...shimmerStyle, width: '100px', height: '28px', borderRadius: '999px' }} />
      <div style={{ ...shimmerStyle, width: '60%', maxWidth: '600px', height: '40px' }} />
      <div style={{ ...shimmerStyle, width: '45%', maxWidth: '450px', height: '40px' }} />
      <div style={{ ...shimmerStyle, width: '50%', maxWidth: '500px', height: '18px', marginTop: '8px' }} />
      <div style={{ ...shimmerStyle, width: '160px', height: '48px', borderRadius: '999px', marginTop: '16px' }} />
    </div>
  );
}

/* ---- Text Skeleton ---- */
export function TextSkeleton({ lines = 4, width = '100%' }) {
  const widths = ['100%', '95%', '85%', '70%', '90%', '80%', '60%'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            ...shimmerStyle,
            width: widths[i % widths.length],
            height: '14px',
            borderRadius: 'var(--radius-sm, 8px)',
          }}
        />
      ))}
    </div>
  );
}

/* ---- Full Page Skeleton ---- */
export function PageSkeleton() {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      <HeroSkeleton />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <CardSkeleton count={3} />
        <div style={{ marginTop: '48px' }}>
          <TextSkeleton lines={5} />
        </div>
      </div>
    </div>
  );
}

export default { CardSkeleton, HeroSkeleton, TextSkeleton, PageSkeleton };
