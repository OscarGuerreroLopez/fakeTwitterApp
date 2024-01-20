// simulated-streaming.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { interval } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SimulatedStreamingService {
  constructor(private eventEmitter: EventEmitter2) {
    // Simulate tweeting every 10 seconds
    interval(10000).subscribe(() => {
      const tweet = {
        tweetId: uuidv4(), // Generate a random tweetId
        content: 'Simulated tweet content',
        hashtags: ['simulated', 'test', 'hashtag'],
        createdAt: new Date(),
      };
      this.eventEmitter.emit('tweet', tweet);
    });
  }
}
