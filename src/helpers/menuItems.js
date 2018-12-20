export const menu = {
    // mainItems: ['Text', 'Media', 'Games', 'Art', 'Meditation', 'Shop', 'Info'],
    // mainIcons: ['explore', 'directions_transit', 'games', 'brush', 'spa', 'card_giftcard', 'info'],
    // mainActive: [true, false, false, false, false, false, false],
    mainItems: ['Classroom', 'Playground', 'Meditation Hall'],//, 'Media Room', 'Store', 'Help Desk'],
    mainIcons: ['school', 'games', 'spa'], //'perm_media', 'shopping_basket', 'info'],
    mainActive: [true, false, false],//, false, false, false],
    Classroom: {
    subItems: ['read', 'recite', 'reflect'],
    subIcons: ['mdi-book-open', 'mdi-voice', 'mdi-thought-bubble'],
    navItems: { read: ['story', 'verse', 'quotes', 'meaning'],
                recite: ['sanskrit', 'pronounce', 'practice', 'test'],
                reflect: ['primary', 'commentary', 'community', 'concepts'] },
    navIcons: { read: ['mdi-book-open-page-variant', 'mdi-format-list-bulleted', 'mdi-format-quote-close', 'mdi-translate'],
                recite: ['insert_chart', 'insert_chart', 'insert_chart', 'insert_chart'],
                reflect: ['P', 'mdi-lightbulb', 'mdi-forum', 'live_help'] }
      },

      Playground: {
      subItems: ['read', 'recite', 'reflect'],
      subIcons: ['mdi-book-open-page-variant', 'explore', 'explore'],
      navItems: { read: ['read', 'recite', 'reflect'],
                  recite: ['read', 'recite', 'reflect'],
                  reflect: ['read', 'recite', 'reflect'] },
      navIcons: { read: ['insert_chart', 'insert_chart', 'insert_chart'],
                  recite: ['insert_chart', 'insert_chart', 'insert_chart'],
                  reflect: ['insert_chart', 'insert_chart', 'insert_chart'] }
        },

        'Meditation Hall': {
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
