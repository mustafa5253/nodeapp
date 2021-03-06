var express = require('express');
var router = express.Router();
var services = require('../services');

const contacts = [
    {
        'id'    : '5b56078bbceba24b2a602b3a',
        'name'  : 'Alice Freeman',
        'avatar': 'assets/images/avatars/alice.jpg',
        'status': 'online',
        'mood'  : 'I never sign anything until I pretend to read it first..'
    },
    {
        'id'    : '5725a680606588342058356d',
        'name'  : 'Arnold',
        'avatar': 'assets/images/avatars/Arnold.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'Looks like Andrew Jackson\'s been tossed to the back of the bus.'
    },
    {
        'id'    : '5725a68009e20d0a9e9acf2a',
        'name'  : 'Barrera',
        'avatar': 'assets/images/avatars/Barrera.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'Love is going to bed early.Marriage is going to sleep early.',
        'unread': null
    },
    {
        'id'    : '5725a6809fdd915739187ed5',
        'name'  : 'Blair',
        'avatar': 'assets/images/avatars/Blair.jpg',
        'status': 'offline',
        'mood'  : 'I would be unstoppable. If i could just get started.',
        'unread': 3
    },
    {
        'id'    : '5725a68007920cf75051da64',
        'name'  : 'Boyle',
        'avatar': 'assets/images/avatars/Boyle.jpg',
        'status': 'offline',
        'mood'  : '\'GOOD MORNING COFFEE\'....Meet your maker!!!!'
    },
    {
        'id'    : '5725a68031fdbb1db2c1af47',
        'name'  : 'Christy',
        'avatar': 'assets/images/avatars/Christy.jpg',
        'status': 'offline',
        'mood'  : 'We always hold hands. If I let go, she shops.'
    },
    {
        'id'    : '5725a680bc670af746c435e2',
        'name'  : 'Copeland',
        'avatar': 'assets/images/avatars/Copeland.jpg',
        'status': 'online',
        'mood'  : 'I get enough exercise just pushing my luck.'
    },
    {
        'id'    : '5725a680e7eb988a58ddf303',
        'name'  : 'Estes',
        'avatar': 'assets/images/avatars/Estes.jpg',
        'status': 'away',
        'mood'  : 'What comes after the man bun hairstyle? The he-hive!'
    },
    {
        'id'    : '5725a680dcb077889f758961',
        'name'  : 'Harper',
        'avatar': 'assets/images/avatars/Harper.jpg',
        'status': 'offline',
        'mood'  : 'Always try to be modest and be proud of it!'
    },
    {
        'id'    : '5725a6806acf030f9341e925',
        'name'  : 'Helen',
        'avatar': 'assets/images/avatars/Helen.jpg',
        'status': 'away',
        'mood'  : 'Why are there stitch marks on zombies? Who\'s giving them medical attention?'
    },
    {
        'id'    : '5725a680ae1ae9a3c960d487',
        'name'  : 'Henderson',
        'avatar': 'assets/images/avatars/Henderson.jpg',
        'status': 'offline',
        'mood'  : 'I can\'t decide if people who wear pajamas in public have given up on life or are living it to the fullest.'
    },
    {
        'id'    : '5b3898cfc43d54359848079f',
        'name'  : 'Josefina',
        'avatar': 'assets/images/avatars/Josefina.jpg',
        'status': 'online',
        'mood'  : 'The fastest way to being happy is to make other people happy. You go first'
    },
    {
        'id'    : '5725a68034cb3968e1f79eac',
        'name'  : 'Katina',
        'avatar': 'assets/images/avatars/Katina.jpg',
        'status': 'away',
        'mood'  : 'If I was a rat,,, I wouldn\'t give anyone my ass.'
    },
    {
        'id'    : '5725a6801146cce777df2a08',
        'name'  : 'Lily',
        'avatar': 'assets/images/avatars/Lily.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'A zip line but from the sofa to the fridge'
    },
    {
        'id'    : '5725a6808a178bfd034d6ecf',
        'name'  : 'Mai',
        'avatar': 'assets/images/avatars/Mai.jpg',
        'status': 'away',
        'mood'  : 'If a girl tells you she has a nipple ring, the only correct response is \'I don\'t believe you.\''
    },
    {
        'id'    : '5725a680653c265f5c79b5a9',
        'name'  : 'Nancy',
        'avatar': 'assets/images/avatars/Nancy.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'Prison counts as a gated community, right?'
    },
    {
        'id'    : '5725a680bbcec3cc32a8488a',
        'name'  : 'Nora',
        'avatar': 'assets/images/avatars/Nora.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'I never date left handed women. Righty tighty, lefty loosey.'
    },
    {
        'id'    : '5725a6803d87f1b77e17b62b',
        'name'  : 'Odessa',
        'avatar': 'assets/images/avatars/Odessa.jpg',
        'status': 'away',
        'mood'  : 'A day without sunshine is like, night.'
    },
    {
        'id'    : '5725a680e87cb319bd9bd673',
        'name'  : 'Reyna',
        'avatar': 'assets/images/avatars/Reyna.jpg',
        'status': 'offline',
        'mood'  : 'I can\'t wait for summer in Canada...'
    },
    {
        'id'    : '5725a6802d10e277a0f35775',
        'name'  : 'Shauna',
        'avatar': 'assets/images/avatars/Shauna.jpg',
        'status': 'online',
        'mood'  : 'My take home pay doesn’t ven take me home.',
        'unread': null
    },
    {
        'id'    : '5725a680aef1e5cf26dd3d1f',
        'name'  : 'Shepard',
        'avatar': 'assets/images/avatars/Shepard.jpg',
        'status': 'online',
        'mood'  : 'I don\'t speak Spanish, but I\'m pretty sure \'Dora\' means \'annoying\''
    },
    {
        'id'    : '5725a680cd7efa56a45aea5d',
        'name'  : 'Tillman',
        'avatar': 'assets/images/avatars/Tillman.jpg',
        'status': 'do-not-disturb',
        'mood'  : ''
    },
    {
        'id'    : '5725a680fb65c91a82cb35e2',
        'name'  : 'Trevino',
        'avatar': 'assets/images/avatars/Trevino.jpg',
        'status': 'away',
        'mood'  : 'Apparently, a rat and a plastic tube does not count as a DIY abortion kit.'
    },
    {
        'id'    : '5725a68018c663044be49cbf',
        'name'  : 'Tyson',
        'avatar': 'assets/images/avatars/Tyson.jpg',
        'status': 'do-not-disturb',
        'mood'  : 'I\'m wondering why life keeps teaching me lessons I have no desire to learn...'
    },
    {
        'id'    : '5725a6809413bf8a0a5272b1',
        'name'  : 'Velazquez',
        'avatar': 'assets/images/avatars/Velazquez.jpg',
        'status': 'online',
        'mood'  : 'Modulation in all things.'
    }
];

