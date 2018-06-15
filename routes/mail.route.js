var express = require('express');
var router = express.Router();
var services = require('../services');

const folders = [
    {
        'id'    : 0,
        'handle': 'inbox',
        'title' : 'Inbox',
        'icon'  : 'inbox'
    },
    {
        'id'    : 1,
        'handle': 'sent',
        'title' : 'Sent',
        'icon'  : 'send'
    },
    {
        'id'    : 2,
        'handle': 'drafts',
        'title' : 'Drafts',
        'icon'  : 'email_open'
    },
    {
        'id'    : 3,
        'handle': 'spam',
        'title' : 'Spam',
        'icon'  : 'error'
    },
    {
        'id'    : 4,
        'handle': 'trash',
        'title' : 'Trash',
        'icon'  : 'delete'
    }
];

const labels = [
    {
        'id'    : 0,
        'handle': 'note',
        'title' : 'Note',
        'color' : '#7cb342'
    },
    {
        'id'    : 1,
        'handle': 'paypal',
        'title' : 'Paypal',
        'color' : '#d84315'
    },
    {
        'id'    : 2,
        'handle': 'invoice',
        'title' : 'Invoice',
        'color' : '#607d8b'
    },
    {
        'id'    : 3,
        'handle': 'amazon',
        'title' : 'Amazon',
        'color' : '#03a9f4'
    }
];

const filters = [
    {
        'id'    : 0,
        'handle': 'starred',
        'title' : 'Starred',
        'icon'  : 'star'
    },
    {
        'id'    : 1,
        'handle': 'important',
        'title' : 'Important',
        'icon'  : 'label'
    }
];

const mails = [
    {
        'id'            : '15459251a6d6b397565',
        'from'          : {
            'name'  : 'Alice Freeman',
            'avatar': '',
            'email' : 'alicefreeman@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '28 Jun',
        'read'          : false,
        'starred'       : false,
        'important'     : true,
        'hasAttachments': true,
        'attachments'   : [
            {
                'type'    : 'image',
                'fileName': 'flowers',
                'preview' : '',
                'url'     : '',
                'size'    : '1.1Mb'
            },
            {
                'type'    : 'image',
                'fileName': 'snow',
                'preview' : '',
                'url'     : '',
                'size'    : '380kb'
            },
            {
                'type'    : 'image',
                'fileName': 'sunrise',
                'preview' : '',
                'url'     : '',
                'size'    : '17Mb'
            }
        ],
        'labels'        : [
            1
        ],
        'folder'        : 0
    },
    {
        'id'            : '154588a0864d2881124',
        'from'          : {
            'name'  : 'Lawrence Collins',
            'avatar': '',
            'email' : 'lawrencecollins@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '28 Jun',
        'read'          : false,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '15453ba60d3baa5daaf',
        'from'          : {
            'name'  : 'Judith Burton',
            'avatar': '',
            'email' : 'judithburton@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '28 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [
            3,
            2
        ],
        'folder'        : 0
    },
    {
        'id'            : '15453a06c08fb021776',
        'from'          : {
            'name'  : 'Danielle Obrien',
            'avatar': '',
            'email' : 'danielleobrien@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '28 Jun',
        'read'          : true,
        'starred'       : true,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [
            1,
            3
        ],
        'folder'        : 0
    },
    {
        'id'            : '154537435d5b32bf11a',
        'from'          : {
            'name'  : 'Brian Flores',
            'avatar': '',
            'email' : 'brianflores@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '26 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '1544e43dcdae6ebf876',
        'from'          : {
            'name'  : 'Charles Kim',
            'avatar': '',
            'email' : 'charleskim@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '18 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : true,
        'hasAttachments': false,
        'labels'        : [
            2
        ],
        'folder'        : 0
    },
    {
        'id'            : '1543ee3a5b43e0f9f45',
        'from'          : {
            'name'  : 'Patricia White',
            'avatar': '',
            'email' : 'patriciawhite@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '15 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '1543cc4515df3146112',
        'from'          : {
            'name'  : 'Juan Carpenter',
            'avatar': '',
            'email' : 'juancarpenter@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '11 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '154398a4770d7aaf9a2',
        'from'          : {
            'name'  : 'Maria Gilbert',
            'avatar': '',
            'email' : 'mariagilbert@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '5 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '15438351f87dcd68567',
        'from'          : {
            'name'  : 'Tammy Brooks',
            'avatar': '',
            'email' : 'tammybrooks@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>',
        'time'          : '1 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '1542d75d929a603125',
        'from'          : {
            'name'  : 'Kathy Price',
            'avatar': '',
            'email' : 'kathyprice@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '1 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '1541ca7af66da284177',
        'from'          : {
            'name'  : 'Alan Coleman',
            'avatar': '',
            'email' : 'alancoleman@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '28 June',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '154297167e781781745',
        'from'          : {
            'name'  : 'Thomas Silva',
            'avatar': '',
            'email' : 'thomassilva@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '16 Jun',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 0
    },
    {
        'id'            : '15427f4c1b7f3953234',
        'from'          : {
            'name'  : 'Jessica Robertson',
            'avatar': '',
            'email' : 'jessicarobertson@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '19 May',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 3
    },
    {
        'id'            : '154204e45a59b168453',
        'from'          : {
            'name'  : 'John Palmer',
            'avatar': '',
            'email' : 'johnpalmer@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '8 May',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 3
    },
    {
        'id'            : '1541dd1e05dfc439216',
        'from'          : {
            'name'  : 'David Butler',
            'avatar': '',
            'email' : 'davidbutler@creapond.com'
        },
        'to'            : [
            {
                'name' : 'me',
                'email': 'johndoe@creapond.com'
            }
        ],
        'subject'       : 'Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'message'       : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p> ',
        'time'          : '7 May',
        'read'          : true,
        'starred'       : false,
        'important'     : false,
        'hasAttachments': false,
        'labels'        : [],
        'folder'        : 3
    }
];

/*
 * GET REQUEST
 */
router.get('/:path', (req, res, next) => {
    const path = req.params.path;
    const query = req.query;
    switch(path) {
        case 'folders':
            if(query && query.handle) {
                console.log('return folders with handler'); 
            } else {
                console.log('return all folders');
            }
            res.send(folders);
            break;
        case 'labels':
            console.log('return labels');
            res.send(labels);
            break;
        case 'filters':
            console.log('return all filters');
            res.send(filters);
            break;
        case 'mails':
            if(query && query.folder) {
                console.log('return mails with folder'); 
            } else {
                console.log('return all mails');
            }
            services.mail.list(req, res);
            // res.send(mails);
            break;
        default: 
            console.log('return default case');
    }
});

/*
 * GET
 */
// router.get('/:id', services.mail.show);

/*
 * POST
 */
router.post('/', services.mail.create);

/*
 * PUT
 */
router.put('/:id', services.mail.update);

/*
 * DELETE
 */
router.delete('/:id', services.mail.remove);


module.exports = router;