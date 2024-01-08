**megagen developed by:**
```solidity
    ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██
    █                                                            █
    █   RRRRR   U   U  FFFFF  FFFFF  B   B  U   U  FFFFF  FFFFF  █
    █   R   R   U   U  F      F      B   B  U   U  F      F      █
    █   RRRRR   U   U  FFFF   FFFF   BBBBB  U   U  FFFF   FFFF   █
    █   R  R    U   U  F      F      B   B  U   U  F      F      █
    █   R   R   UUUUU  F      F      B   B  UUUUU  F      F      █
    █                                                            █
    ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██

#Wallet: 0xruffbuff.eth
#Discord: chain.eth | 0xRuffBuff#8817
```

- 1: Run `git clone https://github.com/ruffbuff/megagen`
- 2: Then `cd megagen`, `npm install`
- 3: Open `config.json` or/and `config2.json` to set-up attributes, metadata, and drop image/s to layers in to the `layers` folder.

When ready with generator, run `node s.js`, set `1` to generate images, set `2` to remake `image base URL` (After done with IPFS CID), set `3` to generate copies.

**config.json:**
```bash
{
    "width": 2000,                                  // CHANGE
    "height": 2000,                                 // CHANGE
    "name": "Whale",                                // CHANGE
    "collectionName": "MustacheDAO: Whales",        // CHANGE
    "description": "Whales Whales Whales.",         // CHANGE
    "image": "https://yourdomain.com/nft/images/",  // CHANGE WITH 2nd command
    "layers": [                                     // CHANGE
        {
            "folder": "skin",
            "options": ["skin_classic.png"]
        },
        {
            "folder": "top",
            "options": ["top_angel.png", "top_devil.png", "top_samurai.png"]
        },
        {
            "folder": "bottom",
            "options": ["bot_captain.png", "bot_homeless.png", "bot_onetwo.png"]
        },
        {
            "folder": "mid",
            "options": ["mid_elmustache.png", "mid_lumustache.png"]
        },
        {
            "folder": "utils",
            "options": ["utils_pipe.png"]
        }
    ]
}
```

**config2.json:**
```bash
{
    "name": "Potion",                                                                                                   // CHANGE
    "collectionName": "MustacheDAO: Potions",                                                                           // CHANGE
    "description": "Magic Potion? But for what? For your health? Or for you and your family? Or for the whole world?",  // CHANGE
    "image": "https://yourdomain.com/nft/images/",                                                                      // CHANGE
    "potionTypes": [                                                                                                    // CHANGE
        "Metall",
        "Dragon",
        "Pinky",
        "Zombie"
    ]
}
```