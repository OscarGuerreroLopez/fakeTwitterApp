import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostService } from './createPost.service';
import { DataServices, Tweet, Facebook, LoggersService } from '../../core';
import { PostFactoryService } from './post-factory.service';
import { LoggersModule } from '../../services/loggers/loggers.module';

jest.useFakeTimers().setSystemTime(new Date('2022-11-04'));

describe('CreatePostService', () => {
  let createPostService: CreatePostService;
  let dataServices: DataServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [
        CreatePostService,
        {
          provide: DataServices,
          useFactory: () => ({
            posts: {
              create: jest.fn().mockResolvedValue({}),
            },
            tweetPosts: {
              create: jest.fn().mockResolvedValue({}),
            },
          }),
        },
        {
          provide: LoggersService,
          useValue: {
            debug: jest.fn(),
            info: jest.fn(),
          },
        },
        PostFactoryService,
      ],
    }).compile();

    createPostService = module.get<CreatePostService>(CreatePostService);
    dataServices = module.get<DataServices>(DataServices);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a tweet post', async () => {
    const tweetParams = new Tweet();
    tweetParams.tweetId = '123';
    tweetParams.content = 'Test tweet content';
    tweetParams.hashtags = ['test', 'example'];
    tweetParams.createdAt = new Date();

    await createPostService.createPost(tweetParams);

    expect(dataServices.posts.create).toHaveBeenCalledWith({
      content: 'Test tweet content',
      createdAt: new Date(),
      hashtags: ['test', 'example'],
      originId: '123',
      platform: 'twitter',
    });
  });

  it('should create a facebook post', async () => {
    const facebookParams = new Facebook();
    facebookParams.postId = '456';
    facebookParams.content = 'Test Facebook post content';
    facebookParams.hashtags = ['social', 'media'];
    facebookParams.createdAt = new Date();

    await createPostService.createPost(facebookParams);

    expect(dataServices.posts.create).toHaveBeenCalledWith({
      content: 'Test Facebook post content',
      createdAt: new Date(),
      hashtags: ['social', 'media'],
      originId: '456',
      platform: 'facebook',
    });
  });
});
