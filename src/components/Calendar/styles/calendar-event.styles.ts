import { css, cva } from '../../../../styled-system/css';

export const eventItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2px 6px',
    borderRadius: '4px',
    borderLeft: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    _hover: {
      opacity: 0.85,
      transform: 'translateX(1px)',
    },
  },
  variants: {
    type: {
      work: {
        backgroundColor: 'rgba(214, 69, 80, 0.08)',
        borderColor: 'brand.500',
      },
      routine: {
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderColor: 'rgba(156, 163, 175, 0.5)',
      },
      reminder: {
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgba(59, 130, 246, 0.6)',
      },
      personal: {
        backgroundColor: 'rgba(168, 85, 247, 0.08)',
        borderColor: 'rgba(168, 85, 247, 0.6)',
      },
      study: {
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgba(59, 130, 246, 0.6)',
      },
      health: {
        backgroundColor: 'rgba(167, 170, 41, 0.1)',
        borderColor: 'rgba(167, 170, 41, 0.6)',
      },
      finance: {
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        borderColor: 'rgba(249, 115, 22, 0.6)',
      },
    },
  },
});

export const eventDot = cva({
  base: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    flexShrink: 0,
    boxShadow: '0 0 3px currentColor',
  },
  variants: {
    type: {
      work: {
        backgroundColor: 'brand.500',
      },
      routine: {
        backgroundColor: 'text.muted',
      },
      reminder: {
        backgroundColor: '#3B82F6',
      },
      personal: {
        backgroundColor: '#A855F7',
      },
      study: {
        backgroundColor: '#3B82F6',
      },
      health: {
        backgroundColor: 'success.500',
      },
      finance: {
        backgroundColor: '#F97316',
      },
    },
  },
});

export const eventText = cva({
  base: {
    fontSize: '10px',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    marginLeft: '5px',
    lineHeight: '1.3',
  },
  variants: {
    type: {
      work: {
        color: 'brand.500',
      },
      routine: {
        color: 'text.muted',
      },
      reminder: {
        color: '#3B82F6',
      },
      personal: {
        color: '#A855F7',
      },
      study: {
        color: '#3B82F6',
      },
      health: {
        color: 'success.500',
      },
      finance: {
        color: '#F97316',
      },
    },
  },
});

export const eventTime = cva({
  base: {
    fontSize: '9px',
    marginLeft: '4px',
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.7,
  },
  variants: {
    type: {
      work: {
        color: 'brand.500',
      },
      routine: {
        color: 'text.faint',
      },
      reminder: {
        color: '#3B82F6',
      },
      personal: {
        color: '#A855F7',
      },
      study: {
        color: '#3B82F6',
      },
      health: {
        color: 'rgba(167, 170, 41, 0.9)',
      },
      finance: {
        color: '#F97316',
      },
    },
  },
});

export const moreEventsText = css({
  fontSize: '9px',
  color: 'text.faint',
  fontWeight: '600',
  paddingLeft: '8px',
  marginTop: '2px',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'text.primary',
  },
});

export const eventIndicator = css({
  position: 'absolute',
  bottom: '4px',
  display: 'flex',
  gap: '2px',
});
