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
        { key: 'lab', label: 'Lab', icon: '🔬' },
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

        // ── Photos from /gallery/updated gallery ──
        {
            src: 'gallery/updated gallery/DSCF1593.avif',
            alt: 'Empire State Building, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF1547.avif',
            alt: 'Steam on a city street at night',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF1669.avif',
            alt: 'Queensbridge, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF1670.avif',
            alt: 'Queensbridge, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF1671.avif',
            alt: 'Queensbridge, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF1672.avif',
            alt: 'Queensbridge, New York City, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF0451edit1.avif',
            alt: 'College Park, Maryland, USA',
            category: 'travel',
        },
        {
            src: 'gallery/updated gallery/DSCF0920-2-cropped.avif',
            alt: 'Charleston, SC, USA',
            category: 'architecture',
        },
        {
            src: 'gallery/updated gallery/untitled-1-view.avif',
            alt: 'WMATA Metro station, DMV',
            category: 'metro',
        },
        {
            src: 'gallery/updated gallery/DSCF2209.avif',
            alt: 'Mountain range above the forest',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2214.avif',
            alt: 'Dirt road toward the summit',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2218.avif',
            alt: 'Summer meadow on a mountain hike',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2231.avif',
            alt: 'Rocky ridge against a clear sky',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2234.avif',
            alt: 'Rocky slope and wild grass',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2235.avif',
            alt: 'Limestone outcrop on the hillside',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2236.avif',
            alt: 'Hiking up the valley',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2245.avif',
            alt: 'Meadow below the peaks',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2264.avif',
            alt: 'Cliffs above the valley',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/mountain.avif',
            alt: 'City view from the mountain',
            category: 'landscapes',
        },
        {
            src: 'gallery/updated gallery/DSCF2250.avif',
            alt: 'On the trail',
            category: 'people',
        },
        {
            src: 'gallery/updated gallery/DSCF2251.avif',
            alt: 'Resting on the trail',
            category: 'people',
        },
        {
            src: 'gallery/updated gallery/ski1.avif',
            alt: 'Val Thorens',
            category: 'skiing',
        },
        {
            src: 'gallery/updated gallery/ski2.avif',
            alt: 'Val Thorens',
            category: 'skiing',
        },
        {
            src: 'gallery/updated gallery/ski3.avif',
            alt: 'Val Thorens',
            category: 'skiing',
        },
        {
            src: 'gallery/updated gallery/DSCF1290.avif',
            alt: 'College Park, Maryland, USA',
            category: 'stars',
        },
        {
            src: 'gallery/updated gallery/DSCF1419.avif',
            alt: 'Lagadin, Ohrid, Macedonia',
            category: 'stars',
        },
        {
            src: 'gallery/updated gallery/moonlagadin1.avif',
            alt: 'Moon over Lagadin, Ohrid, Macedonia',
            category: 'stars',
        },
        {
            src: 'gallery/updated gallery/IMG_6772.avif',
            alt: 'Night sky',
            category: 'stars',
        },
        {
            src: 'gallery/updated gallery/mats1.avif',
            alt: 'Specimen under the stereo microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats2.avif',
            alt: 'Specimen under the stereo microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats7.avif',
            alt: 'Specimen under the stereo microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats3.avif',
            alt: 'Composite specimen under the microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats5.avif',
            alt: 'Composite specimen under the microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats6.avif',
            alt: 'Specimen detail under the microscope',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats4.avif',
            alt: 'Experimental test rig',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/mats8.avif',
            alt: 'Test rig under the lights',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/research1.avif',
            alt: 'Oscilloscope readout during testing',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/research2.avif',
            alt: 'Oscilloscope readout during validation testing',
            category: 'lab',
        },
        {
            src: 'gallery/updated gallery/research3.avif',
            alt: 'Piezoelectric specimen in the test fixture',
            category: 'lab',
        },
    ]
};
