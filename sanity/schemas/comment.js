export default {

  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileimage',
      title: 'Profile Image',
      type: 'string',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tweet',
      title: 'Tweet',
      type: 'reference',
      to: 
        {
          type:'tweet'
        },
    },
  ],
}