const chats = [
    {
        'id'    : '1725a680b3249760ea21de52',
        'dialog': [
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'Quickly come to the meeting room 1B, we have a big server issue',
                'time'   : '2017-03-22T08:54:28.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'I’m having breakfast right now, can’t you wait for 10 minutes?',
                'time'   : '2017-03-22T08:55:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'We are losing money! Quick!',
                'time'   : '2017-03-22T09:00:28.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
                'time'   : '2017-03-22T09:02:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'You are the worst!',
                'time'   : '2017-03-22T09:05:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'We are losing money! Quick!',
                'time'   : '2017-03-22T09:15:28.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
                'time'   : '2017-03-22T09:20:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'You are the worst!',
                'time'   : '2017-03-22T09:22:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'We are losing money! Quick!',
                'time'   : '2017-03-22T09:25:28.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
                'time'   : '2017-03-22T09:27:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'You are the worst!',
                'time'   : '2017-03-22T09:33:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'We are losing money! Quick!',
                'time'   : '2017-03-22T09:35:28.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
                'time'   : '2017-03-22T09:45:28.299Z'
            },
            {
                'who'    : '5b56078bbceba24b2a602b3a',
                'message': 'You are the worst!',
                'time'   : '2017-03-22T10:00:28.299Z'
            }
        ]
    },
    {
        'id'    : '2725a680b8d240c011dd2243',
        'dialog': [
            {
                'who'    : '5b3898cfc43d54359848079f',
                'message': 'Quickly come to the meeting room 1B, we have a big server issue',
                'time'   : '2017-04-22T01:00:00.299Z'
            },
            {
                'who'    : '5b38964a48a2393440ff0488',
                'message': 'I’m having breakfast right now, can’t you wait for 10 minutes?',
                'time'   : '2017-04-22T01:05:00.299Z'
            },
            {
                'who'    : '5b3898cfc43d54359848079f',
                'message': 'We are losing money! Quick!',
                'time'   : '2017-04-22T01:10:00.299Z'
            }
        ]
    },
    {
        'id'    : '3725a6809413bf8a0a5272b4',
        'dialog': [
            {
                'who'    : '5b12e78520ce8b24c79e8672',
                'message': 'Quickly come to the meeting room 1B, we have a big server issue',
                'time'   : '2017-04-22T02:10:00.299Z'
            }
        ]
    }
];

