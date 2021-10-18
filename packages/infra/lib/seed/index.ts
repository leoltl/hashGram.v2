// 123123
const passwordHash = '$2b$10$CN/dd8V42MJxzmhqHOek9OClqyZC.ebQZ3qfb8QHj2mRM1XMpvWcK'

// Users
export const USERS = {
  alice: {
    id: 'c32a6967-66e1-46ec-8b95-49cd791093aa',
    email: 'alice@hashgram.io',
    name: 'Alice',
    createdAt: new Date('2021-10-10').toISOString(),
    role: 'USER' as const,
    isDeleted: false,
    passwordHash,
  },
  bob: {
    id: '727c6513-ba7a-41b7-a347-a2620dbd8dba',
    email: 'bob@hashgram.io',
    name: 'Bob',
    createdAt: new Date('2021-10-10').toISOString(),
    role: 'USER' as const,
    isDeleted: false,
    passwordHash,
  },
  catherine: {
    id: 'b1f1a395-b77f-4cf0-9b75-9cd2a6c78fc8',
    email: 'catherine@hashgram.io',
    name: 'Catherine',
    createdAt: new Date('2021-10-10').toISOString(),
    role: 'USER' as const,
    isDeleted: false,
    passwordHash,
  },
}

// Following
export const FOLLOWINGS = [
  {
    // Alice following Bob
    // Bob followed by Alice
    followerId: USERS.alice.id,
    followeeId: USERS.bob.id,
  },
  {
    // Catherine following Bob
    followerId: USERS.catherine.id,
    followeeId: USERS.bob.id,
  },
  {
    // Catherine following Alice
    followerId: USERS.catherine.id,
    followeeId: USERS.alice.id,
  },
  // Alice is following Bob
  // Alice is followed by Catherine
  // Bob is not following anybody
  // Bob is followed by Alice and Catherine
  // Catherine is following Bob and Alice
  // Nobody follows Catherine
]


// Posts
export const POSTS = {
  post1: {
    id: '95f79230-9350-41a5-b6d6-1cdca2af6f44',
    createdAt: new Date('2021-10-12').toISOString(),
    isDeleted: false,
    ownerId: USERS.alice.id,
    imageUrl: "https://hashgram.s3.amazonaws.com/user-content/1b399851deb8d378d13401ab8d0ebbb9"
  },
  post2: {
    id: 'da2598e1-8603-4f25-bcbd-8ab54808465f',
    createdAt: new Date('2021-10-18').toISOString(),
    isDeleted: false,
    ownerId: USERS.alice.id,
    imageUrl: "https://hashgram.s3.amazonaws.com/user-content/0a0ab5be636f521d65592711ffba396b"
  },
  post3: {
    id: 'd8de67ac-5867-4b46-9d8a-f6b52c8edc5f',
    createdAt: new Date('2021-10-14').toISOString(),
    isDeleted: false,
    ownerId: USERS.bob.id,
    imageUrl: "https://hashgram.s3.amazonaws.com/user-content/2504557eb570e5d0b3e662de934656f0"
  },
  post4: {
    id: '4a2e6a08-7103-4f71-9e2f-298520fcfb28',
    createdAt: new Date('2021-10-16').toISOString(),
    isDeleted: false,
    ownerId: USERS.bob.id,
    imageUrl: "https://hashgram.s3.amazonaws.com/user-content/3ec4192852a20b5a19b1fe082af84d23"
  },
  post5: {
    id: '4dcab67d-7586-4bd5-987a-97d2447ddd51',
    createdAt: new Date('2021-10-14').toISOString(),
    isDeleted: false,
    ownerId: USERS.catherine.id,
    imageUrl: "https://hashgram.s3.amazonaws.com/user-content/95d0171a91b02dd95c34bb3be23206bc"
  }
}

// PostInteractions
export const POST_INTERACTION = {
  postInteraction1: {
    postId: POSTS.post1.id,
    likes: [
      {
        userId: USERS.bob.id,
        timestamp: new Date("2021-10-19")
      }
    ],
    comments: [
      {
        id: "c8cc74dd-5613-4e62-becc-d2e309cb43b4",
        userId: USERS.alice.id,
        body: "Good times",
        timestamp: new Date("2021-10-12"),
      },
      {
        id: "c8cc74dd-5613-4e62-becc-d2e309cb43b4",
        userId: USERS.alice.id,
        body: "Let's visit there! @leannaG",
        timestamp: new Date("2021-10-12"),
      }
    ],
    createdAt: new Date("2021-10-12"),
    updatedAt: new Date("2021-10-19")
  },
  postInteraction2: {
    postId: POSTS.post2.id,
    likes: [
      {
        userId: USERS.bob.id,
        timestamp: new Date("2021-10-19")
      },
      {
        userId: USERS.catherine.id,
        timestamp: new Date("2021-10-20")
      }
    ],
    comments: [],
    createdAt: new Date("2021-10-19"),
    updatedAt: new Date("2021-10-20")
  }
}