/**
 * gallery-config.js
 * ==================
 * Simple gallery organizer — just add your photos here!
 * 
 * Each photo entry has:
 *   - src:      Path to the image file (put images in the /gallery folder)
 *   - alt:      Description of the photo (for accessibility & lightbox caption)
 *   - category: Which album/category it belongs to (must match a category key below)
 *   - featured: (optional) Set to true to make it appear larger in the grid
 *
 * CATEGORIES:
 *   Add or remove categories freely. The first one listed is shown by default.
 *   Each category has:
 *     - key:   Unique identifier (used in photo entries above)
 *     - label: Display name shown on the filter tab
 *     - icon:  Emoji displayed next to the label
 */

window.galleryConfig = {

    // ── Define your categories/albums here ──
    categories: [
        { key: 'all', label: 'All', icon: '🖼️' },
        { key: 'travel', label: 'Travel', icon: '✈️' },
        { key: 'landscapes', label: 'Landscapes', icon: '🏔️' },
        { key: 'architecture', label: 'Architecture', icon: '🏛️' },
        { key: 'people', label: 'People', icon: '👥' },
        { key: 'skiing', label: 'Skiing', icon: '⛷️' },
        { key: 'stars', label: 'Stars', icon: '✨' },
        { key: 'metro', label: 'Metro', icon: '🚇' },
    ],

    // ── Add your photos here ──
    // Just add new objects to this array!
    photos: [
        // EXAMPLE entries (replace with your own photos):
        //
        // {
        //     src: 'gallery/my-photo.jpg',
        //     alt: 'Sunset over Ohrid Lake',
        //     category: 'landscapes',
        //     featured: true
        // },
        // {
        //     src: 'gallery/skiing-alps.jpg',
        //     alt: 'Carving through fresh powder in the Alps',
        //     category: 'skiing',
        // },
        // {
        //     src: 'gallery/rome-colosseum.jpg',
        //     alt: 'The Colosseum at golden hour',
        //     category: 'architecture',
        // },
        // {
        //     src: 'gallery/friends-hike.jpg',
        //     alt: 'Group photo at the summit',
        //     category: 'people',
        // },

        {
            src: 'gallery/DSCF1669.JPG',
            alt: 'Queensbridge, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/DSCF1593.jpg',
            alt: 'Empire State Building, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/DSCF0451edit1.JPG',
            alt: 'College Park, Maryland, USA',
            category: 'travel',
        },
        {
            src: 'gallery/DSCF1290.png',
            alt: 'College Park, Maryland, USA',
            category: 'Stars',
        },
        {
            src: 'gallery/DSCF1419.png',
            alt: 'Lagadin, Ohrid, Macedonia',
            category: 'Stars',
        },
        {
            src: 'gallery/untitled-1-view.png',
            alt: 'WMATA, dmv',
            category: 'metro',
        },
        {
            src: 'gallery/DSCF0920-2-cropped.png',
            alt: 'Charleston, SC, USA',
            category: 'architecture',
        }


    ]
};
