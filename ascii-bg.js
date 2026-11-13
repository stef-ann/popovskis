/* ==========================================================================
   Ambient ASCII background (asciify-engine)
   Settings live in ascii-bg.config.js — you shouldn't need to edit this file.
   vendor/asciify-kit.js is an esbuild bundle of asciify-engine@4.33.0/kit
   (background() + the 12 current presets).
   ========================================================================== */

import config from './ascii-bg.config.js';

const host = document.getElementById('page-bg');

// Push colours + header fade into CSS variables so they follow data-theme.
const applyCssSettings = () => {
    const { colors = {}, headerFade = 0.26 } = config;
    const style = document.createElement('style');
    style.id = 'ascii-bg-settings';
    style.textContent = `
        :root { --ascii-ink: ${colors.dark || '#8a8886'}; --ascii-header-fade: ${headerFade}; }
        [data-theme="light"] { --ascii-ink: ${colors.light || '#7d7b78'}; }
    `;
    document.head.appendChild(style);
};

const start = async () => {
    if (!host) return;
    if (!config.enabled) {
        host.remove();
        return;
    }
    applyCssSettings();

    try {
        const kit = await import('./vendor/asciify-kit.js');
        const preset = kit[config.preset];
        if (!preset || !preset.mount) {
            console.warn(`[ascii-bg] unknown preset "${config.preset}", using swell`);
        }

        // Only pass the options that are set, so presets keep their own defaults.
        const options = {
            preset: preset && preset.mount ? preset : kit.swell,
            ink: '--ascii-ink',
            opacity: config.opacity,
            speed: config.speed,
            cursor: config.cursor,
        };
        if (config.cellSize != null) options.cellSize = config.cellSize;
        if (config.mark != null) options.mark = config.mark;
        if (config.charset != null) options.charset = config.charset;
        if (config.preset === 'wordField' && config.text) options.text = config.text;

        const bg = kit.background(host, options);
        host.classList.add('is-ready');

        if (!bg || !host.querySelector('canvas')) {
            console.warn('[ascii-bg] no canvas mounted (WebGL2 unavailable?)', bg);
        } else {
            console.info(`[ascii-bg] running: ${config.preset}`);
        }
    } catch (err) {
        // Decorative only: the page works fine without it.
        console.warn('[ascii-bg] skipped:', err);
    }
};

// Wait until the page is idle so the bundle never competes with first paint.
const idle = window.requestIdleCallback || (cb => setTimeout(cb, 300));
if (document.readyState === 'complete') idle(start);
else window.addEventListener('load', () => idle(start), { once: true });
