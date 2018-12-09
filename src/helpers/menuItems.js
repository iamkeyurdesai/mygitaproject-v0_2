export const menu = {
    // mainItems: ['Text', 'Media', 'Games', 'Art', 'Meditation', 'Shop', 'Info'],
    // mainIcons: ['explore', 'directions_transit', 'games', 'brush', 'spa', 'card_giftcard', 'info'],
    // mainActive: [true, false, false, false, false, false, false],
    mainItems: ['Text', 'Media', 'Games'],
    mainIcons: ['explore', 'directions_transit', 'games'],
    mainActive: [true, false, false],
    Text: {
    subItems: ['read', 'recite', 'reflect'],
    subIcons: ['mdi-book-open', 'mdi-voice', 'mdi-thought-bubble'],
    navItems: { read: ['story', 'verse', 'quotes', 'meaning'],
                recite: ['sanskrit', 'pronounce', 'practice', 'test'],
                reflect: ['primary', 'commentary', 'questions', 'concepts'] },
    navIcons: { read: ['mdi-book-open-page-variant', 'mdi-format-list-bulleted', 'mdi-format-quote-close', 'mdi-translate'],
                recite: ['insert_chart', 'insert_chart', 'insert_chart', 'insert_chart'],
                reflect: ['insert_chart', 'insert_chart', 'insert_chart', 'insert_chart'] }
      },

      Media: {
      subItems: ['read', 'recite', 'reflect'],
      subIcons: ['mdi-book-open-page-variant', 'explore', 'explore'],
      navItems: { read: ['read', 'recite', 'reflect'],
                  recite: ['read', 'recite', 'reflect'],
                  reflect: ['read', 'recite', 'reflect'] },
      navIcons: { read: ['insert_chart', 'insert_chart', 'insert_chart'],
                  recite: ['insert_chart', 'insert_chart', 'insert_chart'],
                  reflect: ['insert_chart', 'insert_chart', 'insert_chart'] }
        },

        Games: {
        subItems: ['read', 'recite', 'reflect'],
        subIcons: ['explore', 'explore', 'explore'],
        navItems: { read: ['read', 'recite', 'reflect'],
                    recite: ['read', 'recite', 'reflect'],
                    reflect: ['read', 'recite', 'reflect'] },
        navIcons: { read: ['insert_chart', 'insert_chart', 'insert_chart'],
                    recite: ['insert_chart', 'insert_chart', 'insert_chart'],
                    reflect: ['insert_chart', 'insert_chart', 'insert_chart'] }
          }
    }

//   },
//   {
//     action: 'insert_chart',
//     title: 'Graphics',
//     active: true,
//     items: [{
//         title: 'chart'
//       },
//       {
//         title: 'wordcloud'
//       }
//     ]
//   },
//   {
//     action: 'spa',
//     title: 'Meditation',
//     items: [{
//         title: 'type1'
//       },
//       {
//         title: 'type2'
//       }
//     ]
//   },
//   {
//     action: 'directions_transit',
//     title: 'Media',
//     items: [{
//         title: 'audio'
//       },
//       {
//         title: 'video'
//       },
//       {
//         title: 'picture'
//       }
//     ]
//   },
//   {
//     action: 'settings',
//     title: 'Settings',
//     items: [{
//         title: 'language'
//       },
//       {
//         title: 'theme'
//       },
//       {
//         title: 'notifications'
//       }
//     ]
//   },
//   {
//     action: 'card_giftcard',
//     title: 'Store',
//     items: [{
//         title: 'gifts'
//       },
//       {
//         title: 'art'
//       }
//     ]
//   },
//   {
//     action: 'info',
//     title: 'About Us',
//     items: [{
//         title: 'what we do'
//       },
//       {
//         title: 'FAQs'
//       }
//     ]
//   }
// ]