const user = [
    {
        'id'      : '5a028ebe4e88510012351744',
        'name'    : 'John Doe',
        'avatar'  : 'assets/images/avatars/profile.jpg',
        'status'  : 'online',
        'mood'    : 'it\'s a status....not your diary...',
        'chatList': [
            {
                'id'             : '1725a680b3249760ea21de52',
                'contactId'      : '5b56078bbceba24b2a602b3a',
                'name'           : 'Alice Freeman',
                'unread'         : 4,
                'lastMessageTime': '2017-06-12T02:10:18.931Z'
            },
            {
                'id'             : '2725a680b8d240c011dd2243',
                'contactId'      : '5b3898cfc43d54359848079f',
                'name'           : 'Josefina',
                'unread'         : null,
                'lastMessageTime': '2017-02-18T10:30:18.931Z'
            }
            // ,
            // {
            //     'id'             : '3725a6809413bf8a0a5272b4',
            //     'contactId'      : '5725a6809413bf8a0a5272b1',
            //     'name'           : 'Velazquez',
            //     'unread'         : 2,
            //     'lastMessageTime': '2017-03-18T12:30:18.931Z'
            // }
        ]
    }
];

/*
 * GET REQUEST
 */
router.get('/:path/:id*?', (req, res, next) => {
    const path = req.params.path;
    const id = req.params.id;
    const query = req.query;
    console.log('the path is :', path);
    console.log('the query is :', query);
    console.log('the id is :', id);
    switch(path) {
        case 'chats':
            if (id) {
                // console.log('Return chat by id', id);
                // let chat = chats.find((chat) => chat.id == id);
                // console.log('the found chat is :', chat);
                // res.send(chat);
                services.chat.getChatById(req, res);

            } else {
                console.log('Return all chats');
                // res.send(chats);
                // res.send([]);
                services.chat.list(req, res);
            }
            
            break;
        case 'contacts':
            console.log('Return chat contacts');
            services.user.getContactListForChat(req, res);
            // res.send(contacts);
            break;
        case 'user':
            console.log('return chat user');
            services.user.getUserWithChatList(req, res);
            // res.send(user);
            break;
        default: 
            console.log('return default case');
    }
});

/*
 * GET
 */
// router.get('/:id', services.chat.show);

/*
 * POST
 */
router.post('/chats', services.chat.create);
// router.post('/chats', (req, res, next) => {
//     let body = req.body;
//     chats.push(body);
//     res.send(body);
// });

// router.post('/chats/:id', (req, res, next) => {
//     let body = req.body;
//     console.log('the single chat is :', body);
//     chats.push(body);
//     res.send(chats);
// });

router.post('/chats/:id', services.chat.create);

router.post('/user/:id', services.user.update);

// router.post('/user/:id', (req, res, next) => {
//     let body = req.body;
//     user.push(body);
//     console.log('the user body is :', body);
//     res.send(body);
// });

/*
 * PUT
 */
router.put('/:id', services.chat.update);

/*
 * DELETE
 */
router.delete('/:id', services.chat.remove);


module.exports = router;