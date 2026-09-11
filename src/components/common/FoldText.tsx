import React, { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './FoldText.css';

type SplitBy = 'char' | 'word' | 'line';
type Hinge = 'top' | 'bottom' | 'left' | 'right';
type Trigger = 'mount' | 'hover' | 'scroll' | 'loop';

export interface FoldTextProps {
  text?: string;
  splitBy?: SplitBy;
  hinge?: Hinge;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: Trigger;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  highlightText?: string;
  highlightClassName?: string;
  highlightColor?: string;
}

type HingeConfig = {
  origin: string;
  rotateX: number;
  rotateY: number;
};

const HINGE_CONFIG: Record<Hinge, HingeConfig> = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 }
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const FoldText: React.FC<FoldTextProps> = ({
  text = 'Design unfolds',
  splitBy = 'char',
  hinge = 'top',
  duration = 0.65,
  stagger = 0.045,
  delay = 0,
  ease = 'power3.out',
  perspective = 700,
  creaseShading = 0.55,
  trigger = 'mount',
  fontSize,
  fontWeight,
  color,
  className = '',
  style = {},
  highlightText,
  highlightClassName,
  highlightColor
}) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top;
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  const segments = useMemo(() => {
    let segmentIndex = 0;

    const renderSegment = (
      content: string,
      key: string,
      split: SplitBy = splitBy,
      isHighlighted = false
    ): ReactNode => {
      segmentIndex += 1;
      const highlightStyles: CSSProperties = isHighlighted && highlightColor ? { color: highlightColor } : {};
      const pieceClass = `fold-text-piece ${isHighlighted && highlightClassName ? highlightClassName : ''}`.trim();

      return (
        <span
          className="fold-text-segment"
          data-fold-split={split}
          key={key}
          style={{ '--fold-perspective': `${safePerspective}px` } as CSSProperties}
        >
          <span
            className={pieceClass}
            data-fold-hinge={hinge}
            style={{
              transformOrigin: hingeConfig.origin,
              '--fold-crease': 0,
              ...highlightStyles
            } as CSSProperties}
          >
            {content || '\u00A0'}
          </span>
        </span>
      );
    };

    if (splitBy === 'line') {
      return text.split('\n').map((line, index) => (
        <span className="fold-text-line" key={`line-${index}`}>
          {renderSegment(line || '\u00A0', `segment-line-${index}`, 'line')}
        </span>
      ));
    }

    if (splitBy === 'word') {
      let charCursor = 0;
      return text.split(/(\s+)/).flatMap((part, index) => {
        if (!part) return [];
        const isWs = /^\s+$/.test(part);
        const partStart = charCursor;
        charCursor += part.length;

        if (isWs) {
          return (
            <span className="fold-text-whitespace" key={`ws-${index}`}>
              {part}
            </span>
          );
        }

        const isHighlighted =
          Boolean(highlightText &&
          highlightText.length > 0 &&
          text.indexOf(highlightText) !== -1 &&
          partStart >= text.indexOf(highlightText) &&
          partStart + part.length <= text.indexOf(highlightText) + highlightText.length);

        return renderSegment(part, `segment-word-${segmentIndex}`, 'word', isHighlighted);
      });
    }

    // Default: splitBy === 'char'
    // Group characters by word so that words wrap cleanly across lines and do not break mid-word
    let charCursor = 0;
    const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
    const highlightEnd = highlightStart !== -1 && highlightText ? highlightStart + highlightText.length : -1;

    return text.split(/(\s+)/).flatMap((part, wordIndex) => {
      if (!part) return [];
      const isWs = /^\s+$/.test(part);
      if (isWs) {
        charCursor += part.length;
        return (
          <span className="fold-text-whitespace" key={`ws-${wordIndex}`}>
            {part}
          </span>
        );
      }

      const wordChars = Array.from(part);
      const wordNodes = wordChars.map((char, charIndex) => {
        const currentCharIndex = charCursor;
        charCursor += 1;
        const isHighlighted =
          highlightStart !== -1 && currentCharIndex >= highlightStart && currentCharIndex < highlightEnd;

        return renderSegment(char, `segment-char-${wordIndex}-${charIndex}`, 'char', isHighlighted);
      });

      return (
        <span className="fold-text-word inline-block whitespace-nowrap" key={`word-${wordIndex}`}>
          {wordNodes}
        </span>
      );
    });
  }, [
    text,
    splitBy,
    hinge,
    hingeConfig.origin,
    safePerspective,
    highlightText,
    highlightClassName,
    highlightColor
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = rootRef.current;
    if (!root) return undefined;

    const pieces = Array.from(root.querySelectorAll<HTMLElement>('.fold-text-piece'));
    if (!pieces.length) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const activeDuration = reduceMotion ? Math.min(duration, 0.22) : duration;
    const activeStagger = reduceMotion ? Math.min(stagger, 0.02) : stagger;
    const fromVars = {
      opacity: 0,
      rotateX: reduceMotion ? 0 : hingeConfig.rotateX,
      rotateY: reduceMotion ? 0 : hingeConfig.rotateY,
      '--fold-crease': reduceMotion ? 0 : safeCrease,
      transformOrigin: hingeConfig.origin,
      force3D: true
    };
    const toVars = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      '--fold-crease': 0,
      duration: activeDuration,
      ease: reduceMotion ? 'power1.out' : ease,
      stagger: activeStagger,
      delay: delay ?? 0,
      clearProps: 'willChange'
    };

    const killTimeline = () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      gsap.killTweensOf(pieces);
    };

    const play = (repeat: boolean): gsap.core.Timeline => {
      killTimeline();
      timelineRef.current = gsap.timeline({ repeat: repeat ? -1 : 0, repeatDelay: repeat ? 0.75 : 0 });
      timelineRef.current.fromTo(pieces, fromVars, toVars);
      return timelineRef.current;
    };

    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;
    let hoverHandler: (() => void) | undefined;

    if (trigger === 'hover') {
      gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0, transformOrigin: hingeConfig.origin });
      hoverHandler = () => play(false);
      root.addEventListener('mouseenter', hoverHandler);
    } else if (trigger === 'scroll') {
      gsap.set(pieces, fromVars);

      // Check if already in viewport on mount (e.g. Hero section at page top)
      const rect = root.getBoundingClientRect();
      const inViewport = rect.top <= window.innerHeight * 0.88 && rect.bottom >= 0;

      if (inViewport) {
        play(false);
      } else {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 85%',
          once: true,
          onEnter: () => play(false)
        });
      }
    } else if (trigger === 'loop') {
      play(true);
    } else {
      play(false);
    }

    return () => {
      if (hoverHandler) root.removeEventListener('mouseenter', hoverHandler);
      scrollTrigger?.kill();
      killTimeline();
    };
  }, [
    text,
    splitBy,
    hinge,
    duration,
    stagger,
    delay,
    ease,
    perspective,
    safeCrease,
    trigger,
    hingeConfig.origin,
    hingeConfig.rotateX,
    hingeConfig.rotateY
  ]);

  const rootStyle: CSSProperties = {
    ...(fontSize !== undefined && fontSize !== 'inherit'
      ? { '--fold-text-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize }
      : {}),
    ...(fontWeight !== undefined && fontWeight !== 'inherit'
      ? { '--fold-text-font-weight': fontWeight }
      : {}),
    ...(color !== undefined && color !== 'inherit'
      ? { '--fold-text-color': color }
      : {}),
    ...style
  } as CSSProperties;

  return (
    <span ref={rootRef} className={`fold-text ${className}`.trim()} style={rootStyle}>
      <span className="fold-text-sr-only">{text}</span>
      <span className="fold-text-visual" aria-hidden="true">
        {segments}
      </span>
    </span>
  );
};

export default FoldText;
