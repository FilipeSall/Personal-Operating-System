import { css, cva } from '../../../../styled-system/css';

export const eventItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3px 8px',
    borderRadius: '8px',
    borderLeft: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    _hover: {
      opacity: 0.95,
      transform: 'translateX(2px)',
      boxShadow: '0 6px 12px rgba(33, 26, 30, 0.12)',
    },
  },
  variants: {
    type: {
      work: {
        backgroundColor: 'rgba(253, 232, 234, 0.75)',
        borderColor: 'rgba(214, 69, 80, 0.6)',
      },
      routine: {
        backgroundColor: 'rgba(254, 243, 199, 0.75)',
        borderColor: 'rgba(234, 179, 8, 0.55)',
      },
      reminder: {
        backgroundColor: 'rgba(219, 234, 254, 0.75)',
        borderColor: 'rgba(59, 130, 246, 0.55)',
      },
      personal: {
        backgroundColor: 'rgba(237, 233, 254, 0.75)',
        borderColor: 'rgba(168, 85, 247, 0.55)',
      },
      study: {
        backgroundColor: 'rgba(209, 250, 229, 0.75)',
        borderColor: 'rgba(16, 185, 129, 0.55)',
      },
      health: {
        backgroundColor: 'rgba(254, 226, 226, 0.75)',
        borderColor: 'rgba(239, 68, 68, 0.55)',
      },
      finance: {
        backgroundColor: 'rgba(255, 237, 213, 0.75)',
        borderColor: 'rgba(249, 115, 22, 0.55)',
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
    boxShadow: '0 0 6px currentColor',
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
    color: 'text.primary',
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
