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
    navItems: { read: ['summary', 'verses', 'context'],
                recite: ['learn', 'sanskrit', 'monitor'],
                reflect: ['primary', 'commentary', 'community'] },
    navLabels: { read: ['read the summary', 'verse by verse', 'follow the context'],
                recite: ['recite the gita', 'pronounce sanskrit', 'monitor progress'],
                reflect: ['study the gita', 'read commentaries', 'reflect and reason'] },
    navIcons: { read: ['mdi-book-open-page-variant', 'mdi-format-list-bulleted', 'timeline'],
                recite: ['record_voice_over', 'sort_by_alpha', 'rowing'],
                reflect: ['speaker_notes', 'vpn_key', 'mdi-thought-bubble'] }
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
