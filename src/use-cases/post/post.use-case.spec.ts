import { Test, TestingModule } from '@nestjs/testing';
import { PostUseCases } from './post.use-case';
import { CreatePostService } from './createPost.service';
import { CreateTweetPostService } from './createTweetPost.service';
import { DataServices, Tweet, Facebook } from '../../core';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

jest.mock('./createPost.service');
jest.mock('./createTweetPost.service');

const mockPostFindAll = [
  {
    _id: '65ad5aeec8137646bba4f24c',
    originId: '2d9e7027-2012-45a6-85aa-5264804763ee',
    content: 'Simulated tweet content',
    hashtags: ['simulated', "i'm-not-very-creative"],
    platform: 'twitter',
    createdAt: new Date(),
    __v: 0,
  },
  {
    _id: '65ad5af3c8137646bba4f254',
    originId: '486b1f1a-2d52-4f79-a9f8-3ab11bece19b',
    content: 'Simulated tweet content',
    hashtags: ['simulated', 'hashtag'],
    platform: 'twitter',
    createdAt: new Date(),
    __v: 0,
  },
];

const mockTweetPostFindAll = [
  {
    _id: '65ad5aeec8137646bba4f24f',
    hashtag: 'simulated',
    properties: [
      {
        tweetId: '2d9e7027-2012-45a6-85aa-5264804763ee',
        content: 'Simulated tweet content',
        createdAt: new Date(),
        hashtags: ['simulated', "i'm-not-very-creative"],
      },
      {
        tweetId: '486b1f1a-2d52-4f79-a9f8-3ab11bece19b',
        content: 'Simulated tweet content',
        createdAt: new Date(),
        hashtags: ['simulated', 'hashtag'],
      },
    ],
    __v: 0,
  },
  {
    _id: '65ad5aeec8137646bba4f252',
    hashtag: "i'm-not-very-creative",
    properties: [
      {
        tweetId: '2d9e7027-2012-45a6-85aa-5264804763ee',
        content: 'Simulated tweet content',
        createdAt: new Date(),
        hashtags: ['simulated', "i'm-not-very-creative"],
      },
    ],
    __v: 0,
  },
  {
    _id: '65ad5af3c8137646bba4f259',
    hashtag: 'hashtag',
    properties: [
      {
        tweetId: '486b1f1a-2d52-4f79-a9f8-3ab11bece19b',
        content: 'Simulated tweet content',
        createdAt: new Date(),
        hashtags: ['simulated', 'hashtag'],
      },
    ],
    __v: 0,
  },
];

describe('PostUseCases', () => {
  let postUseCases: PostUseCases;
  let createPostService: CreatePostService;
  let createTweetPostService: CreateTweetPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostUseCases,
        CreatePostService,
        CreateTweetPostService,
        {
          provide: DataServices,
          useFactory: () => ({
            posts: {
              findAll: jest.fn().mockResolvedValue(mockPostFindAll),
            },
            tweetPosts: {
              findAll: jest.fn().mockResolvedValue(mockTweetPostFindAll),
            },
          }),
        },
      ],
    }).compile();

    postUseCases = module.get<PostUseCases>(PostUseCases);
    createPostService = module.get<CreatePostService>(CreatePostService);
    createTweetPostService = module.get<CreateTweetPostService>(
      CreateTweetPostService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle tweet created event and create posts', async () => {
    const tweetPayload: Tweet = {
      tweetId: '123',
      content: 'Test tweet content',
      hashtags: ['test', 'example'],
      createdAt: new Date(),
    };

    await postUseCases.handleTweetCreatedEvent(tweetPayload);

    expect(createPostService.createPost).toHaveBeenCalledWith(tweetPayload);
    expect(createTweetPostService.createTweetPost).toHaveBeenCalledWith(
      tweetPayload,
    );
  });

  it('should handle facebook created event and create posts', async () => {
    const facebookPayload: Facebook = {
      postId: '456',
      content: 'Test Facebook post content',
      hashtags: ['social', 'media'],
      createdAt: new Date(),
    };

    postUseCases.handleFacebookCreatedEvent(facebookPayload);

    expect(createPostService.createPost).toHaveBeenCalledWith(facebookPayload);
  });

  it('should return the right results getPosts', async () => {
    const tweetResult = await postUseCases.getPosts();

    expect(tweetResult).toEqual(mockPostFindAll);
  });

  it('should return the right results getTweetPosts', async () => {
    const tweetPostResult = await postUseCases.getTweetPosts();

    expect(tweetPostResult).toEqual(mockTweetPostFindAll);
  });
});
