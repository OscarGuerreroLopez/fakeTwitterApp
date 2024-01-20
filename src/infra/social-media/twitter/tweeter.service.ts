// simulated-streaming.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { interval } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { GetRandomElements } from '../../../utils/randomHashtags';
import { Tweet } from '../../../core';

@Injectable()
export class SimulatedStreamingService {
  constructor(private eventEmitter: EventEmitter2) {
    // Simulate tweeting every 5 seconds
    interval(5000).subscribe(() => {
      const tweet: Tweet = {
        tweetId: uuidv4(), // Generate a random tweetId
        content: 'Simulated tweet content',
        hashtags: GetRandomElements(),
        createdAt: new Date(),
      };
      this.eventEmitter.emit('tweet', tweet);
    });
  }
}
