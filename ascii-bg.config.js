/* ==========================================================================
   ASCII BACKGROUND SETTINGS
   Edit the values below, save, and hard-refresh the page (Ctrl+Shift+R).
   Live previews of every preset: https://asciify.org/backgrounds
   ========================================================================== */

export default {
    // Turn the whole background on/off.
    enabled: true,

    // Which background to draw. One of:
    //   'swell'         fine dot grid rolling in slow waves (calmest)
    //   'drift'         characters drifting in broad soft lobes
    //   'halo'          a breathing ring around the middle of the screen
    //   'caustics'      light through moving water, thin filaments
    //   'contour'       topographic survey lines over shifting terrain
    //   'ripple'        still water with rings dropping here and there
    //   'mesh'          soft gradient made of characters
    //   'interference'  moiré bands from two ring grids
    //   'constellation' wandering points linked by fine lines
    //   'cascade'       falling streaks in three depths (matrix-like)
    //   'wordField'     your own word (see `text`) as a flowing field
    //   'fluid'         dense flowing folds (busiest; not great behind text)
    preset: 'swell',

    // How visible it is: 0 = invisible, 1 = full strength.
    opacity: 0.8,

    // Animation speed: 0 = frozen, 1 = the preset's normal pace, up to 5.
    speed: 0.8,

    // Size of each character / dot spacing, in pixels.
    // null = the preset's default (about 10–11; 'fluid' is 7).
    cellSize: 8,

    // 'dot' = halftone dots, 'glyph' = text characters, null = preset default
    // ('swell' defaults to dots, every other preset to characters).
    mark: 'glyph',

    // Which characters to use, from empty to dense. Either a named set:
    //   'standard' 'asciify' 'minimal' 'detailed' 'letters' 'technical'
    //   'blocks' 'braille' 'dots' 'kanji' 'fish'
    // or your own string, e.g. ' .:-=+*#'. null = preset default.
    charset: 'kanji',

    // Mouse interaction: false = off, true = preset default,
    // or 'trail' | 'fluid' | 'lantern'.
    cursor: 'lantern',
    palette: '#8fd3c7',

    // The word used by the 'wordField' preset.
    text: 'STEFAN',

    // Dot/character colour for each site theme (plain hex works best).
    colors: {
        dark: '#601699',   // used on the dark theme
        light: '#ff0000',  // used on the light theme
    },

    // How much the background fades under the top header (0 = hidden, 1 = full).
    headerFade: 0.26,
};
